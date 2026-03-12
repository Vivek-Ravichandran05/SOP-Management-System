from fastapi import FastAPI
from database import engine,Base
from Models import sop_model,user_model
from Routers import sop_router,user_router
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import os

load_dotenv()
origins = os.getenv("CORS_ORIGINS","").split(",")


app = FastAPI()

Base.metadata.create_all(bind=engine)

app.include_router(sop_router.router)
app.include_router(user_router.router)

app.add_middleware(CORSMiddleware,
               allow_origins=origins,
               allow_credentials=True,
               allow_methods=["*"],
               allow_headers=["*"])