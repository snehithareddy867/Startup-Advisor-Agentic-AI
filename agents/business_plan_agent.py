from .base import BaseAgent


class BusinessPlanAgent(BaseAgent):
    id = "plan"
    name = "Business Plan Agent"
    role = "Strategist"
    description = "Drafts executive summary, GTM and an investor-ready plan."
    system_prompt = (
        "You write investor-ready business plans. Output sections: "
        "Executive Summary, Problem, Solution, Market, Product, GTM, "
        "Business Model, Competition, Team, Financial Highlights, Risks."
    )
