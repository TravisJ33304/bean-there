from pymongo import MongoClient
from app.core.config import MONGODB_URI, DB_NAME

client = None
db = None


def get_database():
    """
    Get the database instance
    Returns:
        Database: The database instance.
    """
    global client, db, config
    if db is None:
        mongo_uri = MONGODB_URI
        client = MongoClient(mongo_uri)
        db_name = DB_NAME
        db = client[db_name]
    return db


def get_collection(collection_name: str):
    """
    Get a specific collection from the database
    Args:
        collection_name (str): The name of the collection to retrieve.
    Returns:
        Collection: The collection instance.
    """
    database = get_database()
    return database[collection_name]


def close_database_connection():
    """
    Close the database connection
    """
    global client
    if client is not None:
        client.close()
        client = None
