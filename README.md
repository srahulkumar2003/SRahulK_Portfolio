# Rahul Kumar Portfolio

Premium black-and-white software engineering portfolio built with React, Vite, Framer Motion, GSAP and custom CSS.

## What is improved in this version

- Added a recruiter snapshot section for quick HR scanning.
- Added outcome and proof lines inside project case-study cards.
- Added missing certificate proof items from available assets.
- Added Resume to navigation and fixed the scroll rail to include all sections.
- Changed project placeholder links into disabled buttons until real URLs are added.
- Added localStorage intro handling so visitors do not see the intro video on every refresh.
- Added reduced-motion support for accessibility.
- Removed `node_modules` from the deliverable and pinned dependency versions for cleaner installs.

## Run locally

```bash
npm install
npm run dev
```

Open the local URL shown by Vite, usually:

```text
http://localhost:5173
```

## Build

```bash
npm run build
```

## Main edit files

```text
src/data/portfolio.js
src/App.jsx
src/styles.css
```

## Where to add project links

Open `src/data/portfolio.js` and replace each placeholder:

```js
live: '#',
github: '#',
```

with your real Live Demo and GitHub links.
