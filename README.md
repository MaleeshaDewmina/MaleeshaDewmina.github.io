# Maleesha Perera — Developer Portfolio · Version 3

Modern, responsive portfolio for Maleesha Dewmina Perera. **No build step required**: works with VS Code Live Server and GitHub Pages. Includes the existing animated two-line headline, portrait, updated two-page creative CV, projects and galleries.

## What's included

- **13 existing projects, 87 gallery references, 12 technology filters**, and the original project descriptions and links. Some galleries point to GitHub-hosted screenshots and need internet access.
- **Interactive typing headline** with four rotating two-line messages, light/dark theme, command palette (`Ctrl/Cmd+K`), skills explorer, case-study dialogs, project search, simulated terminal, and mobile navigation.
- **Three new guided screenshot tours**: HealthTrack Pro, SmartMed and Velvet Vogue. These use original gallery screenshots and provide source links. EduMind AI is a **completed, deployed academic application** with a public [source repository](https://github.com/MaleeshaDewmina/EduMindAI-Learning-Assistant), [live sign-in page](https://edumind-ai-project.alwaysdata.net/auth/login), and seven documented screenshots. The other project tours show screenshots rather than hosted demos.
- **Career journey** connecting visual design, diploma recognition, OREL IT, and ongoing engineering studies. Earlier experience, education and achievement sections remain intact.
- **Contact form** with client-side validation, honeypot, provider feedback, copy-message alternative and an email link.
- **SEO**: canonical URL, social preview (`assets/social-preview.jpg`), Open Graph/Twitter tags, Person JSON-LD, favicon, touch icons, sitemap, robots.txt, and 404 page.
- **Design and accessibility polish**: adaptive cards, keyboard navigation, visible focus states, alt text, reduced-motion support and subtle optional pointer effects.

## Run locally

1. Extract the entire ZIP (do not open it directly).
2. Open the extracted folder in **VS Code**.
3. Right-click **index.html → Open with Live Server**.
4. Test the hero animation, screenshot walkthroughs, search, Ctrl/Cmd+K palette, skills explorer, theme, galleries and mobile navigation.
5. Test the form validation and copy-message button. **Submitting the form contacts an external provider**; see below before doing a real submission.

The site is static. You do not need npm, PHP, databases or credentials to browse it.

## Important: activate direct contact delivery

The form uses **FormSubmit.co** with the portfolio's existing public contact email `maleeshadewmina@gmail.com`.

- GitHub Pages **cannot receive form submissions itself**; the form sends its name, email, subject and message to `https://formsubmit.co/ajax/maleeshadewmina@gmail.com`.
- **First use requires activation:** from the deployed site, send one genuine test message (with your own details), then open the activation email sent to `maleeshadewmina@gmail.com` and follow its confirmation link. Until then **do not assume messages will be delivered**.
- After activating, send a second test and confirm that it reaches the inbox. You can also run a test from Live Server, but the production-site test is essential.
- No API keys or fabricated credentials are included. The sender can use the alternative **Copy message** option or direct email link if the service is unavailable.
- The form displays a confirmation only after the provider accepts the request. That acceptance does **not** guarantee mailbox delivery before activation. A honeypot discourages simple bots; it is not a complete anti-abuse system.
- Visitor-submitted data is processed by a third-party service. Review its privacy policy and your publication requirements before enabling public submissions. If preferred, replace the service with your own verified Formspree endpoint and adapt the handler in `extra-features.js`.

Provider documentation: https://formsubmit.co/documentation and https://formsubmit.co/ajax-documentation

## Publish to GitHub Pages **after you finish local testing**

1. Create a **public** repository called `MaleeshaDewmina.github.io` under your GitHub username.
2. Upload the **extracted files and folders**, including `index.html`, all `.css`/`.js` files, `assets/`, the updated creative CV PDF, and `.nojekyll` to the repository **root**. Do not upload only the ZIP.
3. In **Settings → Pages**, set **Deploy from a branch**, select `main` and `/(root)`.
4. Once deployed, open `https://maleeshadewmina.github.io/`. Test all visuals, gallery links, the contact form and the PDF.
5. The SEO canonical and social-sharing URLs are **preconfigured for that exact site address**. If the published URL or custom domain differs, update `index.html`, `sitemap.xml`, `robots.txt`, the website manifest and the `404.html` back link.
6. Social previews normally appear **only after the live site is publicly reachable** by preview bots. Use WhatsApp/LinkedIn sharing to inspect after publishing.

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
- Contact success path exercised using a **mocked provider response**. A live provider submission and activation must be done by the site owner; delivery was not tested against a real inbox.
- No Lighthouse score is claimed. Use Chrome DevTools → Lighthouse once the site is deployed to check real network conditions and optimise any remaining external images.
