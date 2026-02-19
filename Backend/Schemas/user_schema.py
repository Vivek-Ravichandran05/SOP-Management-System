from pydantic import BaseModel,EmailStr

class UserCreate(BaseModel):
    name:str
    mail:EmailStr
    password:str

class UserLogin(BaseModel):
    mail:EmailStr
    password:str

class UserResponse(BaseModel):
    id:str
    name:str
    mail:EmailStr

    class Config:
        from_attributes = True