import json
from feodis_tracker import create_app, db


def test_track_and_get():
    app = create_app({"TESTING": True, "SQLALCHEMY_DATABASE_URI": "sqlite:///:memory:"})

    client = app.test_client()

    with app.app_context():
        db.create_all()

    # missing fields
    r = client.post("/track", json={})
    assert r.status_code == 400

    # successful post
    payload = {"lat": 10.0, "lon": 20.0, "metadata": {"device": "test"}}
    r = client.post("/track", json=payload)
    assert r.status_code == 201
    body = r.get_json()
    assert body["lat"] == 10.0
    assert body["lon"] == 20.0

    # get events
    r = client.get("/events")
    assert r.status_code == 200
    arr = r.get_json()
    assert isinstance(arr, list)
    assert len(arr) >= 1
