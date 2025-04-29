from typing import Annotated, Optional
from pydantic import BaseModel, BeforeValidator, Field

PyObjectId = Annotated[str, BeforeValidator(str)]


class User(BaseModel):
    user_id: Optional[PyObjectId] = Field(default=None, alias="_id")
    username: str = Field(...)
    password: str = Field(...)
    location: dict = Field(...)
    preferences: list[str] = Field(...)


class UserResponse(BaseModel):
    user_id: Optional[PyObjectId] = Field(default=None, alias="_id")
    username: str = Field(...)
    location: dict = Field(...)
    preferences: list[str] = Field(...)


class UserCreate(BaseModel):
    username: str = Field(...)
    password: str = Field(...)
    location: dict = Field(...)
    preferences: list[str] = Field(...)
