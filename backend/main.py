from fastapi import FastAPI, Depends, UploadFile, File, HTTPException
from sqlalchemy.orm import Session
from fastapi.middleware.cors import CORSMiddleware
from datetime import date
import os

import models, schemas
from database import SessionLocal, engine, Base
from auth import hash_password, verify_password, create_token, get_current_user

Base.metadata.create_all(bind=engine)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@app.get("/")
def home():
    return {"message": "Finance backend running 🚀"}


# ----------------------
# SIGNUP
# ----------------------

@app.post("/signup")
def signup(user: schemas.UserCreate, db: Session = Depends(get_db)):
    if db.query(models.User).filter(models.User.email == user.email).first():
        raise HTTPException(status_code=400, detail="Email already registered")

    db_user = models.User(
        name=user.name,
        email=user.email,
        password=hash_password(user.password)
    )

    db.add(db_user)
    db.commit()
    db.refresh(db_user)

    return {
        "message": "account created",
        "user_id": db_user.id
    }


# ----------------------
# LOGIN
# ----------------------

@app.post("/login")
def login(user: schemas.UserLogin, db: Session = Depends(get_db)):
    db_user = db.query(models.User).filter(
        models.User.email == user.email
    ).first()

    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")

    if not verify_password(user.password, db_user.password):
        raise HTTPException(status_code=401, detail="Incorrect password")

    token = create_token({"user_id": db_user.id})

    return {
        "message": "login success",
        "access_token": token,
        "user_id": db_user.id
    }


# ----------------------
# ADD EXPENSE
# ----------------------

@app.post("/expenses")
def add_expense(
    expense: schemas.ExpenseCreate,
    db: Session = Depends(get_db),
    user_id: int = Depends(get_current_user)
):
    new_expense = models.Expense(
        **expense.dict(),
        user_id=user_id,
        date=date.today().isoformat()
    )
    db.add(new_expense)
    db.commit()
    db.refresh(new_expense)
    return new_expense


# ----------------------
# GET EXPENSES
# ----------------------

@app.get("/expenses")
def get_expenses(db: Session = Depends(get_db), user_id: int = Depends(get_current_user)):
    return db.query(models.Expense).filter(
        models.Expense.user_id == user_id
    ).all()


# ----------------------
# DELETE EXPENSE
# ----------------------

@app.delete("/expenses/{expense_id}")
def delete_expense(expense_id: int, db: Session = Depends(get_db), user_id: int = Depends(get_current_user)):
    expense = db.query(models.Expense).filter(
        models.Expense.id == expense_id,
        models.Expense.user_id == user_id
    ).first()

    if not expense:
        raise HTTPException(status_code=404, detail="Expense not found")

    db.delete(expense)
    db.commit()

    return {"message": "deleted"}


# ----------------------
# FORECAST
# ----------------------

@app.get("/forecast")
def forecast(db: Session = Depends(get_db), user_id: int = Depends(get_current_user)):
    expenses = db.query(models.Expense).filter(models.Expense.user_id == user_id).all()
    if not expenses:
        return {"prediction": 0}
    avg = sum(e.amount for e in expenses) / len(expenses)
    return {"prediction": round(avg * 1.08, 2)}


# ----------------------
# AI INSIGHTS
# ----------------------

@app.get("/ai-insights")
def ai_insights(db: Session = Depends(get_db), user_id: int = Depends(get_current_user)):
    expenses = db.query(models.Expense).filter(models.Expense.user_id == user_id).all()
    total = sum(e.amount for e in expenses)
    insights = []

    if total > 50000:
        insights.append("⚠️ High spending detected")

    food = sum(e.amount for e in expenses if e.category.lower() == "food")

    if total > 0 and food / total > 0.35:
        insights.append("🍔 Food spending too high")

    if not insights:
        insights.append("✅ Financial health looks good")

    return {"insights": insights}


# ----------------------
# BUDGETS
# ----------------------

@app.post("/budgets")
def create_budget(
    budget: schemas.BudgetCreate,
    db: Session = Depends(get_db),
    user_id: int = Depends(get_current_user)
):
    b = models.Budget(**budget.dict(), user_id=user_id)
    db.add(b)
    db.commit()
    db.refresh(b)
    return b


@app.get("/budgets")
def get_budgets(db: Session = Depends(get_db), user_id: int = Depends(get_current_user)):
    return db.query(models.Budget).filter(models.Budget.user_id == user_id).all()


@app.delete("/budgets/{budget_id}")
def delete_budget(budget_id: int, db: Session = Depends(get_db), user_id: int = Depends(get_current_user)):
    b = db.query(models.Budget).filter(
        models.Budget.id == budget_id,
        models.Budget.user_id == user_id
    ).first()

    if not b:
        raise HTTPException(status_code=404, detail="Budget not found")

    db.delete(b)
    db.commit()
    return {"message": "deleted"}


# ----------------------
# RECEIPTS
# ----------------------

@app.post("/upload-receipt")
async def upload_receipt(
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
    user_id: int = Depends(get_current_user)
):
    os.makedirs("receipts", exist_ok=True)

    path = f"receipts/{file.filename}"
    with open(path, "wb") as f:
        f.write(await file.read())

    receipt = models.Receipt(
        user_id=user_id,
        file=path,
        merchant=file.filename,
        amount=0,
        date=date.today().isoformat(),
        status="processing"
    )
    db.add(receipt)
    db.commit()
    db.refresh(receipt)
    return receipt


@app.get("/receipts")
def get_receipts(db: Session = Depends(get_db), user_id: int = Depends(get_current_user)):
    return db.query(models.Receipt).filter(models.Receipt.user_id == user_id).all()


@app.delete("/receipts/{receipt_id}")
def delete_receipt(receipt_id: int, db: Session = Depends(get_db), user_id: int = Depends(get_current_user)):
    r = db.query(models.Receipt).filter(
        models.Receipt.id == receipt_id,
        models.Receipt.user_id == user_id
    ).first()

    if not r:
        raise HTTPException(status_code=404, detail="Receipt not found")

    db.delete(r)
    db.commit()
    return {"message": "deleted"}


# ----------------------
# GROUPS
# ----------------------

@app.post("/groups")
def create_group(
    group: schemas.GroupCreate,
    db: Session = Depends(get_db),
    user_id: int = Depends(get_current_user)
):
    # create group
    g = models.Group(name=group.name, created_by=user_id)
    db.add(g)
    db.commit()
    db.refresh(g)

    # add current user as member
    creator_member = models.GroupMember(group_id=g.id, user_id=user_id)
    db.add(creator_member)

    # demo users for splitting
    demo_users_data = [
        {"name": "Rahul", "email": "rahul_demo@financeai.com"},
        {"name": "Priya", "email": "priya_demo@financeai.com"},
        {"name": "Asha", "email": "asha_demo@financeai.com"},
    ]

    demo_user_ids = []

    for demo in demo_users_data:
        existing_user = db.query(models.User).filter(
            models.User.email == demo["email"]
        ).first()

        if not existing_user:
            existing_user = models.User(
                name=demo["name"],
                email=demo["email"],
                password=hash_password("demo123")
            )
            db.add(existing_user)
            db.commit()
            db.refresh(existing_user)

        demo_user_ids.append(existing_user.id)

    # add demo users to this group
    for demo_user_id in demo_user_ids:
        existing_member = db.query(models.GroupMember).filter(
            models.GroupMember.group_id == g.id,
            models.GroupMember.user_id == demo_user_id
        ).first()

        if not existing_member:
            db.add(models.GroupMember(group_id=g.id, user_id=demo_user_id))

    db.commit()

    return {
        "id": g.id,
        "name": g.name,
        "message": "group created"
    }


@app.get("/groups")
def get_groups(db: Session = Depends(get_db), user_id: int = Depends(get_current_user)):
    memberships = db.query(models.GroupMember).filter(
        models.GroupMember.user_id == user_id
    ).all()

    group_ids = [m.group_id for m in memberships]

    if not group_ids:
        return []

    groups = db.query(models.Group).filter(models.Group.id.in_(group_ids)).all()
    result = []

    for g in groups:
        members = db.query(models.GroupMember).filter(
            models.GroupMember.group_id == g.id
        ).count()

        expenses = db.query(models.GroupExpense).filter(
            models.GroupExpense.group_id == g.id
        ).all()

        total = sum(e.amount for e in expenses)
        my_share = total / members if members else 0
        settled = all(e.settled for e in expenses) if expenses else True

        result.append({
            "id": g.id,
            "name": g.name,
            "members": members,
            "totalExpense": total,
            "yourShare": round(my_share, 2),
            "settled": settled
        })

    return result


@app.get("/groups/{group_id}/expenses")
def get_group_expenses(
    group_id: int,
    db: Session = Depends(get_db),
    user_id: int = Depends(get_current_user)
):
    membership = db.query(models.GroupMember).filter(
        models.GroupMember.group_id == group_id,
        models.GroupMember.user_id == user_id
    ).first()

    if not membership:
        raise HTTPException(status_code=403, detail="You are not part of this group")

    expenses = db.query(models.GroupExpense).filter(
        models.GroupExpense.group_id == group_id
    ).all()

    members = db.query(models.GroupMember).filter(
        models.GroupMember.group_id == group_id
    ).count()

    result = []

    for e in expenses:
        payer = db.query(models.User).filter(models.User.id == e.paid_by).first()

        result.append({
            "id": e.id,
            "title": e.title,
            "amount": e.amount,
            "paid_by_name": payer.name if payer else f"User {e.paid_by}",
            "paid_by": e.paid_by,
            "per_person": round(e.amount / members, 2) if members else e.amount,
            "settled": bool(e.settled),
            "members": members
        })

    return result


@app.post("/groups/{group_id}/expenses")
def add_group_expense(
    group_id: int,
    expense: schemas.GroupExpenseCreate,
    db: Session = Depends(get_db),
    user_id: int = Depends(get_current_user)
):
    membership = db.query(models.GroupMember).filter(
        models.GroupMember.group_id == group_id,
        models.GroupMember.user_id == user_id
    ).first()

    if not membership:
        raise HTTPException(status_code=403, detail="You are not part of this group")

    e = models.GroupExpense(
        group_id=group_id,
        paid_by=user_id,
        title=expense.title,
        amount=expense.amount,
        settled=0
    )

    db.add(e)
    db.commit()
    db.refresh(e)

    return {
        "id": e.id,
        "group_id": e.group_id,
        "paid_by": e.paid_by,
        "title": e.title,
        "amount": e.amount,
        "settled": bool(e.settled)
    }


@app.patch("/groups/{group_id}/expenses/{expense_id}/settle")
def settle_expense(
    group_id: int,
    expense_id: int,
    db: Session = Depends(get_db),
    user_id: int = Depends(get_current_user)
):
    membership = db.query(models.GroupMember).filter(
        models.GroupMember.group_id == group_id,
        models.GroupMember.user_id == user_id
    ).first()

    if not membership:
        raise HTTPException(status_code=403, detail="You are not part of this group")

    e = db.query(models.GroupExpense).filter(
        models.GroupExpense.id == expense_id,
        models.GroupExpense.group_id == group_id
    ).first()

    if not e:
        raise HTTPException(status_code=404, detail="Expense not found")

    e.settled = 1
    db.commit()

    return {"message": "settled"}


@app.get("/groups/{group_id}/settlements")
def get_settlements(
    group_id: int,
    db: Session = Depends(get_db),
    user_id: int = Depends(get_current_user)
):
    membership = db.query(models.GroupMember).filter(
        models.GroupMember.group_id == group_id,
        models.GroupMember.user_id == user_id
    ).first()

    if not membership:
        raise HTTPException(status_code=403, detail="You are not part of this group")

    expenses = db.query(models.GroupExpense).filter(
        models.GroupExpense.group_id == group_id
    ).all()

    members = db.query(models.GroupMember).filter(
        models.GroupMember.group_id == group_id
    ).all()

    member_count = len(members)

    if member_count <= 1:
        return []

    settlements = []

    for e in expenses:
        share = round(e.amount / member_count, 2)

        if e.paid_by == user_id:
            for m in members:
                if m.user_id != user_id:
                    member_user = db.query(models.User).filter(
                        models.User.id == m.user_id
                    ).first()

                    settlements.append({
                        "name": member_user.name if member_user else f"User {m.user_id}",
                        "owes": share,
                        "direction": "owes-you",
                        "settled": bool(e.settled)
                    })
        else:
            payer = db.query(models.User).filter(models.User.id == e.paid_by).first()

            settlements.append({
                "name": payer.name if payer else f"User {e.paid_by}",
                "owes": share,
                "direction": "you-owe",
                "settled": bool(e.settled)
            })

    return settlements


# ----------------------
# REPORTS
# ----------------------

@app.get("/reports")
def reports(db: Session = Depends(get_db), user_id: int = Depends(get_current_user)):
    expenses = db.query(models.Expense).filter(models.Expense.user_id == user_id).all()
    total = sum(e.amount for e in expenses)

    category_summary = {}
    for e in expenses:
        category_summary[e.category] = category_summary.get(e.category, 0) + e.amount

    return {
        "total_spending": total,
        "transactions": len(expenses),
        "categories": category_summary
    }


# ----------------------
# USER PROFILE
# ----------------------

@app.get("/user/me")
def get_user(db: Session = Depends(get_db), user_id: int = Depends(get_current_user)):
    return db.query(models.User).filter(
        models.User.id == user_id
    ).first()