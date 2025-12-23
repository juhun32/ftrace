package internal

import (
	"cmd/internal/types"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"sync"

	"github.com/gorilla/websocket"
)

var upgrader = websocket.Upgrader{
	CheckOrigin: func(r *http.Request) bool { return true },
}

// manages websocket clients
type Hub struct {
	clients    map[*websocket.Conn]bool
	broadcast  chan []types.SPageFilePhysics
	register   chan *websocket.Conn
	unregister chan *websocket.Conn
	mu         sync.Mutex
}

func newHub() *Hub {
	return &Hub{
		clients:    make(map[*websocket.Conn]bool),
		broadcast:  make(chan []types.SPageFilePhysics),
		register:   make(chan *websocket.Conn),
		unregister: make(chan *websocket.Conn),
	}
}

func (h *Hub) run() {
	for {
		select {
		case client := <-h.register:
			h.mu.Lock()
			h.clients[client] = true
			h.mu.Unlock()
			fmt.Println("New Dashboard Connected")
		case client := <-h.unregister:
			h.mu.Lock()
			delete(h.clients, client)
			h.mu.Unlock()
			fmt.Println("Dashboard Disconnected")
		case batch := <-h.broadcast:
			h.mu.Lock()
			for client := range h.clients {
				err := client.WriteJSON(batch)
				if err != nil {
					client.Close()
					delete(h.clients, client)
				}
			}
			h.mu.Unlock()
		}
	}
}

func main() {
	hub := newHub()
	go hub.run()

	// endpoint for local ingest
	http.HandleFunc("/ingest", func(w http.ResponseWriter, r *http.Request) {
		var batch []types.SPageFilePhysics
		if err := json.NewDecoder(r.Body).Decode(&batch); err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}
		// send batch to the hub to be broadcasted
		hub.broadcast <- batch
		w.WriteHeader(http.StatusOK)
	})

	// endpoint for dashboard clients
	http.HandleFunc("/ws", func(w http.ResponseWriter, r *http.Request) {
		conn, err := upgrader.Upgrade(w, r, nil)
		if err != nil {
			log.Println(err)
			return
		}
		hub.register <- conn
	})

	fmt.Println("cloud manage running on :5000")
	log.Fatal(http.ListenAndServe(":5000", nil))
}
