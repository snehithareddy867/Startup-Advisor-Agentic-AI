from datetime import datetime


def startup_to_dict(doc):
    if not doc:
        return None
    return {
        "id": str(doc["_id"]),
        "founderId": str(doc.get("founder_id", "")),
        "name": doc.get("name"),
        "tagline": doc.get("tagline"),
        "description": doc.get("description"),
        "industry": doc.get("industry"),
        "stage": doc.get("stage"),
        "location": doc.get("location"),
        "website": doc.get("website"),
        "logoUrl": doc.get("logo_url"),
        "healthScore": doc.get("health_score", 0),
        "createdAt": doc["created_at"].isoformat() if doc.get("created_at") else None,
    }


def make_startup(founder_id, name, tagline=None, description=None,
                 industry=None, stage=None, location=None,
                 website=None, logo_url=None, health_score=0):
    return {
        "founder_id": founder_id,
        "name": name,
        "tagline": tagline,
        "description": description,
        "industry": industry,
        "stage": stage,
        "location": location,
        "website": website,
        "logo_url": logo_url,
        "health_score": health_score,
        "created_at": datetime.utcnow(),
    }
