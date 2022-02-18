from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

import os
from model import Todo, File

from database import (
    fetch_one_todo,
    fetch_all_todos,
    create_todo,
    update_todo,
    remove_todo,
    create_file,
    fetch_all_files,
)

# print(f" * cwd: {os.getcwd()}")

app = FastAPI()

# TODO: move this to config file or env variable
origins = [
    "http://localhost:8080",
    # "http://localhost:8000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def read_root():
    return {"Hello": "World"}

@app.get("/api/todo")
async def get_todo():
    response = await fetch_all_todos()
    return response

@app.get("/api/todo/{title}", response_model=Todo)
async def get_todo_by_title(title):
    response = await fetch_one_todo(title)
    if response:
        return response
    raise HTTPException(404, f"There is no todo with the title {title}")

@app.post("/api/todo/", response_model=Todo)
async def post_todo(todo: Todo):
    response = await create_todo(todo.dict())
    if response:
        return response
    raise HTTPException(400, "Something went wrong")

@app.put("/api/todo/{title}/", response_model=Todo)
async def put_todo(title: str, desc: str):
    response = await update_todo(title, desc)
    if response:
        return response
    raise HTTPException(404, f"There is no todo with the title {title}")

@app.delete("/api/todo/{title}")
async def delete_todo(title):
    response = await remove_todo(title)
    if response:
        return "Successfully deleted todo"
    raise HTTPException(404, f"There is no todo with the title {title}")


@app.get("/api/file")
async def get_files():
    response = await fetch_all_files()
    return response

@app.post("/api/file/", response_model=File)
async def post_file(file: File):
    print(f"file: {file}")
    response = await create_file(file.dict())
    if response:
        return response
    raise HTTPException(400, "Something went wrong")