"""
MongoDB Helper Utilities
Provides common database operations for models
"""
from bson.objectid import ObjectId
from datetime import datetime
from flask import current_app


def get_db():
    """Get the current database instance"""
    return current_app.db


def insert_one(collection_name: str, document: dict):
    """Insert a single document"""
    db = get_db()
    if not db:
        raise RuntimeError("MongoDB not connected")
    
    document["created_at"] = datetime.utcnow()
    document["updated_at"] = datetime.utcnow()
    
    result = db[collection_name].insert_one(document)
    document["_id"] = result.inserted_id
    return document


def find_one(collection_name: str, query: dict):
    """Find a single document"""
    db = get_db()
    if not db:
        raise RuntimeError("MongoDB not connected")
    return db[collection_name].find_one(query)


def find_many(collection_name: str, query: dict, limit: int = 100, skip: int = 0):
    """Find multiple documents"""
    db = get_db()
    if not db:
        raise RuntimeError("MongoDB not connected")
    return list(db[collection_name].find(query).limit(limit).skip(skip))


def update_one(collection_name: str, query: dict, update_data: dict):
    """Update a single document"""
    db = get_db()
    if not db:
        raise RuntimeError("MongoDB not connected")
    
    update_data["updated_at"] = datetime.utcnow()
    
    result = db[collection_name].update_one(
        query,
        {"$set": update_data}
    )
    return result.matched_count > 0


def delete_one(collection_name: str, query: dict):
    """Delete a single document"""
    db = get_db()
    if not db:
        raise RuntimeError("MongoDB not connected")
    
    result = db[collection_name].delete_one(query)
    return result.deleted_count > 0


def find_by_id(collection_name: str, doc_id: str):
    """Find document by ObjectId"""
    try:
        return find_one(collection_name, {"_id": ObjectId(doc_id)})
    except:
        return None


def object_id_to_str(doc: dict) -> dict:
    """Convert MongoDB ObjectId to string for JSON serialization"""
    if not doc:
        return None
    doc_copy = dict(doc)
    if "_id" in doc_copy:
        doc_copy["_id"] = str(doc_copy["_id"])
    return doc_copy


def parse_object_id(id_str: str):
    """Parse string to ObjectId"""
    try:
        return ObjectId(id_str)
    except:
        return None
