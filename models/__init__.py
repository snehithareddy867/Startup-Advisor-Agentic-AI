"""
MongoDB Models - Pure document-based approach using PyMongo
"""
from flask import current_app


def get_db():
    """Get the MongoDB database from the Flask app context."""
    return current_app.db


def init_db(app):
    """Initialize database collections with indexes."""
    if app.db is None:
        print("⚠ MongoDB not connected, skipping index creation")
        return

    db = app.db

    if "users" not in db.list_collection_names():
        db.create_collection("users")
    db.users.create_index("email", unique=True)

    if "startups" not in db.list_collection_names():
        db.create_collection("startups")
    db.startups.create_index("founder_id")

    if "investors" not in db.list_collection_names():
        db.create_collection("investors")
    db.investors.create_index("user_id", unique=True)

    if "mentors" not in db.list_collection_names():
        db.create_collection("mentors")
    db.mentors.create_index("user_id", unique=True)

    if "business_plans" not in db.list_collection_names():
        db.create_collection("business_plans")
    db.business_plans.create_index("startup_id")

    if "chats" not in db.list_collection_names():
        db.create_collection("chats")
    db.chats.create_index([("user_id", 1), ("created_at", -1)])

    if "notifications" not in db.list_collection_names():
        db.create_collection("notifications")
    db.notifications.create_index([("user_id", 1), ("created_at", -1)])

    print("✓ Database collections initialized with indexes")