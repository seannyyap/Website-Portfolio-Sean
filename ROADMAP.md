# The Ultimate Portfolio Launch Roadmap 🚀

This is the exact sequence of steps we will take to finish building this Next.js + Sanity.io portfolio.

## Phase 1: The CMS Engine (Sanity Studio)
*Current Goal: Build the database and the Admin Dashboard.*

- [x] **Install Sanity SDK**: Run `npm install sanity next-sanity @sanity/vision` inside the `frontend` folder.
- [x] **Configure the `/admin` Route**: Set up Next.js so that going to yourwebsite.com/admin opens the Sanity Studio dashboard securely.
- [x] **Define the Database Schemas**: Tell the database exactly what fields a "Project" and "Experience" need (e.g., Title, Image, Tech Stack flags, Description, GitHub Link).
- [ ] **Initial Data Entry**: Log into the new dashboard and manually type in your 2-3 best projects so the database isn't empty.

## Phase 2: The Frontend Integration (API Wiring)
*Current Goal: Make your Next.js site display the real data from Sanity.*

- [x] **Configure GROQ Queries**: Write the database queries to fetch data from Sanity.
- [x] **Wire up `<Projects />`**: Swap out the hardcoded fake projects with a dynamic `.map()` function that renders the live Sanity data.
- [x] **Wire up `<Experience />`**: Same as above, replacing the fake jobs with live database jobs.
- [x] **Image Optimization**: Connect Next.js `next/image` to Sanity's ultra-fast image CDN so your project thumbnails load instantly.

## Phase 3: Content Management & Automation (Sanity-first)
*Current Goal: Manage everything from Sanity, with optional one-click sync helpers.*

- [x] **Sanity-controlled sections**: Ensure Hero/About/TechStack/Contact/Footer/Navigation are all driven by a single `siteSettings` document.
- [x] **GitHub Sync (Manual, in Studio)**: Add a Studio tool/button that imports GitHub repos into `project` documents (editable after sync).
- [ ] **(Optional) LinkedIn Experience Sync**: Only if it’s worth it. Otherwise: manually maintain 3–6 experiences in Sanity (fastest and most reliable).

## Phase 4: Final Polish & Launch
*Current Goal: Get it on the internet so recruiters can see it.*

- [ ] **SEO & Metadata**: Add your real name, generic social preview images (OpenGraph), and proper meta descriptions to `app/layout.tsx`.
- [ ] **Mobile Touch-up**: Do one final pass resizing the browser to ensure the new dynamic data looks perfect on mobile phones.
- [ ] **Deploy to Vercel**: Connect your GitHub repository to Vercel.com for free, instantly fast global hosting.
- [ ] **Live QA**: Test the live website. Ensure the animations are smooth and the cat behaves!
