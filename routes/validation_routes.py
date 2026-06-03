from flask import Blueprint, request, jsonify
from services.auth_service import require_auth
from services.validation_service import validate_idea

validation_bp = Blueprint("validate", __name__)


@validation_bp.post("/")
@require_auth()
def validate():
    d = request.get_json() or {}
    idea = (d.get("idea") or "").strip()
    if not idea:
        return jsonify(error="idea is required"), 400
    return jsonify(validate_idea(idea))
