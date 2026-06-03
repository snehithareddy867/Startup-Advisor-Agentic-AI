"""Simple scoring for investor / mentor matching — MongoDB document version."""
from typing import List


def score_investor(startup: dict, investor: dict) -> int:
    score = 0
    sectors = [s.lower() for s in (investor.get("sectors") or "").split(",") if s.strip()]
    stages  = [s.lower() for s in (investor.get("stages")  or "").split(",") if s.strip()]
    if startup.get("industry") and startup["industry"].lower() in sectors:
        score += 50
    if startup.get("stage") and startup["stage"].lower() in stages:
        score += 30
    if startup.get("location") and investor.get("location") and \
       startup["location"].lower() == investor["location"].lower():
        score += 20
    return score


def match_investors(startup: dict, investors: List[dict], top_k: int = 10):
    from models.investor import investor_to_dict
    ranked = sorted(
        ({"investor": investor_to_dict(i), "score": score_investor(startup, i)} for i in investors),
        key=lambda x: x["score"], reverse=True,
    )
    return ranked[:top_k]


def score_mentor(startup: dict, mentor: dict) -> int:
    score = 0
    expertise = [s.lower() for s in (mentor.get("expertise") or "").split(",") if s.strip()]
    if startup.get("industry") and startup["industry"].lower() in expertise:
        score += 60
    if mentor.get("available"):
        score += 20
    score += min(mentor.get("years_exp") or 0, 20)
    return score


def match_mentors(startup: dict, mentors: List[dict], top_k: int = 10):
    from models.mentor import mentor_to_dict
    ranked = sorted(
        ({"mentor": mentor_to_dict(m), "score": score_mentor(startup, m)} for m in mentors),
        key=lambda x: x["score"], reverse=True,
    )
    return ranked[:top_k]
