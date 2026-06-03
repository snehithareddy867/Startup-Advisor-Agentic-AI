from .base import BaseAgent
from models import get_db
from services.matching_service import match_mentors
from bson import ObjectId


class MentorAgent(BaseAgent):
    id = "mentor"
    name = "Mentor Match Agent"
    role = "Advisor"
    description = "Recommends domain mentors and growth sessions."
    system_prompt = "You match startups with domain mentors."

    def run(self, context: dict) -> dict:
        startup_id = context.get("startupId")
        if not startup_id:
            return super().run(context)
        try:
            db = get_db()
            startup = db.startups.find_one({"_id": ObjectId(startup_id)})
            if not startup:
                return {"agent": self.id, "error": "startup not found"}
            mentors = list(db.mentors.find())
            return {"agent": self.id, "matches": match_mentors(startup, mentors)}
        except Exception as e:
            return {"agent": self.id, "error": str(e)}
