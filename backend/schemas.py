from pydantic import BaseModel


class UserCreate(BaseModel):

    name: str
    email: str
    password: str


class UserLogin(BaseModel):

    email: str
    password: str


class ExpenseCreate(BaseModel):

    title: str
    category: str
    amount: float


class BudgetCreate(BaseModel):

    category: str
    limit: float
    month: str


class GroupCreate(BaseModel):

    name: str


class GroupExpenseCreate(BaseModel):

    title: str
    amount: float


class ReceiptCreate(BaseModel):

    merchant: str
    amount: float
    date: str
