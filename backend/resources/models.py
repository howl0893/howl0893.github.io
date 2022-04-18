# Pydantic allows auto creation of JSON Schemas from models
import datetime
from pydantic import BaseModel

class Todo(BaseModel):
    timestamp: datetime.datetime
    title: str
    description: str

class DataDescription(BaseModel):
    name: str
    data_type: str
    examples: str

class File(BaseModel):
    name: str
    timestamp: datetime.datetime
    size: int
    mimetype: str
    data_descriptions: list[DataDescription] | None = None
    url: str

class Image(BaseModel):
    name: str
    timestamp: datetime.datetime
    mimetype: str
    data: bytes

class Dataset(BaseModel):
    name: str
    timestamp: datetime.datetime
    images: list[Image] | None = None
    files: list[File] # deeply nested

class Project(BaseModel):
    name: str

class Organization(BaseModel):
    name: str
