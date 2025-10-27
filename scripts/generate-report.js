#!/usr/bin/env node
// Generate a PDF report from data/events.json and data/submissions.json and email it.
// Usage: node scripts/generate-report.js

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

async function generatePdfReport(outPath, events, submissions) {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({ size: 'A4', margin: 50 });
    const stream = fs.createWriteStream(outPath);
    doc.pipe(stream);

    // Brand colors
    const primaryBlue = '#0066CC';
    const secondaryGreen = '#66B933';
    const darkGray = '#333333';
    const lightGray = '#F5F5F5';

    // Header with logo and title
    const logoPath = path.join(__dirname, '..', 'public', 'logo.png');
    try {
      doc.image(logoPath, 50, 40, { width: 120 });
    } catch (e) {
      // logo not found, skip
    }

    doc.fontSize(24).fillColor(primaryBlue).text('Converse Global Consulting', 180, 50, { align: 'left' });
    doc.fontSize(18).fillColor(darkGray).text('Daily Events & Submissions Report', 50, 90, { align: 'center' });
    
    doc.fontSize(10).fillColor('#666666').text(`Generated: ${new Date().toLocaleString('en-US', { dateStyle: 'full', timeStyle: 'short' })}`, { align: 'center' });
    
    // Separator line
    doc.moveTo(50, 125).lineTo(545, 125).strokeColor(primaryBlue).lineWidth(2).stroke();
    doc.moveDown(2);

    // Summary boxes
    const yStart = 145;
    doc.rect(50, yStart, 240, 80).fillAndStroke(lightGray, darkGray);
    doc.rect(305, yStart, 240, 80).fillAndStroke(lightGray, darkGray);

    doc.fontSize(14).fillColor(primaryBlue).text('Total Events', 60, yStart + 15);
    doc.fontSize(32).fillColor(darkGray).text(events.length.toString(), 60, yStart + 35);

    doc.fontSize(14).fillColor(secondaryGreen).text('Total Submissions', 315, yStart + 15);
    doc.fontSize(32).fillColor(darkGray).text(submissions.length.toString(), 315, yStart + 35);

    doc.moveDown(6);

    // Events breakdown
    doc.fontSize(16).fillColor(primaryBlue).text('Events Summary', 50, yStart + 100, { underline: true });
    doc.moveDown(0.5);

    const byType = events.reduce((acc, ev) => {
      acc[ev.type] = (acc[ev.type] || 0) + 1;
      return acc;
    }, {});

    let chartY = yStart + 130;
    Object.entries(byType).forEach(([type, count]) => {
      const barWidth = (count / events.length) * 400;
      doc.rect(150, chartY, barWidth, 20).fillAndStroke(secondaryGreen, darkGray);
      doc.fontSize(11).fillColor(darkGray).text(`${type}: ${count}`, 50, chartY + 5);
      chartY += 30;
    });

    doc.moveDown(2);

    // Recent events section
    doc.fontSize(14).fillColor(primaryBlue).text('Recent Events', 50, chartY + 20, { underline: true });
    doc.moveDown(0.5);

    const recentEvents = events.slice(-20); // show last 20
    recentEvents.forEach((ev) => {
      const payload = ev.payload || ev.meta || {};
      const payloadText = Object.keys(payload).length ? Object.entries(payload).map(([k,v]) => `${k}: ${v}`).join(' | ') : '';
      const timestamp = new Date(ev.timestamp).toLocaleString('en-US', { dateStyle: 'short', timeStyle: 'short' });
      doc.fontSize(9).fillColor('#555555').text(`${timestamp} • ${ev.type}${payloadText ? ' • ' + payloadText : ''}`, { width: 495 });
      doc.moveDown(0.15);
    });

    // New page for submissions
    doc.addPage();
    
    // Header on second page
    try {
      doc.image(logoPath, 50, 40, { width: 80 });
    } catch (e) {}
    doc.fontSize(18).fillColor(primaryBlue).text('Submissions Detail', 140, 50);
    doc.moveTo(50, 80).lineTo(545, 80).strokeColor(primaryBlue).lineWidth(1).stroke();
    doc.moveDown(2);

    if (submissions.length === 0) {
      doc.fontSize(12).fillColor(darkGray).text('No submissions found.', 50, 100);
    } else {
      // Breakdown by interest
      const byInterest = submissions.reduce((acc, s) => {
        const key = s.interestedIn || 'unspecified';
        acc[key] = (acc[key] || 0) + 1;
        return acc;
      }, {});

      doc.fontSize(14).fillColor(secondaryGreen).text('Submissions by Interest', 50, 100);
      doc.moveDown(0.5);

      let pieY = 120;
      Object.entries(byInterest).forEach(([interest, count]) => {
        const barWidth = (count / submissions.length) * 300;
        doc.rect(200, pieY, barWidth, 18).fillAndStroke(primaryBlue, darkGray);
        doc.fontSize(10).fillColor(darkGray).text(`${interest}: ${count}`, 50, pieY + 4);
        pieY += 25;
      });

      doc.moveDown(2);

      // Detailed submissions
      doc.fontSize(14).fillColor(primaryBlue).text('Detailed Submissions', 50, pieY + 20, { underline: true });
      doc.moveDown(0.5);

      let submissionY = pieY + 50;
      submissions.slice(-50).forEach((s, i) => {
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

    // Footer on last page
    doc.fontSize(8).fillColor('#999999').text(
      'Converse Global Consulting - Confidential Report',
      50,
      doc.page.height - 50,
      { align: 'center' }
    );

    doc.end();

    stream.on('finish', () => resolve());
    stream.on('error', reject);
  });
}async function main() {
  // Use repository root (script's parent) so running from scripts/ still finds data/
  const baseDir = path.resolve(__dirname, '..');
  const dataDir = path.join(baseDir, 'data');
  const eventsPath = path.join(dataDir, 'events.json');
  const submissionsPath = path.join(dataDir, 'submissions.json');
  const outPdf = path.join(baseDir, 'reports', `report-${new Date().toISOString().slice(0,10)}.pdf`);

  await fsp.mkdir(path.dirname(outPdf), { recursive: true });

  const events = await readJsonSafe(eventsPath);
  const submissions = await readJsonSafe(submissionsPath);

  await generatePdfReport(outPdf, events, submissions);

  // send email with attachment
  const skipEmailFlag = process.env.REPORT_SKIP_EMAIL === 'true' || process.argv.includes('--no-email');

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

    const mailOptions = {
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to: process.env.REPORT_EMAIL_TO || process.env.SMTP_USER,
      subject: `Daily Report - ${new Date().toISOString().slice(0,10)}`,
      text: 'Please find attached the daily events & submissions report.',
      attachments: [
        {
          filename: path.basename(outPdf),
          path: outPdf,
        },
      ],
    };

    await transporter.sendMail(mailOptions);
    console.log('Report generated and emailed:', outPdf);
  } else {
    console.log('Report generated (email skipped). File:', outPdf);
    if (skipEmailFlag) console.log('Skipping email because --no-email or REPORT_SKIP_EMAIL=true');
    else console.log('Skipping email because SMTP config missing (SMTP_HOST/USER/PASS)');
  }
}

if (require.main === module) {
  main().catch((err) => {
    console.error('Report generation failed', err);
    process.exit(1);
  });
}
