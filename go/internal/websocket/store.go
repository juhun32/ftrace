package websocket

import "log"

func (h *Hub) databaseWorker() {
	// NOTE: this runs in its own go routine, independent of the live dashboard stream
	// so any latency here does not impact websocket performance
	for payload := range h.dbQueue {
		// batch insert to postgres have not decided yet
		// this can take 50ms<, but won't affect the websocket latency
		err := h.store.WriteBatch(payload.SessionID, payload.Data)
		if err != nil {
			log.Printf("persistence failure: %v", err)
		}
	}
}
