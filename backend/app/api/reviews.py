from bson import ObjectId
from fastapi import APIRouter
from app.models.review import Review
from app.db.database import get_collection

router = APIRouter()


@router.get("/{coffee_shop_id}", response_model=list[Review])
async def get_reviews(coffee_shop_id: str):
    """
    Get reviews for a specific coffee shop.
    Args:
        coffee_shop_id (str): The ID of the coffee shop.
    Returns:
        list[Review]: A list of reviews for the coffee shop.
    """
    reviews_collection = get_collection("reviews")
    id_serial = ObjectId(coffee_shop_id)
    reviews = [
        Review(**review)
        for review in reviews_collection.find({"coffee_shop_id": id_serial})
    ]
    return reviews
