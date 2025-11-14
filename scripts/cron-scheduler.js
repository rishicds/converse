#!/usr/bin/env node
/**
 * Cron Scheduler for Daily and Monthly Report Generation
 * 
 * This script runs continuously and schedules the report generation
 * at specified times using node-cron.
 * 
 * Usage:
 *   npm run report:cron
 * 
 * Environment Variables:
 *   CRON_SCHEDULE - Cron expression for daily reports (default: "0 9 * * *" - daily at 9 AM)
 *   CRON_MONTHLY_SCHEDULE - Cron expression for monthly reports (default: "0 9 1 * *" - 1st of month at 9 AM)
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
const dailySchedule = process.env.CRON_SCHEDULE || '0 9 * * *';
const monthlySchedule = process.env.CRON_MONTHLY_SCHEDULE || '0 9 1 * *';
const timezone = process.env.CRON_TIMEZONE || 'UTC';

console.log('╔════════════════════════════════════════════════════════════╗');
console.log('║   Converse Global - Report Cron Scheduler                 ║');
console.log('╚════════════════════════════════════════════════════════════╝');
console.log('');
console.log(`📅 Daily Schedule: ${dailySchedule}`);
console.log(`📅 Monthly Schedule: ${monthlySchedule}`);
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

// Validate cron expressions
if (!cron.validate(dailySchedule)) {
  console.error('❌ Invalid daily cron expression:', dailySchedule);
  console.error('Please check CRON_SCHEDULE in your .env file');
  process.exit(1);
}

if (!cron.validate(monthlySchedule)) {
  console.error('❌ Invalid monthly cron expression:', monthlySchedule);
  console.error('Please check CRON_MONTHLY_SCHEDULE in your .env file');
  process.exit(1);
}

// Function to run the daily report generation
function runDailyReport() {
  console.log(`🚀 [${new Date().toLocaleString()}] Starting daily report generation...`);
  
  const scriptPath = path.join(__dirname, 'generate-report.js');
  const child = spawn('node', [scriptPath], {
    stdio: 'inherit',
    cwd: path.join(__dirname, '..')
  });

  child.on('close', (code) => {
    if (code === 0) {
      console.log(`✅ [${new Date().toLocaleString()}] Daily report generated successfully`);
    } else {
      console.error(`❌ [${new Date().toLocaleString()}] Daily report generation failed with code ${code}`);
    }
    console.log('─────────────────────────────────────────────────────────────');
  });

  child.on('error', (err) => {
    console.error(`❌ [${new Date().toLocaleString()}] Error running daily report:`, err);
    console.log('─────────────────────────────────────────────────────────────');
  });
}

// Function to run the monthly report generation
function runMonthlyReport() {
  console.log(`🚀 [${new Date().toLocaleString()}] Starting monthly report generation...`);
  
  const scriptPath = path.join(__dirname, 'generate-monthly-report.js');
  const child = spawn('node', [scriptPath], {
    stdio: 'inherit',
    cwd: path.join(__dirname, '..')
  });

  child.on('close', (code) => {
    if (code === 0) {
      console.log(`✅ [${new Date().toLocaleString()}] Monthly report generated successfully`);
    } else {
      console.error(`❌ [${new Date().toLocaleString()}] Monthly report generation failed with code ${code}`);
    }
    console.log('─────────────────────────────────────────────────────────────');
  });

  child.on('error', (err) => {
    console.error(`❌ [${new Date().toLocaleString()}] Error running monthly report:`, err);
    console.log('─────────────────────────────────────────────────────────────');
  });
}

// Schedule the daily cron job
const dailyTask = cron.schedule(dailySchedule, runDailyReport, {
  scheduled: true,
  timezone: timezone
});

// Schedule the monthly cron job
const monthlyTask = cron.schedule(monthlySchedule, runMonthlyReport, {
  scheduled: true,
  timezone: timezone
});

console.log('✅ Daily cron job scheduled successfully!');
console.log('✅ Monthly cron job scheduled successfully!');
console.log('');

// Optional: Run immediately on startup (for testing)
if (process.argv.includes('--run-now')) {
  console.log('🔄 Running daily report immediately (--run-now flag detected)...');
  console.log('');
  runDailyReport();
}

if (process.argv.includes('--run-monthly-now')) {
  console.log('🔄 Running monthly report immediately (--run-monthly-now flag detected)...');
  console.log('');
  runMonthlyReport();
}

// Handle graceful shutdown
process.on('SIGINT', () => {
  console.log('');
  console.log('─────────────────────────────────────────────────────────────');
  console.log('🛑 Stopping cron scheduler...');
  dailyTask.stop();
  monthlyTask.stop();
  console.log('✅ Scheduler stopped gracefully');
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.log('');
  console.log('─────────────────────────────────────────────────────────────');
  console.log('🛑 Stopping cron scheduler...');
  dailyTask.stop();
  monthlyTask.stop();
  console.log('✅ Scheduler stopped gracefully');
  process.exit(0);
});

// Keep the process running
console.log('⏳ Waiting for scheduled time...');
console.log('');
