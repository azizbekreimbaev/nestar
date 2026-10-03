# Observed business rules

These rules describe source behavior, not independently approved product requirements. Known defects are marked and should not be preserved as intended policy.

- Members: USER, AGENT, ADMIN; ACTIVE, BLOCK, DELETE. Signup defaults to USER/ACTIVE/PHONE through schema defaults, but the client can override role (defect). Login denies blocked/deleted accounts; later token checks do not (defect).
- Public getMember returns ACTIVE or BLOCK profiles and increments views only for authenticated viewers. It also attaches like/follow state. getAgents lists ACTIVE AGENT accounts. Public Member output includes phone/address; desired privacy policy needs a product decision.
- Properties: AGENT role can create; authenticated agent identity supplies owner. Updates require owner+ACTIVE status. ACTIVE may transition to SOLD or DELETE; API does not restore inactive properties. Admin updates also require ACTIVE. Admin hard removal requires DELETE.
- Property counts increase on creation and decrease when sold/deleted. soldAt/deletedAt should be recorded by apparent intent, but are currently assigned only to local variables. Anonymous property detail does not attach memberData, whereas public list does.
- Articles: authenticated members create; owner+ACTIVE required for self-update; deletion reduces memberArticles. Admin update is ACTIVE-only and hard removal requires DELETE. Categories FREE, RECOMMEND, NEWS, HUMOR.
- Comments target MEMBER, PROPERTY or ARTICLE. Creation increments corresponding target comment count, but can leave orphan records on invalid targets. Owner+ACTIVE required for update. Soft/hard removal does not reduce counts (defect).
- Likes toggle by member+target; each toggle changes the target like count. GROUP values are MEMBER, PROPERTY, ARTICLE. Favorites are property likes; inactive targets remain visible through joins (policy gap/defect relative to ordinary active listings).
- Views are unique per member+target, not per visit/day. Repeated reads do not refresh view timestamps. Anonymous reads do not increment view counts. Visited-property ordering therefore means first recorded views, not necessarily most recent visits.
- Follows deny self-follow; unique follower/following prevents duplicate relationship records. Subscribe/unsubscribe change both members' counters. Blocked profiles can be followed; deleted profiles cannot be unfollowed through current target lookup.
- Pagination is 1-based with minimum limit/page of 1; no maximum page size. Sort keys are allowlisted at top level. Property options are intended to be propertyBarter/propertyRent with OR semantics, not AND; nested validation does not enforce the allowlist today.
- Property filtering supports owner, locations, types, beds, rooms, creation-date/price/area ranges, options and title regex. Ranges are not checked for start <= end. Raw regex input can be malformed or expensive.
- Batch property rank = `2 * propertyLikes + propertyViews`. Agent rank = `4 * memberProperties + 3 * memberArticles + 2 * memberLikes + memberViews`. No decay or time window. Ranking only covers ACTIVE properties and ACTIVE AGENT members.
- Uploads accept declared PNG/JPG/JPEG MIME, max 15,000,000 bytes/file and 10 files at middleware. Target folder is client-provided and filename extension comes from original filename; both need server policy. Upload URLs are public.
- WebSocket chat is a public global broadcast, with a process-local client count; it is not a private messaging or notification subsystem.
