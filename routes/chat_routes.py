from flask import Blueprint, request, jsonify, g
from models import get_db
from models.chat import chat_to_dict, make_chat_message
from services.auth_service import require_auth
from services.ai_service import chat as ai_chat

chat_bp = Blueprint("chat", __name__)


@chat_bp.get("/")
@require_auth()
def history():
    agent = request.args.get("agent", "founder")
    db = get_db()
    user_id = str(g.current_user["_id"])
    msgs = list(db.chats.find(
        {"user_id": user_id, "agent": agent}
    ).sort("created_at", 1))
    return jsonify(messages=[chat_to_dict(m) for m in msgs])


@chat_bp.post("/")
@require_auth()
def send():
    d = request.get_json() or {}
    content = (d.get("content") or "").strip()
    agent = d.get("agent", "founder")
    if not content:
        return jsonify(error="content is required"), 400

    db = get_db()
    user_id = str(g.current_user["_id"])

    user_msg_doc = make_chat_message(user_id, agent, "user", content)
    db.chats.insert_one(user_msg_doc)

    history_msgs = list(db.chats.find(
        {"user_id": user_id, "agent": agent}
    ).sort("created_at", 1).limit(20))

    reply_text = ai_chat([{"role": m["role"], "content": m["content"]} for m in history_msgs])

    reply_doc = make_chat_message(user_id, agent, "assistant", reply_text)
    db.chats.insert_one(reply_doc)

    return jsonify(message=chat_to_dict(user_msg_doc), reply=chat_to_dict(reply_doc))
