# Detailed review findings

Snapshot: 2026-10-03, commit `87305630809152f8f256ab1226ba89bf47e84553`. Paths below are repository-relative. P0 = critical privilege compromise; P1 = high-impact security/data defect; P2 = correctness/reliability gap; P3 = maintainability. Findings are source-confirmed unless labeled conditional or policy-dependent. Mock probes validate selected data flow; they are not end-to-end exploit tests.

## F01 — P0: public signup accepts ADMIN

Evidence: `apps/nestar-api/src/libs/dto/member/member.input.ts:24–26`; `components/member/member.resolver.ts:24–27`; `components/member/member.service.ts:32–42` (the latter two under the same API src directory). MemberInput exposes the entire MemberType enum and signup passes the validated input to create, then signs the resulting role. An anonymous registrant can choose ADMIN and obtain an admin-bearing JWT. Confirmed with the actual ValidationPipe/DTO/service and a mocked model.

Fix: remove privileged roles from signup input and set the server-approved role explicitly. If AGENT self-registration is intended, enforce that allowlist independently. Regression: ADMIN signup is rejected or always persisted as an allowed role; admin queries deny its resulting token.

## F02 — P0: self-profile update can promote the caller

Evidence: `apps/nestar-api/src/libs/dto/member/member.update.ts:14–20`; `components/member/member.resolver.ts:55–62`; `components/member/member.service.ts:86–97`. The self resolver deletes only `_id`; shared MemberUpdate includes memberType/memberStatus. The service persists them and issues a fresh token. Confirmed update payload forwarding in a mock probe.

Fix: separate self/admin DTOs and explicit service allowlists. Regression: normal users cannot modify role/status through self-update even when supplying a syntactically valid GraphQL enum.

## F03 — P1: password changes persist plaintext

Evidence: `apps/nestar-api/src/libs/dto/member/member.update.ts:31–34`; `components/member/member.service.ts:86–91,243–249`. Both update routes write memberPassword directly, unlike signup. This stores plaintext and breaks bcrypt login for changed passwords. Mock probe confirmed the unchanged password passed to persistence.

Fix: separate password-change handling and hash before all writes, including authorized administrative resets. Regression: persisted hash differs from password, bcrypt validates it, old password fails, and unrelated profile changes do not rehash.

## F04 — P1: blocked accounts and revoked roles retain token authority

Evidence: `apps/nestar-api/src/components/auth/auth.module.ts:9–11`, `auth.service.ts:36–39`, `guards/roles.guard.ts:25–34`, `guards/auth.guard.ts:19–24`. Login checks status, but later guards use only JWT payload. Blocking, deleting or demoting a member does not invalidate a previously issued token during its remaining 30-day lifetime.

Fix: enforce current status/authorization and revocation or token-version policy on protected requests. Regression: a token issued before block/delete/demotion loses the affected permissions immediately under the selected policy.

## F05 — P1: authenticated uploads escape their intended directory

Evidence: `apps/nestar-api/src/components/member/member.resolver.ts:124–144,153–176`; `libs/config.ts:14–17`. Client-controlled target is interpolated into `uploads/${target}/${uuid + originalExtension}`. Traversal resolves outside uploads when the destination directory exists and the process can write there. UUID filenames constrain exact filename selection; this finding does not claim arbitrary chosen-file overwrite. A path-only probe confirmed escape without writing any files. MIME is client-declared and original extension is retained, so claimed images can also be saved under other content extensions.

Fix: fixed target enum, canonical root containment, verified image decoding and server-derived extensions; robust pipeline error handling and cleanup. Regression: traversal, separators, mismatched content/extension, read-stream errors and partial multi-upload failures are handled safely. The multi-upload catch currently suppresses errors and can return partial/sparse results.

## F06 — P1: credentials and authorization data enter logs

Evidence: `apps/nestar-api/src/components/member/member.resolver.ts:25–34` logs full signup/login input; `components/auth/guards/auth.guard.ts:14` logs headers; `components/member/member.service.ts:41` logs created document/token; `libs/interceptor/Logging.interceptor.ts:30,41,51` logs request/response prefixes. Several aggregate result logs can contain unprojected joined member data. Password is not exposed as a GraphQL Member field, but that does not protect logs.

Fix: remove sensitive object logs and introduce field-aware redaction. Regression: captured logs contain no passwords, bearer tokens, hashes or unnecessary private profile fields for login/signup/protected operations.

## F07 — P1, conditional: absent signing secret becomes predictable text

Evidence: `apps/nestar-api/src/components/auth/auth.module.ts:10`. Template interpolation turns missing SECRET_TOKEN into literal `undefined`; no required environment validation exists. If the secret is absent at module evaluation, JWT signing does not fail simply because the resulting secret string is predictable. Actual deployment secret configuration was not inspected.

Fix: validate a nonempty secret and register JWT asynchronously using validated configuration. Regression: absent/empty secret stops startup before accepting requests; environment loading order is tested.

## F08 — P2: property sale/deletion timestamps never enter updates

Evidence: `apps/nestar-api/src/components/property/property.service.ts:96–109,298–309`. Destructured local soldAt/deletedAt variables are assigned, but the original input is sent to MongoDB. Counts are decremented while transition timestamps stay absent. SOLD mock probe confirmed missing soldAt in the update.

Fix: construct the update object with server timestamps and transition rules. Regression: both agent/admin SOLD and DELETE persist timestamps exactly once and adjust counts correctly.

## F09 — P2: nested input rules and query bounds are incomplete

Evidence: `apps/nestar-api/src/libs/dto/property/property.input.ts:135–153,188–190`; `components/property/property.service.ts:184–192`; inquiry DTOs throughout libs/dto. No ValidateNested/Type decorator chain validates nested search options. Probe confirmed disallowed options pass ValidationPipe. Empty options produces `$or: []` (confirmed construction), invalid for MongoDB. Pagination has Min(1) but no maximum; ranges have no order check; search text is compiled directly as regex and may throw or create expensive queries. GraphQL itself still validates declared field types; this is not a claim that arbitrary undeclared GraphQL fields pass.

Fix: nested validation/transformation, bounded lists/page sizes/text, range checks, empty-options normalization and a defined literal-versus-regex search policy. Regression: invalid nested values, huge limits, reversed ranges, invalid IDs/regex and empty arrays are rejected or normalized consistently.

## F10 — P2: comment deletion leaves inflated counts

Evidence: `apps/nestar-api/src/components/comment/comment.service.ts:36–58,65–79,108–111`. Creation increments property/article/member comment count; soft deletion and admin hard deletion never decrement it. Fix transitions and hard-delete semantics so a previously soft-deleted comment is not counted twice. Regression: active -> deleted -> hard removed changes count by exactly -1 overall.

## F11 — P1/P2: multi-write and concurrency failures corrupt denormalized state

Evidence: `apps/nestar-api/src/components/like/like.service.ts:19–37`; `view/view.service.ts:19–39`; `follow/follow.service.ts:28–31,53–60`; `comment/comment.service.ts:30–58`; `property/property.service.ts:31–40`; `board-article/board-article.service.ts:34–40` (component-relative paths). Two concurrent unlikes can both observe a like, both return -1 even if only one deletion succeeds, and decrement twice. View check/create can race into duplicate-key errors. Failed target stats after comment creation leave an orphan. Other create/follow writes can succeed before counters fail. No transaction/session use was found. Concurrency effects are source-derived, not load-tested.

Fix: atomic/idempotent relationship operations and transactional or repairable counter updates; define duplicate-key handling. Regression: concurrent requests and injected failures preserve record/counter invariants.

## F12 — P2: indirect reads and deletion cleanup ignore lifecycle

Evidence: `apps/nestar-api/src/components/like/like.service.ts:55–88`; `view/view.service.ts:46–79`; `property/property.service.ts:327–333`; `board-article/board-article.service.ts:279–289`. Favorite/visited joins return SOLD/DELETE properties that normal detail reads exclude. Hard deletion does not clean related records or media. Decide retained-history semantics explicitly, then filter or tombstone consistently. Regression: delete/sell/hard-remove and re-read through every list/detail path.

## F13 — P2: batch jobs depend on timing rather than completion

Evidence: `apps/nestar-batch/src/batch.controller.ts:17,29,42`; `batch.service.ts:15–66`. Reset starts at 01:00:00, property ranking at 01:00:20, agents at 01:00:40. No timezone, singleton lock or completion dependency exists. Slow reset can overwrite ranks; multiple replicas run the same jobs; a missed reset leaves nonzero ranks stale because calculations only select rank=0. All matches load into memory and launch unbounded Promise.all updates.

Fix: an ordered, observable job pipeline or idempotent generation-based recompute; explicit timezone/locking; bounded batches or aggregation updates. Regression: delayed reset, repeated runs, overlapping replicas, partial failure and large collections.

## F14 — P2, exposure-dependent: public WebSocket broadcast lacks abuse controls

Evidence: `apps/nestar-api/src/socket/socket.gateway.ts:17,31–41,59–67,82–87`. Every connection joins the same broadcast; arbitrary payload is logged and sent to all clients. No app-level authentication, origin policy, DTO or rate limit is present. Framework/library defaults may provide some transport limits; they are not a domain policy. Decide whether public chat is intended, then implement controls and private rooms if required. Regression: oversized/invalid events, connection floods and unauthorized room access as applicable.

## F15 — P2: nullable updates bypass required persistence constraints

Evidence: `apps/nestar-api/src/libs/dto/property/property.update.ts:40–59` and analogous update DTOs; `components/property/property.service.ts:106–109` and other update services. Optional GraphQL fields accept null; IsOptional skips it. Updates use `{new:true}` without runValidators and explicit null policy, allowing required stored fields to become null and breaking non-null output fields. Confirmed statically; not executed against a DB. Fix DTO null policy and update validation. Regression: explicit null is rejected where omission is allowed but null is not.

## F16 — P2: anonymous property detail omits author enrichment

Evidence: `apps/nestar-api/src/components/property/property.service.ts:60–73`. memberData assignment is inside the authenticated-view block, unlike article detail and property list. Move public owner enrichment outside the conditional if intended public contract. Regression: anonymous/authenticated detail returns consistent owner fields without adding anonymous view counts.

## F17 — P3, semantic: visited order is first-view order

Evidence: `apps/nestar-api/src/components/view/view.service.ts:19–27,50`. Existing views return null without updating timestamps, but visited list sorts updatedAt. If UI promises recent visits, update recency separately from lifetime unique view count. Regression: revisit A after B puts A first without increasing unique views.

## F18 — P2: deleted target cannot be unfollowed

Evidence: `apps/nestar-api/src/components/follow/follow.service.ts:49–57`; `components/member/member.service.ts:102–106`. Unsubscribe first calls a lookup that excludes deleted members, preventing removal of an existing relationship after target deletion. Fix relationship removal independent of target's visibility with a defined counter policy. Regression: follow -> delete target -> unsubscribe removes the relationship.

## F19 — P2: test baseline gives no domain regression protection

Evidence: `package.json` Jest regex matches `.spec.ts`, not the existing `.e2e-spec.ts`; both `apps/*/test/app.e2e-spec.ts` assert Hello World! whereas services return branded messages. Default discovery returned no tests. Batch e2e lacks teardown; both import actual DB modules and batch starts scheduling. Fix isolated test setup, correct assertions and domain/authorization tests. These e2e suites were not executed against configured databases.

## F20 — P2/P3: undeclared imports and environment-dependent tooling

Evidence: `apps/nestar-api/src/main.ts:6` directly imports express, `libs/config.ts:1` imports bson; `eslint.config.mjs:2,4` imports @eslint/js/globals; none are root direct declarations. Current hoisting resolves them, but package topology changes may break imports. `cross-env` is only a devDependency but start:prod requires it. package.json has no Node engines/package manager pin. Add direct declarations where used, define runtime packaging and verify clean installs. Do not remove adapter/peer packages solely because they lack app imports.

## F21 — P2: ambiguous two-app build and production startup

Evidence: `package.json` build/start scripts; `nest-cli.json:5–9`; both `apps/*/src/main.ts`. Default build only targets API; batch production start has no preceding dedicated build script and does not set NODE_ENV. Both port defaults are 3000. If production environment is not externally set, batch chooses MONGO_DEV. Document/build both outputs, configure different ports and production environment explicitly. Root deleteOutDir also warrants verifying output preservation when building apps sequentially; this was not executed in the original working tree.

## F22 — P2, policy-dependent: public member schema exposes private profile fields

Evidence: `apps/nestar-api/src/libs/dto/member/member.ts:24–39`; `components/member/member.resolver.ts:67–81`. Public queries can select memberPhone, full name and address on Member. Related entity joins expose the same type. Whether agent phone is intentionally public is a product decision; ordinary-user address exposure needs explicit policy. Split public/private/admin outputs or field authorization. Regression: anonymous queries cannot retrieve fields classified private.

## Additional observations

`main.ts:15` reflects origins with credentials and app.module.ts:18 always enables playground; review deployment policy rather than assuming proxy protections. No application rate limiter/depth-cost policy found. LikeSchema uses ViewGroup rather than LikeGroup (values currently coincide). Property unique tuple may reject unrelated listings with the same type/location/title/price. Member self-update requires an `_id` input it subsequently discards. Expected lookup/update failures often use InternalServerErrorException. These should be addressed in focused follow-up changes, not silently described as approved standards.

## Suggested order

1. F01–F07: stop privilege escalation and credential exposure, repair password changes and token policy.
2. F08–F12/F15: restore validation, lifecycle and counter consistency with regression tests.
3. F13/F19–F21: make jobs, tests and release commands reproducible.
4. Resolve policy-dependent privacy/chat/history behavior and perform focused maintainability cleanup.
