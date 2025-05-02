from bson import ObjectId
from fastapi import APIRouter, HTTPException, Query
from typing import List, Optional
from app.db.database import get_collection
from app.models.coffee_shop import CoffeeShop

router = APIRouter()


@router.get("/", response_model=list[CoffeeShop])
async def get_coffee_shops(
    features: Optional[List[str]] = Query(None),
    city: Optional[str] = None,
    state: Optional[str] = None,
    min_rating: Optional[float] = None,
    max_rating: Optional[float] = None,
    sort_by: Optional[str] = None,
    sort_order: Optional[str] = "desc",
):
    """
    Get a list of coffee shops with filtering options.

    Args:
        features (List[str], optional): List of features to filter by.
        city (str, optional): City to filter by.
        state (str, optional): State to filter by.
        min_rating (float, optional): Minimum rating to filter by.
        max_rating (float, optional): Maximum rating to filter by.
        sort_by (str, optional): Field to sort by (name, rating, review_count).
        sort_order (str, optional): Sort order (asc, desc).

    Returns:
        list[CoffeeShop]: A filtered and sorted list of coffee shops.
    """
    coffee_shops_collection = get_collection("coffee_shops")

    query = {}

    if features and len(features) > 0:
        query["features"] = {"$all": features}

    location_conditions = {}
    if city:
        location_conditions["location.city"] = {"$regex": city, "$options": "i"}
    if state:
        location_conditions["location.state"] = {"$regex": state, "$options": "i"}
    if location_conditions:
        query.update(location_conditions)

    rating_conditions = {}
    if min_rating is not None:
        rating_conditions["$gte"] = min_rating
    if max_rating is not None:
        rating_conditions["$lte"] = max_rating
    if rating_conditions:
        query["rating"] = rating_conditions

    sort_params = []
    if sort_by:
        sort_direction = -1 if sort_order.lower() == "desc" else 1
        if sort_by == "name":
            sort_params.append(("name", sort_direction))
        elif sort_by == "rating":
            sort_params.append(("rating", sort_direction))
        elif sort_by == "review_count":
            sort_params.append(("review_count", sort_direction))

    cursor = coffee_shops_collection.find(query)

    if sort_params:
        cursor = cursor.sort(sort_params)

    coffee_shops = [CoffeeShop(**coffee_shop) for coffee_shop in cursor]
    return coffee_shops


@router.get("/{coffee_shop_id}", response_model=CoffeeShop)
async def get_coffee_shop(coffee_shop_id: str):
    """
    Get coffee shop details by coffee shop ID.
    Args:
        coffee_shop_id (str): The ID of the coffee shop to retrieve.
    Returns:
        CoffeeShop: The coffee shop data.
    Raises:
        HTTPException: If the coffee shop is not found.
    """
    coffee_shops_collection = get_collection("coffee_shops")
    id_serial = ObjectId(coffee_shop_id)
    coffee_shop = coffee_shops_collection.find_one({"_id": id_serial})
    if not coffee_shop:
        raise HTTPException(status_code=404, detail="Coffee shop not found")
    return coffee_shop
