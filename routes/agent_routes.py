from flask import Blueprint, request, jsonify
from services.auth_service import require_auth
from agents import list_agents, run_agent

agent_bp = Blueprint("agents", __name__)


@agent_bp.get("/")
def get_agents():
    return jsonify(agents=list_agents())


@agent_bp.post("/<agent_id>/run")
@require_auth()
def run(agent_id):
    ctx = request.get_json() or {}
    try:
        result = run_agent(agent_id, ctx)
    except ValueError as e:
        return jsonify(error=str(e)), 404
    return jsonify(result)
