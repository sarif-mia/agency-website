# SiteGenIT

A responsive agency website and client portal built with React, Vite, and Django REST Framework. Production runs on Vercel Services with Neon PostgreSQL.

## Run locally

Use Node 22+ and Python 3.12.

```sh
npm ci --prefix frontend
python3.12 -m venv backend/.venv
backend/.venv/bin/python -m pip install -r backend/requirements.txt
DEBUG=True backend/.venv/bin/python backend/manage.py migrate
```

Run the API and frontend in separate terminals:

```sh
npm run dev:api
npm run dev
```

Open `http://localhost:3000`. Vite proxies `/api` and `/media` to Django on port 8000. Local development uses SQLite by default. For optional configuration, copy `backend/.env.example` to `backend/.env`, replace the secret key, and leave `DATABASE_URL` empty to keep SQLite.

To add the repository’s sample public content to a local database:

```sh
DEBUG=True backend/.venv/bin/python backend/manage.py populate_data --skip-subscribers
```

The content is illustrative. Portfolio concepts and sample case studies are labeled accordingly; the client dashboard uses real meeting records rather than mock projects.

## Verify

```sh
npm run lint
npm run build
npm run test:api
npm audit --prefix frontend
```

Backend tests cover registration, password validation, email casing, login, token revocation, private access, throttling, meeting ownership, contact persistence, expired jobs, and sitemap output. Tests use an isolated in-memory database and an in-memory email backend.

## Client portal

Create an account at `/client-portal`. Signed-in meeting requests at `/meeting` appear on `/dashboard`. Accounts are checked with the server on reload; signing out revokes the server token. Registration and login enforce rate limits and return useful validation errors. The dashboard never retrieves another account’s records based only on an email address.

## Deployment

See [DEPLOYMENT.md](DEPLOYMENT.md) for environment variables, migrations, email delivery, and operational details. The Vercel production branch is `master`.
