from pydantic import BaseModel

class UserCreate(BaseModel):
    name:str
    mail:str

class UserResponse(BaseModel):
    id:str

    class Config:
        from_attributes = True