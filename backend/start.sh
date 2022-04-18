#!/bin/bash

# Start Gunicorn processes
which gunicorn
exec gunicorn --reload main_mqtt:app -k uvicorn.workers.UvicornWorker --bind 0.0.0.0:1883