# Code standards: current versus recommended

## Current configured rules

TypeScript: NodeNext module/resolution, ES2023 target, strictNullChecks and casing checks enabled; noImplicitAny, strictBindCallApply and noFallthroughCasesInSwitch disabled. There is no full strict mode. Decorator metadata is required by Nest/code-first DTOs. App tsconfigs exclude specs and tests from application compilation.

Prettier: singleQuote=true, trailingComma=all; ESLint overrides endOfLine=auto. No configured tab width or semicolon override. Source formatting frequently contradicts these defaults. ESLint extends JS recommended, TypeScript recommendedTypeChecked and Prettier; no-explicit-any is disabled, no-floating-promises and no-unsafe-argument are warnings. Type-aware parser uses projectService and import.meta.dirname.

Conventions observed: kebab-case domain file names with `.module`, `.resolver`, `.service`, `.input`, `.update`; capitalized `*.model.ts` schema files; PascalCase classes/enums; camelCase fields/methods; uppercase enum literals; constructor injection; public async service/resolver methods; centralized Message enum. Exceptions include Logging.interceptor.ts and authMember.decorator.ts. Relative imports are used; tsconfig paths is empty.

## Recommended standards for future changes

Keep resolver transport/auth boundaries small and put ownership/status queries in services. Do not derive roles or ownership from client input. Separate create/update/admin input contracts where privileges differ. Keep GraphQL nullability, TypeScript optionality and persistence constraints aligned. Avoid using GraphQL output classes as a complete Mongo document type.

Validate nested search objects explicitly, cap pagination, validate Mongo IDs, validate range order and escape literal text search where regex syntax is not a product feature. Adding transform/whitelist options alone will not implement nested validation; nested DTOs need decorators and transformation metadata. [Nest ValidationPipe documentation](https://docs.nestjs.com/techniques/validation) explains the separate options.

Use explicit allowed update fields and an appropriate runValidators policy. Preserve known client operation spellings until a coordinated deprecation. Prefer typed domain filters/counter keys over `T` and arbitrary strings. Return meaningful bad-input/not-found/forbidden errors instead of wrapping expected failures as internal errors. Keep token/password/profile secrets out of logs; truncation is not redaction.

Use stream.pipeline with both input/output error handling and partial-file cleanup for uploads. Resolve paths under a fixed storage root, whitelist targets, derive extension from verified content and handle multi-upload failure consistently. Avoid unrelated whole-repo formatter changes in feature patches.

For shared schemas/enums, compile both apps. Test domain outcomes, authorization denials and concurrent counter changes. Use an isolated MongoDB database for integration tests; the current application modules connect from environment variables. See verification.md for the observed baseline, not a promise of green checks.

## Existing quality debt

Unused imports/debug logs, inconsistent punctuation/indentation, broad any, string annotations for numeric Direction, wrong Promise<string> on bcrypt comparison, hidden/misspelled deletedAt fields and stale test assertions are recorded rather than normalized into standards. A passing TypeScript build does not establish correct auth or data behavior.
