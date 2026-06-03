from .base import BaseAgent


class FinancialAgent(BaseAgent):
    id = "financial"
    name = "Financial Agent"
    role = "Modeler"
    description = "Builds revenue forecasts, unit economics and funding needs."
    system_prompt = (
        "You are a startup CFO. Build a 3-year revenue forecast, unit economics "
        "(CAC, LTV, payback), burn rate, runway and funding ask. Show assumptions."
    )
