from datetime import datetime


def business_plan_to_dict(doc):
    if not doc:
        return None
    return {
        "id": str(doc["_id"]),
        "startupId": str(doc.get("startup_id", "")),
        "title": doc.get("title"),
        "summary": doc.get("summary"),
        "market": doc.get("market"),
        "product": doc.get("product"),
        "gtm": doc.get("gtm"),
        "financials": doc.get("financials"),
        "risks": doc.get("risks"),
        "createdAt": doc["created_at"].isoformat() if doc.get("created_at") else None,
    }


def make_business_plan(startup_id, title=None, summary=None, market=None,
                       product=None, gtm=None, financials=None, risks=None):
    return {
        "startup_id": startup_id,
        "title": title,
        "summary": summary,
        "market": market,
        "product": product,
        "gtm": gtm,
        "financials": financials,
        "risks": risks,
        "created_at": datetime.utcnow(),
    }
