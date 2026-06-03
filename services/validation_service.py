"""Computes a 0-100 startup health score and a quick validation report."""
from .ai_service import generate_text


def compute_health_score(startup: dict) -> int:
    score = 0
    desc = startup.get("description") or ""
    if desc and len(desc) > 100:   score += 20
    if startup.get("industry"):    score += 15
    if startup.get("stage") in ("mvp", "growth", "scale"): score += 20
    if startup.get("website"):     score += 10
    if startup.get("tagline"):     score += 10
    if startup.get("location"):    score += 5
    return min(score + 20, 100)


def validate_idea(idea: str) -> dict:
    prompt = (
        "You are an experienced startup advisor. Given the idea below, "
        "return a short JSON-like analysis with keys: strengths, weaknesses, "
        "opportunities, threats, and a 0-100 viability score.\n\n"
        f"IDEA:\n{idea}"
    )
    return {"analysis": generate_text(prompt)}
