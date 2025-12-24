package websocket

import (
	"log"

	"cmd/internal/database"
	"cmd/types"

	"github.com/gorilla/websocket"
)

func NewHub(store database.Store) *Hub {
	return &Hub{
		clients:    make(map[*websocket.Conn]bool),
		broadcast:  make(chan types.TelemetryPayload),
		register:   make(chan *websocket.Conn),
		unregister: make(chan *websocket.Conn),
		dbQueue:    make(chan types.TelemetryPayload, 100),
		store:      store,
	}
}

func (h *Hub) Run() {
	// init database worker
	go h.databaseWorker()

	for {
		select {
		case client := <-h.register:
			h.mu.Lock()
			h.clients[client] = true
			h.mu.Unlock()
			log.Println("New Dashboard Connected")

		case client := <-h.unregister:
			h.mu.Lock()
			if _, ok := h.clients[client]; ok {
				delete(h.clients, client)
				client.Close()
			}
			h.mu.Unlock()
			log.Println("Dashboard Disconnected")

		case payload := <-h.broadcast:
			// braodcast path: live to dashboards
			h.mu.RLock()
			for client := range h.clients {
				err := client.WriteJSON(payload.Data)
				if err != nil {
					log.Printf("websocket error: %v", err)
					client.Close()
					delete(h.clients, client)
				}
			}
			h.mu.RUnlock()

			// db queue path: persistence, analytics path
			select {
			case h.dbQueue <- payload:
			default:
				log.Println("DB queue full, dropping historical packet")
			}
		}
	}
}

func (h *Hub) BroadcastPayload(payload types.TelemetryPayload) {
	h.broadcast <- payload
}

func (h *Hub) RegisterClient(conn *websocket.Conn) {
	h.register <- conn
}
