from sqlalchemy import Column, Integer, String, Float
from database import Base


class User(Base):

    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    email = Column(String, unique=True)
    password = Column(String)


class Expense(Base):

    __tablename__ = "expenses"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer)
    title = Column(String)
    category = Column(String)
    amount = Column(Float)


class Receipt(Base):

    __tablename__ = "receipts"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer)
    file = Column(String)
    merchant = Column(String, default="")
    amount = Column(Float, default=0)
    date = Column(String, default="")
    status = Column(String, default="processing")


class Group(Base):

    __tablename__ = "groups"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    created_by = Column(Integer)


class GroupMember(Base):

    __tablename__ = "group_members"

    id = Column(Integer, primary_key=True, index=True)
    group_id = Column(Integer)
    user_id = Column(Integer)


class GroupExpense(Base):

    __tablename__ = "group_expenses"

    id = Column(Integer, primary_key=True, index=True)
    group_id = Column(Integer)
    paid_by = Column(Integer)
    title = Column(String)
    amount = Column(Float)
    settled = Column(Integer, default=0)


class Budget(Base):

    __tablename__ = "budgets"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer)
    category = Column(String)
    limit = Column(Float)
    month = Column(String)
