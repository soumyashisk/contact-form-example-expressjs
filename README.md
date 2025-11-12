# Contact Form Example Express.js

A minimal contact form example built with Express.js that serves static HTML pages from the `public/` folder and accepts form submissions. Submissions are stored in an in-memory array and can be viewed via a simple JSON endpoint. This project is intentionally small so it's easy to extend (add a DB, email delivery, validation, etc.).

## Features

- Static contact form UI served from `public/index.html` (Bootstrap is used for quick styling)
- POST `/contact` endpoint with basic email validation and redirect to success/failure pages
- GET `/messages` endpoint that returns submitted messages as JSON
- Messages are stored in a sqlite db

## Tech stack

- Node.js / Bun-friendly project (see `package.json`)
- Express 5
- Plain HTML/CSS (Bootstrap via CDN) for UI in `public/`

## Files of interest

- `index.js` — Express server and routes
- `package.json` — scripts and dependencies
- `public/index.html` — contact form
- `public/thankyou.html` — success page
- `public/invalid.html` — failure page
- `public/list.html` — client that fetches `/messages` and displays them

## How it works (brief)

1. Server serves static assets from `public/`.
2. When the form on `/` (index.html) posts to `/contact`, the server validates the email with a regex and checks there is a message.
3. If valid, the message (email + message text) is pushed to an in-memory `messages` array and the user is redirected to `/thankyou.html`.
4. If invalid, the user is redirected to `/invalid.html`.
5. The `GET /messages` endpoint returns the current `messages` array as JSON.

> Note: Because messages are kept in memory, restarting the server clears them.

## Prerequisites

- Node.js (v16+) or Bun (if you prefer). The project `package.json` includes an example dev script that runs with Bun (`bun --hot .`).

## Quickstart — Node (npm)

Open a terminal (PowerShell on Windows) and run:

```powershell
npm install
node index.js

# Then open http://localhost:3000 in your browser
```

## Quickstart — Bun (optional)

If you use Bun (recommended for the `dev` script in `package.json`):

```powershell
bun install
bun run dev

# Then open http://localhost:3000
```

## Endpoints

- POST /contact — accepts form fields `email` and `message` (form sends urlencoded body). Redirects to `/thankyou.html` or `/invalid.html`.
- GET /messages — returns JSON array of submitted messages: [{ email, message }, ...]

## Screenshot placeholders

Create a `screenshots/` directory in the project root and replace the placeholders below with real screenshots.

- Home / Contact form:

  ![Home / Contact form](screenshots/home.png)

- Thank you page:

  ![Thank you page](screenshots/thankyou.png)

- Messages list:

  ![Messages list](screenshots/list.png)

Tip: use `npx screengrab` or your OS screenshot tool and save images into `screenshots/`.

## Security & Production notes

- This project is for learning and demos only. It does not sanitize input or protect against CSRF, rate-limit submissions, or persist messages to a database.
- For production: add server-side validation, store messages in a persistent DB, and configure proper email sending (e.g., via an SMTP provider or an API like SendGrid). Add HTTPS and appropriate security headers.

## Next steps / Suggestions

- Persist messages to a database (SQLite, PostgreSQL, etc.)
- Send confirmation emails using Nodemailer or a transactional email service
- Add server-side form validation with detailed error messages
- Add unit/integration tests for the routes

## Contributing

Contributions welcome — open an issue or submit a PR. If you add features, please include tests and update this README with run instructions.

## License

This repository does not include a license file. Add one (for example, `MIT`) if you plan to share publicly.

---

If you'd like, I can also:

- generate a `screenshots/` directory and placeholder images,
- add a small `.env` example if you want to configure environment variables, or
- add a simple persistent storage example (low-risk: a small JSON file or SQLite integration).

Tell me which of those you'd like next.
