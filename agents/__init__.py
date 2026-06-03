"""
Agent registry for the multi-agent startup advisor.
Each agent has a `run(context: dict) -> dict` function.
"""
from .founder_agent import FounderAgent
from .market_agent import MarketAgent
from .business_plan_agent import BusinessPlanAgent
from .financial_agent import FinancialAgent
from .investor_agent import InvestorAgent
from .mentor_agent import MentorAgent

AGENTS = {
    "founder":   FounderAgent(),
    "market":    MarketAgent(),
    "plan":      BusinessPlanAgent(),
    "financial": FinancialAgent(),
    "investor":  InvestorAgent(),
    "mentor":    MentorAgent(),
}


def list_agents():
    return [
        {"id": a.id, "name": a.name, "role": a.role, "description": a.description}
        for a in AGENTS.values()
    ]


def run_agent(agent_id: str, context: dict) -> dict:
    if agent_id not in AGENTS:
        raise ValueError(f"Unknown agent: {agent_id}")
    return AGENTS[agent_id].run(context)
