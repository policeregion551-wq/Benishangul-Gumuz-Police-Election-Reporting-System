# Security Specification - Benishangul Gumuz Police Election Reporting System

## Data Invariants
1. A Report must always be associated with a valid Zone and Woreda.
2. Only Woreda police can create reports.
3. Reports are immutable except for the 'status' and 'updatedAt' fields which can be updated by Admin or Zonal police (to mark as viewed).
4. Users cannot change their own roles (locked to Admin or creation time).
5. Zonal police can only see reports within their specific Zone.
6. Woreda police can only see reports they created.

## The "Dirty Dozen" Payloads (Denial Tests)
1. **Identity Spoofing**: Woreda A tries to create a report for Woreda B.
2. **Privilege Escalation**: Woreda user tries to update their role to 'admin'.
3. **Ghost Field**: Woreda user adds `isVerified: true` to a report.
4. **ID Poisoning**: Excessive document ID length (e.g. 2KB string).
5. **PII Leak**: Non-member trying to read another user's private profile (though in this app profiles are mostly public to admin/colleagues).
6. **Time Spoofing**: Client-provided `createdAt` instead of `request.time`.
7. **Orphaned Writes**: Creating a report without being a registered user.
8. **State Shortcut**: Woreda user trying to mark their own report as 'viewed'.
9. **Cross-Zone Access**: Zonal police from Asosa trying to read reports from Metekel.
10. **Shadow Key**: Adding fields not in the schema blueprint.
11. **Bypass Query**: Sending a list query without the zone filter as a Zonal user.
12. **Mass Update**: Admin role assigned to oneself during registration.

## Test Runner (Logic Overview)
The `firestore.rules` will be tested using these invariants.
- `allow create/update` will use `incoming().diff(existing()).affectedKeys().hasOnly(...)` for controlled updates.
- `allow read` for lists will be gated by `resource.data.zone` or `resource.data.createdBy`.
- `isValidReport` and `isValidUser` helpers will enforce schema safety.
