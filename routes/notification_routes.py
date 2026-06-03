from flask import Blueprint, request, jsonify, g
from models import get_db
from models.notification import notification_to_dict, make_notification
from services.auth_service import require_auth
from bson import ObjectId

notification_bp = Blueprint("notifications", __name__)


@notification_bp.get("/")
@require_auth()
def list_notifications():
    db = get_db()
    user_id = str(g.current_user["_id"])
    notes = list(db.notifications.find({"user_id": user_id}).sort("created_at", -1))
    return jsonify(notifications=[notification_to_dict(n) for n in notes])


@notification_bp.post("/")
@require_auth(roles=["admin"])
def create_notification():
    d = request.get_json() or {}
    db = get_db()
    doc = make_notification(
        user_id=d["userId"],
        title=d.get("title", ""),
        body=d.get("body"),
        type=d.get("type", "info"),
    )
    result = db.notifications.insert_one(doc)
    doc["_id"] = result.inserted_id
    return jsonify(notification=notification_to_dict(doc)), 201


@notification_bp.patch("/<notif_id>/read")
@require_auth()
def mark_read(notif_id):
    db = get_db()
    n = db.notifications.find_one({"_id": ObjectId(notif_id)})
    if not n or n["user_id"] != str(g.current_user["_id"]):
        return jsonify(error="not found"), 404
    db.notifications.update_one({"_id": ObjectId(notif_id)}, {"$set": {"read": True}})
    n["read"] = True
    return jsonify(notification=notification_to_dict(n))
