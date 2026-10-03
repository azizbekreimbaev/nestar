# DTO and enum field reference

Generated from the reviewed TypeScript declarations. Decorators determine GraphQL exposure and validation; TypeScript annotations alone do not. Undecorated fields are included to distinguish server-injected fields.

## BoardArticleInput

Source: `apps/nestar-api/src/libs/dto/board-article/board-article.input.ts`:8

| Field / value | Type / value | Decorators | Line |
|---|---|---|---|
| `articleCategory` | `BoardArticleCategory` | @IsNotEmpty() @Field(() => BoardArticleCategory) | 10 |
| `articleTitle` | `string` | @IsNotEmpty() @Length(3, 50) @Field(() => String) | 14 |
| `articleContent` | `string` | @IsNotEmpty() @Length(3, 250) @Field(() => String) | 19 |
| `articleImage` | `string` | @IsOptional() @Field(() => String, { nullable: true }) | 24 |
| `memberId` | `ObjectId` |  | 28 |

## BAISearch

Source: `apps/nestar-api/src/libs/dto/board-article/board-article.input.ts`:31

| Field / value | Type / value | Decorators | Line |
|---|---|---|---|
| `articleCategory` | `BoardArticleCategory` | @IsOptional() @Field(() => BoardArticleCategory, { nullable: true }) | 33 |
| `text` | `string` | @IsOptional() @Field(() => String, { nullable: true }) | 37 |
| `memberId` | `ObjectId` | @IsOptional() @Field(() => String, { nullable: true }) | 41 |

## BoardArticlesInquiry

Source: `apps/nestar-api/src/libs/dto/board-article/board-article.input.ts`:46

| Field / value | Type / value | Decorators | Line |
|---|---|---|---|
| `page` | `number` | @IsNotEmpty() @Min(1) @Field(() => Int) | 48 |
| `limit` | `number` | @IsNotEmpty() @Min(1) @Field(() => Int) | 53 |
| `sort` | `string` | @IsOptional() @IsIn(availableBoardArticleSorts) @Field(() => String, { nullable: true }) | 58 |
| `direction` | `Direction` | @IsOptional() @Field(() => Direction, { nullable: true }) | 63 |
| `search` | `BAISearch` | @IsNotEmpty() @Field(() => BAISearch) | 67 |

## ABAISearch

Source: `apps/nestar-api/src/libs/dto/board-article/board-article.input.ts`:72

| Field / value | Type / value | Decorators | Line |
|---|---|---|---|
| `articleStatus` | `BoardArticleStatus` | @IsOptional() @Field(() => BoardArticleStatus, { nullable: true }) | 74 |
| `articleCategory` | `BoardArticleCategory` | @IsOptional() @Field(() => BoardArticleCategory, { nullable: true }) | 78 |

## AllBoardArticlesInquiry

Source: `apps/nestar-api/src/libs/dto/board-article/board-article.input.ts`:83

| Field / value | Type / value | Decorators | Line |
|---|---|---|---|
| `page` | `number` | @IsNotEmpty() @Min(1) @Field(() => Int) | 85 |
| `limit` | `number` | @IsNotEmpty() @Min(1) @Field(() => Int) | 90 |
| `sort` | `string` | @IsOptional() @IsIn(availableBoardArticleSorts) @Field(() => String, { nullable: true }) | 95 |
| `direction` | `Direction` | @IsOptional() @Field(() => Direction, { nullable: true }) | 100 |
| `search` | `ABAISearch` | @IsNotEmpty() @Field(() => ABAISearch) | 104 |

## BoardArticle

Source: `apps/nestar-api/src/libs/dto/board-article/board-article.ts`:7

| Field / value | Type / value | Decorators | Line |
|---|---|---|---|
| `_id` | `ObjectId` | @Field(() => String) | 9 |
| `articleCategory` | `BoardArticleCategory` | @Field(() => BoardArticleCategory) | 12 |
| `articleStatus` | `BoardArticleStatus` | @Field(() => BoardArticleStatus) | 15 |
| `articleTitle` | `string` | @Field(() => String) | 18 |
| `articleContent` | `string` | @Field(() => String) | 21 |
| `articleImage` | `string` | @Field(() => String, { nullable: true }) | 24 |
| `articleViews` | `number` | @Field(() => Int) | 27 |
| `articleLikes` | `number` | @Field(() => Int) | 30 |
| `articleComments` | `number` | @Field(() => Int) | 33 |
| `memberId` | `ObjectId` | @Field(() => String) | 36 |
| `createdAt` | `Date` | @Field(() => Date) | 39 |
| `updatedAt` | `Date` | @Field(() => Date) | 42 |
| `memberData` | `Member` | @Field(() => Member, { nullable: true }) | 47 |
| `meLiked` | `MeLiked[]` | @Field(() => [MeLiked], { nullable: true }) | 51 |

## BoardArticles

Source: `apps/nestar-api/src/libs/dto/board-article/board-article.ts`:56

| Field / value | Type / value | Decorators | Line |
|---|---|---|---|
| `list` | `BoardArticle[]` | @Field(() => [BoardArticle]) | 58 |
| `metaCounter` | `TotalCounter[]` | @Field(() => [TotalCounter], { nullable: true }) | 61 |

## BoardArticleUpdate

Source: `apps/nestar-api/src/libs/dto/board-article/board-article.update.ts`:6

| Field / value | Type / value | Decorators | Line |
|---|---|---|---|
| `_id` | `ObjectId` | @IsNotEmpty() @Field(() => String) | 8 |
| `articleStatus` | `BoardArticleStatus` | @IsOptional() @Field(() => BoardArticleStatus, { nullable: true }) | 12 |
| `articleTitle` | `string` | @IsOptional() @Length(3, 50) @Field(() => String, { nullable: true }) | 16 |
| `articleContent` | `string` | @IsOptional() @Length(3, 250) @Field(() => String, { nullable: true }) | 21 |
| `articleImage` | `string` | @IsOptional() @Field(() => String, { nullable: true }) | 26 |

## CommentInput

Source: `apps/nestar-api/src/libs/dto/comment/comment.input.ts`:8

| Field / value | Type / value | Decorators | Line |
|---|---|---|---|
| `commentGroup` | `CommentGroup` | @IsNotEmpty() @Field(() => CommentGroup) | 10 |
| `commentContent` | `string` | @IsNotEmpty() @Length(1, 100) @Field(() => String) | 14 |
| `commentRefId` | `ObjectId` | @IsNotEmpty() @Field(() => String) | 19 |
| `memberId` | `ObjectId` |  | 23 |

## CISearch

Source: `apps/nestar-api/src/libs/dto/comment/comment.input.ts`:26

| Field / value | Type / value | Decorators | Line |
|---|---|---|---|
| `commentRefId` | `ObjectId` | @IsNotEmpty() @Field(() => String) | 28 |

## CommentsInquiry

Source: `apps/nestar-api/src/libs/dto/comment/comment.input.ts`:33

| Field / value | Type / value | Decorators | Line |
|---|---|---|---|
| `page` | `number` | @IsNotEmpty() @Min(1) @Field(() => Int) | 35 |
| `limit` | `number` | @IsNotEmpty() @Min(1) @Field(() => Int) | 40 |
| `sort` | `string` | @IsOptional() @IsIn(availableCommentSorts) @Field(() => String, { nullable: true }) | 45 |
| `direction` | `Direction` | @IsOptional() @Field(() => Direction, { nullable: true }) | 50 |
| `search` | `CISearch` | @IsNotEmpty() @Field(() => CISearch) | 54 |

## Comment

Source: `apps/nestar-api/src/libs/dto/comment/comment.ts`:6

| Field / value | Type / value | Decorators | Line |
|---|---|---|---|
| `_id` | `ObjectId` | @Field(() => String) | 8 |
| `commentStatus` | `CommentStatus` | @Field(() => CommentStatus) | 11 |
| `commentGroup` | `CommentGroup` | @Field(() => CommentGroup) | 14 |
| `commentContent` | `string` | @Field(() => String) | 17 |
| `commentRefId` | `ObjectId` | @Field(() => String) | 20 |
| `memberId` | `ObjectId` | @Field(() => String) | 23 |
| `createdAt` | `Date` | @Field(() => Date) | 26 |
| `updatedAt` | `Date` | @Field(() => Date) | 29 |
| `memberData` | `Member` | @Field(() => Member, { nullable: true }) | 34 |

## Comments

Source: `apps/nestar-api/src/libs/dto/comment/comment.ts`:38

| Field / value | Type / value | Decorators | Line |
|---|---|---|---|
| `list` | `Comment[]` | @Field(() => [Comment]) | 40 |
| `metaCounter` | `TotalCounter[]` | @Field(() => [TotalCounter], { nullable: true }) | 43 |

## CommentUpdate

Source: `apps/nestar-api/src/libs/dto/comment/comment.update.ts`:6

| Field / value | Type / value | Decorators | Line |
|---|---|---|---|
| `_id` | `ObjectId` | @IsNotEmpty() @Field(() => String) | 8 |
| `commentStatus` | `CommentStatus` | @IsOptional() @Field(() => CommentStatus, { nullable: true }) | 12 |
| `commentContent` | `string` | @IsOptional() @Length(1, 100) @Field(() => String, { nullable: true }) | 16 |

## FollowSearch

Source: `apps/nestar-api/src/libs/dto/follow/follow.input.ts`:5

| Field / value | Type / value | Decorators | Line |
|---|---|---|---|
| `followingId` | `ObjectId` | @IsOptional() @Field(() => String, { nullable: true }) | 7 |
| `followerId` | `ObjectId` | @IsOptional() @Field(() => String, { nullable: true }) | 11 |

## FollowInquiry

Source: `apps/nestar-api/src/libs/dto/follow/follow.input.ts`:16

| Field / value | Type / value | Decorators | Line |
|---|---|---|---|
| `page` | `number` | @IsNotEmpty() @Min(1) @Field(() => Int) | 18 |
| `limit` | `number` | @IsNotEmpty() @Min(1) @Field(() => Int) | 23 |
| `search` | `FollowSearch` | @IsNotEmpty() @Field(() => FollowSearch) | 28 |

## MeFollowed

Source: `apps/nestar-api/src/libs/dto/follow/follow.ts`:6

| Field / value | Type / value | Decorators | Line |
|---|---|---|---|
| `followingId` | `ObjectId` | @Field(() => String) | 8 |
| `followerId` | `ObjectId` | @Field(() => String) | 11 |
| `myFollowing` | `boolean` | @Field(() => Boolean) | 14 |

## Follower

Source: `apps/nestar-api/src/libs/dto/follow/follow.ts`:18

| Field / value | Type / value | Decorators | Line |
|---|---|---|---|
| `_id` | `ObjectId` | @Field(() => String) | 20 |
| `followingId` | `ObjectId` | @Field(() => String) | 23 |
| `followerId` | `ObjectId` | @Field(() => String) | 26 |
| `createdAt` | `Date` | @Field(() => Date) | 29 |
| `updatedAt` | `Date` | @Field(() => Date) | 32 |
| `meLiked` | `MeLiked[]` | @Field(() => [MeLiked], { nullable: true }) | 37 |
| `meFollowed` | `MeFollowed[]` | @Field(() => [MeFollowed], { nullable: true }) | 40 |
| `followerData` | `Member` | @Field(() => Member, { nullable: true }) | 43 |

## Following

Source: `apps/nestar-api/src/libs/dto/follow/follow.ts`:47

| Field / value | Type / value | Decorators | Line |
|---|---|---|---|
| `_id` | `ObjectId` | @Field(() => String) | 49 |
| `followingId` | `ObjectId` | @Field(() => String) | 52 |
| `followerId` | `ObjectId` | @Field(() => String) | 55 |
| `createdAt` | `Date` | @Field(() => Date) | 58 |
| `updatedAt` | `Date` | @Field(() => Date) | 61 |
| `meLiked` | `MeLiked[]` | @Field(() => [MeLiked], { nullable: true }) | 66 |
| `meFollowed` | `MeFollowed[]` | @Field(() => [MeFollowed], { nullable: true }) | 69 |
| `followingData` | `Member` | @Field(() => Member, { nullable: true }) | 72 |

## Followings

Source: `apps/nestar-api/src/libs/dto/follow/follow.ts`:76

| Field / value | Type / value | Decorators | Line |
|---|---|---|---|
| `list` | `Following[]` | @Field(() => [Following]) | 78 |
| `metaCounter` | `TotalCounter[]` | @Field(() => [TotalCounter], { nullable: true }) | 81 |

## Followers

Source: `apps/nestar-api/src/libs/dto/follow/follow.ts`:85

| Field / value | Type / value | Decorators | Line |
|---|---|---|---|
| `list` | `Follower[]` | @Field(() => [Follower]) | 87 |
| `metaCounter` | `TotalCounter[]` | @Field(() => [TotalCounter], { nullable: true }) | 90 |

## LikeInput

Source: `apps/nestar-api/src/libs/dto/like/like.input.ts`:6

| Field / value | Type / value | Decorators | Line |
|---|---|---|---|
| `memberId` | `ObjectId` | @IsNotEmpty() @Field(() => String) | 8 |
| `likeRefId` | `ObjectId` | @IsNotEmpty() @Field(() => String) | 12 |
| `likeGroup` | `LikeGroup` | @IsNotEmpty() @Field(() => LikeGroup) | 16 |

## MeLiked

Source: `apps/nestar-api/src/libs/dto/like/like.ts`:5

| Field / value | Type / value | Decorators | Line |
|---|---|---|---|
| `memberId` | `ObjectId` | @Field(() => String) | 7 |
| `likeRefId` | `ObjectId` | @Field(() => String) | 10 |
| `myFavorite` | `boolean` | @Field(() => Boolean) | 13 |

## Like

Source: `apps/nestar-api/src/libs/dto/like/like.ts`:17

| Field / value | Type / value | Decorators | Line |
|---|---|---|---|
| `_id` | `ObjectId` | @Field(() => String) | 19 |
| `likeGroup` | `LikeGroup` | @Field(() => LikeGroup) | 22 |
| `likeRefId` | `ObjectId` | @Field(() => String) | 25 |
| `memberId` | `ObjectId` | @Field(() => String) | 28 |
| `createdAt` | `Date` | @Field(() => Date) | 31 |
| `updatedAt` | `Date` | @Field(() => Date) | 34 |

## MemberInput

Source: `apps/nestar-api/src/libs/dto/member/member.input.ts`:8

| Field / value | Type / value | Decorators | Line |
|---|---|---|---|
| `memberNick` | `string` | @IsNotEmpty() @Length(3, 12) @Field(() => String) | 10 |
| `memberPassword` | `string` | @IsNotEmpty() @Length(3, 12) @Field(() => String) | 15 |
| `memberPhone` | `string` | @IsNotEmpty() @Field(() => String) | 20 |
| `memberType` | `MemberType` | @IsOptional() @Field(() => MemberType, { nullable: true }) | 24 |
| `memberAuthType` | `MemberAuthType` | @IsOptional() @Field(() => MemberAuthType, { nullable: true }) | 28 |

## LoginInput

Source: `apps/nestar-api/src/libs/dto/member/member.input.ts`:34

| Field / value | Type / value | Decorators | Line |
|---|---|---|---|
| `memberNick` | `string` | @IsNotEmpty() @Length(3, 12) @Field(() => String) | 36 |
| `memberPassword` | `string` | @IsNotEmpty() @Length(3, 12) @Field(() => String) | 41 |

## AISearch

Source: `apps/nestar-api/src/libs/dto/member/member.input.ts`:47

| Field / value | Type / value | Decorators | Line |
|---|---|---|---|
| `text` | `string` | @IsOptional() @Field(() => String, { nullable: true }) | 49 |

## AgentsInquiry

Source: `apps/nestar-api/src/libs/dto/member/member.input.ts`:55

| Field / value | Type / value | Decorators | Line |
|---|---|---|---|
| `page` | `number` | @IsNotEmpty() @Min(1) @Field(() => Int) | 57 |
| `limit` | `number` | @IsNotEmpty() @Min(1) @Field(() => Int) | 62 |
| `sort` | `string` | @IsOptional() @IsIn(availableAgentSorts) @Field(() => String, { nullable: true }) | 67 |
| `direction` | `string` | @IsOptional() @Field(() => Direction, { nullable: true }) | 72 |
| `search` | `AISearch` | @IsNotEmpty() @Field(() => AISearch) | 76 |

## MISearch

Source: `apps/nestar-api/src/libs/dto/member/member.input.ts`:82

| Field / value | Type / value | Decorators | Line |
|---|---|---|---|
| `memberStatus` | `MemberStatus` | @IsOptional() @Field(() => MemberStatus, { nullable: true }) | 84 |
| `memberType` | `MemberType` | @IsOptional() @Field(() => MemberType, { nullable: true }) | 88 |
| `text` | `string` | @IsOptional() @Field(() => String, { nullable: true }) | 93 |

## MembersInquiry

Source: `apps/nestar-api/src/libs/dto/member/member.input.ts`:99

| Field / value | Type / value | Decorators | Line |
|---|---|---|---|
| `page` | `number` | @IsNotEmpty() @Min(1) @Field(() => Int) | 101 |
| `limit` | `number` | @IsNotEmpty() @Min(1) @Field(() => Int) | 106 |
| `sort` | `string` | @IsOptional() @IsIn(availableMemberSorts) @Field(() => String, { nullable: true }) | 111 |
| `direction` | `string` | @IsOptional() @Field(() => Direction, { nullable: true }) | 116 |
| `search` | `MISearch` | @IsNotEmpty() @Field(() => MISearch) | 120 |

## Member

Source: `apps/nestar-api/src/libs/dto/member/member.ts`:8

| Field / value | Type / value | Decorators | Line |
|---|---|---|---|
| `_id` | `ObjectId` | @Field(() => String) | 11 |
| `memberType` | `MemberType` | @Field(() => MemberType) | 15 |
| `memberStatus` | `MemberStatus` | @Field(() => MemberStatus) | 18 |
| `memberAuthType` | `MemberAuthType` | @Field(() => MemberAuthType) | 21 |
| `memberPhone` | `string` | @Field(() => String) | 24 |
| `memberNick` | `string` | @Field(() => String) | 27 |
| `memberPassword` | `string` |  | 30 |
| `memberFullName` | `string` | @Field(() => String, { nullable: true }) | 32 |
| `memberImage` | `string` | @Field(() => String) | 35 |
| `memberAddress` | `string` | @Field(() => String, { nullable: true }) | 38 |
| `memberDesc` | `string` | @Field(() => String, { nullable: true }) | 41 |
| `memberProperties` | `number` | @Field(() => Int) | 45 |
| `memberArticles` | `number` | @Field(() => Int) | 48 |
| `memberFollowers` | `number` | @Field(() => Int) | 51 |
| `memberFollowings` | `number` | @Field(() => Int) | 54 |
| `memberPoints` | `number` | @Field(() => Int) | 57 |
| `memberLikes` | `number` | @Field(() => Int) | 60 |
| `memberViews` | `number` | @Field(() => Int) | 63 |
| `memberComments` | `number` | @Field(() => Int) | 66 |
| `memberRank` | `number` | @Field(() => Int) | 69 |
| `memberWarnings` | `number` | @Field(() => Int) | 72 |
| `memberBlocks` | `number` | @Field(() => Int) | 75 |
| `deletedAt` | `Date` | @Field(() => Date, { nullable: true }) | 78 |
| `createdAt` | `Date` | @Field(() => Date,) | 81 |
| `updatedAt` | `Date` | @Field(() => Date,) | 84 |
| `accessToken` | `string` | @Field(() => String, { nullable: true }) | 86 |
| `meLiked` | `MeLiked[]` | @Field(() => [MeLiked], { nullable: true }) | 91 |
| `meFollowed` | `MeFollowed[]` | @Field(() => [MeFollowed], { nullable: true }) | 94 |

## TotalCounter

Source: `apps/nestar-api/src/libs/dto/member/member.ts`:100

| Field / value | Type / value | Decorators | Line |
|---|---|---|---|
| `total` | `number` | @Field(() => Int, { nullable: true }) | 102 |

## Members

Source: `apps/nestar-api/src/libs/dto/member/member.ts`:107

| Field / value | Type / value | Decorators | Line |
|---|---|---|---|
| `list` | `Member[]` | @Field(() => [Member]) | 109 |
| `metaCounter` | `TotalCounter[]` | @Field(() => [TotalCounter], { nullable: true }) | 112 |

## MemberUpdate

Source: `apps/nestar-api/src/libs/dto/member/member.update.ts`:5

| Field / value | Type / value | Decorators | Line |
|---|---|---|---|
| `_id` | `string` | @IsNotEmpty() @Field(() => String) | 9 |
| `memberType` | `MemberType` | @IsOptional() @Field(() => MemberType, { nullable: true }) | 14 |
| `memberStatus` | `MemberStatus` | @IsOptional() @Field(() => MemberStatus, { nullable: true }) | 18 |
| `memberPhone` | `string` | @IsOptional() @Field(() => String, { nullable: true }) | 22 |
| `memberNick` | `string` | @IsOptional() @Length(3, 12) @Field(() => String, { nullable: true }) | 26 |
| `memberPassword` | `string` | @IsOptional() @Length(3, 12) @Field(() => String, { nullable: true }) | 31 |
| `memberFullName` | `string` | @IsOptional() @Length(3, 100) @Field(() => String, { nullable: true }) | 36 |
| `memberImage` | `string` | @IsOptional() @Field(() => String, { nullable: true }) | 41 |
| `memberAddress` | `string` | @IsOptional() @Field(() => String, { nullable: true }) | 45 |
| `memberDesc` | `string` | @IsOptional() @Field(() => String, { nullable: true }) | 49 |
| `deleteAt` | `Date` |  | 53 |

## PropertyInput

Source: `apps/nestar-api/src/libs/dto/property/property.input.ts`:9

| Field / value | Type / value | Decorators | Line |
|---|---|---|---|
| `propertyType` | `PropertyType` | @IsNotEmpty() @Field(() => PropertyType) | 12 |
| `propertyLocation` | `PropertyLocation` | @IsNotEmpty() @Field(() => PropertyLocation) | 16 |
| `propertyAddress` | `string` | @IsNotEmpty() @Length(3, 100) @Field(() => String) | 20 |
| `propertyTitle` | `string` | @IsNotEmpty() @Length(3, 100) @Field(() => String) | 25 |
| `propertyPrice` | `number` | @IsNotEmpty() @Field(() => Number) | 30 |
| `propertySquare` | `number` | @IsNotEmpty() @Field(() => Number) | 34 |
| `propertyBeds` | `number` | @IsNotEmpty() @IsInt() @Min(1) @Field(() => Int) | 38 |
| `propertyRooms` | `number` | @IsNotEmpty() @IsInt() @Min(1) @Field(() => Int) | 44 |
| `propertyImages` | `string[]` | @IsNotEmpty() @Field(() => [String]) | 50 |
| `propertyDesc` | `string` | @IsOptional() @Length(5, 500) @Field(() => String, { nullable: true }) | 54 |
| `propertyBarter` | `boolean` | @IsOptional() @Field(() => Boolean, { nullable: true }) | 59 |
| `propertyRent` | `boolean` | @IsOptional() @Field(() => Boolean, { nullable: true }) | 63 |
| `memberId` | `ObjectId` |  | 68 |
| `constructedAt` | `Date` | @IsOptional() @Field(() => Date, { nullable: true }) | 70 |

## PricesRange

Source: `apps/nestar-api/src/libs/dto/property/property.input.ts`:78

| Field / value | Type / value | Decorators | Line |
|---|---|---|---|
| `start` | `number` | @Field(() => Int) | 80 |
| `end` | `number` | @Field(() => Int) | 83 |

## SquaresRange

Source: `apps/nestar-api/src/libs/dto/property/property.input.ts`:88

| Field / value | Type / value | Decorators | Line |
|---|---|---|---|
| `start` | `number` | @Field(() => Int) | 90 |
| `end` | `number` | @Field(() => Int) | 93 |

## PeriodsRange

Source: `apps/nestar-api/src/libs/dto/property/property.input.ts`:98

| Field / value | Type / value | Decorators | Line |
|---|---|---|---|
| `start` | `Date` | @Field(() => Date) | 100 |
| `end` | `Date` | @Field(() => Date) | 103 |

## PISearch

Source: `apps/nestar-api/src/libs/dto/property/property.input.ts`:107

| Field / value | Type / value | Decorators | Line |
|---|---|---|---|
| `memberId` | `ObjectId` | @IsOptional() @Field(() => String, { nullable: true }) | 110 |
| `locationList` | `PropertyLocation[]` | @IsOptional() @Field(() => [PropertyLocation], { nullable: true }) | 115 |
| `typeList` | `PropertyType[]` | @IsOptional() @Field(() => [PropertyType], { nullable: true }) | 120 |
| `roomsList` | `number[]` | @IsOptional() @Field(() => [Int], { nullable: true }) | 125 |
| `bedsList` | `number[]` | @IsOptional() @Field(() => [Int], { nullable: true }) | 130 |
| `options` | `string[]` | @IsOptional() @IsIn(availableOptions, { each: true }) @Field(() => [String], { nullable: true }) | 135 |
| `pricesRange` | `PricesRange` | @IsOptional() @Field(() => PricesRange, { nullable: true }) | 141 |
| `periodsRange` | `PeriodsRange` | @IsOptional() @Field(() => PeriodsRange, { nullable: true }) | 146 |
| `squaresRange` | `SquaresRange` | @IsOptional() @Field(() => SquaresRange, { nullable: true }) | 151 |
| `text` | `string` | @IsOptional() @Field(() => String, { nullable: true }) | 156 |

## PropertiesInquiry

Source: `apps/nestar-api/src/libs/dto/property/property.input.ts`:162

| Field / value | Type / value | Decorators | Line |
|---|---|---|---|
| `page` | `number` | @IsNotEmpty() @Min(1) @Field(() => Int) | 165 |
| `limit` | `number` | @IsNotEmpty() @Min(1) @Field(() => Int) | 171 |
| `sort` | `string` | @IsOptional() @IsIn(availablePropertySorts) @Field(() => String, { nullable: true }) | 177 |
| `direction` | `Direction` | @IsOptional() @Field(() => Direction, { nullable: true }) | 183 |
| `search` | `PISearch` | @IsNotEmpty() @Field(() => PISearch) | 188 |

## APISearch

Source: `apps/nestar-api/src/libs/dto/property/property.input.ts`:193

| Field / value | Type / value | Decorators | Line |
|---|---|---|---|
| `propertyStatus` | `PropertyStatus` | @IsOptional() @Field(() => PropertyStatus, { nullable: true }) | 195 |

## AgentPropertiesInquiry

Source: `apps/nestar-api/src/libs/dto/property/property.input.ts`:201

| Field / value | Type / value | Decorators | Line |
|---|---|---|---|
| `page` | `number` | @IsNotEmpty() @Min(1) @Field(() => Int) | 203 |
| `limit` | `number` | @IsNotEmpty() @Min(1) @Field(() => Int) | 208 |
| `sort` | `string` | @IsOptional() @IsIn(availablePropertySorts) @Field(() => String, { nullable: true }) | 213 |
| `direction` | `Direction` | @IsOptional() @Field(() => Direction, { nullable: true }) | 218 |
| `search` | `APISearch` | @IsNotEmpty() @Field(() => APISearch) | 222 |

## ALPISearch

Source: `apps/nestar-api/src/libs/dto/property/property.input.ts`:228

| Field / value | Type / value | Decorators | Line |
|---|---|---|---|
| `propertyStatus` | `PropertyStatus` | @IsOptional() @Field(() => PropertyStatus, { nullable: true }) | 230 |
| `propertyLocationList` | `PropertyLocation[]` | @IsOptional() @Field(() => [PropertyLocation], { nullable: true }) | 234 |

## AllPropertiesInquiry

Source: `apps/nestar-api/src/libs/dto/property/property.input.ts`:239

| Field / value | Type / value | Decorators | Line |
|---|---|---|---|
| `page` | `number` | @IsNotEmpty() @Min(1) @Field(() => Int) | 241 |
| `limit` | `number` | @IsNotEmpty() @Min(1) @Field(() => Int) | 246 |
| `sort` | `string` | @IsOptional() @IsIn(availablePropertySorts) @Field(() => String, { nullable: true }) | 251 |
| `direction` | `Direction` | @IsOptional() @Field(() => Direction, { nullable: true }) | 256 |
| `search` | `ALPISearch` | @IsNotEmpty() @Field(() => ALPISearch) | 260 |

## OrdinaryInquiry

Source: `apps/nestar-api/src/libs/dto/property/property.input.ts`:265

| Field / value | Type / value | Decorators | Line |
|---|---|---|---|
| `page` | `number` | @IsNotEmpty() @Min(1) @Field(() => Int) | 267 |
| `limit` | `number` | @IsNotEmpty() @Min(1) @Field(() => Int) | 272 |

## Property

Source: `apps/nestar-api/src/libs/dto/property/property.ts`:8

| Field / value | Type / value | Decorators | Line |
|---|---|---|---|
| `_id` | `ObjectId` | @Field(() => String) | 11 |
| `propertyType` | `PropertyType` | @Field(() => PropertyType) | 14 |
| `propertyStatus` | `PropertyStatus` | @Field(() => PropertyStatus) | 17 |
| `propertyLocation` | `PropertyLocation` | @Field(() => PropertyLocation) | 20 |
| `propertyAddress` | `string` | @Field(() => String) | 23 |
| `propertyTitle` | `string` | @Field(() => String) | 27 |
| `propertyPrice` | `number` | @Field(() => Number) | 31 |
| `propertySquare` | `number` | @Field(() => Number) | 35 |
| `propertyBeds` | `number` | @Field(() => Int) | 38 |
| `propertyRooms` | `number` | @Field(() => Int) | 42 |
| `propertyViews` | `number` | @Field(() => Int) | 46 |
| `propertyLikes` | `number` | @Field(() => Int) | 50 |
| `propertyComments` | `number` | @Field(() => Int) | 54 |
| `propertyRank` | `number` | @Field(() => Int) | 58 |
| `propertyImages` | `string[]` | @Field(() => [String]) | 62 |
| `propertyDesc` | `string` | @Field(() => String, { nullable: true }) | 67 |
| `propertyBarter` | `boolean` | @Field(() => Boolean) | 70 |
| `propertyRent` | `boolean` | @Field(() => Boolean) | 73 |
| `memberId` | `ObjectId` | @Field(() => String) | 77 |
| `soldAt` | `Date` | @Field(() => Date, { nullable: true }) | 81 |
| `deletedAt` | `Date` | @Field(() => Date, { nullable: true }) | 84 |
| `constructedAt` | `Date` | @Field(() => Date, { nullable: true }) | 87 |
| `createdAt` | `Date` | @Field(() => Date,) | 90 |
| `updatedAt` | `Date` | @Field(() => Date,) | 93 |
| `memberData` | `Member` | @Field(() => Member, { nullable: true }) | 98 |
| `meLiked` | `MeLiked[]` | @Field(() => [MeLiked], { nullable: true }) | 101 |

## Properties

Source: `apps/nestar-api/src/libs/dto/property/property.ts`:108

| Field / value | Type / value | Decorators | Line |
|---|---|---|---|
| `list` | `Property[]` | @Field(() => [Property]) | 111 |
| `metaCounter` | `TotalCounter[]` | @Field(() => [TotalCounter], { nullable: true }) | 114 |

## PropertyUpdate

Source: `apps/nestar-api/src/libs/dto/property/property.update.ts`:17

| Field / value | Type / value | Decorators | Line |
|---|---|---|---|
| `_id` | `ObjectId` | @IsNotEmpty() @Field(() => String) | 20 |
| `propertyType` | `PropertyType` | @IsOptional() @Field(() => PropertyType, { nullable: true }) | 25 |
| `propertyStatus` | `PropertyStatus` | @IsOptional() @Field(() => PropertyStatus, { nullable: true }) | 30 |
| `propertyLocation` | `PropertyLocation` | @IsOptional() @Field(() => PropertyLocation, { nullable: true }) | 35 |
| `propertyAddress` | `string` | @IsOptional() @Length(3, 100) @Field(() => String, { nullable: true }) | 40 |
| `propertyTitle` | `string` | @IsOptional() @Length(3, 100) @Field(() => String, { nullable: true }) | 46 |
| `propertyPrice` | `number` | @IsOptional() @Field(() => Number, { nullable: true }) | 52 |
| `propertySquare` | `number` | @IsOptional() @Field(() => Number, { nullable: true }) | 57 |
| `propertyBeds` | `number` | @IsOptional() @IsInt() @Min(1) @Field(() => Int, { nullable: true }) | 62 |
| `propertyRooms` | `number` | @IsOptional() @IsInt() @Min(1) @Field(() => Int, { nullable: true }) | 69 |
| `propertyImages` | `string[]` | @IsOptional() @Field(() => [String], { nullable: true }) | 76 |
| `propertyDesc` | `string` | @IsOptional() @Length(5, 500) @Field(() => String, { nullable: true }) | 81 |
| `propertyBarter` | `boolean` | @IsOptional() @Field(() => Boolean, { nullable: true }) | 87 |
| `propertyRent` | `boolean` | @IsOptional() @Field(() => Boolean, { nullable: true }) | 92 |
| `soldAt` | `Date` |  | 97 |
| `deletedAt` | `Date` |  | 100 |
| `constructedAt` | `Date` | @IsOptional() @Field(() => Date, { nullable: true }) | 103 |

## ViewInput

Source: `apps/nestar-api/src/libs/dto/view/view.input.ts`:6

| Field / value | Type / value | Decorators | Line |
|---|---|---|---|
| `memberId` | `ObjectId` | @IsNotEmpty() @Field(() => String) | 9 |
| `viewRefId` | `ObjectId` | @IsNotEmpty() @Field(() => String) | 13 |
| `viewGroup` | `ViewGroup` | @IsNotEmpty() @Field(() => ViewGroup) | 18 |

## View

Source: `apps/nestar-api/src/libs/dto/view/view.ts`:6

| Field / value | Type / value | Decorators | Line |
|---|---|---|---|
| `_id` | `ObjectId` | @Field(() => String) | 9 |
| `viewGroup` | `ViewGroup` | @Field(() => String) | 12 |
| `viewRefId` | `ObjectId` | @Field(() => String) | 15 |
| `memberId` | `ObjectId` | @Field(() => String) | 18 |
| `deletedAt` | `Date` | @Field(() => Date, { nullable: true }) | 21 |
| `createdAt` | `Date` | @Field(() => Date,) | 24 |
| `updatedAt` | `Date` | @Field(() => Date,) | 27 |

## BoardArticleCategory

Source: `apps/nestar-api/src/libs/enums/board-article.enum.ts`:3

| Field / value | Type / value | Decorators | Line |
|---|---|---|---|
| `FREE` | `'FREE'` |  | 4 |
| `RECOMMEND` | `'RECOMMEND'` |  | 5 |
| `NEWS` | `'NEWS'` |  | 6 |
| `HUMOR` | `'HUMOR'` |  | 7 |

## BoardArticleStatus

Source: `apps/nestar-api/src/libs/enums/board-article.enum.ts`:13

| Field / value | Type / value | Decorators | Line |
|---|---|---|---|
| `ACTIVE` | `'ACTIVE'` |  | 14 |
| `DELETE` | `'DELETE'` |  | 15 |

## CommentStatus

Source: `apps/nestar-api/src/libs/enums/comment.enum.ts`:3

| Field / value | Type / value | Decorators | Line |
|---|---|---|---|
| `ACTIVE` | `'ACTIVE'` |  | 4 |
| `DELETE` | `'DELETE'` |  | 5 |

## CommentGroup

Source: `apps/nestar-api/src/libs/enums/comment.enum.ts`:11

| Field / value | Type / value | Decorators | Line |
|---|---|---|---|
| `MEMBER` | `'MEMBER'` |  | 12 |
| `ARTICLE` | `'ARTICLE'` |  | 13 |
| `PROPERTY` | `'PROPERTY'` |  | 14 |

## Message

Source: `apps/nestar-api/src/libs/enums/common.enum.ts`:3

| Field / value | Type / value | Decorators | Line |
|---|---|---|---|
| `SOMETHING_WENT_WRONG` | `'Something went wrong!'` |  | 4 |
| `NO_DATA_FOUND` | `'No data found!'` |  | 5 |
| `CREATE_FAILED` | `'Create failed!'` |  | 6 |
| `UPDATE_FAILED` | `'Update failed!'` |  | 7 |
| `REMOVE_FAILED` | `'Remove failed!'` |  | 8 |
| `UPLOAD_FAILED` | `'Upload failed!'` |  | 9 |
| `BAD_REQUEST` | `'Bad Request'` |  | 10 |
| `USED_MEMBER_NICK_OR_PHONE` | `"Already used member nick or phone"` |  | 12 |
| `NO_MEMBER_NICK` | `'No member with that member nick!'` |  | 13 |
| `BLOCKED_USER` | `'You have been blocked!'` |  | 14 |
| `WRONG_PASSWORD` | `'Wrong password, try again!'` |  | 15 |
| `NOT_AUTHENTICATED` | `'You are not authenticated, please login first!'` |  | 16 |
| `TOKEN_NOT_EXIST` | `'Bearer token is not provided!'` |  | 17 |
| `ONLY_SPECIFIC_ROLES_ALLOWED` | `'Allowed only for members with specific roles!'` |  | 18 |
| `NOT_ALLOWED_REQUEST` | `'Not Allowed Request!'` |  | 19 |
| `PROVIDE_ALLOWED_FORMAT` | `'Please provide jpg, jpeg or png images!'` |  | 20 |
| `SELF_SUBSCRIPTION_DENIED` | `'Self subscription is denied!'` |  | 21 |

## Direction

Source: `apps/nestar-api/src/libs/enums/common.enum.ts`:25

| Field / value | Type / value | Decorators | Line |
|---|---|---|---|
| `ASC` | `1` |  | 26 |
| `DESC` | `-1` |  | 27 |

## LikeGroup

Source: `apps/nestar-api/src/libs/enums/like.enum.ts`:3

| Field / value | Type / value | Decorators | Line |
|---|---|---|---|
| `MEMBER` | `'MEMBER'` |  | 4 |
| `PROPERTY` | `'PROPERTY'` |  | 5 |
| `ARTICLE` | `'ARTICLE'` |  | 6 |

## MemberType

Source: `apps/nestar-api/src/libs/enums/member.enum.ts`:3

| Field / value | Type / value | Decorators | Line |
|---|---|---|---|
| `USER` | `"USER"` |  | 4 |
| `AGENT` | `"AGENT"` |  | 5 |
| `ADMIN` | `"ADMIN"` |  | 6 |

## MemberStatus

Source: `apps/nestar-api/src/libs/enums/member.enum.ts`:11

| Field / value | Type / value | Decorators | Line |
|---|---|---|---|
| `ACTIVE` | `"ACTIVE"` |  | 12 |
| `BLOCK` | `"BLOCK"` |  | 13 |
| `DELETE` | `"DELETE"` |  | 14 |

## MemberAuthType

Source: `apps/nestar-api/src/libs/enums/member.enum.ts`:19

| Field / value | Type / value | Decorators | Line |
|---|---|---|---|
| `PHONE` | `"PHONE"` |  | 20 |
| `EMAIL` | `"EMAIL"` |  | 21 |
| `TELEGRAPH` | `"TELEGRAPH"` |  | 22 |

## NoticeCategory

Source: `apps/nestar-api/src/libs/enums/notice.enum.ts`:3

| Field / value | Type / value | Decorators | Line |
|---|---|---|---|
| `FAQ` | `'FAQ'` |  | 4 |
| `TERMS` | `'TERMS'` |  | 5 |
| `INQUIRY` | `'INQUIRY'` |  | 6 |

## NoticeStatus

Source: `apps/nestar-api/src/libs/enums/notice.enum.ts`:12

| Field / value | Type / value | Decorators | Line |
|---|---|---|---|
| `HOLD` | `'HOLD'` |  | 13 |
| `ACTIVE` | `'ACTIVE'` |  | 14 |
| `DELETE` | `'DELETE'` |  | 15 |

## NotificationType

Source: `apps/nestar-api/src/libs/enums/notification.enum.ts`:3

| Field / value | Type / value | Decorators | Line |
|---|---|---|---|
| `LIKE` | `'LIKE'` |  | 4 |
| `COMMENT` | `'COMMENT'` |  | 5 |

## NotificationStatus

Source: `apps/nestar-api/src/libs/enums/notification.enum.ts`:11

| Field / value | Type / value | Decorators | Line |
|---|---|---|---|
| `WAIT` | `'WAIT'` |  | 12 |
| `READ` | `'READ'` |  | 13 |

## NotificationGroup

Source: `apps/nestar-api/src/libs/enums/notification.enum.ts`:19

| Field / value | Type / value | Decorators | Line |
|---|---|---|---|
| `MEMBER` | `'MEMBER'` |  | 20 |
| `ARTICLE` | `'ARTICLE'` |  | 21 |
| `PROPERTY` | `'PROPERTY'` |  | 22 |

## PropertyType

Source: `apps/nestar-api/src/libs/enums/property.enum.ts`:3

| Field / value | Type / value | Decorators | Line |
|---|---|---|---|
| `APARTMENT` | `'APARTMENT'` |  | 4 |
| `VILLA` | `'VILLA'` |  | 5 |
| `HOUSE` | `'HOUSE'` |  | 6 |

## PropertyStatus

Source: `apps/nestar-api/src/libs/enums/property.enum.ts`:12

| Field / value | Type / value | Decorators | Line |
|---|---|---|---|
| `ACTIVE` | `'ACTIVE'` |  | 13 |
| `SOLD` | `'SOLD'` |  | 14 |
| `DELETE` | `'DELETE'` |  | 15 |

## PropertyLocation

Source: `apps/nestar-api/src/libs/enums/property.enum.ts`:21

| Field / value | Type / value | Decorators | Line |
|---|---|---|---|
| `SEOUL` | `'SEOUL'` |  | 22 |
| `BUSAN` | `'BUSAN'` |  | 23 |
| `INCHEON` | `'INCHEON'` |  | 24 |
| `DAEGU` | `'DAEGU'` |  | 25 |
| `GYEONGJU` | `'GYEONGJU'` |  | 26 |
| `GWANGJU` | `'GWANGJU'` |  | 27 |
| `CHONJU` | `'CHONJU'` |  | 28 |
| `DAEJON` | `'DAEJON'` |  | 29 |
| `JEJU` | `'JEJU'` |  | 30 |

## ViewGroup

Source: `apps/nestar-api/src/libs/enums/view.enum.ts`:3

| Field / value | Type / value | Decorators | Line |
|---|---|---|---|
| `MEMBER` | `'MEMBER'` |  | 4 |
| `ARTICLE` | `'ARTICLE'` |  | 5 |
| `PROPERTY` | `'PROPERTY'` |  | 6 |

