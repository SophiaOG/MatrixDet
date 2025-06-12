from pydantic import BaseModel
from typing import List

class MatrixInput(BaseModel):
    size : int
    nums : List[List[int]]