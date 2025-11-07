#!/usr/bin/env node
/**
 * Cron Scheduler for Daily Report Generation
 * 
 * This script runs continuously and schedules the report generation
 * at a specified time each day using node-cron.
 * 
 * Usage:
 *   npm run report:cron
 * 
 * Environment Variables:
 *   CRON_SCHEDULE - Cron expression (default: "0 9 * * *" - daily at 9 AM)
 *   CRON_TIMEZONE - Timezone for the cron job (default: "UTC")
 */

const cron = require('node-cron');
const path = require('path');
const { spawn } = require('child_process');

// Load environment variables
try {
  require('dotenv').config({ path: path.resolve(__dirname, '..', '.env') });
} catch (e) {
  console.warn('dotenv not loaded - using default schedule');
}

// Default: Daily at 9:00 AM
// Cron format: minute hour day-of-month month day-of-week
const schedule = process.env.CRON_SCHEDULE || '0 9 * * *';
const timezone = process.env.CRON_TIMEZONE || 'UTC';

console.log('╔════════════════════════════════════════════════════════════╗');
console.log('║   Converse Global - Daily Report Cron Scheduler           ║');
console.log('╚════════════════════════════════════════════════════════════╝');
console.log('');
console.log(`📅 Schedule: ${schedule}`);
console.log(`🌍 Timezone: ${timezone}`);
console.log(`⏰ Started: ${new Date().toLocaleString()}`);
console.log('');
console.log('Cron Schedule Guide:');
console.log('  "0 9 * * *"    - Daily at 9:00 AM');
console.log('  "0 18 * * *"   - Daily at 6:00 PM');
console.log('  "0 9 * * 1"    - Every Monday at 9:00 AM');
console.log('  "0 9 1 * *"    - First day of month at 9:00 AM');
console.log('  "*/30 * * * *" - Every 30 minutes');
console.log('');
console.log('Press Ctrl+C to stop the scheduler');
console.log('─────────────────────────────────────────────────────────────');
console.log('');

// Validate cron expression
if (!cron.validate(schedule)) {
  console.error('❌ Invalid cron expression:', schedule);
  console.error('Please check CRON_SCHEDULE in your .env file');
  process.exit(1);
}

// Function to run the report generation
function runReportGeneration() {
  console.log(`🚀 [${new Date().toLocaleString()}] Starting report generation...`);
  
  const scriptPath = path.join(__dirname, 'generate-report.js');
  const child = spawn('node', [scriptPath], {
    stdio: 'inherit',
    cwd: path.join(__dirname, '..')
  });

  child.on('close', (code) => {
    if (code === 0) {
      console.log(`✅ [${new Date().toLocaleString()}] Report generated successfully`);
    } else {
      console.error(`❌ [${new Date().toLocaleString()}] Report generation failed with code ${code}`);
    }
    console.log('─────────────────────────────────────────────────────────────');
  });

  child.on('error', (err) => {
    console.error(`❌ [${new Date().toLocaleString()}] Error running report:`, err);
    console.log('─────────────────────────────────────────────────────────────');
  });
}

// Schedule the cron job
const task = cron.schedule(schedule, runReportGeneration, {
  scheduled: true,
  timezone: timezone
});

console.log('✅ Cron job scheduled successfully!');
console.log('');

// Optional: Run immediately on startup (for testing)
if (process.argv.includes('--run-now')) {
  console.log('🔄 Running report immediately (--run-now flag detected)...');
  console.log('');
  runReportGeneration();
}

// Handle graceful shutdown
process.on('SIGINT', () => {
  console.log('');
  console.log('─────────────────────────────────────────────────────────────');
  console.log('🛑 Stopping cron scheduler...');
  task.stop();
  console.log('✅ Scheduler stopped gracefully');
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.log('');
  console.log('─────────────────────────────────────────────────────────────');
  console.log('🛑 Stopping cron scheduler...');
  task.stop();
  console.log('✅ Scheduler stopped gracefully');
  process.exit(0);
});

// Keep the process running
console.log('⏳ Waiting for scheduled time...');
console.log('');
