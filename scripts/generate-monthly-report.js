#!/usr/bin/env node
// Generate a monthly PDF report from data/events.json and data/submissions.json and email it.
// Usage: node scripts/generate-monthly-report.js

const fs = require('fs');
const fsp = fs.promises;
const path = require('path');

// Load environment variables from repository .env (when script is run from scripts/)
try {
  require('dotenv').config({ path: path.resolve(__dirname, '..', '.env') });
} catch (e) {
  // ignore if dotenv isn't installed — env may already be set externally
}

const PDFDocument = require('pdfkit');
const nodemailer = require('nodemailer');

// Trim surrounding quotes if any (handles .env values like SMTP_PASS="xxx")
const trimQuotes = (v) => typeof v === 'string' ? v.replace(/^"|"$/g, '') : v;
process.env.SMTP_PASS = trimQuotes(process.env.SMTP_PASS);
process.env.SMTP_USER = trimQuotes(process.env.SMTP_USER);
process.env.SMTP_HOST = trimQuotes(process.env.SMTP_HOST);
process.env.SMTP_FROM = trimQuotes(process.env.SMTP_FROM);
process.env.REPORT_EMAIL_TO = trimQuotes(process.env.REPORT_EMAIL_TO);

async function readJsonSafe(p) {
  try {
    const raw = await fsp.readFile(p, 'utf-8');
    return JSON.parse(raw);
  } catch (e) {
    return [];
  }
}

/**
 * Read data from both the live JSON file and the monthly archive file.
 * The daily report prunes old data into archive files, so the monthly report
 * needs to read from both sources to get the full month's data.
 */
async function readWithArchive(livePath, monthDate) {
  const live = await readJsonSafe(livePath);
  
  // Also read from the archive for the target month
  const baseName = path.basename(livePath, '.json'); // "events" or "submissions"
  const monthKey = monthDate.toISOString().slice(0, 7); // YYYY-MM
  const archivePath = path.join(path.dirname(livePath), 'archive', `${baseName}-${monthKey}.json`);
  const archived = await readJsonSafe(archivePath);
  
  // Merge and deduplicate by timestamp
  const merged = [...archived, ...live];
  const seen = new Set();
  const deduped = merged.filter(item => {
    const key = item.timestamp + JSON.stringify(item);
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });

  return deduped;
}

// Filter data to only include items from the last month
function filterLastMonth(items) {
  const now = new Date();
  const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
  const thisMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  
  return items.filter(item => {
    const itemDate = new Date(item.timestamp);
    return itemDate >= lastMonth && itemDate < thisMonth;
  });
}

function getMonthName(date) {
  return date.toLocaleString('en-US', { month: 'long', year: 'numeric' });
}

function getPreviousMonth() {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth() - 1, 1);
}

async function generateMonthlyPdfReport(outPath, events, submissions) {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({ size: 'A4', margin: 50 });
    const stream = fs.createWriteStream(outPath);
    doc.pipe(stream);

    // Brand colors
    const primaryBlue = '#0066CC';
    const secondaryGreen = '#66B933';
    const darkGray = '#333333';
    const lightGray = '#F5F5F5';

    const reportMonth = getPreviousMonth();
    const monthName = getMonthName(reportMonth);

    // Header with logo and title
    const logoPath = path.join(__dirname, '..', 'public', 'logo.png');
    try {
      doc.image(logoPath, 50, 40, { width: 120 });
    } catch (e) {
      // logo not found, skip
    }

    doc.fontSize(24).fillColor(primaryBlue).text('Converse Global Consulting', 180, 50, { align: 'left' });
    doc.fontSize(20).fillColor(darkGray).text(`Monthly Report - ${monthName}`, 50, 90, { align: 'center' });
    
    doc.fontSize(10).fillColor('#666666').text(`Generated: ${new Date().toLocaleString('en-US', { dateStyle: 'full', timeStyle: 'short' })}`, { align: 'center' });
    
    // Separator line
    doc.moveTo(50, 125).lineTo(545, 125).strokeColor(primaryBlue).lineWidth(2).stroke();
    doc.moveDown(2);

    // Executive Summary
    const yStart = 145;
    doc.fontSize(18).fillColor(primaryBlue).text('Executive Summary', 50, yStart);
    doc.moveDown(1);

    // Summary boxes
    const boxY = yStart + 30;
    doc.rect(50, boxY, 240, 80).fillAndStroke(lightGray, darkGray);
    doc.rect(305, boxY, 240, 80).fillAndStroke(lightGray, darkGray);

    doc.fontSize(14).fillColor(primaryBlue).text('Total Events', 60, boxY + 15);
    doc.fontSize(32).fillColor(darkGray).text(events.length.toString(), 60, boxY + 35);

    doc.fontSize(14).fillColor(secondaryGreen).text('Total Submissions', 315, boxY + 15);
    doc.fontSize(32).fillColor(darkGray).text(submissions.length.toString(), 315, boxY + 35);

    doc.moveDown(6);

    // Events Analysis
    let currentY = boxY + 120;
    doc.fontSize(16).fillColor(primaryBlue).text('Events Analysis', 50, currentY, { underline: true });
    doc.moveDown(0.5);

    if (events.length === 0) {
      doc.fontSize(11).fillColor('#666666').text('No events recorded this month.', 50, currentY + 30);
      currentY += 60;
    } else {
      // Events by Type
      const byType = events.reduce((acc, ev) => {
        acc[ev.type] = (acc[ev.type] || 0) + 1;
        return acc;
      }, {});

      currentY += 30;
      Object.entries(byType).forEach(([type, count]) => {
        const barWidth = (count / events.length) * 400;
        doc.rect(150, currentY, barWidth, 20).fillAndStroke(secondaryGreen, darkGray);
        doc.fontSize(11).fillColor(darkGray).text(`${type}: ${count}`, 50, currentY + 5);
        currentY += 30;
      });

      // Events Timeline (by week)
      doc.moveDown(1);
      currentY += 20;
      doc.fontSize(14).fillColor(primaryBlue).text('Weekly Breakdown', 50, currentY);
      currentY += 25;

      const weeklyData = events.reduce((acc, ev) => {
        const date = new Date(ev.timestamp);
        const weekNum = Math.ceil(date.getDate() / 7);
        const key = `Week ${weekNum}`;
        acc[key] = (acc[key] || 0) + 1;
        return acc;
      }, {});

      Object.entries(weeklyData).forEach(([week, count]) => {
        doc.fontSize(10).fillColor('#555555').text(`${week}: ${count} events`, 50, currentY);
        currentY += 20;
      });
    }

    // New page for submissions
    doc.addPage();
    
    // Header on second page
    try {
      doc.image(logoPath, 50, 40, { width: 80 });
    } catch (e) {}
    doc.fontSize(18).fillColor(primaryBlue).text('Submissions Analysis', 140, 50);
    doc.moveTo(50, 80).lineTo(545, 80).strokeColor(primaryBlue).lineWidth(1).stroke();
    doc.moveDown(2);

    let submissionY = 100;

    if (submissions.length === 0) {
      doc.fontSize(12).fillColor(darkGray).text('No submissions found this month.', 50, submissionY);
    } else {
      // Breakdown by interest
      const byInterest = submissions.reduce((acc, s) => {
        const key = s.interestedIn || 'unspecified';
        acc[key] = (acc[key] || 0) + 1;
        return acc;
      }, {});

      doc.fontSize(14).fillColor(secondaryGreen).text('Submissions by Interest', 50, submissionY);
      submissionY += 25;

      Object.entries(byInterest).forEach(([interest, count]) => {
        const percentage = ((count / submissions.length) * 100).toFixed(1);
        const barWidth = (count / submissions.length) * 300;
        doc.rect(200, submissionY, barWidth, 18).fillAndStroke(primaryBlue, darkGray);
        doc.fontSize(10).fillColor(darkGray).text(`${interest}: ${count} (${percentage}%)`, 50, submissionY + 4);
        submissionY += 25;
      });

      // Company distribution
      doc.moveDown(1);
      submissionY += 20;
      doc.fontSize(14).fillColor(secondaryGreen).text('Top Companies', 50, submissionY);
      submissionY += 25;

      const byCompany = submissions.reduce((acc, s) => {
        const company = s.company || 'N/A';
        if (company !== 'N/A') {
          acc[company] = (acc[company] || 0) + 1;
        }
        return acc;
      }, {});

      const topCompanies = Object.entries(byCompany)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 10);

      topCompanies.forEach(([company, count]) => {
        doc.fontSize(10).fillColor('#555555').text(`${company}: ${count} submission${count > 1 ? 's' : ''}`, 50, submissionY);
        submissionY += 20;
      });

      // Detailed submissions
      doc.addPage();
      try {
        doc.image(logoPath, 50, 40, { width: 80 });
      } catch (e) {}
      doc.fontSize(16).fillColor(primaryBlue).text('Detailed Submissions', 50, 50, { underline: true });
      
      submissionY = 80;
      submissions.forEach((s, i) => {
        if (submissionY > 720) {
          doc.addPage();
          submissionY = 50;
        }

        const timestamp = new Date(s.timestamp).toLocaleString('en-US', { dateStyle: 'short', timeStyle: 'short' });
        
        // Card-style layout
        doc.rect(50, submissionY, 495, 90).fillAndStroke('#FAFAFA', '#CCCCCC');
        
        doc.fontSize(11).fillColor(primaryBlue).text(`${i+1}. ${s.name || 'N/A'}`, 60, submissionY + 10, { bold: true });
        doc.fontSize(9).fillColor('#666666').text(timestamp, 450, submissionY + 10);
        
        doc.fontSize(9).fillColor(darkGray)
          .text(`Email: ${s.workEmail || 'N/A'}`, 60, submissionY + 28)
          .text(`Company: ${s.company || 'N/A'}`, 60, submissionY + 42)
          .text(`Phone: ${s.phone || 'N/A'}`, 280, submissionY + 28)
          .text(`Interest: ${s.interestedIn || 'N/A'}`, 280, submissionY + 42);
        
        if (s.details) {
          doc.fontSize(8).fillColor('#555555').text(`Details: ${s.details.substring(0, 80)}${s.details.length > 80 ? '...' : ''}`, 60, submissionY + 60, { width: 480 });
        }
        
        submissionY += 100;
      });
    }

    // Summary Statistics Page
    doc.addPage();
    try {
      doc.image(logoPath, 50, 40, { width: 80 });
    } catch (e) {}
    doc.fontSize(18).fillColor(primaryBlue).text('Key Metrics & Insights', 50, 50);
    doc.moveTo(50, 75).lineTo(545, 75).strokeColor(primaryBlue).lineWidth(1).stroke();

    let metricsY = 100;

    // Calculate metrics
    const avgEventsPerDay = (events.length / 30).toFixed(1);
    const avgSubmissionsPerDay = (submissions.length / 30).toFixed(1);
    const uniqueCompanies = new Set(submissions.map(s => s.company).filter(c => c)).size;
    const mostCommonEvent = events.length > 0 
      ? Object.entries(events.reduce((acc, ev) => {
          acc[ev.type] = (acc[ev.type] || 0) + 1;
          return acc;
        }, {})).sort((a, b) => b[1] - a[1])[0]?.[0] || 'N/A'
      : 'N/A';

    // Display metrics
    doc.fontSize(14).fillColor(secondaryGreen).text('Monthly Performance', 50, metricsY);
    metricsY += 30;

    const metrics = [
      { label: 'Average Events per Day', value: avgEventsPerDay },
      { label: 'Average Submissions per Day', value: avgSubmissionsPerDay },
      { label: 'Unique Companies', value: uniqueCompanies },
      { label: 'Most Common Event Type', value: mostCommonEvent },
      { label: 'Total Interactions', value: events.length + submissions.length }
    ];

    metrics.forEach(metric => {
      doc.fontSize(11).fillColor(darkGray).text(metric.label, 50, metricsY);
      doc.fontSize(14).fillColor(primaryBlue).text(metric.value.toString(), 400, metricsY);
      metricsY += 30;
    });

    // Footer on last page
    doc.fontSize(8).fillColor('#999999').text(
      `Converse Global Consulting - Monthly Report ${monthName} - Confidential`,
      50,
      doc.page.height - 50,
      { align: 'center' }
    );

    doc.end();

    stream.on('finish', () => resolve());
    stream.on('error', reject);
  });
}

async function main() {
  // Use repository root (script's parent) so running from scripts/ still finds data/
  const baseDir = path.resolve(__dirname, '..');
  const dataDir = path.join(baseDir, 'data');
  const eventsPath = path.join(dataDir, 'events.json');
  const submissionsPath = path.join(dataDir, 'submissions.json');
  
  const reportMonth = getPreviousMonth();
  const monthStr = reportMonth.toISOString().slice(0, 7); // YYYY-MM format
  const outPdf = path.join(baseDir, 'reports', `monthly-report-${monthStr}.pdf`);

  await fsp.mkdir(path.dirname(outPdf), { recursive: true });

  // Read from both live data and monthly archives (daily pruning moves old data to archives)
  const allEvents = await readWithArchive(eventsPath, reportMonth);
  const allSubmissions = await readWithArchive(submissionsPath, reportMonth);

  // Filter to last month's data
  const events = filterLastMonth(allEvents);
  const submissions = filterLastMonth(allSubmissions);

  // Check if there's any data
  const hasData = events.length > 0 || submissions.length > 0;
  const skipEmailFlag = process.env.REPORT_SKIP_EMAIL === 'true' || process.argv.includes('--no-email');

  // Parse multiple email recipients (comma-separated)
  const getEmailRecipients = () => {
    const emailTo = process.env.REPORT_EMAIL_TO || process.env.SMTP_USER;
    return emailTo.split(',').map(email => email.trim()).filter(email => email);
  };

  if (!hasData) {
    // No data - send email notification without generating report
    if (!skipEmailFlag && process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: parseInt(process.env.SMTP_PORT || '465'),
        secure: process.env.SMTP_SECURE === 'true',
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });

      const recipients = getEmailRecipients();

      const mailOptions = {
        from: process.env.SMTP_FROM || process.env.SMTP_USER,
        to: recipients.join(', '),
        subject: `Monthly Report - ${getMonthName(reportMonth)} - No Data`,
        text: `No monthly report for ${getMonthName(reportMonth)} - there were no events or submissions to report.`,
      };

      await transporter.sendMail(mailOptions);
      console.log(`No data found for ${getMonthName(reportMonth)}. Email notification sent to ${recipients.length} recipient(s): ${recipients.join(', ')}`);
    } else {
      console.log(`No data found for ${getMonthName(reportMonth)}. No report generated.`);
      if (skipEmailFlag) console.log('Email skipped because --no-email or REPORT_SKIP_EMAIL=true');
      else console.log('Email skipped because SMTP config missing (SMTP_HOST/USER/PASS)');
    }
    return;
  }

  // Generate report only if there's data
  await generateMonthlyPdfReport(outPdf, events, submissions);

  // send email with attachment
  if (!skipEmailFlag && process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '465'),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const recipients = getEmailRecipients();

    const mailOptions = {
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to: recipients.join(', '),
      subject: `Monthly Report - ${getMonthName(reportMonth)}`,
      text: `Please find attached the monthly events & submissions report for ${getMonthName(reportMonth)}.\n\nSummary:\n- Total Events: ${events.length}\n- Total Submissions: ${submissions.length}\n- Total Interactions: ${events.length + submissions.length}`,
      attachments: [
        {
          filename: path.basename(outPdf),
          path: outPdf,
        },
      ],
    };

    await transporter.sendMail(mailOptions);
    console.log(`Monthly report for ${getMonthName(reportMonth)} generated and emailed to ${recipients.length} recipient(s): ${recipients.join(', ')}`);
    console.log('File:', outPdf);
  } else {
    console.log(`Monthly report for ${getMonthName(reportMonth)} generated (email skipped). File:`, outPdf);
    if (skipEmailFlag) console.log('Skipping email because --no-email or REPORT_SKIP_EMAIL=true');
    else console.log('Skipping email because SMTP config missing (SMTP_HOST/USER/PASS)');
  }
}

if (require.main === module) {
  main().catch((err) => {
    console.error('Monthly report generation failed', err);
    process.exit(1);
  });
}
