ARUN R — PORTFOLIO WEBSITE
==========================

WHAT'S INSIDE
-------------
index.html      Home page (hero, objective, skills, education, certifications, achievements)
projects.html   Internship + 5 projects (ARIA, Market Diagnosis Platform, Hand Gesture Mouse
                Controller, Agri Smart, Fast Law)
contact.html    Phone, email, LinkedIn, GitHub
css/style.css   All styling (dark navy/violet "circuit depth" theme, glass panels, no skill
                percentage bars — tag chips instead)
js/main.js      Neural-thread canvas animation, video autoplay/pause handling, scroll reveals
assets/videos/  Your three uploaded clips, used as backdrop video on Home, Projects, and Contact
assets/posters/ First-frame images used as instant placeholders while each video loads

HOW TO VIEW IT
--------------
Just double-click index.html — it opens directly in any browser, no install or server needed.
(If your browser blocks video autoplay when opened as a local file, use "Open with Live Server"
in VS Code, or run `python3 -m http.server` from this folder and visit http://localhost:8000.)

HOW TO PUT IT ONLINE (free)
----------------------------
Easiest option — Netlify Drop:
1. Go to https://app.netlify.com/drop
2. Drag this whole folder onto the page
3. You get a live link in seconds

Or GitHub Pages, since you already have a GitHub account:
1. Create a new repo, e.g. "portfolio"
2. Upload all these files (keep the folder structure)
3. Settings → Pages → set source to the main branch
4. Your site goes live at https://Ar-123629.github.io/portfolio

ONE THING TO DOUBLE-CHECK
--------------------------
Your resume scan had a few handwritten notes flagging missing details:
  - Internship location & duration (NXTLOGIC Software Solutions) — not shown on resume
  - Specific tools used on the Market Diagnosis Platform, beyond "Explainable AI"
These weren't filled in anywhere so I wrote around them. If you want exact numbers/tools/dates
in there, search for "NXTLOGIC" in projects.html and add them directly — everything's plain,
readable HTML.

WANT A PHOTO INSTEAD OF THE "AR" MONOGRAM?
-------------------------------------------
No photo was included in your uploads, so the avatar is a lettermark. To swap in a real photo:
1. Drop your image into assets/img/ (create that folder)
2. In index.html, replace the `.idcard__avatar` block's <span>AR</span> with an <img> tag
   pointing at it — same idea in contact.html if you add a photo there too.
