from typing import Annotated, Optional
from pydantic import BaseModel, BeforeValidator, Field


PyObjectId = Annotated[str, BeforeValidator(str)]


class Review(BaseModel):
    review_id: Optional[PyObjectId] = Field(default=None, alias="_id")
    coffee_shop_id: Optional[PyObjectId] = Field(default=None, alias="coffee_shop_id")
    coffee_shop_name: str = Field(...)
    review_text: str = Field(...)
    num_rating: float = Field(...)


class ReviewCreate(BaseModel):
    coffee_shop_id: Optional[PyObjectId] = Field(default=None, alias="coffee_shop_id")
    review_text: str = Field(...)
    num_rating: float = Field(...)
