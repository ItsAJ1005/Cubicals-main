// Simplified MongoDB Performance Test Script
print("=== DATABASE PERFORMANCE SNAPSHOT ===");

// 1. Basic Collection Stats
print("\n[1] COLLECTION SIZES");
["jobs", "applications", "users", "companies", "blogs"].forEach(coll => {
  const stats = db[coll].stats();
  print(`${coll.padEnd(12)}: ${stats.count} docs | ${(stats.size/1024/1024).toFixed(2)} MB`);
});

// 2. Index Checks
print("\n[2] INDEX CHECK (Missing indexes hurt performance)");
["jobs", "applications"].forEach(coll => {
  print(`\n${coll} indexes:`);
  db[coll].getIndexes().forEach(idx => {
    print(`- ${idx.name}: ${JSON.stringify(idx.key)}`);
  });
});

// 3. Query Performance Tests
print("\n[3] QUERY SPEED TESTS");

// Test 1: Job Search
const jobSearch = db.jobs.find({title: "Developer"}).explain("executionStats");
print(`\nJob search:`);
print(`- Time: ${jobSearch.executionStats.executionTimeMillis} ms`);
print(`- Scanned ${jobSearch.executionStats.totalDocsExamined} docs, found ${jobSearch.executionStats.nReturned}`);
print(`- Scan type: ${jobSearch.queryPlanner.winningPlan.stage}`);

// Test 2: User Lookup
const userLookup = db.users.find({email: "test@example.com"}).explain("executionStats");
print(`\nUser lookup:`);
print(`- Time: ${userLookup.executionStats.executionTimeMillis} ms`);
print(`- Scan type: ${userLookup.queryPlanner.winningPlan.stage}`);

// 4. Aggregation Test
print("\n[4] AGGREGATION TEST");
const aggTest = db.applications.aggregate(
  [{ $group: { _id: "$status", count: { $sum: 1 } } }],
  { explain: true }
);
print(`- Stages: ${aggTest.stages.length}`);
print(`- First stage: ${aggTest.stages[0].$cursor.queryPlanner.winningPlan.stage}`);

// 5. Performance Summary
print("\n[5] PERFORMANCE SUMMARY");
print("GOOD SIGNS:");
print("- Fast queries (<100ms)");
print("- IXSCAN in scan type");
print("- docs scanned ≈ docs returned");

print("\nWARNING SIGNS:");
print("- COLLSCAN in scan type");
print("- 1000x more scanned than returned");
print("- No indexes on queried fields");