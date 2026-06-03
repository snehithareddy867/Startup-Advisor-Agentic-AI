from services.ai_service import generate_text


class BaseAgent:
    id: str = "base"
    name: str = "Base Agent"
    role: str = "Generic"
    description: str = ""
    system_prompt: str = "You are a helpful startup advisor agent."

    def run(self, context: dict) -> dict:
        prompt = context.get("prompt") or context.get("input") or ""
        text = generate_text(prompt, system=self.system_prompt)
        return {"agent": self.id, "output": text}
