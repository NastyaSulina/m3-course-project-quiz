# m3-course-project-quiz

A simple BuzzFeed-style quiz called "Which song in the playlist are you?" built with TypeScript. Each answer has a weight, the total weight decides your result.

## Run

Install dependencies:
`pnpm install`

Start the server:
`pnpm dev:server`

Play the quiz in the terminal (example usage):
`pnpm start:cli play playlist --name Anastasiia`

Replay the quiz using saved answers (example usage):
`pnpm start:cli replay playlist`

Help:
`pnpm start:cli --help`

Play the quiz in the browser:
`pnpm dev:web`

Keep the server running while using the CLI or web app.

## Linting

TypeScript, ESLint and Prettier checks:

```bash
pnpm lint
```

## Monorepo structure

- `apps/api`: Fastify server, routes, session management and scoring
- `apps/cli`: terminal quiz with interactive play and replay commands
- `apps/web`: browser quiz with questions, progress and results
- `features/quiz`: quiz data, types, validation, game logic and API services
- `internal/tooling`: shared TypeScript, ESLint and Prettier settings
