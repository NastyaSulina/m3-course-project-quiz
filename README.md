# m3-course-project-quiz

A simple BuzzFeed-style quiz called "Which song in the playlist are you?", built with TypeScript as part of my Harbour.Space course project.

The goal was to put the concepts from the course into practice: TypeScript types and guards, JSON validation, modlets, pnpm workspaces, Nx, CLI commands, and Fastify. The project includes a CLI and a web app that use the same API to play quizzes, submit answers, and get results.

## Run

Requires Node.js 24 and pnpm 12.

Install dependencies:

```bash
pnpm install
```

Start the server:

```bash
pnpm dev:server
```

Play in the terminal (example usage):

```bash
pnpm start:cli play playlist --name Anastasiia
```

Replay saved answers:

```bash
pnpm start:cli replay playlist
```

Play in the browser:

```bash
pnpm dev:web
```

Build and preview:

```bash
pnpm build:web
pnpm preview:web
```

Keep the server running for both CLI and web.

## Linting

```bash
pnpm lint
pnpm knip
```

## Monorepo structure

- `apps/api`: Fastify routes, in-memory sessions, and server-side scoring.
- `apps/cli`: interactive play and replay commands using Commander and Inquirer.
- `apps/web`: a small Vite app for playing the quiz in the browser.
- `features/quiz`: quiz data, types, guards, game logic, and shared API services.
- `internal/tooling`: shared TypeScript, ESLint, and Prettier configs.

## Current state

**What works**

Both CLI and web use the same API, which manages sessions, validates answers, calculates scores, and returns results.

- The CLI supports interactive play with a custom name. 
- The web app shows questions one by one, tracks progress, displays results, lets you restart.

For now, there's only one quiz — `playlist`. But the project supports adding more quizzes through JSON.

**What's still missing**

- **Replay**: It currently reads one predefined `game.json` instead of saving actual play sessions. I'd like to store submissions per session and replay a specific game later.
- **Persistence** doesn't exist yet. The server keeps sessions in a `Map`, so everything disappears after a restart.
- **Web** currently starts the `playlist` quiz directly. There's no quiz selection or replay, and the interface only covers the basic flow.

**What I'd do next**

- Add a database to persist sessions, submissions, and results.
- Support game history and replay by session ID.
- I'd add quiz selection in the web app, a few more quizzes, and improve the experience around loading and errors.
