from fastapi_mqtt.fastmqtt import FastMQTT
from fastapi import FastAPI
from fastapi_mqtt.config import MQTTConfig

# mqtt_config = MQTTConfig()

mqtt_config = MQTTConfig(host="localhost", # "mqtt.mosquito.org",
    port=1883,
    keepalive=60,   
    username="fastapi_mqtt",
    password="opensesame")


fast_mqtt = FastMQTT(
    config=mqtt_config
)


app = FastAPI()

fast_mqtt.init_app(app)

@fast_mqtt.on_connect()
def connect(client, flags, rc, properties):
    fast_mqtt.client.subscribe("/mqtt") #subscribing mqtt topic 
    print("Connected: ", client, flags, rc, properties)

@fast_mqtt.subscribe("mqtt/+/helloworld", "mqtt/+/testing")
async def home_message(client, topic, payload, qos, properties):
    print("helloworld/testing: ", topic, payload.decode(), qos, properties)
    return 0

@fast_mqtt.on_message()
async def message(client, topic, payload, qos, properties):
    print("Received message: ",topic, payload.decode(), qos, properties)
    return 0

@fast_mqtt.on_disconnect()
def disconnect(client, packet, exc=None):
    print("Disconnected")

@fast_mqtt.on_subscribe()
def subscribe(client, mid, qos, properties):
    print("subscribed", client, mid, qos, properties)

@app.get("/")
async def func():
    fast_mqtt.publish("/mqtt", "Hello from Fastapi") #publishing mqtt topic 

    return {"result": True,"message":"Published" }

if __name__ == "__main__":
    # asyncio.run(main())

    # start via gunicorn
    # import subprocess
    # subprocess.call('./start.sh')

    # import uvicorn
    # uvicorn.run("main_mqtt:app", host="0.0.0.0", port=1883, log_level="info", reload=True)