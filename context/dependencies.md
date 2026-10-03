# Packages and scripts

All declared direct packages, requested ranges, lockfile versions, installed versions and static import evidence. Absence of imports is not proof that a framework peer/tool is removable. Installed versions are a local snapshot; the lockfile is the reproducible-install reference. No package advisory audit or latest-version claim is made.

## dependencies

| Package | Requested | Locked | Installed | Import evidence / role |
|---|---|---|---|---|
| `@apollo/server` | ^4.9.5 | 4.13.0 | 4.13.0 | No first-party TS import; inspect framework peer, script or config usage before removal. |
| `@nestjs/apollo` | ^12.0.10 | 12.2.2 | 12.2.2 | `apps/nestar-api/src/app.module.ts` |
| `@nestjs/axios` | ^3.0.1 | 3.1.3 | 3.1.3 | `apps/nestar-api/src/components/auth/auth.module.ts` |
| `@nestjs/common` | ^10.0.0 | 10.4.22 | 10.4.22 | `apps/nestar-api/src/app.controller.ts`, `apps/nestar-api/src/app.module.ts`, `apps/nestar-api/src/app.service.ts`, `apps/nestar-api/src/components/auth/auth.module.ts`, `apps/nestar-api/src/components/auth/auth.service.ts`, `apps/nestar-api/src/components/auth/decorators/authMember.decorator.ts`, `apps/nestar-api/src/components/auth/decorators/roles.decorator.ts`, `apps/nestar-api/src/components/auth/guards/auth.guard.ts`, `apps/nestar-api/src/components/auth/guards/roles.guard.ts`, `apps/nestar-api/src/components/auth/guards/without.guard.ts`, `apps/nestar-api/src/components/board-article/board-article.module.ts`, `apps/nestar-api/src/components/board-article/board-article.resolver.ts`, `apps/nestar-api/src/components/board-article/board-article.service.ts`, `apps/nestar-api/src/components/comment/comment.module.ts`, `apps/nestar-api/src/components/comment/comment.resolver.ts`, `apps/nestar-api/src/components/comment/comment.service.ts`, `apps/nestar-api/src/components/components.module.ts`, `apps/nestar-api/src/components/follow/follow.module.ts`, `apps/nestar-api/src/components/follow/follow.resolver.ts`, `apps/nestar-api/src/components/follow/follow.service.ts`, `apps/nestar-api/src/components/like/like.module.ts`, `apps/nestar-api/src/components/like/like.service.ts`, `apps/nestar-api/src/components/member/member.module.ts`, `apps/nestar-api/src/components/member/member.resolver.ts`, `apps/nestar-api/src/components/member/member.service.ts`, `apps/nestar-api/src/components/property/property.module.ts`, `apps/nestar-api/src/components/property/property.resolver.ts`, `apps/nestar-api/src/components/property/property.service.ts`, `apps/nestar-api/src/components/view/view.module.ts`, `apps/nestar-api/src/components/view/view.service.ts`, `apps/nestar-api/src/database/database.module.ts`, `apps/nestar-api/src/libs/interceptor/Logging.interceptor.ts`, `apps/nestar-api/src/main.ts`, `apps/nestar-api/src/socket/socket.gateway.ts`, `apps/nestar-api/src/socket/socket.module.ts`, `apps/nestar-api/test/app.e2e-spec.ts`, `apps/nestar-batch/src/batch.controller.ts`, `apps/nestar-batch/src/batch.module.ts`, `apps/nestar-batch/src/batch.service.ts`, `apps/nestar-batch/src/database/database.module.ts`, `apps/nestar-batch/test/app.e2e-spec.ts` |
| `@nestjs/config` | ^3.1.1 | 3.3.0 | 3.3.0 | `apps/nestar-api/src/app.module.ts`, `apps/nestar-batch/src/batch.module.ts` |
| `@nestjs/core` | ^10.0.0 | 10.4.22 | 10.4.22 | `apps/nestar-api/src/components/auth/guards/roles.guard.ts`, `apps/nestar-api/src/main.ts`, `apps/nestar-batch/src/main.ts` |
| `@nestjs/graphql` | ^12.0.10 | 12.2.2 | 12.2.2 | `apps/nestar-api/src/app.module.ts`, `apps/nestar-api/src/app.resolver.ts`, `apps/nestar-api/src/components/board-article/board-article.resolver.ts`, `apps/nestar-api/src/components/comment/comment.resolver.ts`, `apps/nestar-api/src/components/follow/follow.resolver.ts`, `apps/nestar-api/src/components/member/member.resolver.ts`, `apps/nestar-api/src/components/property/property.resolver.ts`, `apps/nestar-api/src/libs/dto/board-article/board-article.input.ts`, `apps/nestar-api/src/libs/dto/board-article/board-article.ts`, `apps/nestar-api/src/libs/dto/board-article/board-article.update.ts`, `apps/nestar-api/src/libs/dto/comment/comment.input.ts`, `apps/nestar-api/src/libs/dto/comment/comment.ts`, `apps/nestar-api/src/libs/dto/comment/comment.update.ts`, `apps/nestar-api/src/libs/dto/follow/follow.input.ts`, `apps/nestar-api/src/libs/dto/follow/follow.ts`, `apps/nestar-api/src/libs/dto/like/like.input.ts`, `apps/nestar-api/src/libs/dto/like/like.ts`, `apps/nestar-api/src/libs/dto/member/member.input.ts`, `apps/nestar-api/src/libs/dto/member/member.ts`, `apps/nestar-api/src/libs/dto/member/member.update.ts`, `apps/nestar-api/src/libs/dto/property/property.input.ts`, `apps/nestar-api/src/libs/dto/property/property.ts`, `apps/nestar-api/src/libs/dto/property/property.update.ts`, `apps/nestar-api/src/libs/dto/view/view.input.ts`, `apps/nestar-api/src/libs/dto/view/view.ts`, `apps/nestar-api/src/libs/enums/board-article.enum.ts`, `apps/nestar-api/src/libs/enums/comment.enum.ts`, `apps/nestar-api/src/libs/enums/common.enum.ts`, `apps/nestar-api/src/libs/enums/like.enum.ts`, `apps/nestar-api/src/libs/enums/member.enum.ts`, `apps/nestar-api/src/libs/enums/notice.enum.ts`, `apps/nestar-api/src/libs/enums/notification.enum.ts`, `apps/nestar-api/src/libs/enums/property.enum.ts`, `apps/nestar-api/src/libs/enums/view.enum.ts`, `apps/nestar-api/src/libs/interceptor/Logging.interceptor.ts` |
| `@nestjs/jwt` | ^10.2.0 | 10.2.0 | 10.2.0 | `apps/nestar-api/src/components/auth/auth.module.ts`, `apps/nestar-api/src/components/auth/auth.service.ts` |
| `@nestjs/mongoose` | ^10.0.2 | 10.1.0 | 10.1.0 | `apps/nestar-api/src/components/board-article/board-article.module.ts`, `apps/nestar-api/src/components/board-article/board-article.service.ts`, `apps/nestar-api/src/components/comment/comment.module.ts`, `apps/nestar-api/src/components/comment/comment.service.ts`, `apps/nestar-api/src/components/follow/follow.module.ts`, `apps/nestar-api/src/components/follow/follow.service.ts`, `apps/nestar-api/src/components/like/like.module.ts`, `apps/nestar-api/src/components/like/like.service.ts`, `apps/nestar-api/src/components/member/member.module.ts`, `apps/nestar-api/src/components/member/member.service.ts`, `apps/nestar-api/src/components/property/property.module.ts`, `apps/nestar-api/src/components/property/property.service.ts`, `apps/nestar-api/src/components/view/view.module.ts`, `apps/nestar-api/src/components/view/view.service.ts`, `apps/nestar-api/src/database/database.module.ts`, `apps/nestar-batch/src/batch.module.ts`, `apps/nestar-batch/src/batch.service.ts`, `apps/nestar-batch/src/database/database.module.ts` |
| `@nestjs/platform-express` | ^10.0.0 | 10.4.22 | 10.4.22 | No first-party TS import; inspect framework peer, script or config usage before removal. |
| `@nestjs/platform-socket.io` | ^10.2.10 | 10.4.22 | 10.4.22 | No first-party TS import; inspect framework peer, script or config usage before removal. |
| `@nestjs/platform-ws` | ^10.2.10 | 10.4.22 | 10.4.22 | `apps/nestar-api/src/main.ts` |
| `@nestjs/schedule` | ^4.0.0 | 4.1.2 | 4.1.2 | `apps/nestar-batch/src/batch.controller.ts`, `apps/nestar-batch/src/batch.module.ts` |
| `@nestjs/websockets` | ^10.2.10 | 10.4.22 | 10.4.22 | `apps/nestar-api/src/socket/socket.gateway.ts` |
| `bcryptjs` | ^2.4.3 | 2.4.3 | 2.4.3 | `apps/nestar-api/src/components/auth/auth.service.ts` |
| `class-transformer` | ^0.5.1 | 0.5.1 | 0.5.1 | No first-party TS import; inspect framework peer, script or config usage before removal. |
| `class-validator` | ^0.14.0 | 0.14.4 | 0.14.4 | `apps/nestar-api/src/libs/dto/board-article/board-article.input.ts`, `apps/nestar-api/src/libs/dto/board-article/board-article.update.ts`, `apps/nestar-api/src/libs/dto/comment/comment.input.ts`, `apps/nestar-api/src/libs/dto/comment/comment.update.ts`, `apps/nestar-api/src/libs/dto/follow/follow.input.ts`, `apps/nestar-api/src/libs/dto/like/like.input.ts`, `apps/nestar-api/src/libs/dto/member/member.input.ts`, `apps/nestar-api/src/libs/dto/member/member.update.ts`, `apps/nestar-api/src/libs/dto/property/property.input.ts`, `apps/nestar-api/src/libs/dto/property/property.update.ts`, `apps/nestar-api/src/libs/dto/view/view.input.ts` |
| `graphql` | ^16.8.1 | 16.14.2 | 16.14.2 | No first-party TS import; inspect framework peer, script or config usage before removal. |
| `graphql-upload` | ^13.0.0 | 13.0.0 | 13.0.0 | `apps/nestar-api/src/components/member/member.resolver.ts`, `apps/nestar-api/src/main.ts` |
| `moment` | ^2.29.4 | 2.30.1 | 2.30.1 | `apps/nestar-api/src/components/property/property.service.ts`, `apps/nestar-batch/src/batch.controller.ts` |
| `mongoose` | ^8.0.0 | 8.24.2 | 8.24.2 | `apps/nestar-api/src/components/board-article/board-article.resolver.ts`, `apps/nestar-api/src/components/board-article/board-article.service.ts`, `apps/nestar-api/src/components/comment/comment.resolver.ts`, `apps/nestar-api/src/components/comment/comment.service.ts`, `apps/nestar-api/src/components/follow/follow.resolver.ts`, `apps/nestar-api/src/components/follow/follow.service.ts`, `apps/nestar-api/src/components/like/like.service.ts`, `apps/nestar-api/src/components/member/member.resolver.ts`, `apps/nestar-api/src/components/member/member.service.ts`, `apps/nestar-api/src/components/property/property.resolver.ts`, `apps/nestar-api/src/components/property/property.service.ts`, `apps/nestar-api/src/components/view/view.service.ts`, `apps/nestar-api/src/database/database.module.ts`, `apps/nestar-api/src/libs/dto/board-article/board-article.input.ts`, `apps/nestar-api/src/libs/dto/board-article/board-article.ts`, `apps/nestar-api/src/libs/dto/board-article/board-article.update.ts`, `apps/nestar-api/src/libs/dto/comment/comment.input.ts`, `apps/nestar-api/src/libs/dto/comment/comment.ts`, `apps/nestar-api/src/libs/dto/comment/comment.update.ts`, `apps/nestar-api/src/libs/dto/follow/follow.input.ts`, `apps/nestar-api/src/libs/dto/follow/follow.ts`, `apps/nestar-api/src/libs/dto/like/like.input.ts`, `apps/nestar-api/src/libs/dto/like/like.ts`, `apps/nestar-api/src/libs/dto/member/member.ts`, `apps/nestar-api/src/libs/dto/property/property.input.ts`, `apps/nestar-api/src/libs/dto/property/property.ts`, `apps/nestar-api/src/libs/dto/property/property.update.ts`, `apps/nestar-api/src/libs/dto/view/view.input.ts`, `apps/nestar-api/src/libs/dto/view/view.ts`, `apps/nestar-api/src/libs/types/common.ts`, `apps/nestar-api/src/schemas/BoardArticle.model.ts`, `apps/nestar-api/src/schemas/Comment.model.ts`, `apps/nestar-api/src/schemas/Follow.model.ts`, `apps/nestar-api/src/schemas/Like.model.ts`, `apps/nestar-api/src/schemas/Member.model.ts`, `apps/nestar-api/src/schemas/Notice.model.ts`, `apps/nestar-api/src/schemas/Notification.model.ts`, `apps/nestar-api/src/schemas/Property.model.ts`, `apps/nestar-api/src/schemas/View.model.ts`, `apps/nestar-batch/src/batch.service.ts`, `apps/nestar-batch/src/database/database.module.ts` |
| `reflect-metadata` | ^0.1.13 | 0.1.14 | 0.1.14 | No first-party TS import; inspect framework peer, script or config usage before removal. |
| `rxjs` | ^7.8.1 | 7.8.2 | 7.8.2 | `apps/nestar-api/src/components/like/like.service.ts`, `apps/nestar-api/src/libs/config.ts`, `apps/nestar-api/src/libs/interceptor/Logging.interceptor.ts` |
| `uuid` | ^14.0.2 | 14.0.2 | 14.0.2 | `apps/nestar-api/src/libs/config.ts` |
| `ws` | ^8.14.2 | 8.21.3 | 8.21.3 | `apps/nestar-api/src/socket/socket.gateway.ts` |
## devDependencies

| Package | Requested | Locked | Installed | Import evidence / role |
|---|---|---|---|---|
| `@nestjs/cli` | ^10.0.0 | 10.4.9 | 10.4.9 | No first-party TS import; inspect framework peer, script or config usage before removal. |
| `@nestjs/schematics` | ^10.0.0 | 10.2.3 | 10.2.3 | No first-party TS import; inspect framework peer, script or config usage before removal. |
| `@nestjs/testing` | ^10.0.0 | 10.4.22 | 10.4.22 | `apps/nestar-api/test/app.e2e-spec.ts`, `apps/nestar-batch/test/app.e2e-spec.ts` |
| `@types/express` | ^4.17.17 | 4.17.25 | 4.17.25 | No first-party TS import; inspect framework peer, script or config usage before removal. |
| `@types/jest` | ^29.5.2 | 29.5.14 | 29.5.14 | No first-party TS import; inspect framework peer, script or config usage before removal. |
| `@types/node` | ^20.3.1 | 20.19.43 | 20.19.43 | No first-party TS import; inspect framework peer, script or config usage before removal. |
| `@types/supertest` | ^2.0.12 | 2.0.16 | 2.0.16 | No first-party TS import; inspect framework peer, script or config usage before removal. |
| `@types/ws` | ^8.5.10 | 8.18.1 | 8.18.1 | No first-party TS import; inspect framework peer, script or config usage before removal. |
| `@typescript-eslint/eslint-plugin` | ^8.66.0 | 8.66.0 | 8.66.0 | No first-party TS import; inspect framework peer, script or config usage before removal. |
| `@typescript-eslint/parser` | ^8.66.0 | 8.66.0 | 8.66.0 | No first-party TS import; inspect framework peer, script or config usage before removal. |
| `cross-env` | ^10.1.0 | 10.1.0 | 10.1.0 | No first-party TS import; inspect framework peer, script or config usage before removal. |
| `eslint` | ^8.42.0 | 8.57.1 | 8.57.1 | No first-party TS import; inspect framework peer, script or config usage before removal. |
| `eslint-config-prettier` | ^9.0.0 | 9.1.2 | 9.1.2 | No first-party TS import; inspect framework peer, script or config usage before removal. |
| `eslint-plugin-prettier` | ^5.0.0 | 5.5.6 | 5.5.6 | No first-party TS import; inspect framework peer, script or config usage before removal. |
| `jest` | ^29.5.0 | 29.7.0 | 29.7.0 | No first-party TS import; inspect framework peer, script or config usage before removal. |
| `prettier` | ^3.0.0 | 3.9.6 | 3.9.6 | No first-party TS import; inspect framework peer, script or config usage before removal. |
| `source-map-support` | ^0.5.21 | 0.5.21 | 0.5.21 | No first-party TS import; inspect framework peer, script or config usage before removal. |
| `supertest` | ^6.3.3 | 6.3.4 | 6.3.4 | `apps/nestar-api/test/app.e2e-spec.ts`, `apps/nestar-batch/test/app.e2e-spec.ts` |
| `ts-jest` | ^29.1.0 | 29.4.12 | 29.4.12 | No first-party TS import; inspect framework peer, script or config usage before removal. |
| `ts-loader` | ^9.4.3 | 9.6.2 | 9.6.2 | No first-party TS import; inspect framework peer, script or config usage before removal. |
| `ts-node` | ^10.9.1 | 10.9.2 | 10.9.2 | No first-party TS import; inspect framework peer, script or config usage before removal. |
| `tsconfig-paths` | ^4.2.0 | 4.2.0 | 4.2.0 | No first-party TS import; inspect framework peer, script or config usage before removal. |
| `typescript` | ^5.1.3 | 5.9.3 | 5.9.3 | No first-party TS import; inspect framework peer, script or config usage before removal. |
| `typescript-eslint` | ^8.66.0 | 8.66.0 | 8.66.0 | No first-party TS import; inspect framework peer, script or config usage before removal. |

## Script-by-script

| Name | Exact command |
|---|---|
| `build` | `nest build` |
| `format` | `prettier --write "apps/**/*.ts" "libs/**/*.ts"` |
| `start` | `nest start` |
| `start:dev` | `nest start --watch` |
| `start:dev:batch` | `nest start nestar-batch --watch` |
| `start:debug` | `nest start --debug --watch` |
| `start:prod` | `cross-env NODE_ENV=production node dist/apps/nestar-api/main` |
| `start:prod:batch` | `node dist/apps/nestar-batch/main` |
| `lint` | `eslint "{src,apps,libs,test}/**/*.ts" --fix` |
| `test` | `jest` |
| `test:watch` | `jest --watch` |
| `test:cov` | `jest --coverage` |
| `test:debug` | `node --inspect-brk -r tsconfig-paths/register -r ts-node/register node_modules/.bin/jest --runInBand` |
| `test:e2e` | `jest --config ./apps/nestar-api/test/jest-e2e.json` |

## Undeclared direct imports

- `bson`: `apps/nestar-api/src/libs/config.ts`. Currently relies on transitive installation.
- `express`: `apps/nestar-api/src/main.ts`. Currently relies on transitive installation.
- eslint.config.mjs imports `@eslint/js` and `globals` without direct declarations.

## Lockfile structure

lockfileVersion=3; 1086 package records including root; 19 records include deprecation metadata. Root declarations match: true.

## Package roles and cautions

Nest core/common/Express provide HTTP and dependency injection; Apollo/GraphQL supply code-first schema; Mongoose integrates MongoDB; JWT and bcryptjs handle auth; validator/transformer back ValidationPipe; schedule drives cron; ws/platform-ws supply the selected socket adapter. RxJS backs interceptors/framework streams; moment makes dates; UUID names uploads. `@nestjs/axios` is registered through HttpModule without an outbound HTTP call found. Socket.IO adapter is declared but main.ts selects WsAdapter. `reflect-metadata` is framework support, not necessarily directly imported by app files. Jest/ts-jest/Supertest are the test stack; Nest CLI/webpack/ts-loader and TypeScript compile; ESLint/Prettier format and lint; ts-node/paths/source-map-support support tooling. `cross-env` is a devDependency required by start:prod, so production installs omitting dev packages cannot execute that script unchanged. No engines or packageManager pin exists.
