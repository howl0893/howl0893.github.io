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

The contact page is static and sends through EmailJS. Configure these environment variables in local `.env` files and in Render:

```bash
VITE_CONTACT_EMAIL=mhowlett@applied-ml.dev
VITE_EMAILJS_SERVICE_ID=...
VITE_EMAILJS_TEMPLATE_ID_GENERAL=...
VITE_EMAILJS_PUBLIC_KEY=...
```

If EmailJS is not configured, the UI shows a failure toast and offers the direct `mailto:` fallback.

Create one EmailJS template for the contact form. The app sends these template variables:

- `title`
- `name`
- `email`
- `reply_to`
- `to_email`
- `message`
- `time`

In EmailJS, connect the email service to the current Google Workspace inbox and either set the template recipient to `{{to_email}}` or hard-code `mhowlett@applied-ml.dev` until the MRH email cutover is complete.

## Render Static Site

The site is configured as a Render static site.

- Build command: `npm run build`
- Publish directory: `dist`
- SPA fallback: rewrite `/*` to `/index.html`
- Runtime service: static site only; there is no Express upload backend

After `mrh.com` is acquired, connect the domain in Render and update DNS at the registrar or DNS provider according to Render's custom-domain instructions. Keep the legacy domain active as a redirect and email alias for at least 6-12 months.

## Google Workspace Cutover

Do not change Workspace mail routing until `mrh.com` is owned and DNS is active.

1. Add `mrh.com` to the existing Google Workspace account.
2. Verify ownership with the Google-provided TXT record.
3. Add Google MX records for `mrh.com`.
4. Configure SPF, DKIM, and DMARC.
5. Rename the primary user to `{username}@mrh.com`.
6. Keep the previous address as an alias.
7. Update EmailJS templates and public site contact settings to the MRH address.
