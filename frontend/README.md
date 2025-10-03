# Google Gemini Student Community Frontend

## Project Overview
This is the frontend for the Google Gemini Student Community web app, built with React, Vite, Tailwind CSS, Framer Motion, and GSAP. It features a modern, Google-inspired UI, real-time messaging, and interactive student features.

---

## 🚀 Setup Instructions

### 1. Prerequisites
- Node.js (v18+ recommended)
- pnpm (recommended) or npm

### 2. Install Dependencies
```sh
pnpm install
# or
npm install
```

### 3. Development Server
```sh
pnpm dev
# or
npm run dev
```
Visit [http://localhost:5173](http://localhost:5173) in your browser.

### 4. Build for Production
```sh
pnpm build
# or
npm run build
```

### 5. Linting
```sh
pnpm lint
# or
npm run lint
```

---

## ✨ Features & Improvements

### UI/UX
- **Google-inspired Design:** Glass morphism, Google color palette, Material 3.0 elements
- **Animated Navbar:** Sleek, minimal, with animated logo and active route highlighting
- **Vibrant Homepage:** Animated logo with orbiting color particles, blurred firefly background, dynamic gradients
- **Responsive Layout:** Mobile-first, adaptive components
- **Footer:** Animated, with embedded map and lighting effects
- **Team Page:** Flipping cards, Google color themes, advanced animations
- **Events Page:** Interactive cards, staggered animations, expandable details

### Real-Time & Interactivity
- **Discussion Board:** Real-time messaging with socket.io, Google color accents, avatars, glass morphism
- **Global Messages Context:** Synchronized messages across pages
- **Animated Loader:** Hardware-accelerated, mobile-optimized, Google color rings
- **Gemini Clicks Challenge:** Interactive click counter for engagement

### Performance & Code Quality
- **Code Splitting:** Route-based lazy loading, manual vendor chunking for fast loads
- **Optimized Animations:** Framer Motion & GSAP, hardware acceleration, reduced device load
- **Linting & Formatting:** ESLint, consistent code style
- **Scroll Restoration:** Homepage always loads at top

### Accessibility & Polish
- **Focus & Selection Styling:** Google blue outline, custom selection
- **Optimized Scrollbars:** Custom, minimal, Google-themed
- **Micro-interactions:** Subtle hover, tap, and focus effects throughout

---

## 🛠️ Tech Stack
- React 19
- Vite
- Tailwind CSS 4
- Framer Motion
- GSAP
- Socket.io-client
- Lucide React
- Axios

---

## 📁 Project Structure
```
frontend/
	src/
		components/
		pages/
		assets/
		index.css
		main.jsx
	public/
	package.json
	vite.config.js
	README.md
```

---

## 💡 Backend
See the `../backend/README.md` for backend setup and API details.

---

## 👏 Credits
- Designed and developed by the Google Gemini Student Community @ UEM Kolkata
- Inspired by Google Material Design and Gemini AI

---

## 📬 Feedback & Contributions
Feel free to open issues or pull requests for suggestions, improvements, or bug fixes!
# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
