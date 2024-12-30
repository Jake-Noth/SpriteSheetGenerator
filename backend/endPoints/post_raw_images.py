from fastapi import APIRouter, File, Form, UploadFile
from BGR_worker import process_UUID
from typing import List
import os

post_router = APIRouter()

@post_router.post("/process")
async def recieve_images(
    UUID: str = Form(...),
    frames: List[UploadFile] = File(...)
):
    
    base_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))  
    UUID_dir = os.path.join(base_dir, 'UUIDs', UUID)
    input_dir = os.path.join(UUID_dir, 'input')
    output_dir = os.path.join(UUID_dir, 'output')

    os.makedirs(UUID_dir, exist_ok=True)
    os.makedirs(input_dir, exist_ok=True)
    os.makedirs(output_dir, exist_ok=True)

    for frame in frames:
        file_location = os.path.join(input_dir, frame.filename)
        with open(file_location, "wb") as f:
            f.write(await frame.read())

    process_UUID(UUID)

    

    return {"message": f"Successfully uploaded {len(frames)} frames for UUID: {UUID}"}
