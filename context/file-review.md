# File-by-file review ledger

Source snapshot: `87305630809152f8f256ab1226ba89bf47e84553`, 2026-10-03. Every first-party source/config/test/document file below was read. Lockfile entries were parsed structurally, not treated as handwritten code. Vendor code, compiled output, uploads, Git internals and secret `.env` values are excluded. Symbol ranges make the review navigable; findings are in `review-findings.md`. No-finding entries are not a proof of defect absence.

## .gitignore

61 lines. Configuration or supporting declaration reviewed; see operations.md and code-standards.md.

## .prettierrc

4 lines. Configuration or supporting declaration reviewed; see operations.md and code-standards.md.

## README.md

98 lines. Nest starter boilerplate; commands/license/deployment text are not project-specific truth.

## apps/nestar-api/src/app.controller.ts

12 lines. Configuration or supporting declaration reviewed; see operations.md and code-standards.md.

- AppController L4–12
- getHello L8–11

## apps/nestar-api/src/app.module.ts

35 lines. Nest dependency injection wiring and explicit provider/model exports; see architecture.md.

- AppModule L13–35

## apps/nestar-api/src/app.resolver.ts

10 lines. Configuration or supporting declaration reviewed; see operations.md and code-standards.md.

- AppResolver L4–10
- sayHello L6–9

## apps/nestar-api/src/app.service.ts

8 lines. Configuration or supporting declaration reviewed; see operations.md and code-standards.md.

- AppService L3–8
- getHello L5–7

## apps/nestar-api/src/components/auth/auth.module.ts

18 lines. Secret is interpolated at module evaluation; missing secret becomes string undefined (F07). 30-day token expiry.

- AuthModule L6–18

## apps/nestar-api/src/components/auth/auth.service.ts

42 lines. Whole-member JWT minus password; verification has no live status/role check (F04); password comparison return type incorrectly says string.

- AuthService L8–42
- hashPassword L13–17
- comparePasswords L20–22
- createToken L24–33
- verifyAuth L36–40

## apps/nestar-api/src/components/auth/decorators/authMember.decorator.ts

16 lines. Reads body.authMember set by guards; adds authorization header onto that object.

## apps/nestar-api/src/components/auth/decorators/roles.decorator.ts

3 lines. Configuration or supporting declaration reviewed; see operations.md and code-standards.md.

## apps/nestar-api/src/components/auth/guards/auth.guard.ts

31 lines. JWT-only GraphQL guard; logs headers (F06); split-based token parsing.

- AuthGuard L5–31
- canActivate L9–30

## apps/nestar-api/src/components/auth/guards/roles.guard.ts

41 lines. Checks role from JWT, not current DB (F04); no roles metadata means allow.

- RolesGuard L6–41
- canActivate L13–40

## apps/nestar-api/src/components/auth/guards/without.guard.ts

31 lines. Optional auth; bad or absent token becomes anonymous.

- WithoutGuard L4–31
- canActivate L8–30

## apps/nestar-api/src/components/board-article/board-article.module.ts

26 lines. Nest dependency injection wiring and explicit provider/model exports; see architecture.md.

- BoardArticleModule L11–26

## apps/nestar-api/src/components/board-article/board-article.resolver.ts

114 lines. Configuration or supporting declaration reviewed; see operations.md and code-standards.md.

- BoardArticleResolver L16–114
- createBoardArticle L20–28
- getBoardArticle L31–40
- updateBoardArticle L42–51
- getBoardArticles L54–62
- likeTargetBoardArticle L64–72
- getAllBoardArticlesByAdmin L77–86
- updateBoardArticleByAdmin L89–99
- removeBoardArticleByAdmin L102–112

## apps/nestar-api/src/components/board-article/board-article.service.ts

295 lines. Author-owned updates; active-only admin updates; no cascade cleanup on hard delete; counter updates are separate writes (F11/F12).

- BoardArticleService L18–295
- createBoardArticle L26–47
- getBoardArticle L50–88
- boardArticleStatsEditor L91–106
- updateBoardArticle L108–136
- getBoardArticles L140–186
- likeTargetBoardArticle L189–211
- getAllBoardArticlesByAdmin L217–250
- updateBoardArticleByAdmin L252–276
- removeBoardArticleByAdmin L279–292

## apps/nestar-api/src/components/comment/comment.module.ts

28 lines. Nest dependency injection wiring and explicit provider/model exports; see architecture.md.

- CommentModule L13–28

## apps/nestar-api/src/components/comment/comment.resolver.ts

70 lines. Configuration or supporting declaration reviewed; see operations.md and code-standards.md.

- CommentResolver L17–69
- createComment L21–29
- updateComment L31–40
- getComments L44–54
- removeCommentByAdmin L59–66

## apps/nestar-api/src/components/comment/comment.service.ts

114 lines. Inserts before verifying referenced target; status changes/deletion do not decrement counters (F10/F11).

- CommentService L16–114
- createComment L25–62
- updateComment L65–80
- getComments L82–106
- removeCommentByAdmin L108–112

## apps/nestar-api/src/components/components.module.ts

23 lines. Nest dependency injection wiring and explicit provider/model exports; see architecture.md.

- ComponentsModule L11–23

## apps/nestar-api/src/components/follow/follow.module.ts

18 lines. Nest dependency injection wiring and explicit provider/model exports; see architecture.md.

- FollowModule L9–18

## apps/nestar-api/src/components/follow/follow.resolver.ts

63 lines. Configuration or supporting declaration reviewed; see operations.md and code-standards.md.

- FollowResolver L12–63
- subscribe L16–25
- unsubscribe L27–36
- getMemberFollowings L39–49
- getMemberFollowers L51–61

## apps/nestar-api/src/components/follow/follow.service.ts

132 lines. Follow and two counters are separate writes; blocked target accepted through getMember; deleted target prevents unsubscribe (F11/F18).

- FollowService L12–132
- subscribe L20–34
- registerSubscription L36–46
- unsubscribe L49–63
- getMemberFollowings L67–97
- getMemberFollowers L99–130

## apps/nestar-api/src/components/like/like.module.ts

17 lines. Nest dependency injection wiring and explicit provider/model exports; see architecture.md.

- LikeModule L6–17

## apps/nestar-api/src/components/like/like.service.ts

101 lines. Read/delete toggle race can decrement twice (F11); favorite joins do not filter status (F12).

- LikeService L14–101
- toggleLike L19–39
- checkLikeExistence L42–48
- getFavoriteProperties L52–99

## apps/nestar-api/src/components/member/member.module.ts

22 lines. Nest dependency injection wiring and explicit provider/model exports; see architecture.md.

- MemberModule L11–22

## apps/nestar-api/src/components/member/member.resolver.ts

192 lines. Public signup/login log credentials (F06); upload targets are unbounded paths (F05); self update only deletes _id.

- MemberResolver L20–192
- signup L24–29
- login L31–35
- chechAuth L37–42
- chechAuthRoles L44–50
- updateMember L55–63
- getMember L67–74
- getAgents L77–82
- likeTargetMember L85–93
- getAllMembersByAdmin L101–107
- updateMemberByAdmin L110–116
- imageUploader L122–149
- imagesUploader L151–188

## apps/nestar-api/src/components/member/member.service.ts

270 lines. Signup passes client role; updates pass password unchanged; fresh token after self update (F01–F03). Public profile accepts ACTIVE/BLOCK.

- MemberService L20–270
- signup L32–49
- login L51–84
- updateMember L86–98
- getMember L100–142
- checkSubscription L144–151
- getAgents L153–181
- likeTargetMember L184–206
- getAllMembersByAdmin L213–241
- updateMemberByAdmin L243–254
- memberStatsEditor L257–268

## apps/nestar-api/src/components/property/property.module.ts

25 lines. Nest dependency injection wiring and explicit provider/model exports; see architecture.md.

- PropertyModule L11–25

## apps/nestar-api/src/components/property/property.resolver.ts

158 lines. Configuration or supporting declaration reviewed; see operations.md and code-standards.md.

- PropertyResolver L16–158
- createProperty L20–30
- getProperty L32–41
- updateProperty L44–57
- getProperties L60–70
- getFavorites L72–82
- getVisited L85–95
- getAgentProperties L100–109
- likeTargetProperty L112–120
- getAllPropertiesByAdmin L126–135
- updatePropertyByAdmin L138–146
- removePropertyByAdmin L148–155

## apps/nestar-api/src/components/property/property.service.ts

336 lines. Status timestamps assigned only to local variables (F08); multi-write counters (F11); anonymous detail omits memberData (F16).

- PropertyService L20–336
- createProperty L29–51
- getProperty L53–75
- propertyStatsEditor L77–91
- updateProperty L94–126
- getProperties L129–161
- shapeMatchQuery L164–194
- getFavorites L196–198
- getVisited L200–202
- getAgentProperties L205–238
- likeTargetProperty L240–262
- getAllPropertiesByAdmin L265–294
- updatePropertyByAdmin L297–325
- removePropertyByAdmin L327–334

## apps/nestar-api/src/components/view/view.module.ts

11 lines. Nest dependency injection wiring and explicit provider/model exports; see architecture.md.

- ViewModule L6–11

## apps/nestar-api/src/components/view/view.service.ts

93 lines. Check/create race may surface duplicate key; repeat views do not update recency (F11/F17).

- ViewService L14–93
- recordView L19–29
- checkViewExistance L32–41
- getVisitedProperties L43–90

## apps/nestar-api/src/database/database.module.ts

23 lines. Both copies choose MONGO_PROD only for exact production NODE_ENV; no env validation.

- DatabaseModule L6–23

## apps/nestar-api/src/libs/config.ts

170 lines. API: shared sorts, ObjectId conversion, UUID filenames, aggregation helpers; batch: job-name constants.

- LookupAuthMemberFollowed L95–98

## apps/nestar-api/src/libs/dto/board-article/board-article.input.ts

107 lines. GraphQL DTO contract; inspect field table for exact exposure/nullability/validators.

- BoardArticleInput L8–29
- BAISearch L31–44
- BoardArticlesInquiry L46–70
- ABAISearch L72–81
- AllBoardArticlesInquiry L83–107

## apps/nestar-api/src/libs/dto/board-article/board-article.ts

63 lines. GraphQL DTO contract; inspect field table for exact exposure/nullability/validators.

- BoardArticle L7–54
- BoardArticles L56–63

## apps/nestar-api/src/libs/dto/board-article/board-article.update.ts

29 lines. GraphQL DTO contract; inspect field table for exact exposure/nullability/validators.

- BoardArticleUpdate L6–29

## apps/nestar-api/src/libs/dto/comment/comment.input.ts

57 lines. GraphQL DTO contract; inspect field table for exact exposure/nullability/validators.

- CommentInput L8–24
- CISearch L26–31
- CommentsInquiry L33–57

## apps/nestar-api/src/libs/dto/comment/comment.ts

45 lines. GraphQL DTO contract; inspect field table for exact exposure/nullability/validators.

- Comment L6–36
- Comments L38–45

## apps/nestar-api/src/libs/dto/comment/comment.update.ts

20 lines. GraphQL DTO contract; inspect field table for exact exposure/nullability/validators.

- CommentUpdate L6–20

## apps/nestar-api/src/libs/dto/follow/follow.input.ts

31 lines. GraphQL DTO contract; inspect field table for exact exposure/nullability/validators.

- FollowSearch L5–14
- FollowInquiry L16–31

## apps/nestar-api/src/libs/dto/follow/follow.ts

92 lines. GraphQL DTO contract; inspect field table for exact exposure/nullability/validators.

- MeFollowed L6–16
- Follower L18–45
- Following L47–74
- Followings L76–83
- Followers L85–92

## apps/nestar-api/src/libs/dto/like/like.input.ts

19 lines. GraphQL DTO contract; inspect field table for exact exposure/nullability/validators.

- LikeInput L6–19

## apps/nestar-api/src/libs/dto/like/like.ts

38 lines. GraphQL DTO contract; inspect field table for exact exposure/nullability/validators.

- MeLiked L5–15
- Like L17–36

## apps/nestar-api/src/libs/dto/member/member.input.ts

124 lines. Public signup exposes memberType including ADMIN (F01); page sizes have no maximum (F09).

- MemberInput L8–31
- LoginInput L34–45
- AISearch L47–52
- AgentsInquiry L55–80
- MISearch L82–96
- MembersInquiry L99–124

## apps/nestar-api/src/libs/dto/member/member.ts

114 lines. GraphQL DTO contract; inspect field table for exact exposure/nullability/validators.

- Member L8–98
- TotalCounter L100–104
- Members L107–114

## apps/nestar-api/src/libs/dto/member/member.update.ts

55 lines. Shared self/admin update includes role, status and password (F02/F03); deleteAt is misspelled and not exposed.

- MemberUpdate L5–55

## apps/nestar-api/src/libs/dto/property/property.input.ts

276 lines. Nested validation missing and empty options produces invalid $or (F09); price/area lack positive bounds.

- PropertyInput L9–75
- PricesRange L78–85
- SquaresRange L88–95
- PeriodsRange L98–105
- PISearch L107–159
- PropertiesInquiry L162–191
- APISearch L193–198
- AgentPropertiesInquiry L201–225
- ALPISearch L228–237
- AllPropertiesInquiry L239–263
- OrdinaryInquiry L265–276

## apps/nestar-api/src/libs/dto/property/property.ts

116 lines. GraphQL DTO contract; inspect field table for exact exposure/nullability/validators.

- Property L8–105
- Properties L108–116

## apps/nestar-api/src/libs/dto/property/property.update.ts

106 lines. Optional nullable required DB fields can bypass validators (F15); timestamps are server-only fields.

- PropertyUpdate L17–106

## apps/nestar-api/src/libs/dto/view/view.input.ts

26 lines. GraphQL DTO contract; inspect field table for exact exposure/nullability/validators.

- ViewInput L6–26

## apps/nestar-api/src/libs/dto/view/view.ts

31 lines. GraphQL DTO contract; inspect field table for exact exposure/nullability/validators.

- View L6–31

## apps/nestar-api/src/libs/enums/board-article.enum.ts

19 lines. Enum values and GraphQL registration; see field reference.

- BoardArticleCategory L3–8
- BoardArticleStatus L13–16

## apps/nestar-api/src/libs/enums/comment.enum.ts

18 lines. Enum values and GraphQL registration; see field reference.

- CommentStatus L3–6
- CommentGroup L11–15

## apps/nestar-api/src/libs/enums/common.enum.ts

32 lines. Enum values and GraphQL registration; see field reference.

- Message L3–22
- Direction L25–28

## apps/nestar-api/src/libs/enums/like.enum.ts

10 lines. Enum values and GraphQL registration; see field reference.

- LikeGroup L3–7

## apps/nestar-api/src/libs/enums/member.enum.ts

25 lines. Enum values and GraphQL registration; see field reference.

- MemberType L3–7
- MemberStatus L11–15
- MemberAuthType L19–23

## apps/nestar-api/src/libs/enums/notice.enum.ts

19 lines. Enum values and GraphQL registration; see field reference.

- NoticeCategory L3–7
- NoticeStatus L12–16

## apps/nestar-api/src/libs/enums/notification.enum.ts

26 lines. Enum values and GraphQL registration; see field reference.

- NotificationType L3–6
- NotificationStatus L11–14
- NotificationGroup L19–23

## apps/nestar-api/src/libs/enums/property.enum.ts

34 lines. Enum values and GraphQL registration; see field reference.

- PropertyType L3–7
- PropertyStatus L12–16
- PropertyLocation L21–31

## apps/nestar-api/src/libs/enums/view.enum.ts

10 lines. Enum values and GraphQL registration; see field reference.

- ViewGroup L3–7

## apps/nestar-api/src/libs/interceptor/Logging.interceptor.ts

53 lines. Truncates to 75 characters without redaction; logs request/response (F06).

- LoggingInterceptor L7–53
- intercept L15–47
- stringify L50–52

## apps/nestar-api/src/libs/types/common.ts

12 lines. Broad any dictionary and unconstrained counter key reduce compile-time checks.

- T L3–5
- StatisticModifier L8–12

## apps/nestar-api/src/main.ts

24 lines. API enables validation, logging, reflected credentialed CORS, uploads and WsAdapter. Batch only boots HTTP. Both fallback to 3000 (F21).

- bootstrap L11–23

## apps/nestar-api/src/schemas/BoardArticle.model.ts

56 lines. Mongoose persistence fields, defaults, relationships and collection name; see data-model.md.

## apps/nestar-api/src/schemas/Comment.model.ts

36 lines. Mongoose persistence fields, defaults, relationships and collection name; see data-model.md.

## apps/nestar-api/src/schemas/Follow.model.ts

20 lines. Mongoose persistence fields, defaults, relationships and collection name; see data-model.md.

## apps/nestar-api/src/schemas/Like.model.ts

28 lines. Uses ViewGroup instead of LikeGroup; current values coincide. Unique member+target pair.

## apps/nestar-api/src/schemas/Member.model.ts

128 lines. Password select:false protects ordinary queries, not aggregation/logging; public Member output exposes phone/address (F06/F22).

## apps/nestar-api/src/schemas/Notice.model.ts

37 lines. Schema-only feature; no registered model, resolver or service found.

## apps/nestar-api/src/schemas/Notification.model.ts

58 lines. Schema-only feature; no registered model, resolver or service found.

## apps/nestar-api/src/schemas/Property.model.ts

116 lines. Unique business tuple lacks owner/address; review intended uniqueness. No declared list-query indexes.

## apps/nestar-api/src/schemas/View.model.ts

28 lines. Mongoose persistence fields, defaults, relationships and collection name; see data-model.md.

## apps/nestar-api/src/socket/socket.gateway.ts

89 lines. Raw ws broadcast; no auth, payload DTO, rooms, or application rate limits (F14).

- MessagePayload L6–9
- InfoPayload L11–14
- SocketGateway L17–89
- afterInit L27–29
- handleConnection L31–42
- handleDisconnect L44–56
- handleMessage L59–69
- broadcastMessage L73–79
- emitMessage L82–88

## apps/nestar-api/src/socket/socket.module.ts

7 lines. Nest dependency injection wiring and explicit provider/model exports; see architecture.md.

- SocketModule L4–7

## apps/nestar-api/test/app.e2e-spec.ts

29 lines. Scaffold assertion expects Hello World!, unlike implementation; connects actual modules/DB. Batch lacks teardown (F19).

## apps/nestar-api/test/jest-e2e.json

9 lines. Configuration or supporting declaration reviewed; see operations.md and code-standards.md.

## apps/nestar-api/tsconfig.app.json

16 lines. Configuration or supporting declaration reviewed; see operations.md and code-standards.md.

## apps/nestar-batch/src/batch.controller.ts

65 lines. Three independent daily cron jobs 20 seconds apart; timezone/lock/order not enforced (F13).

- BatchController L7–65
- handleTimeout L12–15
- batchRollback L17–27
- batchTopProperties L29–40
- batchTopAgents L42–51
- getHello L61–64

## apps/nestar-batch/src/batch.module.ts

22 lines. Nest dependency injection wiring and explicit provider/model exports; see architecture.md.

- BatchModule L11–22

## apps/nestar-batch/src/batch.service.ts

73 lines. Resets ranks then recalculates only zero ranks; unbounded Promise.all; imports API DTOs (F13).

- BatchService L8–73
- batchRollback L15–34
- batchTopProperties L36–50
- batchTopAgents L52–67
- getHello L70–72

## apps/nestar-batch/src/database/database.module.ts

23 lines. Both copies choose MONGO_PROD only for exact production NODE_ENV; no env validation.

- DatabaseModule L6–23

## apps/nestar-batch/src/lib/config.ts

7 lines. API: shared sorts, ObjectId conversion, UUID filenames, aggregation helpers; batch: job-name constants.

## apps/nestar-batch/src/main.ts

8 lines. API enables validation, logging, reflected credentialed CORS, uploads and WsAdapter. Batch only boots HTTP. Both fallback to 3000 (F21).

- bootstrap L4–7

## apps/nestar-batch/test/app.e2e-spec.ts

24 lines. Scaffold assertion expects Hello World!, unlike implementation; connects actual modules/DB. Batch lacks teardown (F19).

## apps/nestar-batch/test/jest-e2e.json

9 lines. Configuration or supporting declaration reviewed; see operations.md and code-standards.md.

## apps/nestar-batch/tsconfig.app.json

9 lines. Configuration or supporting declaration reviewed; see operations.md and code-standards.md.

## eslint.config.mjs

35 lines. Typed flat ESLint + Prettier; globals and @eslint/js are imported but not directly declared (F20).

## nest-cli.json

32 lines. Configuration or supporting declaration reviewed; see operations.md and code-standards.md.

## package-lock.json

14753 lines. All dependency records parsed; direct locked versions and actual installed versions recorded separately; no advisory scan claim.

## package.json

97 lines. Single package for both apps; default build targets API; lint/format mutate; no engines/workspaces (F20/F21).

## tsconfig.build.json

4 lines. Configuration or supporting declaration reviewed; see operations.md and code-standards.md.

## tsconfig.json

26 lines. Configuration or supporting declaration reviewed; see operations.md and code-standards.md.

