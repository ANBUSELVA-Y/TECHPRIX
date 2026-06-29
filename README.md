# TECHPRIX Website

Multi-file, production-ready website for TECHPRIX — student tech services platform.

## File Structure

```
techprix/
├── index.html          ← Main HTML (entry point)
├── css/
│   ├── style.css       ← All layout & component styles
│   └── animations.css  ← Keyframes, scroll reveal, transitions
├── js/
│   ├── particles.js    ← Interactive canvas particle system
│   ├── projects.js     ← Projects data & dynamic rendering
│   ├── form.js         ← Contact form handler → sends to email
│   └── main.js         ← Navbar, counters, scroll, ripple, cursor
└── README.md
```

## How to Use

1. **Open locally:** Just open `index.html` in any browser. No server needed for basic use.

2. **Enable real email sending (free, no backend):**
   - Sign up at https://web3forms.com (free)
   - Get your Access Key
   - In `js/form.js`, replace `'YOUR_WEB3FORMS_KEY'` with your actual key
   - All form submissions will now be delivered to **techprix.site@gmail.com**

3. **Without API key:** The form uses your device's email client (mailto) as fallback — pre-fills the email so the user just hits Send.

## Services Covered
- Project Development (₹2,000+)
- Project Guidance
- Internship Placement (₹1,000/month)
- Salary/Career Guidance
- Turnitin Plagiarism Check (₹1,500–₹2,000)
- Portfolio Website + Domain
- App Development (₹2,000+)
- Website Development (₹3,000+)

## Tech Stack
- Vanilla HTML5, CSS3, JavaScript (no frameworks, no build tools)
- Google Fonts (Inter + Space Grotesk)
- Canvas API for particle system
- IntersectionObserver for scroll reveal
- Web3Forms API for email (optional)

## Contact
techprix.site@gmail.com
