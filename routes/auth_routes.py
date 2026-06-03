from flask import Blueprint, request, jsonify, g
from models import get_db
from models.user import user_to_dict, make_user
from services.auth_service import (
    hash_password, verify_password, issue_token, require_auth,
)
from pymongo.errors import DuplicateKeyError

auth_bp = Blueprint("auth", __name__)


@auth_bp.post("/signup")
def signup():
    data = request.get_json() or {}
    required = ("name", "email", "password", "role")
    if not all(data.get(k) for k in required):
        return jsonify(error="name, email, password and role are required"), 400
    if data["role"] not in ("founder", "investor", "mentor", "admin"):
        return jsonify(error="invalid role"), 400

    db = get_db()
    if db.users.find_one({"email": data["email"].lower()}):
        return jsonify(error="email already registered"), 409

    doc = make_user(
        name=data["name"],
        email=data["email"].lower(),
        password_hash=hash_password(data["password"]),
        role=data["role"],
        bio=data.get("bio"),
    )
    try:
        result = db.users.insert_one(doc)
        doc["_id"] = result.inserted_id
    except DuplicateKeyError:
        return jsonify(error="email already registered"), 409

    return jsonify(user=user_to_dict(doc), token=issue_token(doc)), 201


@auth_bp.post("/login")
def login():
    data = request.get_json() or {}
    db = get_db()
    user = db.users.find_one({"email": (data.get("email") or "").lower()})
    if not user or not verify_password(data.get("password", ""), user["password_hash"]):
        return jsonify(error="invalid credentials"), 401
    return jsonify(user=user_to_dict(user), token=issue_token(user))


@auth_bp.get("/me")
@require_auth()
def me():
    return jsonify(user=user_to_dict(g.current_user))


@auth_bp.post("/forgot-password")
def forgot_password():
    data = request.get_json() or {}
    return jsonify(message=f"If an account exists for {data.get('email')}, a reset link was sent.")
