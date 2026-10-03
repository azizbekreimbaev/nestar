# API inventory

Code-first GraphQL, default `/graphql` route (no custom path configured). This is a static source inventory, not an introspection snapshot of a running service. Every operation below has its resolver/guard/input signature. Exact DTO fields are in `dto-reference.md`. GraphQL selection sets control returned fields.

| Operation | Kind | Return declaration | Client arguments | Guard / role | Source |
|---|---|---|---|---|---|
| `sayHello` | Query | `() => String` | `` | `Public` | `apps/nestar-api/src/app.resolver.ts`:6 |
| `createBoardArticle` | Mutation | `() => BoardArticle` | `@Args('input') input: BoardArticleInput` | `@UseGuards(AuthGuard)` | `apps/nestar-api/src/components/board-article/board-article.resolver.ts`:20 |
| `getBoardArticle` | Query | `() => BoardArticle` | `@Args('articleId') input: string` | `@UseGuards(WithoutGuard)` | `apps/nestar-api/src/components/board-article/board-article.resolver.ts`:31 |
| `updateBoardArticle` | Mutation | `() => BoardArticle` | `@Args('input') input: BoardArticleUpdate` | `@UseGuards(AuthGuard)` | `apps/nestar-api/src/components/board-article/board-article.resolver.ts`:42 |
| `getBoardArticles` | Query | `(returns) => BoardArticles` | `@Args('input') input: BoardArticlesInquiry` | `@UseGuards(WithoutGuard)` | `apps/nestar-api/src/components/board-article/board-article.resolver.ts`:54 |
| `likeTargetBoardArticle` | Mutation | `() => BoardArticle` | `@Args("articleId") input: string` | `@UseGuards(AuthGuard)` | `apps/nestar-api/src/components/board-article/board-article.resolver.ts`:64 |
| `getAllBoardArticlesByAdmin` | Query | `(returns) => BoardArticles` | `@Args('input') input: AllBoardArticlesInquiry` | `@Roles(MemberType.ADMIN) @UseGuards(RolesGuard)` | `apps/nestar-api/src/components/board-article/board-article.resolver.ts`:77 |
| `updateBoardArticleByAdmin` | Mutation | `() => BoardArticle` | `@Args('input') input: BoardArticleUpdate` | `@Roles(MemberType.ADMIN) @UseGuards(RolesGuard)` | `apps/nestar-api/src/components/board-article/board-article.resolver.ts`:89 |
| `removeBoardArticleByAdmin` | Mutation | `(returns) => BoardArticle` | `@Args('articleId') input: string` | `@Roles(MemberType.ADMIN) @UseGuards(RolesGuard)` | `apps/nestar-api/src/components/board-article/board-article.resolver.ts`:102 |
| `createComment` | Mutation | `(returns) => Comment` | `@Args('input') input: CommentInput` | `@UseGuards(AuthGuard)` | `apps/nestar-api/src/components/comment/comment.resolver.ts`:21 |
| `updateComment` | Mutation | `(returns) => Comment` | `@Args('input') input: CommentUpdate` | `@UseGuards(AuthGuard)` | `apps/nestar-api/src/components/comment/comment.resolver.ts`:31 |
| `getComments` | Query | `(returns) => Comments` | `@Args('input') input: CommentsInquiry` | `@UseGuards(WithoutGuard)` | `apps/nestar-api/src/components/comment/comment.resolver.ts`:44 |
| `removeCommentByAdmin` | Mutation | `(returns) => Comment` | `@Args('commentId') input: string` | `@Roles(MemberType.ADMIN) @UseGuards(RolesGuard)` | `apps/nestar-api/src/components/comment/comment.resolver.ts`:59 |
| `subscribe` | Mutation | `(returns) => Follower` | `@Args('input') input: string` | `@UseGuards(AuthGuard)` | `apps/nestar-api/src/components/follow/follow.resolver.ts`:16 |
| `unsubscribe` | Mutation | `(returns) => Follower` | `@Args('input') input: string` | `@UseGuards(AuthGuard)` | `apps/nestar-api/src/components/follow/follow.resolver.ts`:27 |
| `getMemberFollowings` | Query | `(returns) => Followings` | `@Args('input') input: FollowInquiry` | `@UseGuards(WithoutGuard)` | `apps/nestar-api/src/components/follow/follow.resolver.ts`:39 |
| `getMemberFollowers` | Query | `(returns) => Followers` | `@Args('input') input: FollowInquiry` | `@UseGuards(WithoutGuard)` | `apps/nestar-api/src/components/follow/follow.resolver.ts`:51 |
| `signup` | Mutation | `() => Member` | `@Args("input") input: MemberInput` | `Public` | `apps/nestar-api/src/components/member/member.resolver.ts`:24 |
| `login` | Mutation | `() => Member` | `@Args("input") input: LoginInput` | `Public` | `apps/nestar-api/src/components/member/member.resolver.ts`:31 |
| `chechAuth` | Query | `() => String` | `` | `@UseGuards(AuthGuard)` | `apps/nestar-api/src/components/member/member.resolver.ts`:37 |
| `chechAuthRoles` | Query | `() => String` | `` | `@Roles(MemberType.AGENT, MemberType.USER) @UseGuards(RolesGuard) @UseGuards(AuthGuard)` | `apps/nestar-api/src/components/member/member.resolver.ts`:44 |
| `updateMember` | Mutation | `() => Member` | `@Args("input") input: MemberUpdate` | `@UseGuards(AuthGuard)` | `apps/nestar-api/src/components/member/member.resolver.ts`:55 |
| `getMember` | Query | `() => Member` | `@Args("memberId") input: string` | `@UseGuards(WithoutGuard)` | `apps/nestar-api/src/components/member/member.resolver.ts`:67 |
| `getAgents` | Query | `() => Members` | `@Args("input") input: AgentsInquiry` | `@UseGuards(WithoutGuard)` | `apps/nestar-api/src/components/member/member.resolver.ts`:77 |
| `likeTargetMember` | Mutation | `() => Member` | `@Args("memberId") input: string` | `@UseGuards(AuthGuard)` | `apps/nestar-api/src/components/member/member.resolver.ts`:85 |
| `getAllMembersByAdmin` | Query | `() => Members` | `@Args("input") input: MembersInquiry` | `@Roles(MemberType.ADMIN) @UseGuards(RolesGuard)` | `apps/nestar-api/src/components/member/member.resolver.ts`:101 |
| `updateMemberByAdmin` | Mutation | `() => Member` | `@Args("input") input: MemberUpdate` | `@Roles(MemberType.ADMIN) @UseGuards(RolesGuard)` | `apps/nestar-api/src/components/member/member.resolver.ts`:110 |
| `imageUploader` | Mutation | `(returns) => String` | `@Args({ name: 'file', type: () => GraphQLUpload }) { createReadStream, filename, mimetype }: FileUpload; @Args('target') target: String` | `@UseGuards(AuthGuard)` | `apps/nestar-api/src/components/member/member.resolver.ts`:122 |
| `imagesUploader` | Mutation | `(returns) => [String]` | `@Args('files', { type: () => [GraphQLUpload] }) files: Promise<FileUpload>[]; @Args('target') target: String` | `@UseGuards(AuthGuard)` | `apps/nestar-api/src/components/member/member.resolver.ts`:151 |
| `createProperty` | Mutation | `() => Property` | `@Args("input") input: PropertyInput` | `@Roles(MemberType.AGENT) @UseGuards(RolesGuard)` | `apps/nestar-api/src/components/property/property.resolver.ts`:20 |
| `getProperty` | Query | `() => Property` | `@Args('propertyId') input: string` | `@UseGuards(WithoutGuard)` | `apps/nestar-api/src/components/property/property.resolver.ts`:32 |
| `updateProperty` | Mutation | `() => Property` | `@Args("input") input: PropertyUpdate` | `@Roles(MemberType.AGENT) @UseGuards(RolesGuard)` | `apps/nestar-api/src/components/property/property.resolver.ts`:44 |
| `getProperties` | Query | `(returns) => Properties` | `@Args('input') input: PropertiesInquiry` | `@UseGuards(WithoutGuard)` | `apps/nestar-api/src/components/property/property.resolver.ts`:60 |
| `getFavorites` | Query | `(returns) => Properties` | `@Args('input') input: OrdinaryInquiry` | `@UseGuards(AuthGuard)` | `apps/nestar-api/src/components/property/property.resolver.ts`:72 |
| `getVisited` | Query | `(returns) => Properties` | `@Args('input') input: OrdinaryInquiry` | `@UseGuards(AuthGuard)` | `apps/nestar-api/src/components/property/property.resolver.ts`:85 |
| `getAgentProperties` | Query | `(returns) => Properties` | `@Args('input') input: AgentPropertiesInquiry` | `@Roles(MemberType.AGENT) @UseGuards(RolesGuard)` | `apps/nestar-api/src/components/property/property.resolver.ts`:100 |
| `likeTargetProperty` | Mutation | `() => Property` | `@Args("propertyId") input: string` | `@UseGuards(AuthGuard)` | `apps/nestar-api/src/components/property/property.resolver.ts`:112 |
| `getAllPropertiesByAdmin` | Query | `(returns) => Properties` | `@Args('input') input: AllPropertiesInquiry` | `@Roles(MemberType.ADMIN) @UseGuards(RolesGuard)` | `apps/nestar-api/src/components/property/property.resolver.ts`:126 |
| `updatePropertyByAdmin` | Mutation | `() => Property` | `@Args("input") input: PropertyUpdate` | `@Roles(MemberType.ADMIN) @UseGuards(RolesGuard)` | `apps/nestar-api/src/components/property/property.resolver.ts`:138 |
| `removePropertyByAdmin` | Mutation | `() => Property` | `@Args("input") input: string` | `@Roles(MemberType.ADMIN) @UseGuards(RolesGuard)` | `apps/nestar-api/src/components/property/property.resolver.ts`:148 |

`WithoutGuard` means public access with optional JWT personalization. `AuthGuard` requires JWT but does not recheck account status. `RolesGuard` verifies JWT itself and checks the token role; role-restricted operations do not also need AuthGuard in this implementation. Existing `chechAuth` and `chechAuthRoles` spellings are public contract names.

## Other protocols

- API `GET /`: Welcome to NESTAR API server!
- Batch `GET /`: Welcome to NESTAR BATCH  server! (two spaces before server)
- Static `/uploads/*`: public files from working-directory uploads.
- Raw WebSocket on API listener: Nest ws adapter event envelope `{ "event": "message", "data": "text" }`; outgoing `{ "event": "message", "text": "text" }`; connection updates `{ "event": "info", "totalClients": n }`. No persistence, per-user rooms or authentication. No GraphQL subscriptions found.

## Representative read

```graphql
query Properties($input: PropertiesInquiry!) {
  getProperties(input: $input) {
    list { _id propertyTitle propertyPrice propertyStatus }
    metaCounter { total }
  }
}
```

Variables: `{ "input": { "page": 1, "limit": 20, "search": {} } }`. Optional HTTP authorization header is `Bearer <token>`. Do not infer REST CRUD routes from GraphQL operation names.
