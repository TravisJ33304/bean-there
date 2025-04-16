from typing import Annotated, Optional
from pydantic import BaseModel, BeforeValidator, Field


PyObjectId = Annotated[str, BeforeValidator(str)]


class Review(BaseModel):
    review_id: Optional[PyObjectId] = Field(default=None, alias="_id")
    name: str = Field(...)
    review: str = Field(...)
    rating: int = Field(...)
