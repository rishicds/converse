#!/usr/bin/env node
/**
 * Simulates ContactSection form submissions via the live API,
 * then runs the report to verify the full end-to-end pipeline.
 */

const path = require('path');
const fs = require('fs');

const BASE_URL = 'http://localhost:3847';

const submissions = [
  {
    name: 'Sarah Johnson',
    company: 'Global Brands Inc.',
    phone: '+971-50-123-4567',
    workEmail: 'sarah@globalbrands.com',
    interestedIn: 'research-analytics',
    details: 'We are looking for consumer insights research across the GCC market for our FMCG portfolio.',
    website: 'https://globalbrands.com',
  },
  {
    name: 'Ahmed Al Rashid',
    company: 'Al Noor Holdings',
    phone: '+966-55-987-6543',
    workEmail: 'ahmed@alnoor.sa',
    interestedIn: 'business-consulting',
    details: 'Need help with route-to-market strategy for Saudi Arabia expansion.',
    website: 'https://alnoor.sa',
  },
  {
    name: 'Priya Patel',
    company: 'TechVentures MENA',
    phone: '+971-55-456-7890',
    workEmail: 'priya@techventures.ae',
    interestedIn: 'perception-demo',
    details: 'Interested in a demo of the Perception AI analytics platform.',
    website: '',
  },
];

async function simulateTrackEvent(type, payload) {
  const res = await fetch(`${BASE_URL}/api/track-event`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ type, payload }),
  });
  if (!res.ok) throw new Error(`track-event failed: ${res.status}`);
  return res.json();
}

async function simulateContactSubmission(data) {
  const res = await fetch(`${BASE_URL}/api/contact`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error(`contact failed: ${res.status} ${await res.text()}`);
  return res.json();
}

async function main() {
  console.log('╔══════════════════════════════════════════════════════════╗');
  console.log('║  E2E Test: ContactSection → API → Report pipeline      ║');
  console.log('╚══════════════════════════════════════════════════════════╝\n');

  // Step 1: Simulate CTA click events (like ContactSection does)
  console.log('Step 1: Simulating click events...');
  await simulateTrackEvent('click', { element: 'get-in-touch-cta' });
  console.log('  ✅ Tracked: get-in-touch-cta click');
  await simulateTrackEvent('click', { element: 'services-learn-more' });
  console.log('  ✅ Tracked: services-learn-more click');
  await simulateTrackEvent('page_view', { page: '/services' });
  console.log('  ✅ Tracked: /services page view');

  // Step 2: Simulate form submissions (like ContactSection handleSubmit)
  console.log('\nStep 2: Simulating contact form submissions...');
  for (const sub of submissions) {
    // ContactSection also fires a track-event before submitting
    await simulateTrackEvent('form_submission', {
      interestedIn: sub.interestedIn,
      email: sub.workEmail,
    });
    const result = await simulateContactSubmission(sub);
    console.log(`  ✅ Submitted: ${sub.name} (${sub.workEmail}) → ${result.message || 'OK'}`);
  }

  // Step 3: Verify data was saved
  console.log('\nStep 3: Verifying data files...');
  const dataDir = path.join(__dirname, '..', 'data');
  const events = JSON.parse(fs.readFileSync(path.join(dataDir, 'events.json'), 'utf-8'));
  const subs = JSON.parse(fs.readFileSync(path.join(dataDir, 'submissions.json'), 'utf-8'));
  
  // 3 click/page_view events + 3 track form_submission events + 3 form_submission events from contact route = 9
  console.log(`  Events: ${events.length} (expected 9 — 3 clicks + 3 track + 3 from contact route)`);
  console.log(`  Submissions: ${subs.length} (expected 3)`);

  // Step 4: Run the daily report
  console.log('\nStep 4: Generating daily report...');
  const { execSync } = require('child_process');
  const output = execSync('node scripts/generate-report.js --no-email', {
    cwd: path.join(__dirname, '..'),
    encoding: 'utf-8',
  });
  console.log(output);

  // Step 5: Verify post-report state
  console.log('Step 5: Post-report verification...');
  const eventsAfter = JSON.parse(fs.readFileSync(path.join(dataDir, 'events.json'), 'utf-8'));
  const subsAfter = JSON.parse(fs.readFileSync(path.join(dataDir, 'submissions.json'), 'utf-8'));

  console.log(`  Events remaining: ${eventsAfter.length} (all should be <24h old)`);
  console.log(`  Submissions remaining: ${subsAfter.length} (all should be <24h old)`);

  const cutoff = new Date(Date.now() - 24 * 60 * 60 * 1000);
  const allFresh = [...eventsAfter, ...subsAfter].every(i => new Date(i.timestamp) >= cutoff);
  console.log(`  All entries within 24h: ${allFresh ? '✅ Yes' : '❌ No'}`);

  // Check report exists
  const today = new Date().toISOString().slice(0, 10);
  const reportPath = path.join(__dirname, '..', 'reports', `report-${today}.pdf`);
  const reportExists = fs.existsSync(reportPath);
  const reportSize = reportExists ? fs.statSync(reportPath).size : 0;
  console.log(`  Report: ${reportExists ? `✅ ${reportPath} (${(reportSize / 1024).toFixed(1)} KB)` : '❌ Not found'}`);

  console.log('\n🎉 E2E test complete!\n');
}

main().catch(err => {
  console.error('E2E test failed:', err);
  process.exit(1);
});
