from fastapi import APIRouter
from app.models.review import Review

router = APIRouter()


@router.get("/{coffee_shop_id}", response_model=list[Review])
async def get_reviews(coffee_shop_id: str):
    pass
