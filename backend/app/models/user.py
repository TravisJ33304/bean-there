from typing import Annotated, Optional
from pydantic import BaseModel, BeforeValidator, Field

PyObjectId = Annotated[str, BeforeValidator(str)]


class User(BaseModel):
    user_id: Optional[PyObjectId] = Field(default=None, alias="_id")
    email: str = Field(...)
    password: str = Field(...)
    name: str = Field(...)
    location: dict = Field(...)
    preferences: list[str] = Field(...)


class UserResponse(BaseModel):
    user_id: Optional[PyObjectId] = Field(default=None, alias="_id")
    email: str = Field(...)
    name: str = Field(...)
    location: dict = Field(...)
    preferences: list[str] = Field(...)


class UserCreate(BaseModel):
    email: str = Field(...)
    password: str = Field(...)
    name: str = Field(...)
    location: dict = Field(...)
    preferences: list[str] = Field(...)
