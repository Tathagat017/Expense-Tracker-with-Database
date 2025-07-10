from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
from app.db.database import Base,engine
from app.routers import expenses

Base.metadata.create_all(bind=engine)

app = FastAPI(title="Expense Tracker",description="Track your expenses")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(expenses.router)

@app.get("/")
def read_root():
    return {"message": "Hello, World!"}

if __name__ == "__main__":
    uvicorn.run(app,host="0.0.0.0",port=8000)