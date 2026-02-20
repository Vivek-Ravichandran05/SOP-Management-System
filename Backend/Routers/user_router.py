from fastapi import APIRouter,Depends,HTTPException
from Schemas.user_schema import UserCreate,UserResponse,UserLogin
from database import get_db
from sqlalchemy.orm import Session
from Models.user_model import User
from utils.security import hash_password,verify_password,create_access_token

router = APIRouter(prefix="/user",tags=["Users"])

@router.post("/register",response_model=UserResponse)
def register(user:UserCreate,db:Session=Depends(get_db)):
    existing = db.query(User).filter(User.mail == user.mail).first()
    if existing:
        raise HTTPException(status_code=400,detail="Email already exists")
    
    new_user = User(
        name = user.name,
        mail = user.mail,
        password = hash_password(user.password)
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return new_user

@router.post("/login")
def login(user: UserLogin,db:Session=Depends(get_db)):

    db_user = db.query(User).filter(User.mail == user.mail).first()

    if not db_user:
        raise HTTPException(status_code=400,detail="Invalid Credentials")
    
    if not verify_password(user.password,db_user.password):
        raise HTTPException(status_code=400,detail="Invalid Credentials")
    
    token = create_access_token({"sub":str(db_user.id)})

    return {"access_token":token,"token_type":"bearer"}