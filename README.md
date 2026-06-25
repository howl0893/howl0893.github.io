# MRH

Static React/Vite portfolio site for Matthew Howlett, hosted with GitHub Pages.

## Stack

- React
- Vite
- TypeScript
- Tailwind CSS
- shadcn/ui components
- EmailJS contact form
- Google Analytics 4

## Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run lint
npm run build
npm run preview
```

## Environment

Create a local `.env` file from `.env.example`:

```bash
VITE_CONTACT_EMAIL=your-personal-email@example.com
VITE_EMAILJS_SERVICE_ID=...
VITE_EMAILJS_TEMPLATE_ID_GENERAL=...
VITE_EMAILJS_PUBLIC_KEY=...
VITE_BASE_PATH=/
```

`VITE_BASE_PATH=/` is correct for `https://howl0893.github.io/` and custom domains. Use `/repo-name/` only for a GitHub Pages project site under a repository path.

## Contact Form

The contact page sends email through EmailJS. The app sends these template variables:

- `title`
- `name`
- `email`
- `reply_to`
- `to_email`
- `message`
- `time`

Recommended EmailJS settings:

- To Email: `{{to_email}}`
- Reply To: `{{reply_to}}`
- Subject: `{{title}}`

The footer email link only appears when `VITE_CONTACT_EMAIL` is configured.

## Analytics

Google Analytics 4 is installed in `index.html` with measurement ID `G-LDT74FLHLZ`.

Custom events are sent for:

- `select_project`
- `select_resume`
- `generate_lead`

In GA4, enable enhanced measurement page views for browser history changes so React Router page transitions are tracked.

## Deployment

GitHub Pages deployment is handled by `.github/workflows/deploy-pages.yml`.

Repository setup:

- `Settings` -> `Pages` -> `Build and deployment` -> `Source`: `GitHub Actions`
- Add the `VITE_*` values above under `Settings` -> `Secrets and variables` -> `Actions` -> `Variables`

The workflow builds `dist`, copies `dist/index.html` to `dist/404.html` for React Router fallback behavior, and deploys the artifact to GitHub Pages.
