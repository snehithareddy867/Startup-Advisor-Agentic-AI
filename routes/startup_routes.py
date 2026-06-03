from flask import Blueprint, request, jsonify, g
from models import get_db
from models.startup import startup_to_dict, make_startup
from services.auth_service import require_auth
from services.validation_service import compute_health_score
from bson import ObjectId

startup_bp = Blueprint("startups", __name__)


@startup_bp.get("/")
@require_auth()
def list_startups():
    db = get_db()
    query = {}
    if g.current_user["role"] == "founder":
        query["founder_id"] = str(g.current_user["_id"])
    return jsonify(startups=[startup_to_dict(s) for s in db.startups.find(query)])


@startup_bp.post("/")
@require_auth(roles=["founder", "admin"])
def create_startup():
    data = request.get_json() or {}
    if not data.get("name"):
        return jsonify(error="name is required"), 400
    doc = make_startup(
        founder_id=str(g.current_user["_id"]),
        name=data["name"],
        tagline=data.get("tagline"),
        description=data.get("description"),
        industry=data.get("industry"),
        stage=data.get("stage"),
        location=data.get("location"),
        website=data.get("website"),
        logo_url=data.get("logoUrl"),
    )
    doc["health_score"] = compute_health_score(doc)
    db = get_db()
    result = db.startups.insert_one(doc)
    doc["_id"] = result.inserted_id
    return jsonify(startup=startup_to_dict(doc)), 201


@startup_bp.get("/<startup_id>")
@require_auth()
def get_startup(startup_id):
    db = get_db()
    s = db.startups.find_one({"_id": ObjectId(startup_id)})
    if not s:
        return jsonify(error="not found"), 404
    return jsonify(startup=startup_to_dict(s))


@startup_bp.patch("/<startup_id>")
@require_auth()
def update_startup(startup_id):
    db = get_db()
    s = db.startups.find_one({"_id": ObjectId(startup_id)})
    if not s:
        return jsonify(error="not found"), 404
    if g.current_user["role"] != "admin" and s["founder_id"] != str(g.current_user["_id"]):
        return jsonify(error="forbidden"), 403
    data = request.get_json() or {}
    fields = ("name", "tagline", "description", "industry", "stage", "location", "website")
    updates = {f: data[f] for f in fields if f in data}
    if "logoUrl" in data:
        updates["logo_url"] = data["logoUrl"]
    if updates:
        merged = {**s, **updates}
        updates["health_score"] = compute_health_score(merged)
        db.startups.update_one({"_id": ObjectId(startup_id)}, {"$set": updates})
        s = db.startups.find_one({"_id": ObjectId(startup_id)})
    return jsonify(startup=startup_to_dict(s))


@startup_bp.delete("/<startup_id>")
@require_auth()
def delete_startup(startup_id):
    db = get_db()
    s = db.startups.find_one({"_id": ObjectId(startup_id)})
    if not s:
        return jsonify(error="not found"), 404
    if g.current_user["role"] != "admin" and s["founder_id"] != str(g.current_user["_id"]):
        return jsonify(error="forbidden"), 403
    db.startups.delete_one({"_id": ObjectId(startup_id)})
    return jsonify(ok=True)
