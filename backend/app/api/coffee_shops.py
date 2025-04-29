from bson import ObjectId
from fastapi import APIRouter, HTTPException
from app.db.database import get_collection
from app.models.coffee_shop import CoffeeShop

router = APIRouter()


@router.get("/", response_model=list[CoffeeShop])
async def get_coffee_shops():
    """
    Get a list of coffee shops.
    Returns:
        list[CoffeeShop]: A list of coffee shops.
    """
    coffee_shops_collection = get_collection("coffee_shops")
    coffee_shops = [
        CoffeeShop(**coffee_shop)
        for coffee_shop in coffee_shops_collection.find(limit=100)
    ]
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
