# Pydantic allows auto creation of JSON Schemas from models
from pydantic import BaseModel

class Todo(BaseModel):
    title: str
    description: str

class DataDescriptor(BaseModel):
    # dataset_id: str
    name: str
    units: str
    description: str
    data_type: str
    examples: str

class File(BaseModel):
    filename: str
    handle: str
    mimetype: str
    # originalFile: Dict[str, str]
    # originalPath: str
    size: int
    # source: str
    # status: str
    # uploadId: str
    url: str
    # data_description: list = [DataDescriptor]
    # data_dict: # TODO: dynamic classes
