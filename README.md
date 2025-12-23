### Sequential


### Focus: maximum efficiency and minimum interference with the host simulation. 

It follows a decoupled, event-driven model:
- Ingestion: standalone Go maps the Assetto Corsa shared memory page (acpmf_physics) directly into its address space. This bypasses the Python interpreter and prevents the simulation from incurring any performance penalty related to data extraction.
- Aggregation: Data is sampled at 60Hz. To minimize network overhead and the quantity of cloud operations, samples are consolidated into batches before transmission.
- Transport: Batches are pushed via asynchronous HTTP to the cloud gateway.
- Cloud Distribution: A Go-based hub on Oracle Cloud receives payloads and broadcasts the current state to all connected clients via the WebSocket protocol.
- Presentation: A minimal web interface consumes the WebSocket stream to update telemetry visualizations in real-time.

### Tech Stack
- Language: Go for both local ingestion and cloud backend.
- Infrastructure: Oracle Cloud Infrastructure (OCI) - ARM Ampere.
- Networking: Gorilla WebSockets (Broadcasting), Net/HTTP (Ingestion).
- Virtualization: Docker.
- System Interface: Windows API (Shared Memory Mapping).

### Specifications
- Memory Management<br/>
The project utilizes the unsafe package in Go to perform zero-copy reads from the shared memory buffer.
By aligning the Go struct with the C++ memory map of Assetto Corsa, this design achieves instantaneous data retrieval without the latency associated with serialization or standard API polling.

- Cloud Optimization<br/>
The backend is designed for the ARM64 architecture to leverage OCI's high-performance free tier. 
The use of Go routines ensures that the server can handle high concurrency and multiple simultaneous dashboard connections with negligible CPU and memory footprints.
