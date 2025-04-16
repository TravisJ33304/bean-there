from fastapi import APIRouter
from app.models.user import UserResponse, UserCreate

router = APIRouter()


@router.post("/", response_model=UserResponse)
async def create_user(user: UserCreate):
    pass


@router.get("/{user_id}", response_model=UserResponse)
async def get_user(user_id: str):
    pass


@router.get("/", response_model=list[UserResponse])
async def list_users():
    pass
