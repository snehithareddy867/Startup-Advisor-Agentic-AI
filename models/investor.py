from datetime import datetime


def investor_to_dict(doc):
    if not doc:
        return None
    return {
        "id": str(doc["_id"]),
        "userId": str(doc.get("user_id", "")),
        "firm": doc.get("firm"),
        "thesis": doc.get("thesis"),
        "sectors": [s.strip() for s in (doc.get("sectors") or "").split(",") if s.strip()],
        "stages":  [s.strip() for s in (doc.get("stages")  or "").split(",") if s.strip()],
        "checkMin": doc.get("check_min", 0),
        "checkMax": doc.get("check_max", 0),
        "location": doc.get("location"),
        "createdAt": doc["created_at"].isoformat() if doc.get("created_at") else None,
    }


def make_investor(user_id, firm=None, thesis=None, sectors=None,
                  stages=None, check_min=0, check_max=0, location=None):
    return {
        "user_id": user_id,
        "firm": firm,
        "thesis": thesis,
        "sectors": sectors,
        "stages": stages,
        "check_min": check_min,
        "check_max": check_max,
        "location": location,
        "created_at": datetime.utcnow(),
    }
