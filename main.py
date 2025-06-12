from fastapi import FastAPI
from calc.matrix import det
from schemas import MatrixInput
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

app = FastAPI()

app.mount("/static", StaticFiles(directory=".", html=True), name="static")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/items")
def read_item(data : MatrixInput):
    return {"det": det(data.size, data.nums)}