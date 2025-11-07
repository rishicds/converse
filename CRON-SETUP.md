# 📧 Automated Email Report Setup

This guide explains how to set up automated daily email reports for Converse Global Consulting.

## 🚀 Quick Start

### 1. Configure Environment Variables

Copy the example environment file and fill in your SMTP details:

```bash
cp .env.example .env
```

Edit `.env` with your actual credentials:

```env
# SMTP Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
SMTP_FROM=your-email@gmail.com
REPORT_EMAIL_TO=recipient@example.com

# Cron Schedule (Daily at 9 AM)
CRON_SCHEDULE=0 9 * * *
CRON_TIMEZONE=UTC
```

### 2. Gmail Setup (If using Gmail)

1. Enable 2-Factor Authentication on your Google Account
2. Go to [Google App Passwords](https://myaccount.google.com/apppasswords)
3. Generate an "App Password" for this application
4. Use that 16-character password as `SMTP_PASS`

### 3. Run the Cron Scheduler

Start the automated report scheduler:

```bash
npm run report:cron
```

Or if using pnpm:

```bash
pnpm report:cron
```

The scheduler will run continuously and send reports at the scheduled time.

## 📅 Cron Schedule Examples

The `CRON_SCHEDULE` environment variable uses standard cron syntax:

```
┌───────────── minute (0 - 59)
│ ┌───────────── hour (0 - 23)
│ │ ┌───────────── day of month (1 - 31)
│ │ │ ┌───────────── month (1 - 12)
│ │ │ │ ┌───────────── day of week (0 - 6) (Sunday=0)
│ │ │ │ │
│ │ │ │ │
* * * * *
```

**Common Examples:**

| Schedule | Description |
|----------|-------------|
| `0 9 * * *` | Daily at 9:00 AM |
| `0 18 * * *` | Daily at 6:00 PM |
| `0 9 * * 1` | Every Monday at 9:00 AM |
| `0 9 1 * *` | First day of month at 9:00 AM |
| `0 */6 * * *` | Every 6 hours |
| `*/30 * * * *` | Every 30 minutes |
| `0 0 * * *` | Daily at midnight |

## 🛠️ Manual Commands

### Generate Report Once

Generate and send a report immediately:

```bash
npm run report
```

### Generate Report Without Email

Generate a report but don't send email:

```bash
node scripts/generate-report.js --no-email
```

### Test the Scheduler Immediately

Run the scheduler and generate a report right away:

```bash
node scripts/cron-scheduler.js --run-now
```

## 🔧 Environment Variables Reference

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `SMTP_HOST` | Yes | - | SMTP server hostname |
| `SMTP_PORT` | No | 465 | SMTP server port |
| `SMTP_SECURE` | No | true | Use TLS/SSL |
| `SMTP_USER` | Yes | - | SMTP username/email |
| `SMTP_PASS` | Yes | - | SMTP password/app password |
| `SMTP_FROM` | No | SMTP_USER | From email address |
| `REPORT_EMAIL_TO` | No | SMTP_USER | Recipient email(s) |
| `REPORT_SKIP_EMAIL` | No | false | Skip email sending |
| `CRON_SCHEDULE` | No | 0 9 * * * | Cron schedule expression |
| `CRON_TIMEZONE` | No | UTC | Timezone for scheduling |

## 📨 Email Providers

### Gmail
```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_SECURE=true
```

### Outlook/Office 365
```env
SMTP_HOST=smtp.office365.com
SMTP_PORT=587
SMTP_SECURE=true
```

### Yahoo Mail
```env
SMTP_HOST=smtp.mail.yahoo.com
SMTP_PORT=465
SMTP_SECURE=true
```

### SendGrid
```env
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=apikey
SMTP_PASS=your-sendgrid-api-key
```

## 🖥️ Running as a Service

### Windows (PowerShell)

Create a scheduled task to run at startup:

```powershell
# Create a startup script
$action = New-ScheduledTaskAction -Execute "npm" -Argument "run report:cron" -WorkingDirectory "C:\Coding\freelance\converse"
$trigger = New-ScheduledTaskTrigger -AtStartup
$principal = New-ScheduledTaskPrincipal -UserId "$env:USERNAME" -LogonType Interactive
Register-ScheduledTask -TaskName "ConverseReportCron" -Action $action -Trigger $trigger -Principal $principal
```

### Linux/macOS (systemd or cron)

**Option 1: Using systemd (Linux)**

Create `/etc/systemd/system/converse-report.service`:

```ini
[Unit]
Description=Converse Report Cron Scheduler
After=network.target

[Service]
Type=simple
User=youruser
WorkingDirectory=/path/to/converse
ExecStart=/usr/bin/node scripts/cron-scheduler.js
Restart=always

[Install]
WantedBy=multi-user.target
```

Enable and start:
```bash
sudo systemctl enable converse-report
sudo systemctl start converse-report
```

**Option 2: Using PM2 (Cross-platform)**

```bash
npm install -g pm2
pm2 start scripts/cron-scheduler.js --name converse-report
pm2 save
pm2 startup
```

## 🐛 Troubleshooting

### Email not sending?
- Check SMTP credentials in `.env`
- Verify firewall isn't blocking SMTP ports
- For Gmail, ensure App Password is used (not regular password)
- Check logs for error messages

### Cron job not running?
- Verify `CRON_SCHEDULE` syntax is correct
- Check timezone matches your requirements
- Ensure process stays running (use PM2 or service manager)

### Report generation fails?
- Check that `data/events.json` and `data/submissions.json` exist
- Verify file permissions
- Check Node.js version compatibility

## 📦 Dependencies

The automated report system uses:

- `node-cron` - Cross-platform cron job scheduler
- `nodemailer` - Email sending
- `pdfkit` - PDF report generation
- `dotenv` - Environment variable management

## 🔒 Security Notes

- **Never commit `.env` file** to version control
- Use app-specific passwords, not account passwords
- Restrict email permissions to sending only
- Regularly rotate SMTP credentials
- Consider using environment-specific email addresses

## 📊 Report Contents

The automated report includes:

- Total events and submissions count
- Events breakdown by type
- Recent events timeline
- Submissions by interest area
- Detailed submission information
- Professional PDF formatting with company branding

---

**Need help?** Contact the development team or check the logs for error messages.
