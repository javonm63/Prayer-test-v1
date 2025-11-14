## Prayer Assessment Backend

Express/MongoDB API that powers authentication, dashboard data, and chanting count tracking for the Prayer Assessment test project.

### Assessment Tasks (Backend Focus)
Candidates should complete the full brief in the root `README.md`. Backend-specific expectations:
- Persist individual count events (see `models/Count.js`) and expose a paginated `/api/dashboard/history` endpoint grouping totals per day per user.
- Extend the existing `/api/dashboard/count` logic to fan out to the session log in the same transaction.
- Add input validation + helpful errors for the new endpoints.
- Update this README with any assumptions plus run/test instructions for reviewers.

### Prerequisites
- Node.js 18+
- npm 9+
- MongoDB database/Atlas cluster

### Environment Variables
Create `Backend/.env`:
```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=super_secret_jwt_key
MY_EMAIL=mailer@example.com
EMAIL_PASSWORD=app_password_or_smtp_secret
```

### Install & Run
```bash
cd Backend
npm install
npm run dev   # or npm start
```

### Available Routes
- `POST /api/auth/signup` – register, returns JWT
- `POST /api/auth/login` – authenticate, returns JWT
- `POST /api/auth/forgot-password` – send OTP email
- `POST /api/auth/reset-password` – verify OTP + set new password
- `GET /api/dashboard` – fetch count/rounds (requires `Authorization: Bearer <JWT>`)
- `POST /api/dashboard/count` – increment count for authenticated user

### Notes
- Configure `ALLOWED_ORIGINS` in `.env` to include whichever dev hosts the candidate needs.
- Ensure the Gmail account used for OTP email has App Passwords enabled or configure another SMTP provider.

