import motor.motor_asyncio, datetime
from fastapi.encoders import jsonable_encoder

from models import Todo, File

try:
    # query os.env for DB_URI conn_str
    conn_str = "mongodb+srv://opt:ReWmJnCv2cEL409F@cluster0.qwahq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority" #'mongodb://localhost:27017/'
    client = motor.motor_asyncio.AsyncIOMotorClient(conn_str, serverSelectionTimeoutMS=5000)
    database = client.MichAero # if this database is not found, it will be created
    collection = database.Egret # if this collection is not found, it will be created
except Exception as e:
    raise(e)

"""
MongoDB File operations
"""

async def fetch_one_file(name):
    document = await collection.find_one({"name": name})
    return document

async def fetch_all_files():
    files = []
    cursor = collection.find({})
    async for document in cursor:
        files.append(File(**document))
    return files

async def create_file(file, data_description, data_dict):
    collection = database.files # if this collection is not found, it will be created

    document = {
        "timestamp": datetime.datetime.utcnow(),
        "filename": file.filename,
        "handle:": file.filename[:-4],
        "mimetype": file.content_type,
        "size": len(file.file.read()),
        # "url": f"https://localhost:8000/api/file/{file.filename}",
        # "data_description": data_description,
        # "data_dict": data_dict, # TODO: dynamic classes
    }

    r1 = await collection.insert_one(document)
    print(f"create_file: {r1}")

    # TODO: nest files, data_descriptions, and data in each document
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

async def update_file(name, file):
    await collection.update_one({"name": name}, {"$set": {"file": file}})
    document = await collection.find_one({"name": name})
    return document

async def remove_file(name):
    await collection.delete_one({"name": name})
    return True


"""
TODO: MongoDB Dataset operations
"""

async def fetch_one_dataset(name):
    document = await collection.find_one({"name": name})
    return document

async def fetch_all_datasetss():
    files = []
    cursor = collection.find({})
    async for document in cursor:
        files.append(File(**document))
    return files

async def create_dataset(file, data_description, data_dict):
    document = {
        "timestamp": datetime.datetime.utcnow(),
        "filename": file.filename,
        "handle:": file.filename[:-4],
        "mimetype": file.content_type,
        "size": len(file.file.read()),
        # "url": f"https://localhost:8000/api/file/{file.filename}",
        # "data_description": data_description,
        # "data_dict": data_dict, # TODO: dynamic classes
    }

    r1 = await collection.insert_one(document)
    print(f"create_file: {r1}")

    # TODO: nest files, data_descriptions, and data in each document
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

async def update_dataset(name, file):
    await collection.update_one({"name": name}, {"$set": {"file": file}})
    document = await collection.find_one({"name": name})
    return document

async def remove_dataset(name):
    await collection.delete_one({"name": name})
    return True

"""
Example MongoDB Todo operations
"""
async def fetch_one_todo(title):
    collection = database.todos
    document = await collection.find_one({"title": title})
    return document

async def fetch_all_todos():
    todos = []
    collection = database.todos
    cursor = collection.find({})
    async for document in cursor:
        todos.append(Todo(**document))
    return todos

async def create_todo(todo):
    document = todo
    document["timestamp"] = datetime.datetime.utcnow()
    collection = database.todos
    print(type(document))
    result = await collection.insert_one(document)
    print(f"result: {result}")
    return document

async def update_todo(title, desc):
    collection = database.todos
    await collection.update_one({"title": title}, {"$set": {"description": desc}})
    document = await collection.find_one({"title": title})
    return document

async def remove_todo(title):
    collection = database.todos
    await collection.delete_one({"title": title})
    return True