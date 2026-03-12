from fastapi import APIRouter,HTTPException,Depends
from sqlalchemy.orm import Session
from datetime import datetime,timezone
import uuid

from database import get_db
from Schemas.sop_schema import SOPCreate,SOPResponse,SOPUpdate,SOPDetailResponse
from Models.sop_model import DBSOP
from Models.user_model import User

from utils.dependencies import get_current_user

router = APIRouter(prefix="/sops",tags=["SOP"])

@router.post("/",status_code=201,response_model=SOPResponse)
def create_sop(sop:SOPCreate, db:Session=Depends(get_db),current_user:User = Depends(get_current_user)):

    new_sop = DBSOP(
        title=sop.title,
        category=sop.category,
        description=sop.description,
        content=sop.content,
        version=sop.version,
        user_id= current_user.id,
        created_at=datetime.now(timezone.utc),
        updated_at=datetime.now(timezone.utc)
    )

    db.add(new_sop)
    db.commit()
    db.refresh(new_sop)

    return new_sop

@router.get("/",response_model=list[SOPDetailResponse])
def get_all_sops(skip:int = 0,limit:int = 10,search:str|None=None,db: Session = Depends(get_db),current_user:User = Depends(get_current_user)):
    
    data = db.query(DBSOP).filter(DBSOP.user_id == current_user.id)

    if search:
        data = data.filter(DBSOP.title.ilike(f"%{search}%"))

    file = data.offset(skip).limit(limit).all()

    return file

@router.get("/count")
def get_sop_count(db:Session=Depends(get_db),current_user:User = Depends(get_current_user)):
    count = db.query(DBSOP).filter(DBSOP.user_id == current_user.id).count()

    return {"Total" : count}

@router.get("/{sop_id}",response_model=SOPDetailResponse)
def get_sop(sop_id:str,db: Session = Depends(get_db),current_user:User = Depends(get_current_user)):

    data = db.query(DBSOP).filter(DBSOP.id == sop_id,DBSOP.user_id == current_user.id).first()

    if not data:
        raise HTTPException(status_code=404,detail="SOP not found")
    
    return data

@router.patch("/{sop_id}",response_model=SOPDetailResponse)
def update_sop(sop_id:str,updated_sop:SOPUpdate,db: Session = Depends(get_db),current_user:User = Depends(get_current_user)):
    data = db.query(DBSOP).filter(DBSOP.id == sop_id,DBSOP.user_id == current_user.id).first()

    if not data:
        raise HTTPException(status_code=404,detail="SOP not found")

    for key,value in updated_sop.model_dump(exclude_unset=True).items():
        setattr(data,key,value)

    data.updated_at = datetime.now(timezone.utc)

    db.commit()
    db.refresh(data)

    return data

@router.delete("/{sop_id}")
def delete_sop(sop_id:str,db:Session=Depends(get_db),current_user:User = Depends(get_current_user)):
    data = db.query(DBSOP).filter(DBSOP.id == sop_id,DBSOP.user_id == current_user.id).first()

    if not data:
        raise HTTPException(status_code=404,detail="SOP not found")
    
    db.delete(data)
    db.commit()

    return {"Message":"SOP deleted successfully"}
