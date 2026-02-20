from passlib.context import CryptContext
from jose import JWTError,jwt
from datetime import datetime,timedelta,timezone
from dotenv import load_dotenv
import os

load_dotenv()

SECRET_CODE = os.getenv("SECRET_CODE")
ALGORITHM = os.getenv("ALGORITHM")
ACCESS_TOKEN_EXPIRES_MINUTES = int(os.getenv("ACCESS_TOKEN_EXPIRES_MINUTES"))

pwd_context = CryptContext(schemes=["bcrypt"],deprecated="auto")

def hash_password(password:str):
    return pwd_context.hash(password[:72])

def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password,hashed_password)

def create_access_token(data:dict):
    to_encode = data.copy()
    expire = datetime.now(timezone.utc) + timedelta(minutes=ACCESS_TOKEN_EXPIRES_MINUTES)
    to_encode.update({"exp":expire})
    return jwt.encode(to_encode,SECRET_CODE,algorithm=ALGORITHM)