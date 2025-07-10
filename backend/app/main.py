from fastapi import FastAPI
import uvicorn
from app.db.database import Base,engine
from app.routers import expenses

Base.metadata.create_all(bind=engine)

app = FastAPI(title="Expense Tracker",description="Track your expenses")

app.include_router(expenses.router)

@app.get("/")
def read_root():
    return {"message": "Hello, World!"}

if __name__ == "__main__":
    uvicorn.run(app,host="0.0.0.0",port=8000)