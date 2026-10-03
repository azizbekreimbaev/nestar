# Development and operations

## Environment keys found in source

| Key | Use | Current default / selection |
|---|---|---|
| PORT_API | API HTTP/WebSocket listener | 3000 |
| PORT_BATCH | Batch HTTP listener | 3000; conflicts if both defaults used |
| NODE_ENV | Database selection; API prod script | Exact production selects MONGO_PROD; everything else MONGO_DEV |
| MONGO_DEV | Non-production Mongo URI | No fallback or validation |
| MONGO_PROD | Production Mongo URI | No fallback or validation |
| SECRET_TOKEN | JWT signing key | Interpolated during module registration; missing is unsafe |

`.env` exists and is ignored. Values were not read or reproduced. A sanitized `.env.example` is included with this bundle; it is documentation and does not configure a running app.

## Commands from repository root

```sh
npm ci
npm run start:dev
npm run start:dev:batch
npm run build
npx nest build nestar-batch
```

These are setup/build instructions, not all executed during review. Default Nest project is `nestar` (API), not `nestar-api`. Two processes need distinct ports. Set NODE_ENV explicitly for batch production. `start:prod` runs cross-env then dist/apps/nestar-api/main; `start:prod:batch` runs dist/apps/nestar-batch/main directly. Verify build output presence after each build because root deleteOutDir is enabled. A production install omitting devDependencies will not have cross-env for the API production script.

Uploads resolve relative to process working directory. Existing target directories must exist; uploader does not create them. Local ephemeral storage or multiple API replicas require a persistence/shared-storage strategy. No Docker/process-manager/CI/deployment configuration was found.

## Non-mutating checks

```sh
node node_modules/typescript/bin/tsc -p apps/nestar-api/tsconfig.app.json --noEmit --incremental false
node node_modules/typescript/bin/tsc -p apps/nestar-batch/tsconfig.app.json --noEmit --incremental false
node node_modules/eslint/bin/eslint.js "apps/**/*.ts"
node node_modules/jest/bin/jest.js --listTests --runInBand
```

`npm run lint` includes --fix; `npm run format` includes --write. Use the direct lint command for review. E2e tests import real application modules and their environment-selected Mongo connection. Batch test starts ScheduleModule. Use a disposable test database and controlled scheduler before running them; starting the real batch app can mutate rankings.

## Batch schedule

Daily process-local schedule: reset 01:00:00, property rank 01:00:20, agent rank 01:00:40. No timezone option is configured, so do not infer Asia/Seoul merely from the reviewer's computer. No distributed lock/checkpoint/queue is present. Each instance schedules its own work. Logs catch job failures but expose no durable last-success state.

## Proposed release checks

Validate configuration at startup; pin/test runtime version; perform clean dependency installation in CI; build both apps; run isolated auth/domain tests; test artifact-only production start; confirm scheduled-job ownership and timezone; provision persistent upload storage and explicit CORS policy. This checklist is proposed work, not a claim about deployment readiness.
