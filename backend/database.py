import motor.motor_asyncio
from model import Todo

try:
    # query os.env for DB_URI conn_str
    conn_str = "mongodb+srv://opt:ReWmJnCv2cEL409F@cluster0.qwahq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority" #'mongodb://localhost:27017/'
    client = motor.motor_asyncio.AsyncIOMotorClient(conn_str, serverSelectionTimeoutMS=5000)
    database = client.TodoList
    collection = database.todo
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
    result = await collection.insert_one(document)
    return document

async def update_todo(title, desc):
    await collection.update_one({"title": title}, {"$set": {"description": desc}})
    document = await collection.find_one({"title": title})
    return document

async def remove_todo(title):
    await collection.delete_one({"title": title})
    return True