#!/bin/bash
PORT=5000

# curl  -H Accept:text/event-stream http://localhost:$PORT/events
curl -X POST  -H "Content-Type: application/json"  -d '{"momma": "swamp_princess", "eggs": 40, "temperature": 31}' -s http://localhost:$PORT/nest

