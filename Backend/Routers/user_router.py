from fastapi import APIRouter,Depends,HTTPException
from Schemas.user_schema import UserCreate,UserResponse
from database import get_db
from sqlalchemy.orm import Session
from Models.user_model import User


router = APIRouter(prefix="/user",tags=["Users"])

@router.post("/",response_model=UserResponse)
def create_user(user:UserCreate,db:Session=Depends(get_db)):
    existing = db.query(User).filter(User.mail == user.mail).first()
    if existing:
        raise HTTPException(status_code=400,detail="Email already exists")
    
    new_user = User(
        name = user.name,
        mail = user.mail
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return new_user