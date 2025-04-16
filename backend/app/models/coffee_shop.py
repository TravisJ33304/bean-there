from typing import Annotated, Dict, List, Optional, Any
from pydantic import BaseModel, BeforeValidator, Field


PyObjectId = Annotated[str, BeforeValidator(str)]


class CoffeeShop(BaseModel):
    shop_id: Optional[PyObjectId] = Field(default=None, alias="_id")
    name: str = Field(...)
    location: Dict[str, Any] = Field(...)
    features: List[str] = Field(...)
    rating: float = Field(...)
    review_count: int = Field(...)

    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        schema_extra = {
            "example": {
                "_id": "67fc7a1f8000455dfec4ddae",
                "name": "Mozart's Coffee Roasters",
                "location": {
                    "area": "Riverwest",
                    "address": "701 E Center St",
                    "city": "Milwaukee",
                    "state": "WI",
                    "coordinates": {"lat": 43.069196, "lng": -87.88674},
                },
                "features": [
                    "Free WiFi",
                    "Parking Available",
                    "Food Options",
                    "Friendly Service",
                    "Comfortable Seating",
                    "Tea Selection",
                    "Extended Hours",
                    "Locally Owned",
                ],
                "rating": 4.1,
                "review_count": 100,
            }
        }
