# Deployment

The Vercel project `agency-website` deploys the React frontend and Django API
under one domain using the services in `vercel.json`. It is connected to
`sarif-mia/agency-website`, with `master` as the production branch.

Production uses the dedicated Neon resource `agency-website-db` in Singapore.
`DATABASE_URL`, `SECRET_KEY`, and `DEBUG=False` are configured in Vercel,
not committed to Git. Local development still uses SQLite unless a database
URL is supplied.

Before deploying a database schema change, run `python manage.py migrate`
with the intended environment's database configuration. Preview deployments
need a separate database connection before database features can be used.
Do not point preview deployments at production data.

The initial public content comes from the repository's sample-content commands.
Replace sample clients, team profiles, projects, and articles before promoting
the site as an agency's official portfolio.

Email delivery requires `EMAIL_HOST_USER` and `EMAIL_HOST_PASSWORD` (a Gmail app
password). Without these, email delivery is disabled; submissions
are still saved in PostgreSQL. Set `MEETING_REQUEST_EMAIL` and `ADMIN_EMAIL`
to the intended notification recipients.

Uploaded media needs a persistent object-storage backend before enabling
uploads in production. Vercel's function filesystem is not persistent storage.
Existing URL-based content images do not require uploads.

Create an administrator with Django's `createsuperuser` command using the
production database configuration. Avoid the sample `setup_admin` command's
default password.

## Redesign and account behavior

The client dashboard displays real meeting requests owned by the signed-in user.
It does not display fabricated project progress or messages. Login sessions are
verified on reload, and logout revokes the token on the server. Do not cache
private API responses in a service worker.

The frontend uses a shared responsive design system, native React metadata,
route-based loading, accessible labels, and explicit content error/retry states.
The `/sitemap.xml` and `/robots.txt` endpoints use the request origin, so they
remain correct on the production domain.
