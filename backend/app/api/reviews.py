from bson import ObjectId
from fastapi import APIRouter, HTTPException
from app.models.review import Review, ReviewCreate
from app.db.database import get_collection

router = APIRouter()


@router.post("/", response_model=Review)
async def create_review(review: ReviewCreate):
    """
    Create a new review for a coffee shop.
    Args:
        review (ReviewCreate): The review data to create.
    Returns:
        Review: The created review data.
    """
    shops_collection = get_collection("coffee_shops")
    coffee_shop_id = review.coffee_shop_id
    coffee_shop = shops_collection.find_one({"_id": ObjectId(coffee_shop_id)})
    if not coffee_shop:
        raise HTTPException(status_code=404, detail="Coffee shop not found")
    reviews_collection = get_collection("reviews")
    review_data = review.model_dump()
    review_data["coffee_shop_name"] = coffee_shop["name"]
    review_data["coffee_shop_id"] = ObjectId(coffee_shop_id)
    result = reviews_collection.insert_one(review_data)
    review_data["_id"] = str(result.inserted_id)
    return Review(**review_data)


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
        for review in reviews_collection.find({"coffee_shop_id": id_serial}, limit=0)
    ]
    return reviews
