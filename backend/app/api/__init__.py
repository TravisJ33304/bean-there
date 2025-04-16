# backend/app/api/__init__.py

from fastapi import APIRouter

router = APIRouter()

from . import coffee_shops, reviews, users

router.include_router(
    coffee_shops.router, prefix="/coffee_shops", tags=["coffee_shops"]
)
router.include_router(reviews.router, prefix="/reviews", tags=["reviews"])
router.include_router(users.router, prefix="/users", tags=["users"])
