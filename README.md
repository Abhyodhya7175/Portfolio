# Abhyodhya Portfolio

Modern single-page portfolio built with React and Vite, with rich motion powered by Anime.js and smooth transition handling via Barba.js.

## Overview

This project is a personal developer portfolio showcasing:
- Hero and intro content
- About section
- Skills and tech stack
- Project highlights
- Certifications
- Education and hackathons
- Contact section

The UI uses custom styling and interaction-focused animation to create a premium scrolling experience.

## Tech Stack

- React 19
- Vite 8
- Anime.js 4
- Barba.js 2
- Plain CSS (custom, component-scoped and global)

## Features

- Smooth intro timelines for hero and navigation
- Scroll-triggered reveal animations for sections and cards
- Hover interaction animations for links and buttons
- Section-jump transition effect for anchor navigation
- Barba wrapper/container setup for transition-ready architecture
- Responsive layout across desktop and mobile

## Project Structure

- AbhyodhyaPortfolio.jsx: Main portfolio UI and animation logic
- main.jsx: App bootstrap and Barba transition initialization
- index.html: Root HTML and Barba wrapper/container attributes
- index.css: Global stylesheet entry
- dist/: Production build output

## Getting Started

### Prerequisites

- Node.js 18 or later
- npm (bundled with Node.js)

### Install Dependencies

npm install

### Run Development Server

npm run dev

Open the local URL shown in your terminal.

### Build for Production

npm run build

### Preview Production Build

npm run preview

## Available Scripts

- npm run dev: Starts Vite development server
- npm run build: Creates optimized production build in dist folder
- npm run preview: Serves the production build locally

## Animation Notes

### Anime.js Usage

Anime.js is used for:
- Intro timelines
- Hover animations
- Scroll reveals
- Section transition effects

### Barba.js Usage

Barba is initialized in main.jsx and currently configured with fade + vertical motion transitions between containers.

Since this is currently a single-page app, Barba effects are limited unless you add additional page containers/routes.

## Deployment

You can deploy the dist output to static hosting platforms such as:
- Vercel
- Netlify
- GitHub Pages
- Cloudflare Pages

Typical flow:
1. npm install
2. npm run build
3. Deploy dist folder

### GitHub Pages

This repository includes a GitHub Actions workflow at [.github/workflows/deploy.yml](.github/workflows/deploy.yml) that builds the app and publishes the `dist` folder to GitHub Pages on every push to `main`.

Before the first publish, make sure GitHub Pages is set to use GitHub Actions in the repository settings.

## Customization

You can personalize content by editing:
- Text and section data in AbhyodhyaPortfolio.jsx
- Color palette and typography in the GlobalStyles block
- Animation timing and easing in Anime.js calls

## Troubleshooting

- White screen after dependency changes:
  - Re-run npm install
  - Re-run npm run dev
  - Hard refresh browser

- Port already in use:
  - Vite automatically picks the next available port

- Build issues after package updates:
  - Delete node_modules and package-lock.json
  - Run npm install again

## License

This project is currently configured as ISC in package.json.
