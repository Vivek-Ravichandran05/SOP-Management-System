from fastapi import FastAPI
from database import engine,Base
from Models import sop_model,user_model
from Routers import sop_router,user_router

app = FastAPI()

Base.metadata.create_all(bind=engine)

app.include_router(sop_router.router)
app.include_router(user_router.router)