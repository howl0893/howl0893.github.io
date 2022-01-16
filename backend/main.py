from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

import os
from pydantic import BaseModel
from typing import Optional

print(f" * cwd: {os.getcwd()}")

app = FastAPI()

# TODO: move this to config file or env variable
origins = [
    "http://localhost:8080",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Item(BaseModel):
    name: str
    description: Optional[str] = None
    price: float
    tax: Optional[float] = None

@app.post("/item")
async def create_item(item: Item):
    print(f"we got an item from the frontend: {item}")
    return item
