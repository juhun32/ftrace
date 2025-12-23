package main

import (
	"cmd/internal/types"
	"fmt"
	"log"
	"time"
	"unsafe"

	"golang.org/x/sys/windows"
)

var (
	modkernel32          = windows.NewLazySystemDLL("kernel32.dll")
	procOpenFileMappingW = modkernel32.NewProc("OpenFileMappingW")
)

func openFileMapping(desiredAccess uint32, inheritHandle bool, name string) (windows.Handle, error) {
	namePtr, err := windows.UTF16PtrFromString(name)
	if err != nil {
		return 0, err
	}
	var inherit uintptr
	if inheritHandle {
		inherit = 1
	}
	r0, _, e1 := procOpenFileMappingW.Call(
		uintptr(desiredAccess),
		inherit,
		uintptr(unsafe.Pointer(namePtr)),
	)
	if r0 == 0 {
		return 0, e1
	}
	return windows.Handle(r0), nil
}

func main() {
	handle, err := openFileMapping(windows.FILE_MAP_READ, false, "Local\\acpmf_physics")
	if err != nil {
		log.Fatal("Is Assetto Corsa running? Memory map not found.")
	}
	defer windows.CloseHandle(handle)

	ptr, _ := windows.MapViewOfFile(handle, windows.FILE_MAP_READ, 0, 0, 0)
	defer windows.UnmapViewOfFile(ptr)

	// direct cast to the struct pointer so we can read fields directly
	physicsData := (*types.SPageFilePhysics)(unsafe.Pointer(ptr))
	// NOTE: this is the standard pattern for memory mapped files,
	// even if go vet warns about uintptr conversion.
	// the memory is managed by the OS, not the Go GC, therefore is "pinned" and it won't move.

	fmt.Println("L-Theanine Stream")
	fmt.Println("=================")

	batch := make([]types.SPageFilePhysics, 0)
	ticker := time.NewTicker(100 * time.Millisecond)

	for range ticker.C {
		// direct memory access
		// significantly faster than binary.Read
		data := *physicsData

		batch = append(batch, data)

		if len(batch) >= 10 {
			// logging: check the last frame of the batch
			logPhysics(batch[len(batch)-1])

			go sendToCloud(batch)
			batch = nil
		}
	}
}

func logPhysics(d types.SPageFilePhysics) {
	fmt.Printf("\n[BATCH SYNC @ %s]\n", time.Now().Format("15:04:05"))
	fmt.Printf("	└─ PacketID: 		%d\n", d.PacketId)
	fmt.Printf("	└─ Speed:    		%.1f km/h\n", d.SpeedKmh)
	fmt.Printf("	└─ RPM:      		%d\n", d.Rpms)
	fmt.Printf("	└─ Gear:     		%d (R:-1, N:0)\n", (d.Gear - 1))
	fmt.Printf("	└─ Pedals:   		G:%.3f / B:%.3f\n", d.Gas, d.Brake)
	fmt.Printf("	└─ Steer Angle: 	%.2f\n\n", d.SteerAngle)
}

func sendToCloud(data []types.SPageFilePhysics) {
	fmt.Printf("Pipeline: %d frames buffered for dispatch.\n", len(data))
}
