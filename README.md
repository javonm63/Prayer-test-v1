## Prayer Fullstack Assessment

This repository hosts the baseline “Prayer Assessment” project that candidates will extend during the hiring process. It already includes:
- Backend: Express + MongoDB auth, dashboard, OTP password reset.
- Frontend: React + Vite single-page app with navbar, hero, Prayer counter, protected dashboard, and password reset UI.

### Candidate Objectives
Build a production-friendly history feature and improve overall resilience. Treat the existing code as legacy that you can refactor when needed.

#### 1. Persist Individual Sessions
- Reuse/extend `Backend/models/Count.js` so every button press (or batch increment) is stored with `userId`, `countDelta`, and timestamp.
- Update the `/api/dashboard/count` controller to create these records atomically with the running totals.

#### 2. Expose History APIs
- Add `GET /api/dashboard/history?limit=30&range=daily` (protected) that returns the most recent aggregates for the authenticated user:
  ```json
  {
    "totals": [
      { "date": "2025-01-18", "count": 54, "rounds": 0 },
      ...
    ],
    "streak": 5
  }
  ```
- Keep the endpoint efficient (indexes, pagination) and validate query params.

#### 3. Build a History View
- Add a `History` route in the frontend that calls the new endpoint, draws a chart (Recharts already installed), and lists raw session events.
- Link to the view from the dashboard and/or navbar. Make it responsive and handle empty/loading/error states gracefully.

#### 4. UX & DX Polish
- Keep the dashboard in sync when the counter increments (e.g., optimistic update or refetch).
- Provide `.env.example` files for both backend and frontend describing required variables.
- Update Backend/Frontend READMEs with any additional run/test instructions or assumptions.

#### 5. Documentation & Submission
- Summarize your approach, trade-offs, and testing strategy in the `README.md` (this file or a linked doc).
- Share installation commands a reviewer can run to verify your work.
- Include anything you would normally ship to production (linters, tests, scripts) if time allows.

### Evaluation Criteria
- Correctness: endpoints, data model, and UI behave as specified.
- Code quality: clear structure, consistent styling, sensible abstractions.
- UX polish: accessible, responsive, and resilient flows.
- Testing & verification notes.
- Communication: README clarity and documented assumptions.

### How to Submit
1. Fork or clone this repo into your own space.
2. Implement the tasks above (feel free to add libraries you can justify).
3. Update the READMEs with instructions + screenshots/GIFs if helpful.
4. Provide a link to your repository (and deployed demo if available).

Good luck, and thanks for taking the time to show us your approach!

