#!/bin/bash

curl  -H Accept:text/event-stream http://localhost:3000/events

curl -X POST  -H "Content-Type: application/json"  -d '{"momma": "swamp_princess", "eggs": 40, "temperature": 31}' -s http://localhost:3000/nest

