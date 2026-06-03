from .base import BaseAgent
from models import get_db
from models.startup import startup_to_dict
from services.matching_service import match_investors
from bson import ObjectId


class InvestorAgent(BaseAgent):
    id = "investor"
    name = "Investor Match Agent"
    role = "Connector"
    description = "Matches startup to relevant investors by thesis fit."
    system_prompt = "You match startups with investors based on thesis fit."

    def run(self, context: dict) -> dict:
        startup_id = context.get("startupId")
        if not startup_id:
            return super().run(context)
        try:
            db = get_db()
            startup = db.startups.find_one({"_id": ObjectId(startup_id)})
            if not startup:
                return {"agent": self.id, "error": "startup not found"}
            investors = list(db.investors.find())
            return {"agent": self.id, "matches": match_investors(startup, investors)}
        except Exception as e:
            return {"agent": self.id, "error": str(e)}
