from flask import Blueprint, request, jsonify, g
from models import get_db
from models.mentor import mentor_to_dict, make_mentor
from services.auth_service import require_auth
from services.matching_service import match_mentors
from bson import ObjectId

mentor_bp = Blueprint("mentors", __name__)


@mentor_bp.get("/")
@require_auth()
def list_mentors():
    db = get_db()
    return jsonify(mentors=[mentor_to_dict(m) for m in db.mentors.find()])


@mentor_bp.post("/")
@require_auth(roles=["mentor", "admin"])
def create_mentor():
    d = request.get_json() or {}
    db = get_db()
    expertise = d.get("expertise", [])
    doc = make_mentor(
        user_id=str(g.current_user["_id"]),
        expertise=",".join(expertise) if isinstance(expertise, list) else expertise,
        years_exp=int(d.get("yearsExp") or 0),
        company=d.get("company"),
        title=d.get("title"),
        rate_hour=int(d.get("rateHour") or 0),
        available=bool(d.get("available", True)),
    )
    result = db.mentors.insert_one(doc)
    doc["_id"] = result.inserted_id
    return jsonify(mentor=mentor_to_dict(doc)), 201


@mentor_bp.get("/match/<startup_id>")
@require_auth()
def match_for_startup(startup_id):
    db = get_db()
    s = db.startups.find_one({"_id": ObjectId(startup_id)})
    if not s:
        return jsonify(error="startup not found"), 404
    mentors = list(db.mentors.find())
    return jsonify(matches=match_mentors(s, mentors))
