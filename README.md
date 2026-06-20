# feodis-tracker

Minimal tracker service that accepts location events and stores them.

Usage

Install dependencies and run the app:

```bash
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
python run.py
```

Send a POST to `/track` with JSON `{ "lat": 1.23, "lon": 4.56 }`.

Run tests:

```bash
pip install -r requirements.txt
pytest -q
```
