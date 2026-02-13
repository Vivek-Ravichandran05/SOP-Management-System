from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class SOP(BaseModel):
    title:str
    category:str
    description:Optional[str]=None
    content:str
    version:str
    author:str
    created_at:Optional[datetime]=None
    updated_at:Optional[datetime]=None

class SOPResponse(BaseModel):
    id:str
    title:str
    created_at:datetime
    updated_at:datetime
