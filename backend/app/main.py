from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.coffee_shops import router as coffee_shops_router
from app.api.reviews import router as reviews_router
from app.api.users import router as users_router


app = FastAPI()


# CORS middleware to allow requests from the frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(
    coffee_shops_router, prefix="/api/coffee_shops", tags=["coffee_shops"]
)
app.include_router(reviews_router, prefix="/api/reviews", tags=["reviews"])
app.include_router(users_router, prefix="/api/users", tags=["users"])


@app.get("/")
async def root():
    return {"message": "Welcome to the Bean There API!"}
