import multiprocessing
from BGR_worker import start_worker
from fastapi import FastAPI
from endPoints.post_raw_images import post_router
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import os

app = FastAPI()


# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust as necessary to restrict origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(post_router)

if __name__ == '__main__':

    uvicorn.run(app, host="0.0.0.0", port=8000)