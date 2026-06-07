# YouTube Clone (Full Stack)

Simple YouTube clone with a Bun backend and React frontend.

## Backend

```bash
bun install
bun run index.ts   # http://localhost:3001
```

## Frontend

```bash
cd frontend
bun install
bun run dev        # http://localhost:3002
```

## Frontend routes

| Route | Screen | Description |
|-------|--------|-------------|
| `/` | LandingPage | Lists all videos from backend |
| `/upload` | UploadPage | Upload video URL + thumbnail (requires auth token) |
| `/signup` | SignupPage | Signup form (WIP) |
| `/signin` | SigninPage | Signin page (WIP) |
| `/watch` | VideoPage | Watch page placeholder |
| `/watch/:id` | WatchPage | Watch a single video by id |

## API used by frontend

- `GET  http://localhost:3001/videos`
- `POST http://localhost:3001/upload`

## Stack

- **Backend:** Bun, Prisma
- **Frontend:** React 19, react-router, axios, Bun
