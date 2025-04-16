import os
from dotenv import load_dotenv

load_dotenv()

MONGODB_URI = os.getenv("ATLAS_URI")
DB_NAME = os.getenv("DB_NAME")
