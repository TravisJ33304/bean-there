from bson import ObjectId
from fastapi import APIRouter, HTTPException
from app.models.user import UserResponse, UserCreate
from app.db.database import get_collection
from app.models.coffee_shop import CoffeeShop

router = APIRouter()


@router.post("/", response_model=UserResponse)
async def create_user(user: UserCreate):
    """
    Create a new user in the database
    Args:
        user (UserCreate): The user data to create.
    Returns:
        UserResponse: The created user data.
    Raises:
        HTTPException: If the username already exists.
    """
    user_collection = get_collection("users")
    user_data = user.model_dump()
    existing_user = user_collection.find_one({"username": user_data["username"]})
    if existing_user:
        raise HTTPException(status_code=400, detail="Username already exists")
    user_collection.insert_one(user_data)
    return UserResponse(**user_data)


@router.get("/check_username/{username}", response_model=bool)
async def check_username(username: str):
    """
    Check if a username is available.
    Args:
        username (str): The username to check.
    Returns:
        bool: True if the username is available, False otherwise.
    """
    user_collection = get_collection("users")
    user = user_collection.find_one({"username": username})
    return user is None


@router.get("/{user_id}", response_model=UserResponse)
async def get_user(user_id: str):
    """
    Get user details by user ID.
    Args:
        user_id (str): The ID of the user to retrieve.
    Returns:
        UserResponse: The user data.
    Raises:
        HTTPException: If the user is not found.
    """
    user_collection = get_collection("users")
    id_serial = ObjectId(user_id)
    user = user_collection.find_one({"_id": id_serial})
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return UserResponse(**user)


@router.get("/get_recommendations/{user_id}", response_model=list[CoffeeShop])
async def get_recommendations(user_id: str):
    """
    Get coffee shop recommendations based on user preferences.
    Args:
        user_id (str): The ID of the user to get recommendations for.
    Returns:
        list[CoffeeShop]: A list of recommended coffee shops.
    Raises:
        HTTPException: If the user is not found.
    """
    user_collection = get_collection("users")
    id_serial = ObjectId(user_id)
    user = user_collection.find_one({"_id": id_serial})
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    preferences = user.get("preferences", [])
    if not preferences:
        return []
    coffee_shop_collection = get_collection("coffee_shops")
    coffee_shops = coffee_shop_collection.find({"features": {"$all": preferences}})
    result = [CoffeeShop(**coffee_shop) for coffee_shop in coffee_shops]
    return result
