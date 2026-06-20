from flask import current_app as app, request, jsonify
from . import db
from .models import Event


@app.route("/", methods=["GET"])
def index():
    return jsonify({"status": "ok", "service": "feodis-tracker"})


@app.route("/track", methods=["POST"])
def track():
    data = request.get_json() or {}
    lat = data.get("lat")
    lon = data.get("lon")
    metadata = data.get("metadata")

    if lat is None or lon is None:
        return jsonify({"error": "lat and lon required"}), 400

    ev = Event(lat=float(lat), lon=float(lon), meta=metadata)
    db.session.add(ev)
    db.session.commit()

    return jsonify(ev.to_dict()), 201


@app.route("/events", methods=["GET"])
def events():
    items = Event.query.order_by(Event.timestamp.desc()).limit(100).all()
    return jsonify([e.to_dict() for e in items])
