from datetime import datetime


def mentor_to_dict(doc):
    if not doc:
        return None
    return {
        "id": str(doc["_id"]),
        "userId": str(doc.get("user_id", "")),
        "expertise": [s.strip() for s in (doc.get("expertise") or "").split(",") if s.strip()],
        "yearsExp": doc.get("years_exp", 0),
        "company": doc.get("company"),
        "title": doc.get("title"),
        "rateHour": doc.get("rate_hour", 0),
        "available": doc.get("available", True),
        "createdAt": doc["created_at"].isoformat() if doc.get("created_at") else None,
    }


def make_mentor(user_id, expertise=None, years_exp=0, company=None,
                title=None, rate_hour=0, available=True):
    return {
        "user_id": user_id,
        "expertise": expertise,
        "years_exp": years_exp,
        "company": company,
        "title": title,
        "rate_hour": rate_hour,
        "available": available,
        "created_at": datetime.utcnow(),
    }
