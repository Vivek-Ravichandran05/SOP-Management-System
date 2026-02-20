from sqlalchemy import Column,String,Text,ForeignKey,DateTime
from sqlalchemy.orm import relationship
from database import Base
import uuid


class DBSOP(Base):
    __tablename__ = "sops"

    id = Column(String,primary_key=True,default=lambda:str(uuid.uuid4()))
    title = Column(String,nullable=False)
    category = Column(String,nullable=False)
    description = Column(Text,nullable=True)
    content = Column(Text,nullable=False)
    version = Column(String,nullable=False)
    user_id = Column(String, ForeignKey("users.id"))
    owner = relationship("User",back_populates="sops")
    created_at = Column(DateTime(timezone=True),nullable=False)
    updated_at = Column(DateTime(timezone=True),nullable=False)