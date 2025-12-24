package database

import (
	"cmd/types"
	"log"
)

type Store interface {
	WriteBatch(sessionID string, batch []types.SPageFilePhysics) error
}

type LogStore struct{}

func NewLogStore() *LogStore {
	return &LogStore{}
}

func (s *LogStore) WriteBatch(sessionID string, batch []types.SPageFilePhysics) error {
	// this would insert into tiger data db later
	// for now just logging lol idk what to use
	log.Printf("PERSISTENCE [Cold Path]: Writing %d frames for session %s to database...", len(batch), sessionID)
	return nil
}
