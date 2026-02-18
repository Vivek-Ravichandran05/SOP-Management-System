from sqlalchemy import Column,String
from sqlalchemy.orm import relationship
from database import Base
import uuid

class User(Base):
    __tablename__ = "users"

    id = Column(String,primary_key=True,default=lambda:str(uuid.uuid4()))
    name = Column(String,nullable=False)
    mail = Column(String,nullable=False,unique=True)

    sops = relationship("DBSOP",back_populates="owner")