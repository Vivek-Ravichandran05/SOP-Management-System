from fastapi import FastAPI,HTTPException
from models import SOP,SOPResponse
from datetime import datetime,timezone
import uuid

app = FastAPI()

sop_storage = []

@app.post("/sops",status_code=201)
def create_sop(sop:SOP):
    sop_dict = sop.model_dump()

    sop_dict["id"] = str(uuid.uuid4())
    sop_dict['created_at'] = datetime.now(timezone.utc).isoformat()
    sop_dict["updated_at"] = datetime.now(timezone.utc).isoformat()

    sop_storage.append(sop_dict)
    return sop_dict

@app.get("/sops",response_model=list[SOPResponse])
def get_all_sops():
    return sop_storage

@app.get("/sops/{sop_id}",response_model=SOPResponse)
def get_sop_by_id(sop_id:str):
    for sop in sop_storage:
        if sop["id"] == sop_id:
            return sop
        
    raise HTTPException(status_code=404,detail="SOP not found")

@app.delete("/sops/{sop_id}")
def delete_sop(sop_id:str):
    for sop in sop_storage:
        if sop["id"] == sop_id:
            sop_storage.remove(sop)
            return {"message":"SOP deleted successfully"}
        
    raise HTTPException(status_code=404,detail="SOP not found")

@app.put("/sops/{sop_id}",response_model=SOPResponse)
def update_sop(sop_id:str,updated_sop: SOP):
    for sop in sop_storage:
        if sop["id"] == sop_id:

            updated_data = updated_sop.model_dump()

            sop["title"] = updated_data["title"]
            sop["category"] = updated_data["category"]
            sop["description"] = updated_data["description"]
            sop["content"] = updated_data["content"]
            sop["version"] = updated_data["version"]
            sop["author"] = updated_data["author"]

            sop["updated_at"] = datetime.now(timezone.utc).isoformat()

            return sop
        
    raise HTTPException(status_code=404,detail="SOP not found")