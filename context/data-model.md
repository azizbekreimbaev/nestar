# MongoDB model context

All nine schema definitions use timestamps and explicit collection names. Seven are registered by active feature modules; Notice and Notification remain schema-only. Live collection/index existence was not inspected.

| Model / collection | Main fields and relations | Explicit indexes / constraints |
|---|---|---|
| Member / members | role/status/authType; phone/nick/password; profile; counters/rank; deletedAt | unique sparse phone and nickname; required password with select:false |
| Property / properties | type/status/location/address/title/price/area/beds/rooms/images; memberId ref Member; counters/rank; soldAt/deletedAt/constructedAt | unique type+location+title+price tuple |
| BoardArticle / boardArticles | category/status/title/content/image; memberId ref Member; views/likes/comments | no explicit secondary index |
| Comment / comments | status/group/content/commentRefId/memberId | polymorphic target, no DB foreign-key enforcement or explicit secondary index |
| Follow / follows | followerId and followingId | unique followingId+followerId |
| Like / likes | likeGroup/likeRefId/memberId ref Member | unique memberId+likeRefId; group omitted from key; schema mistakenly uses ViewGroup |
| View / views | viewGroup/viewRefId/memberId ref Member | unique memberId+viewRefId; group omitted from key |
| Notice / notices | category/status/title/content/memberId ref Member | currently unregistered schema |
| Notification / notifications | type/status/group/title/desc/authorId/receiverId/propertyId/articleId | currently unregistered schema |

See dto-reference.md for every GraphQL field and enum. GraphQL output DTOs double as `Model<T>` types; they are not precise persistence interfaces. Aggregation adds memberData, meLiked, meFollowed and follower/following data without persisting them.

## Aggregation patterns

Most list services build `$match`, `$sort`, then `$facet` containing `list` with skip/limit and joins, plus `metaCounter: [{ $count: 'total' }]`. Empty totals are usually `[]`, not `{total:0}`. `result.length` checks only the outer facet array and do not guarantee a nonempty list. Member joins use literal collection names, including case-sensitive `boardArticles` for that schema. `$unwind` without preserveNullAndEmptyArrays drops missing joins, which can make page lengths and pre-join totals disagree.

Favorites and visits first join properties, then paginate and join their owners. These pipelines do not restrict joined property status. Relationship lists also join member documents without explicit status restriction. Raw lookup results can contain password hashes even though the Member GraphQL type does not expose memberPassword; logs are a separate leakage surface.

## Consistency and lifecycle

Counters are denormalized and updated through `$inc` in separate operations. There are no sessions/transactions in reviewed source. Property/article/comment creation, follows, likes and views can commit a record while a later counter operation fails. Like toggles and view creation use read-then-write sequences. Unique indexes stop some duplicates but do not make related counter updates atomic.

Properties and articles use soft status changes, followed by admin hard deletion only when already DELETE. Comments can be soft-deleted by owners and directly hard-deleted by admin. No cascading deletion of related likes/views/comments/files was found. Member deletedAt exists, but MemberUpdate's hidden `deleteAt` field is a different name and no service assigns the intended timestamp.

## Recommended persistence changes

Choose a transactional or repairable counter strategy and test concurrent calls. Validate target existence/status before related writes. Add explicit projections for joins. Derive workload-specific compound indexes using actual query plans rather than guessing. Confirm whether the property unique tuple is intended across different owners and street addresses. Enable appropriate update validation and explicitly disallow null for non-null persisted fields: [Mongoose update validators are opt-in](https://mongoosejs.com/docs/validation.html#update-validators). Verify against the installed v8 implementation when implementing; the linked upstream documentation may describe a newer release.
