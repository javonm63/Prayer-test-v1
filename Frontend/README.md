## Prayer Assessment Frontend

React 19 + Vite single-page app for tracking prayer/chant rounds, including animated hero, carousel, protected dashboard, and password recovery UI. This repo now serves as the take-home test harness for full-stack candidates.

### Assessment Tasks (Frontend Focus)
Read the complete brief in the root `README.md`. Frontend deliverables include:
- Add a “History” view reachable from the dashboard/nav that fetches `/api/dashboard/history` and visualizes per-day totals using Recharts.
- Surface the new data in the dashboard (e.g., daily streak, last 7 days) and ensure state stays in sync when the count button is pressed.
- Polish UX: handle loading/error states for the new view and make the app responsive down to 360px width.
- Document how to run your solution plus any trade-offs inside this README once finished.

### Features
- Auth screens for signup/login/forgot password
- Protected dashboard that fetches counts via JWT
- Prayer counter page with animated timer, local persistence, and API sync
- Framer Motion + GSAP animations and Slick carousel of deity images

### Prerequisites
- Node.js 18+
- npm 9+
- Backend API running locally or accessible via HTTPS

### Environment Variables
Create `Frontend/.env` (Vite will read `.env` automatically):
```
VITE_API_URL=http://localhost:5000
```
Point it at your deployed backend when running in production.

### Install & Run
```bash
cd Frontend
npm install
npm run dev
```
The dev server prints the local URL (defaults to `http://localhost:5173`). Ensure the backend is running and CORS allows the origin.

### Build
```bash
npm run build
npm run preview
```

### Project Structure
- `src/App.jsx` – routes + navigation
- `src/components` – dashboard, auth forms, counter, carousel, animations
- `src/assets` – carousel imagery
- `src/index.css` – Tailwind 4 styles + Slick overrides

### Running the Whole Project
1. Start the backend (`cd Backend && npm run dev`).
2. Configure `VITE_API_URL` to the backend origin.
3. Start the frontend (`cd Frontend && npm run dev`).
4. Visit the Vite dev URL; signup or login to get a token, then open `/dashboard` or `/Prayer`.
