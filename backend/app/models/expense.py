from sqlalchemy import Column,Integer,String,Float, DateTime
from datetime import datetime
from app.db.database import Base

class Expense(Base):
    __tablename__ = "expenses"
    id = Column(Integer,primary_key=True,index=True)
    amount = Column(Float,nullable=False)
    description = Column(String,nullable=True)
    category = Column(String,nullable=True)
    date=Column(DateTime,default=datetime.utcnow)