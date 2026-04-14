# Kaushik Mahindra Kar Portfolio (React)

Modern multi-page portfolio built with React, Vite, and React Router.

## Tech Stack

- React 18
- Vite
- React Router DOM
- CSS (custom animations, theme support, responsive UI)

## Run Locally

```bash
cd /Users/kaushik/Desktop/Portfolio
npm install
npm run dev
```

Open the local URL shown in terminal (usually `http://localhost:4000` or next available port).

## Build

```bash
npm run build
npm run preview
```

## Project Structure

- `index.html` - Vite app entry HTML
- `src/main.jsx` - React bootstrap
- `src/App.jsx` - app shell, routes, theme/animation logic
- `src/components/` - shared UI (`Header`, `Footer`, `ContactStrip`)
- `src/pages/` - page-level components (`Home`, `About`, `Experience`, `Projects`, `Skills`, `Contact`)
- `src/styles.css` - complete design system + animations
- `public/assets/` - profile and project images

## Features

- Multi-page portfolio via client-side routing
- Day/Night mode with local storage persistence
- Animated counters, reveal effects, tilt cards, particle background
- Recruiter-focused sections for experience, projects, and skills
