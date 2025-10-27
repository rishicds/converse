Daily report setup

This repository includes a small report generator that reads event data stored in `data/events.json` and `data/submissions.json`, generates a PDF, and emails it.

Files
- `scripts/generate-report.js` - Node script to create the PDF and send via SMTP.

Environment variables (required)
- SMTP_HOST - SMTP host
- SMTP_PORT - SMTP port (default 465)
- SMTP_SECURE - 'true' for TLS (secure), 'false' otherwise
- SMTP_USER - SMTP username (also used as recipient if REPORT_EMAIL_TO not set)
- SMTP_PASS - SMTP password
- SMTP_FROM - Optional from address
- REPORT_EMAIL_TO - Optional recipient for the daily report

Install dependencies (on EC2)

Use the project's package manager (this repo uses pnpm). If pnpm is not installed, you can use npm.

pnpm:

```powershell
pnpm install --prod
node scripts/generate-report.js
```

or with npm:

```powershell
npm install --production
node scripts/generate-report.js
```

Cron (systemd or crontab)

Example crontab entry to run every day at 7 PM server time (edit with `crontab -e`):

```cron
0 19 * * * cd /path/to/repo && /usr/bin/env node scripts/generate-report.js >> /var/log/report-generator.log 2>&1
```

If you need environment variables loaded from a `.env` file, source them before running, for example using a wrapper script `run-report.sh`:

```bash
#!/bin/bash
export $(cat /path/to/repo/.env | xargs)
cd /path/to/repo
/usr/bin/env node scripts/generate-report.js
```

Then call the wrapper from cron.

Notes
- The script uses `pdfkit` and `nodemailer`. Ensure these dependencies are installed in the project (added to package.json or installed globally).
- The script writes reports to `reports/`.
- If you prefer a managed DB instead of JSON files, update the API endpoints and report script accordingly.
