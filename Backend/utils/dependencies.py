from fastapi import Depends,HTTPException,status
from fastapi.security import OAuth2PasswordBearer
from jose import JWTError,jwt
from sqlalchemy.orm import Session

from database import get_db
from Models.user_model import User
from utils.security import SECRET_CODE,ALGORITHM

OAuth2_scheme = OAuth2PasswordBearer(tokenUrl="/user/login")

def get_current_user(token:str = Depends(OAuth2_scheme),db:Session=Depends(get_db)):

    credential_exeception = HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,detail="Could not validate Credentials")

    try:
        payload = jwt.decode(token,SECRET_CODE,algorithms=[ALGORITHM])
        user_id = payload.get("sub")

        if user_id is None:
            raise credential_exeception
        
    except JWTError:
        raise credential_exeception
    
    user = db.query(User).filter(User.id == user_id).first()

    if user is None:
        raise credential_exeception
    
    return user