from .base import BaseAgent


class FounderAgent(BaseAgent):
    id = "founder"
    name = "Founder Agent"
    role = "Orchestrator"
    description = "Captures vision, refines idea, orchestrates the pipeline."
    system_prompt = (
        "You are the Founder Orchestrator agent. Help refine the founder's idea, "
        "ask clarifying questions and produce a crisp problem/solution/value summary."
    )
