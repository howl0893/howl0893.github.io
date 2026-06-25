# MRH

Static React/Vite site for `mrh.com`, adapted from the existing projects site and merged with content from the personal projects.

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

## Contact Form

The contact page is static and sends through EmailJS. Configure these environment variables in local `.env` files and as GitHub Actions repository variables:

```bash
VITE_CONTACT_EMAIL=your-personal-email@example.com
VITE_EMAILJS_SERVICE_ID=...
VITE_EMAILJS_TEMPLATE_ID_GENERAL=...
VITE_EMAILJS_PUBLIC_KEY=...
VITE_BASE_PATH=/
```

If EmailJS is not configured, the UI shows a failure toast. The footer `mailto:` link appears only when `VITE_CONTACT_EMAIL` is configured.

Create one EmailJS template for the contact form. The app sends these template variables:

- `title` (`Website contact`)
- `name`
- `email`
- `reply_to`
- `to_email`
- `message`
- `time`

In EmailJS, connect the email service to the current inbox and set the template recipient to `{{to_email}}`, or hard-code your personal email in the EmailJS template.

## GitHub Pages

The site is configured to deploy with GitHub Actions in `.github/workflows/deploy-pages.yml`.

- In GitHub repository settings, go to `Settings` -> `Pages`.
- Set `Build and deployment` -> `Source` to `GitHub Actions`.
- Add repository variables for the `VITE_*` values above under `Settings` -> `Secrets and variables` -> `Actions` -> `Variables`.
- Vite exposes `VITE_*` values in the public browser bundle, so repository variables are usually a better fit than secrets for these EmailJS client-side values. The workflow also falls back to repository secrets if you already placed them there.
- Keep `VITE_BASE_PATH=/` for a user site like `howl0893.github.io` or for a custom domain.
- Use `VITE_BASE_PATH=/repo-name/` only if publishing this as a project site at `https://howl0893.github.io/repo-name/`.

The workflow builds `dist`, copies `dist/index.html` to `dist/404.html` for React Router fallback behavior, and deploys the artifact to GitHub Pages.

## Google Workspace Cancellation

Before canceling Google Workspace, make sure you have another working email destination for contact form mail. If you keep using EmailJS, connect it to that replacement inbox and update `VITE_CONTACT_EMAIL`.

Cancel Google Workspace from the Admin Console billing/subscription area only after exporting or migrating any mail/data you need.
