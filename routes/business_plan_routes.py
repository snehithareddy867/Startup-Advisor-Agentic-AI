from flask import Blueprint, request, jsonify, g
from models import get_db
from models.business_plan import business_plan_to_dict, make_business_plan
from services.auth_service import require_auth
from services.ai_service import generate_text
from bson import ObjectId

business_plan_bp = Blueprint("business_plan", __name__)


@business_plan_bp.get("/<startup_id>")
@require_auth()
def list_plans(startup_id):
    db = get_db()
    plans = list(db.business_plans.find({"startup_id": startup_id}))
    return jsonify(plans=[business_plan_to_dict(p) for p in plans])


@business_plan_bp.post("/<startup_id>/generate")
@require_auth(roles=["founder", "admin"])
def generate_plan(startup_id):
    db = get_db()
    s = db.startups.find_one({"_id": ObjectId(startup_id)})
    if not s:
        return jsonify(error="startup not found"), 404

    base = (
        f"Startup: {s.get('name')}\nTagline: {s.get('tagline')}\n"
        f"Industry: {s.get('industry')}\nStage: {s.get('stage')}\n"
        f"Location: {s.get('location')}\nDescription: {s.get('description')}"
    )
    doc = make_business_plan(
        startup_id=startup_id,
        title=f"{s.get('name')} - Business Plan",
        summary=generate_text(f"Write an Executive Summary.\n{base}"),
        market=generate_text(f"Write a Market Analysis section.\n{base}"),
        product=generate_text(f"Write a Product section.\n{base}"),
        gtm=generate_text(f"Write a Go-to-Market section.\n{base}"),
        financials=generate_text(f"Write a Financial Highlights section.\n{base}"),
        risks=generate_text(f"Write a Risks & Mitigations section.\n{base}"),
    )
    result = db.business_plans.insert_one(doc)
    doc["_id"] = result.inserted_id
    return jsonify(plan=business_plan_to_dict(doc)), 201
