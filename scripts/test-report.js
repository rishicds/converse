#!/usr/bin/env node
/**
 * Test script: Seeds data/events.json and data/submissions.json with a mix of
 * recent (<24 h) and old (>24 h) entries, then runs the daily report generator
 * to verify that:
 *   1. Only data from the last 24 h appears in the report
 *   2. Old data is pruned from the live JSON files
 *   3. Old data is archived to data/archive/
 */

const fs = require('fs');
const fsp = fs.promises;
const path = require('path');

const baseDir = path.resolve(__dirname, '..');
const dataDir = path.join(baseDir, 'data');
const eventsPath = path.join(dataDir, 'events.json');
const submissionsPath = path.join(dataDir, 'submissions.json');

// ── helpers ───────────────────────────────────────────────────────────────
function hoursAgo(h) {
  return new Date(Date.now() - h * 60 * 60 * 1000).toISOString();
}

function daysAgo(d) {
  return new Date(Date.now() - d * 24 * 60 * 60 * 1000).toISOString();
}

// ── seed data ─────────────────────────────────────────────────────────────
const seedEvents = [
  // ✅ RECENT – should appear in the daily report
  { type: 'click',            payload: { element: 'get-in-touch-cta' },                              timestamp: hoursAgo(1) },
  { type: 'click',            payload: { element: 'services-link' },                                 timestamp: hoursAgo(3) },
  { type: 'form_submission',  payload: { interestedIn: 'research-analytics', email: 'a@test.com' },  timestamp: hoursAgo(5) },
  { type: 'page_view',        payload: { page: '/services' },                                        timestamp: hoursAgo(8) },
  { type: 'click',            payload: { element: 'perception-cta' },                                timestamp: hoursAgo(12) },
  { type: 'form_submission',  payload: { interestedIn: 'business-consulting', email: 'b@test.com' }, timestamp: hoursAgo(20) },

  // ❌ OLD – should be pruned & archived
  { type: 'click',            payload: { element: 'old-hero-btn' },           timestamp: daysAgo(2) },
  { type: 'form_submission',  payload: { interestedIn: 'both', email: 'c@old.com' }, timestamp: daysAgo(3) },
  { type: 'page_view',        payload: { page: '/company' },                  timestamp: daysAgo(5) },
  { type: 'click',            payload: { element: 'old-footer-link' },        timestamp: daysAgo(10) },
  { type: 'page_view',        payload: { page: '/perception' },               timestamp: daysAgo(30) },
  { type: 'form_submission',  payload: { interestedIn: 'other', email: 'd@old.com' }, timestamp: daysAgo(45) },
];

const seedSubmissions = [
  // ✅ RECENT
  {
    name: 'Alice Recent',
    company: 'TestCorp',
    phone: '+971-50-111-1111',
    workEmail: 'alice@testcorp.com',
    interestedIn: 'research-analytics',
    details: 'Looking for market research in the GCC region.',
    website: 'https://testcorp.com',
    timestamp: hoursAgo(2),
    userAgent: 'test-script',
  },
  {
    name: 'Bob Recent',
    company: 'DemoCo',
    phone: '+971-50-222-2222',
    workEmail: 'bob@democo.com',
    interestedIn: 'business-consulting',
    details: 'We need help with route-to-market strategy.',
    website: 'https://democo.com',
    timestamp: hoursAgo(10),
    userAgent: 'test-script',
  },
  {
    name: 'Charlie Recent',
    company: 'SampleLtd',
    phone: '+966-55-333-3333',
    workEmail: 'charlie@sampleltd.com',
    interestedIn: 'perception-demo',
    details: 'Interested in a Perception platform demo.',
    website: '',
    timestamp: hoursAgo(18),
    userAgent: 'test-script',
  },

  // ❌ OLD
  {
    name: 'Old Dave',
    company: 'OldCorp',
    phone: '+971-50-444-4444',
    workEmail: 'dave@oldcorp.com',
    interestedIn: 'both',
    details: 'This is an old submission that should be pruned.',
    website: 'https://oldcorp.com',
    timestamp: daysAgo(3),
    userAgent: 'test-script',
  },
  {
    name: 'Old Eve',
    company: 'ArchiveCo',
    phone: '+966-55-555-5555',
    workEmail: 'eve@archiveco.com',
    interestedIn: 'other',
    details: 'Very old enquiry.',
    website: '',
    timestamp: daysAgo(40),
    userAgent: 'test-script',
  },
];

// ── main ──────────────────────────────────────────────────────────────────
async function main() {
  console.log('╔══════════════════════════════════════════════════════════╗');
  console.log('║  Test: Daily Report — 24 h filter + pruning + archive   ║');
  console.log('╚══════════════════════════════════════════════════════════╝\n');

  // 1. Create data directory
  await fsp.mkdir(dataDir, { recursive: true });

  // 2. Write seed data
  await fsp.writeFile(eventsPath, JSON.stringify(seedEvents, null, 2), 'utf-8');
  await fsp.writeFile(submissionsPath, JSON.stringify(seedSubmissions, null, 2), 'utf-8');

  const recentEvents = seedEvents.filter(e => new Date(e.timestamp) >= new Date(Date.now() - 24*60*60*1000));
  const oldEvents = seedEvents.length - recentEvents.length;
  const recentSubs = seedSubmissions.filter(s => new Date(s.timestamp) >= new Date(Date.now() - 24*60*60*1000));
  const oldSubs = seedSubmissions.length - recentSubs.length;

  console.log(`📝 Seeded events.json      → ${seedEvents.length} total (${recentEvents.length} recent, ${oldEvents} old)`);
  console.log(`📝 Seeded submissions.json  → ${seedSubmissions.length} total (${recentSubs.length} recent, ${oldSubs} old)\n`);

  // 3. Run the report generator (skip email)
  console.log('─── Running generate-report.js --no-email ───\n');

  const { execSync } = require('child_process');
  try {
    const output = execSync('node scripts/generate-report.js --no-email', {
      cwd: baseDir,
      encoding: 'utf-8',
      stdio: 'pipe',
    });
    console.log(output);
  } catch (err) {
    console.error('❌ Report script failed:\n', err.stdout || '', err.stderr || '');
    process.exit(1);
  }

  // 4. Verify the live JSON files were pruned
  console.log('─── Verification ───\n');

  const eventsAfter = JSON.parse(await fsp.readFile(eventsPath, 'utf-8'));
  const subsAfter = JSON.parse(await fsp.readFile(submissionsPath, 'utf-8'));

  console.log(`events.json after prune      → ${eventsAfter.length} entries (expected ${recentEvents.length})`);
  console.log(`submissions.json after prune  → ${subsAfter.length} entries (expected ${recentSubs.length})`);

  const eventsOk = eventsAfter.length === recentEvents.length;
  const subsOk = subsAfter.length === recentSubs.length;

  // Check all remaining entries are within 24 h
  const cutoff = new Date(Date.now() - 24 * 60 * 60 * 1000);
  const allRecent = [...eventsAfter, ...subsAfter].every(item => new Date(item.timestamp) >= cutoff);

  // 5. Verify archive files exist
  const archiveDir = path.join(dataDir, 'archive');
  let archiveFiles = [];
  try {
    archiveFiles = await fsp.readdir(archiveDir);
  } catch { /* dir may not exist */ }

  console.log(`\nArchive directory contents   → ${archiveFiles.length > 0 ? archiveFiles.join(', ') : '(empty or missing)'}`);

  // Count total archived entries
  let totalArchived = 0;
  for (const f of archiveFiles) {
    const data = JSON.parse(await fsp.readFile(path.join(archiveDir, f), 'utf-8'));
    totalArchived += data.length;
    console.log(`  ${f}: ${data.length} entries`);
  }

  // 6. Check report PDF exists
  const today = new Date().toISOString().slice(0, 10);
  const reportPath = path.join(baseDir, 'reports', `report-${today}.pdf`);
  let reportExists = false;
  try {
    const stat = await fsp.stat(reportPath);
    reportExists = stat.size > 0;
  } catch { /* not found */ }

  console.log(`\nReport PDF exists            → ${reportExists ? `✅ Yes (${reportPath})` : '❌ No'}`);

  // 7. Summary
  console.log('\n─── Results ───\n');
  const allPass = eventsOk && subsOk && allRecent && archiveFiles.length > 0 && reportExists;

  console.log(`[${eventsOk ? '✅' : '❌'}] Events pruned correctly (${eventsAfter.length}/${recentEvents.length})`);
  console.log(`[${subsOk ? '✅' : '❌'}] Submissions pruned correctly (${subsAfter.length}/${recentSubs.length})`);
  console.log(`[${allRecent ? '✅' : '❌'}] All remaining entries are within 24 h`);
  console.log(`[${archiveFiles.length > 0 ? '✅' : '❌'}] Old data archived (${totalArchived} entries in ${archiveFiles.length} files)`);
  console.log(`[${reportExists ? '✅' : '❌'}] Report PDF generated`);
  console.log(`\n${allPass ? '🎉 ALL TESTS PASSED!' : '⚠️  SOME TESTS FAILED — see above'}\n`);

  process.exit(allPass ? 0 : 1);
}

main().catch(err => {
  console.error('Test script crashed:', err);
  process.exit(1);
});
