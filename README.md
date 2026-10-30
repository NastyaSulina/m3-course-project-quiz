# m3-course-project-quiz

A simple BuzzFeed-style quiz called "Which song in the playlist are you?" built with TypeScript. Each answer has a weight, the total weight decides your result.

## Run

```bash
pnpm install
pnpm start
```

## Linting

TypeScript, ESLint and Prettier checks:

```bash
pnpm lint
```

## Monorepo structure
- `apps/cli`: runs the quiz and displays the result
- `features/quiz`: quiz data, types, validation, scoring and session management 
- `internal/tooling`: shared TypeScript, ESLint and Prettier settings