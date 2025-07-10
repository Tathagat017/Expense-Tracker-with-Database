from pydantic import BaseModel,Field
from typing import Optional
from datetime import datetime
from .category_enum import CategoryEnum

class ExpenseBase(BaseModel):
    amount:float= Field(...,gt=0)
    description:str|None=None
    category:CategoryEnum

class ExpenseCreate(ExpenseBase):
    pass

class ExpenseUpdate(ExpenseBase):
    pass

class ExpenseOut(ExpenseBase):
    id:int
    date:datetime
    class Config:
        orm_mode = True

