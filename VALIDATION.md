# Verification — 20 October 2026

The redesign was checked with installed Google Chrome through Playwright at desktop (1440 px) and mobile (390 px) widths.

- Production build completes, and ESLint reports no errors or warnings.
- Eleven Django tests pass against an isolated test database.
- `npm audit` and `pip-audit -r backend/requirements.txt` report zero known vulnerabilities.
- Axe checks for WCAG A/AA and WCAG 2.1 AA report zero violations on the homepage, services, project inquiry, blog, meeting request, and sign-in pages after contrast corrections. Automated checks do not replace a full manual accessibility audit.
- Thirty-six browser checks pass, covering registration with a single name and mixed-case email, a real empty dashboard, server-verified refresh, authenticated meeting creation, dashboard ownership, token revocation on logout, private redirects, incorrect-password feedback, login, contact submission, newsletter subscription, the public routes, portfolio filtering, project/article details, a simulated API failure and successful retry, resource downloads, the 404 page, keyboard dismissal of mobile navigation, and mobile overflow checks.
- No JavaScript runtime errors were recorded during the browser flow.

Temporary browser-test accounts, meetings, inquiries, and subscriptions are removed after verification.

Email delivery still requires SMTP credentials. The application saves submissions without claiming that an email was sent. Media uploads need persistent object storage before production use. Public portfolio concepts and illustrative case-study outcomes are labeled rather than presented as verified client results.
