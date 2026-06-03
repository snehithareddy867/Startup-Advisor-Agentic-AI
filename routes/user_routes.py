from flask import Blueprint, request, jsonify, g
from models import get_db
from models.user import user_to_dict
from services.auth_service import require_auth
from bson import ObjectId

user_bp = Blueprint("users", __name__)


@user_bp.get("/")
@require_auth(roles=["admin"])
def list_users():
    db = get_db()
    return jsonify(users=[user_to_dict(u) for u in db.users.find()])


@user_bp.get("/<user_id>")
@require_auth()
def get_user(user_id):
    db = get_db()
    u = db.users.find_one({"_id": ObjectId(user_id)})
    if not u:
        return jsonify(error="not found"), 404
    return jsonify(user=user_to_dict(u))


@user_bp.get("/profile/me")
@require_auth()
def get_my_profile():
    """Get current user's profile"""
    db = get_db()
    u = db.users.find_one({"_id": g.current_user["_id"]})
    if not u:
        return jsonify(error="not found"), 404
    return jsonify(user=user_to_dict(u))


@user_bp.patch("/<user_id>")
@require_auth()
def update_user(user_id):
    db = get_db()
    u = db.users.find_one({"_id": ObjectId(user_id)})
    if not u:
        return jsonify(error="not found"), 404
    if str(g.current_user["_id"]) != user_id and g.current_user["role"] != "admin":
        return jsonify(error="forbidden"), 403
    
    data = request.get_json() or {}
    # Allow updating these fields
    allowed_fields = ("name", "bio", "avatar_url", "phone", "timezone", "language", "email")
    updates = {f: data[f] for f in allowed_fields if f in data}
    
    if updates:
        db.users.update_one({"_id": ObjectId(user_id)}, {"$set": updates})
        u = db.users.find_one({"_id": ObjectId(user_id)})
    
    return jsonify(user=user_to_dict(u))


@user_bp.patch("/profile/me")
@require_auth()
def update_my_profile():
    """Update current user's profile"""
    db = get_db()
    user_id = str(g.current_user["_id"])
    
    u = db.users.find_one({"_id": g.current_user["_id"]})
    if not u:
        return jsonify(error="not found"), 404
    
    data = request.get_json() or {}
    # Allow updating these fields
    allowed_fields = ("name", "bio", "avatar_url", "phone", "timezone", "language", "email")
    updates = {f: data[f] for f in allowed_fields if f in data}
    
    if updates:
        db.users.update_one({"_id": g.current_user["_id"]}, {"$set": updates})
        u = db.users.find_one({"_id": g.current_user["_id"]})
    
    return jsonify(user=user_to_dict(u))


@user_bp.delete("/<user_id>")
@require_auth(roles=["admin"])
def delete_user(user_id):
    db = get_db()
    db.users.delete_one({"_id": ObjectId(user_id)})
    return jsonify(ok=True)