package websocket

import (
	"cmd/internal/database"
	"cmd/types"
	"sync"

	"github.com/gorilla/websocket"
)

type Hub struct {
	clients    map[*websocket.Conn]bool
	broadcast  chan types.TelemetryPayload
	register   chan *websocket.Conn
	unregister chan *websocket.Conn

	// buffer for db write path
	dbQueue chan types.TelemetryPayload
	store   database.Store
	mu      sync.RWMutex
}
