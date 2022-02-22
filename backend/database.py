import motor.motor_asyncio
from fastapi.encoders import jsonable_encoder

from models import Todo, File

try:
    # query os.env for DB_URI conn_str
    conn_str = "mongodb+srv://opt:ReWmJnCv2cEL409F@cluster0.qwahq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority" #'mongodb://localhost:27017/'
    client = motor.motor_asyncio.AsyncIOMotorClient(conn_str, serverSelectionTimeoutMS=5000)
    database = client.springmatter_dev # if this database is not found, it will be created
    collection = database.proof_of_concept # if this collection is not found, it will be created
except Exception as e:
    raise(e)

async def fetch_one_todo(title):
    document = await collection.find_one({"title": title})
    return document

async def fetch_all_todos():
    todos = []
    cursor = collection.find({})
    async for document in cursor:
        todos.append(Todo(**document))
    return todos

async def create_todo(todo):
    document = todo
    print(type(document))
    result = await collection.insert_one(document)
    print(f"result: {result}")
    return document

async def update_todo(title, desc):
    await collection.update_one({"title": title}, {"$set": {"description": desc}})
    document = await collection.find_one({"title": title})
    return document

async def remove_todo(title):
    await collection.delete_one({"title": title})
    return True

async def create_file(file, data_description, data_dict):
    collection = database.files # if this collection is not found, it will be created

    document = {
        "filename": file.filename,
        "handle:": file.filename[:-4],
        "mimetype": file.content_type,
        "size": len(file.file.read()),
        "url": f"https://localhost:8000/api/file/{file.filename}",
        # "data_description": data_description,
        # "data_dict": data_dict, # TODO: dynamic classes
    }

    r1 = await collection.insert_one(document)
    print(f"create_file: {r1}")

    async def create_data_description(descriptors):
        collection = database.descriptors
        document = descriptors
        result = await collection.insert_one(document)
        return result
    
    async def create_data(data):
        collection = database.data
        document = data
        result = await collection.insert_many(document)
        return result

    for description in data_description:
        print(f"data_description: {description.dict()}")
        r2 = await create_data_description(description.dict())
        print(f"create_data_description: {r2}")

    print(f"data_dict: {data_dict}")
    r3 = await create_data(jsonable_encoder(data_dict))
    print(f"create_data: {r3}")

    return "OK" # document

async def fetch_all_files():
    files = []
    cursor = collection.find({})
    async for document in cursor:
        files.append(File(**document))
    return files