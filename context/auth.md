# Authentication and authorization

## Implemented flow

`signup(MemberInput)` is public. Validation accepts nickname/password lengths 3–12, a nonempty phone and optional memberType/memberAuthType. MemberService hashes the password, creates the record, signs a token and returns Member. The provided memberType is not restricted to safe signup roles.

`login(LoginInput)` looks up memberNick with `+memberPassword`, rejects DELETE/BLOCK accounts, compares bcrypt and returns a signed token. It gives distinct missing-user/blocked/password errors. There is no OTP, verified phone/email, external provider flow, refresh-token store, logout/revocation or password-reset flow found. PHONE/EMAIL/TELEGRAPH enum labels are not proof of implemented authentication providers.

AuthModule signs for 30 days. `createToken` copies the whole member record and removes only memberPassword; the JWT therefore carries role/status and profile data. `verifyAuth` validates the signature/expiry and converts `_id` to BSON ObjectId, without fetching the current member. JWT content is readable, not an encrypted profile vault.

## Guards

| Guard | Behavior | Important limit |
|---|---|---|
| WithoutGuard | Optional bearer token; invalid token becomes anonymous; stores body.authMember | Public access is intentional, not a protected operation |
| AuthGuard | Splits authorization header, verifies token, stores body.authMember | Does not recheck current status; GraphQL only |
| RolesGuard | Reads handler `roles`, verifies token itself, compares token memberType | No roles metadata returns true; ignores current database role/status |
| AuthMember decorator | Returns member or named field from body.authMember | Depends on upstream guard; adds authorization onto member object |

Admin resolvers use `@Roles(ADMIN)` plus RolesGuard. Property creation/update and own listings use AGENT. Auth-only mutations handle member self-updates, article/comment changes, likes/follows and uploads. Ownership checks appear in service database filters for property/article/comment updates; an authenticated role alone does not prove ownership.

## Confirmed defects

F01/F02 allow ADMIN issuance on signup or self-profile update. F03 writes update passwords without hashing. F04 lets already-issued tokens retain blocked/deleted status or revoked roles for up to their remaining expiry. F06 logs credentials and bearer headers. F07 interpolates an absent SECRET_TOKEN into the predictable string `undefined` instead of failing startup. Missing-secret exposure is conditional; actual secret contents were not inspected.

## Recommended target behavior

Split signup, self-profile and admin update inputs; assign allowed signup role on the server. Hash passwords in every authorized password-change path and define verification/revocation policy. Use minimal JWT claims and load current status/permissions or compare a revocation/version marker. Validate required secrets before startup; use ConfigService-based asynchronous JWT registration. Use a dedicated request auth context rather than mutating request.body. Redact credentials and tokens from structured logs. Add negative tests for anonymous, wrong role, blocked account, stale token and wrong owner.

For Nest's documented GraphQL guard context API, use [GqlExecutionContext](https://docs.nestjs.com/graphql/other-features); the repo currently relies on `context.contextType` and positional arguments. The existing password comparison return annotation should be `Promise<boolean>`, not `Promise<string>`; loose dependency typings currently hide this mismatch.
