from datetime import datetime


def notification_to_dict(doc):
    if not doc:
        return None
    return {
        "id": str(doc["_id"]),
        "userId": str(doc.get("user_id", "")),
        "title": doc.get("title"),
        "body": doc.get("body"),
        "type": doc.get("type", "info"),
        "read": doc.get("read", False),
        "createdAt": doc["created_at"].isoformat() if doc.get("created_at") else None,
    }


def make_notification(user_id, title, body=None, type="info"):
    return {
        "user_id": user_id,
        "title": title,
        "body": body,
        "type": type,
        "read": False,
        "created_at": datetime.utcnow(),
    }
