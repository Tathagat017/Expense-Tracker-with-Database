from fastapi import APIRouter,Depends,HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.models.expense import Expense
from app.schemas.expense import ExpenseCreate,ExpenseUpdate,ExpenseOut
from app.db.deps import get_db
from fastapi import Query
from datetime import datetime
router = APIRouter(prefix="/expenses",tags=["expenses"])

@router.get("/",response_model=List[ExpenseOut])
def get_expenses(db:Session=Depends(get_db)):
    return db.query(Expense).all()

@router.post("/",response_model=ExpenseOut)
def create_expense(expense:ExpenseCreate,db:Session=Depends(get_db)):
    new_expense = Expense(**expense.model_dump())
    db.add(new_expense)
    db.commit()
    db.refresh(new_expense)
    return new_expense

@router.put("/{expense_id}",response_model=ExpenseOut)
def update_expense(expense_id:int,expense:ExpenseUpdate,db:Session=Depends(get_db)):
    db_expense = db.query(Expense).filter(Expense.id==expense_id).first()
    if not db_expense:
        raise HTTPException(status_code=404,detail="Expense not found")
    for field,value in expense.model_dump().items():
        setattr(db_expense,field,value)
    db.commit()
    db.refresh(db_expense)
    return db_expense

@router.delete("/{expense_id}",status_code=204)
def delete_expense(expense_id:int,db:Session=Depends(get_db)):
    db_expense = db.query(Expense).filter(Expense.id==expense_id).first()
    if not db_expense:
        raise HTTPException(status_code=404,detail="Expense not found")
    db.delete(db_expense)
    db.commit()
    return {"message":"Expense deleted successfully"}

@router.get("/category/{category}", response_model=List[ExpenseOut])
def get_by_category(category: str, db: Session = Depends(get_db)):
    return db.query(Expense).filter(Expense.category == category).all()

@router.get("/total")
def get_totals(db: Session = Depends(get_db)):
    expenses = db.query(Expense).all()
    total = sum(e.amount for e in expenses)
    breakdown = {}

    for e in expenses:
        breakdown[e.category] = breakdown.get(e.category, 0) + e.amount

    return {
        "total": round(total, 2),
        "breakdown": {k: round(v, 2) for k, v in breakdown.items()}
    }

@router.get("/filter", response_model=List[ExpenseOut])
def filter_by_date(
    start_date: str = Query(..., description="YYYY-MM-DD"),
    end_date: str = Query(..., description="YYYY-MM-DD"),
    db: Session = Depends(get_db)
):
    try:
        start = datetime.strptime(start_date, "%Y-%m-%d")
        end = datetime.strptime(end_date, "%Y-%m-%d")
    except ValueError:
        raise HTTPException(status_code=400, detail="Invalid date format (use YYYY-MM-DD)")

    return db.query(Expense).filter(Expense.date.between(start, end)).all()
