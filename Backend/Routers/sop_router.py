from fastapi import APIRouter,HTTPException,Depends
from sqlalchemy.orm import Session
from datetime import datetime,timezone
import uuid

from database import get_db
from Schemas.sop_schema import SOPCreate,SOPResponse
from Models.sop_model import DBSOP
from Models.user_model import User

router = APIRouter(prefix="/sops",tags=["SOP"])

@router.post("/",status_code=201,response_model=SOPResponse)
def create_sop(sop:SOPCreate, db:Session=Depends(get_db)):

    new_sop = DBSOP(
        id=str(uuid.uuid4()),
        title=sop.title,
        category=sop.category,
        description=sop.description,
        content=sop.content,
        version=sop.version,
        user_id=sop.user_id,
        created_at=datetime.now(timezone.utc),
        updated_at=datetime.now(timezone.utc)
    )

    db.add(new_sop)
    db.commit()
    db.refresh(new_sop)

    return new_sop

@router.get("/",response_model=list[SOPResponse])
def get_all_sops(db: Session = Depends(get_db)):
    return db.query(DBSOP).all()

@router.get("/{sop_id}",response_model=SOPResponse)
def get_sop(sop_id:str,db: Session = Depends(get_db)):
    data = db.query(DBSOP).filter(DBSOP.id == sop_id).first()

    if not data:
        raise HTTPException(status_code=404,detail="SOP not found")
    
    return data

@router.put("/{sop_id}",response_model=SOPResponse)
def update_sop(sop_id:str,updated_sop:SOPCreate,db: Session = Depends(get_db)):
    data = db.query(DBSOP).filter(DBSOP.id == sop_id).first()

    if not data:
        raise HTTPException(status_code=404,detail="SOP not found")
    
    data.title = updated_sop.title
    data.category = updated_sop.category
    data.description = updated_sop.description
    data.content = updated_sop.content
    data.version = updated_sop.version
    data.updated_at = datetime.now(timezone.utc)

    db.commit()
    db.refresh(data)

    return data

@router.delete("/{sop_id}")
def delete_sop(sop_id:str,db:Session=Depends(get_db)):
    data = db.query(DBSOP).filter(DBSOP.id == sop_id).first()

    if not data:
        raise HTTPException(status_code=404,detail="SOP not found")
    
    db.delete(data)
    db.commit()

    return {"Message":"SOP deleted successfully"}

@router.get("/user/{user_id}",response_model=SOPResponse)
def get_sop_by_user(user_id:str,db:Session=Depends(get_db)):
    user = db.query(User).filter(User.id == user.id).first()

    if not user:
        raise HTTPException(status_code=404,detail="User not found")
    
    return db.query(DBSOP).filter(DBSOP.user_id == user.id).all()