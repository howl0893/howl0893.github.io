import traceback, shutil, os, datetime
from fastapi import FastAPI, HTTPException, UploadFile, File, Form, Response, status
from fastapi.middleware.cors import CORSMiddleware

import resources.models
from ingestors.csv import IngestCSV

from resources.database import (
    fetch_one_file,
    fetch_all_files,
    create_file,
    update_file,
    remove_file,

    # Example Todo CRUD operations
    fetch_one_todo,
    fetch_all_todos,
    create_todo,
    update_todo,
    remove_todo,
)


app = FastAPI()

# TODO: move this to config file or env variable
origins = ["*"] # make more secure
    # "http://localhost:8080",
    # "10.0.0.83" # OpenMV
    # "http://localhost:8000",
# ]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def read_root():
    return {"timestamp": datetime.datetime.now(), "message": "Hello World!"}


"""
device CRUD operations
"""
@app.get("/iot/devices")
async def get_devices():
    return {"timestamp": datetime.datetime.utcnow(), "devices": ["openmv", "raspberrypi"]}

@app.post("/iot/devices/", status_code=200)
async def add_device(response: Response, device: str = Form(...)):
    print("device: ", device)
    return {"device": device}

"""
File CRUD operations
"""
@app.post("/api/file/{name}", response_model=models.File)
async def get_file_by_name(name):
    response = await fetch_one_file(name)
    if response:
        return response
    raise HTTPException(404, f"There is no file with the name {name}")

@app.get("/api/file")
async def get_files():
    response = await fetch_all_files()
    return response

@app.post("/api/file/", status_code=200) # upload file as multipart/form-data
async def post_file(response: Response, file: UploadFile = File(...)):
    try:
        print(f"response: {response}")
        print(f"file: {file}")
        print(f"file.file: {file.file}")
        print(f"filename: {file.filename}")
        print(f"file.content_type: {file.content_type}")
        print(f"file._in_memory: {file._in_memory}")
        print(f"file.spool_max_size: {file.spool_max_size / 1000000} MB")
        # file_data = file.file.read() # can only be read once!
        # print(f"file.file.read(): {file_data}")
        # print(f"file.size {len(file_data) / 1000000} Mb")

        match file.content_type:
            case "text/csv" | "application/vnd.ms-excel":
                ingestor = IngestCSV(file)
                response = ingestor.save_locally()
                data_dict, data_description = ingestor.describe_data()
                # save data and descriptions to database
                response["data_dict"] = data_dict
                response["data_description"] = data_description
                response["mongodb"] = await create_file(file, data_description, data_dict)
                # print(response)
            case "image/jpeg" | "image/bmp" | "image/png":
                # IngestImage(file)
                response.status_code = status.HTTP_406_NOT_ACCEPTABLE
                response = {"info": f"support for '{file.content_type}' file mimetype uploads is coming soon"}
                print(response)
            case _:
                response.status_code = status.HTTP_404_NOT_FOUND
                response = {"info": f"'{file.content_type}' file mimetype uploads is not yet supported"}
                print(response)

        return response
    except:
        print(traceback.format_exc())
        raise HTTPException(400, traceback.format_exc())

@app.put("/api/file/{name}/", response_model=models.File)
async def put_file(name: str, file: UploadFile = File(...)):
    response = await update_file(name, file)
    if response:
        return response
    raise HTTPException(404, f"There is no file with the name {name}")

@app.delete("/api/file/{name}")
async def delete_file(name):
    response = await remove_file(name)
    if response:
        return "Successfully deleted file"
    raise HTTPException(404, f"There is no file with the name {name}")


"""
TODO: Dataset CRUD operations
"""
@app.get("/api/dataset/{name}", response_model=models.Dataset)
async def get_dataset_by_name(name):
    response = await fetch_one_file(name)
    if response:
        return response
    raise HTTPException(404, f"There is no file with the name {name}")

@app.get("/api/dataset")
async def get_datasets():
    response = await fetch_all_files()
    return response

@app.post("/api/dataset/", status_code=200) # upload file as multipart/form-data
async def post_dataset(response: Response, dataset: UploadFile = File(...)):
    try:
        print(f"file: {file}")
        print(f"file.file: {file.file}")
        print(f"filename: {file.filename}")
        print(f"file.content_type: {file.content_type}")
        print(f"file._in_memory: {file._in_memory}")
        print(f"file.spool_max_size: {file.spool_max_size / 1000000} MB")
        # file_data = file.file.read() # can only be read once!
        # print(f"file.file.read(): {file_data}")
        # print(f"file.size {len(file_data) / 1000000} Mb")

        match file.content_type:
            case "text/csv" | "application/vnd.ms-excel":
                ingestor = IngestCSV(file)
                response = ingestor.save_locally()
                data_dict, data_description = ingestor.describe_data()
                # save data and descriptions to database
                response["data_dict"] = data_dict
                response["data_description"] = data_description
                response["mongodb"] = await create_file(file, data_description, data_dict)
                # print(response)
            case "image/jpeg" | "image/bmp" | "image/png":
                # IngestImage(file)
                response.status_code = status.HTTP_406_NOT_ACCEPTABLE
                response = {"info": f"support for '{file.content_type}' file mimetype uploads is coming soon"}
                print(response)
            case _:
                response.status_code = status.HTTP_404_NOT_FOUND
                response = {"info": f"'{file.content_type}' file mimetype uploads is not yet supported"}
                print(response)

        return response
    except:
        print(traceback.format_exc())
        raise HTTPException(400, traceback.format_exc())

@app.put("/api/datset/{name}/", response_model=models.Dataset)
async def put_dataset(name: str, dataset: UploadFile = File(...)):
    response = await update_file(name, file)
    if response:
        return response
    raise HTTPException(404, f"There is no file with the name {name}")

@app.delete("/api/dataset/{name}")
async def delete_dataset(name):
    response = await remove_file(name)
    if response:
        return "Successfully deleted file"
    raise HTTPException(404, f"There is no file with the name {name}")


"""
Example Todo CRUD operations
"""
@app.get("/api/todo")
async def get_todo():
    response = await fetch_all_todos()
    return response

@app.get("/api/todo/{title}", response_model=models.Todo)
async def get_todo_by_title(title):
    response = await fetch_one_todo(title)
    if response:
        return response
    raise HTTPException(404, f"There is no todo with the title {title}")

@app.post("/api/todo/", response_model=models.Todo)
async def post_todo(todo: models.Todo):
    response = await create_todo(todo.dict())
    if response:
        return response
    raise HTTPException(400, "Something went wrong")

@app.put("/api/todo/{title}/", response_model=models.Todo)
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
