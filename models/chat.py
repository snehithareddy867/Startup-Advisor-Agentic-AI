from datetime import datetime


def chat_to_dict(doc):
    if not doc:
        return None
    return {
        "id": str(doc["_id"]),
        "userId": str(doc.get("user_id", "")),
        "agent": doc.get("agent", "founder"),
        "role": doc.get("role", "user"),
        "content": doc.get("content"),
        "createdAt": doc["created_at"].isoformat() if doc.get("created_at") else None,
    }


def make_chat_message(user_id, agent, role, content):
    return {
        "user_id": user_id,
        "agent": agent,
        "role": role,
        "content": content,
        "created_at": datetime.utcnow(),
    }
