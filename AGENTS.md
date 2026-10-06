# Instructions for coding agents

## Main rule: keep the project familiar

Make only the changes needed for the user's request. Preserve the existing folder structure, dependency set, naming, and patterns. Do not introduce extra frameworks, packages, configuration, abstractions, or files just because they are common elsewhere.

If a task seems to require a new dependency, a new folder, a significant architecture change, or a choice that could change user-visible behavior, stop and ask the user before proceeding. Do not silently make that choice.

Explain changes in plain language. In the final response, say what changed, which files changed, what checks were run, and clearly explain any new or unfamiliar concept. Mention any requested work that could not be completed.

## Project structure

This is a NestJS TypeScript monorepo with one root `package.json` and two applications:

- `apps/nestar-api/src/` — API application.
  - `components/<domain>/` — domain modules, resolvers, and services.
  - `libs/dto/<domain>/` — GraphQL input/output DTOs.
  - `libs/enums/` — enums, including GraphQL registration.
  - `libs/interceptor/`, `libs/types/`, and `libs/config.ts` — existing shared API helpers.
  - `schemas/` — Mongoose schemas.
  - `socket/` — WebSocket gateway and module.
- `apps/nestar-batch/src/` — scheduled batch application.
- `context/` — inspected project notes; these are documentation, not a reason to perform the recommendations they describe.

Follow the existing domain and file naming patterns, such as `<domain>.module.ts`, `<domain>.resolver.ts`, `<domain>.service.ts`, and DTO files under `libs/dto/`. Before adding a file, first check whether the requested change belongs in an existing module or helper. Keep shared API and batch schema/enum compatibility in mind.

Do not reorganize existing files or create a new shared library unless the user explicitly asks.

## Packages and configuration

The root `package.json` and `package-lock.json` define the approved project dependencies. Use packages already present in this repository. Do not install, add, remove, or upgrade packages or edit dependency manifests/lockfiles unless the user explicitly approves it.

Do not change compiler, lint, formatter, Nest CLI, or other project configuration unless the request requires it and the user approves the scope.

## TypeScript and formatting

- Use TypeScript and the existing NestJS patterns: modules, dependency injection, decorators, resolvers, services, DTOs, and Mongoose models as appropriate to the surrounding code.
- Match the surrounding file's naming and import conventions.
- Format with the existing Prettier settings: single quotes and trailing commas.
- Respect the repository's ESLint and TypeScript configuration. Do not use `any`, unsafe casts, or suppressions to silence an error when a proper type or validation is practical.
- Avoid formatting unrelated files or cleaning up unrelated existing issues as part of a feature.

## Safe, focused changes

- Read the relevant code and its callers before editing; follow existing behavior unless the user requested a behavior change.
- Validate untrusted input and preserve authorization and ownership checks. Never trust client-supplied identity, role, or ownership values.
- Do not log passwords, tokens, secrets, or other sensitive values.
- Make failures explicit; do not hide errors behind broad catches or silent fallbacks.
- For a change to shared schemas, enums, or DTO contracts, check affected callers in both applications.
- Add or update focused tests when the project has an appropriate existing test location and pattern. Do not add a new testing framework or test dependency.

## Checks

Use the smallest existing check that verifies the change, such as the root build or a focused test. Report checks and their results accurately.

The root `lint` script includes `--fix`; do not run it across the repository for a focused change, because it can modify unrelated files. If linting is needed, use a non-fixing command limited to the files in scope. Do not claim that a check passed unless it actually completed successfully.

## Project notes

The `context/` documents describe an inspected snapshot and distinguish existing behavior from recommendations. Current source and the user's request take precedence. Consult the relevant notes when useful; do not automatically apply their proposed improvements.
