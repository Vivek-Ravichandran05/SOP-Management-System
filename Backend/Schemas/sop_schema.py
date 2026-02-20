from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class SOPCreate(BaseModel):
    title:str
    category:str
    description:Optional[str]=None
    content:str
    version:str

class SOPUpdate(BaseModel):
    title:Optional[str]=None
    category:Optional[str]=None
    description:Optional[str]=None
    content:Optional[str]=None
    version:Optional[str]=None

class SOPResponse(BaseModel):
    id:str
    title:str
    created_at:datetime
    updated_at:datetime

    class Config:
        from_attributes = True

class SOPDetailResponse(BaseModel):
    id:str
    title:str
    category:str
    description:Optional[str]
    content:str
    version:str
    created_at:datetime
    updated_at:datetime

