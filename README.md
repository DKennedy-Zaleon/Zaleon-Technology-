# Zaleon Systems website

A static HTML/CSS/JS website designed for Cloudflare Pages.

## Files
- `index.html` — Home
- `services.html` — Services
- `about.html` — About Us
- `contact.html` — Contact Us
- `styles.css` — site-wide styling
- `script.js` — mobile navigation
- `assets/zaleon-systems-logo.png` — logo used in the header/hero

## Cloudflare Pages deployment
1. Create a GitHub repository and upload these files, or use Cloudflare Pages Direct Upload.
2. In Cloudflare: Workers & Pages → Create → Pages.
3. For a plain static site, no framework is required.
4. If Cloudflare asks for a build command, leave it blank. Use the repository root as the output directory when using a direct static deployment workflow.
5. Add your custom domain in Pages → Custom domains.

## Contact form
`contact.html` currently points to Formspree with the placeholder `YOUR_FORM_ID`. Replace that value with a real Formspree form ID, or swap the form action for a Cloudflare Pages Function/Worker endpoint.

## Before launch
- Confirm the public contact email you want displayed.
- Add a real phone number only if you want one public.
- Replace LinkedIn/GitHub footer text with actual links.
- Add privacy policy / terms if appropriate.
