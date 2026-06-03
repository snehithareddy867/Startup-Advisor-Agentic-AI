import os
import datetime as dt
from functools import wraps

import bcrypt
import jwt
from flask import request, jsonify, g, current_app

from models import get_db
from models.user import user_to_dict
from bson import ObjectId


def hash_password(password: str) -> str:
    return bcrypt.hashpw(password.encode(), bcrypt.gensalt()).decode()


def verify_password(password: str, hashed: str) -> bool:
    try:
        return bcrypt.checkpw(password.encode(), hashed.encode())
    except Exception:
        return False


def issue_token(user_doc: dict) -> str:
    payload = {
        "sub": str(user_doc["_id"]),
        "email": user_doc["email"],
        "role": user_doc["role"],
        "exp": dt.datetime.utcnow() + dt.timedelta(days=7),
    }
    return jwt.encode(payload, current_app.config["JWT_SECRET"], algorithm="HS256")


def decode_token(token: str):
    return jwt.decode(token, current_app.config["JWT_SECRET"], algorithms=["HS256"])


def require_auth(roles=None):
    """Decorator: require valid JWT. Optionally restrict by roles."""
    def wrapper(fn):
        @wraps(fn)
        def inner(*args, **kwargs):
            auth = request.headers.get("Authorization", "")
            if not auth.startswith("Bearer "):
                return jsonify(error="Missing or invalid Authorization header"), 401
            token = auth.split(" ", 1)[1]
            try:
                payload = decode_token(token)
            except jwt.PyJWTError as e:
                return jsonify(error=f"Invalid token: {e}"), 401

            db = get_db()
            user = db.users.find_one({"_id": ObjectId(payload["sub"])})
            if not user:
                return jsonify(error="User not found"), 401
            if roles and user["role"] not in roles:
                return jsonify(error="Forbidden"), 403

            g.current_user = user
            return fn(*args, **kwargs)
        return inner
    return wrapper
