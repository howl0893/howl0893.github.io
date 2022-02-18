# Pydantic allows auto creation of JSON Schemas from models
from pydantic import BaseModel
from typing import Dict

"""
When receiving a POST request to /api/v1/datasets, we need to validate the JSON payload.
    class AnyForm(BaseModel):
    any_param: str
    any_other_param: int = 1

    @classmethod
    def as_form(
        cls,
        any_param: str = Form(...),
        any_other_param: int = Form(1)
    ) -> AnyForm:
        return cls(any_param=any_param, any_other_param=any_other_param)
"""

class Todo(BaseModel):
    title: str
    description: str

class File(BaseModel):
    filename: str
    handle: str
    mimetype: str
    # originalFile: Dict[str, str]
    originalPath: str
    size: int
    source: str
    status: str
    uploadId: str
    url: str

    # @classmethod
    # def as_form()
