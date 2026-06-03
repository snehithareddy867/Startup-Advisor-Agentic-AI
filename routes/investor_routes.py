from flask import Blueprint, request, jsonify, g
from models import get_db
from models.investor import investor_to_dict, make_investor
from models.startup import startup_to_dict
from services.auth_service import require_auth
from services.matching_service import match_investors
from bson import ObjectId

investor_bp = Blueprint("investors", __name__)


@investor_bp.get("/")
@require_auth()
def list_investors():
    db = get_db()
    return jsonify(investors=[investor_to_dict(i) for i in db.investors.find()])


@investor_bp.post("/")
@require_auth(roles=["investor", "admin"])
def create_investor():
    d = request.get_json() or {}
    db = get_db()
    sectors = d.get("sectors", [])
    stages = d.get("stages", [])
    doc = make_investor(
        user_id=str(g.current_user["_id"]),
        firm=d.get("firm"),
        thesis=d.get("thesis"),
        sectors=",".join(sectors) if isinstance(sectors, list) else sectors,
        stages=",".join(stages) if isinstance(stages, list) else stages,
        check_min=int(d.get("checkMin") or 0),
        check_max=int(d.get("checkMax") or 0),
        location=d.get("location"),
    )
    result = db.investors.insert_one(doc)
    doc["_id"] = result.inserted_id
    return jsonify(investor=investor_to_dict(doc)), 201


@investor_bp.get("/match/<startup_id>")
@require_auth()
def match_for_startup(startup_id):
    db = get_db()
    s = db.startups.find_one({"_id": ObjectId(startup_id)})
    if not s:
        return jsonify(error="startup not found"), 404
    investors = list(db.investors.find())
    return jsonify(matches=match_investors(s, investors))
