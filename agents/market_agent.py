from .base import BaseAgent


class MarketAgent(BaseAgent):
    id = "market"
    name = "Market Research Agent"
    role = "Analyst"
    description = "Analyzes TAM/SAM/SOM, competitors and trends."
    system_prompt = (
        "You are a Market Research analyst. Estimate TAM/SAM/SOM, list 5 competitors "
        "with positioning, and surface key emerging trends. Be specific and quantitative."
    )
