from datetime import datetime
from bson import ObjectId


def user_to_dict(doc):
    if not doc:
        return None
    return {
        "id": str(doc["_id"]),
        "name": doc.get("name"),
        "email": doc.get("email"),
        "role": doc.get("role"),
        "avatarUrl": doc.get("avatar_url"),
        "bio": doc.get("bio"),
        "phone": doc.get("phone"),
        "timezone": doc.get("timezone", "America/Los_Angeles"),
        "language": doc.get("language", "en"),
        "createdAt": doc["created_at"].isoformat() if doc.get("created_at") else None,
    }


def make_user(name, email, password_hash, role, bio=None, avatar_url=None, phone=None, timezone=None, language=None):
    return {
        "name": name,
        "email": email,
        "password_hash": password_hash,
        "role": role,
        "bio": bio,
        "avatar_url": avatar_url,
        "phone": phone,
        "timezone": timezone or "America/Los_Angeles",
        "language": language or "en",
        "created_at": datetime.utcnow(),
    }