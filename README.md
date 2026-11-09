# Maleesha Perera — Developer Portfolio · Version 3

Modern, responsive portfolio for Maleesha Dewmina Perera. **No build step required**: works with VS Code Live Server and GitHub Pages. Includes the existing animated two-line headline, portrait, updated two-page creative CV, projects and galleries.

## What's included

- **13 existing projects, 87 gallery references, 12 technology filters**, and the original project descriptions and links. Some galleries point to GitHub-hosted screenshots and need internet access.
- **Interactive typing headline** with four rotating two-line messages, light/dark theme, command palette (`Ctrl/Cmd+K`), skills explorer, case-study dialogs, project search, simulated terminal, and mobile navigation.
- **Three new guided screenshot tours**: HealthTrack Pro, SmartMed and Velvet Vogue. These use original gallery screenshots and provide source links. EduMind AI is a **completed, deployed academic application** with a public [source repository](https://github.com/MaleeshaDewmina/EduMindAI-Learning-Assistant), [live sign-in page](https://edumind-ai-project.alwaysdata.net/auth/login), and seven documented screenshots. The other project tours show screenshots rather than hosted demos.
- **Career journey** connecting visual design, diploma recognition, OREL IT, and ongoing engineering studies. Earlier experience, education and achievement sections remain intact.
- **Certifications & Credentials** section with the earned AWS Educate Introduction to Cloud 101 training badge (November 2026), linked to its [public Credly verification record](https://www.credly.com/badges/310af74b-b209-43eb-a0b4-9b1b953117f5). The credential card displays the original image from Credly's image CDN and links to the public verification record; if the CDN is unavailable, the text and verification link remain available. Three additional documented items are shown with their correct credential types: a **Level 3 Diploma in Information Technology** (Skills and Education Group Awards / UK Awards, issued 28 April 2025), **Digital Skills: Digital Marketing** (Accenture, course achievement certificate), and **7-Day Maker Better Decisions Challenge** (Clearer Thinking, completion certificate). The additional cards now use issuer/platform branding in place of generic monograms. The Accenture course certificate links to the [FutureLearn certificate record](https://www.futurelearn.com/certificates/ku34mr2), supplied by the certificate holder. The Level 3 award and Clearer Thinking certificate remain correctly labelled without fabricated verification links; logos identify organisations and do not imply endorsements. The Level 3 award was shown as valid in the issuer's document viewer in the user-provided evidence. Other certificates are based on the supplied documents, and their verification links can be added when provided.
- **Contact form** with client-side validation, honeypot, provider feedback, copy-message alternative and an email link.
- **SEO**: canonical URL, social preview (`assets/social-preview.jpg`), Open Graph/Twitter tags, Person JSON-LD, favicon, touch icons, sitemap, robots.txt, and 404 page.
- **Design and accessibility polish**: adaptive cards, keyboard navigation, visible focus states, alt text, reduced-motion support and subtle optional pointer effects.

## Run locally

1. Extract the entire ZIP (do not open it directly).
2. Open the extracted folder in **VS Code**.
3. Right-click **index.html → Open with Live Server**.
4. Test the hero animation, screenshot walkthroughs, search, Ctrl/Cmd+K palette, skills explorer, theme, galleries and mobile navigation.
5. Test form validation and **Copy message** locally. A valid submission sends a real message through the active Formspree endpoint. Submit only when you intend to send a test message.

The site is static. You do not need npm, PHP, databases or credentials to browse it.

## Contact form

The portfolio uses **Formspree** to receive contact submissions. The current endpoint, `https://formspree.io/f/mnppwwan`, is active, and the site owner has confirmed delivery to the configured inbox. No activation step is needed for this endpoint.

- `index.html` sets the endpoint as the form's `POST` action. `extra-features.js` submits to the same endpoint using `fetch` and displays the result on the page. The native HTML `POST` is available when JavaScript is disabled.
- The success message confirms that Formspree accepted the submission. Check the configured inbox when verifying email delivery.
- If submission fails, use **Copy message** or the direct email link. Formspree processes the submitted contact details.
- If the endpoint changes, update it in both files. Send a test from the live site and confirm that the message arrives in the configured inbox.

## Update the GitHub Pages site

The portfolio is published at [maleeshadewmina.github.io](https://maleeshadewmina.github.io/).

1. Test your changes locally, then commit and push them to `main` in this repository. Keep `index.html`, the CSS and JavaScript files, `assets/`, the CV PDF, and `.nojekyll` in their existing locations.
2. After GitHub Pages deploys, open the live site and check the affected pages, gallery links, and CV PDF as applicable. If the contact form or its configuration changed, send a test from the live site and confirm delivery in the configured inbox.
3. If Pages needs to be reconfigured, go to **Settings → Pages**, choose **Deploy from a branch**, and select `main` and `/(root)`.
4. If the site URL changes, update the canonical and social-sharing URLs in `index.html`, along with `sitemap.xml`, `robots.txt`, `site.webmanifest`, and the back link in `404.html`. If the sharing metadata changes, check the preview on LinkedIn or WhatsApp after deployment.

### Important publishing checks

- Anyone can access the publicly published CV and all content in a public repository. Review personal details first.
- Some screenshots are linked to remote public GitHub image URLs; missing/broken links gracefully show fallback UI locally. They have not been replaced with synthetic project screenshots.
- `assets/social-preview.jpg` is an original graphic composed from the same uploaded portrait.
- The project tours are screenshots, not live demos. Only add real demo links or videos when actually available.

## Source files

```text
index.html                     Page sections and metadata
styles.css                     Core design system
extra-features.css             Existing case studies, skills, terminal, contact styling
typing-and-readability.css     Rotating headline layout and larger body text
portfolio-v3.css               New walkthroughs, career timeline, effects
projects-data.js               Original 13 projects and 87 gallery entries
script.js                      Navigation, projects and gallery
extra-features.js              Case studies, command palette, skills, terminal, live form
hero-typing.js                 Four-phrase typing animation
portfolio-v3.js                Three screenshot tours and subtle pointer effects
assets/                        Profile photo, screenshots and sharing artwork
Maleesha_Perera_Modern_Creative_CV.pdf
site.webmanifest
robots.txt
sitemap.xml
404.html
.nojekyll
```

## Validation performed

- Offline Chromium browser preview at widths **1440, 1024, 768, 390, and 320 px**: no JavaScript page errors or horizontal page overflow.
- Project data: **13 projects, 87 gallery references**; all referenced local gallery and page resources present.
- Walkthrough modal: open, next step, arrow-key navigation and close tested.
- Command palette navigation, original project and skills rendering, hero portrait, reduced-motion headline and contact validation tested.
- The contact form's success path was exercised with a mocked provider response during local validation. The site owner later confirmed inbox delivery from the active Formspree setup.
- No Lighthouse score is claimed. Use Chrome DevTools → Lighthouse once the site is deployed to check real network conditions and optimise any remaining external images.
