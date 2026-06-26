# Paid Display Monthly Performance

Hosted monthly report generator for Wise Paid Display reporting.

## Recommended Hosting Path

Use **GitHub for source control** and **Vercel for hosting**.

This is the secure path because:

- GitHub stores only code and static assets.
- Vercel stores the shared OpenAI API key as an encrypted environment variable.
- The browser never receives the OpenAI API key.
- The tool pulls the latest Lightdash and Performance Updates from the configured Google Sheets every month.

## One-Time Setup

### 1. Create the GitHub Repository

1. Create a new GitHub repository, for example `paid-display-monthly-performance`.
2. Push this project folder to that repository.
3. Do not commit `.env.local`, local CSV exports, generated PDFs, or the `outputs/` folder.

### 2. Create the Vercel Project

1. Go to Vercel.
2. Choose **Add New Project**.
3. Import the GitHub repository.
4. Keep the default framework as **Next.js**.
5. Use these defaults:
   - Install command: `npm install`
   - Build command: `npm run build`
   - Output directory: leave blank

### 3. Add the Shared API Key in Vercel

In Vercel project settings, open **Environment Variables** and add:

```text
OPENAI_API_KEY=<shared team API key>
OPENAI_SUMMARY_MODEL=gpt-4.1
```

Add these for Production, Preview, and Development unless you intentionally want different behavior.

Never paste the API key into GitHub, the HTML file, the README, Slack, or a browser-visible setting.

### 4. Restrict Access

Choose the strictest access mode available for the team:

1. If your Wise Vercel workspace supports SSO/protected deployments, restrict the project to Wise users.
2. If not, keep the URL within the team and rely on the Google Sheets being Wise-only.
3. Do not make the source repository public.

## Monthly Workflow

1. Update the Lightdash source Google Sheet as usual.
2. Update the Performance Updates Google Sheet tab for the completed month, for example `June 2026`.
3. Open the hosted Vercel URL.
4. Click **Upload Lightdash Data**.
5. Click **Upload Performance Updates**.
6. Click **Generate Monthly Report**.
7. Review the slides.
8. Use **Export Deck**.

The tool chooses the Performance Updates tab from the latest selected report month. If Lightdash latest complete month is `2026-06`, it reads `June 2026`; if it is `2026-07`, it reads `July 2026`.

## Local Development

Create `.env.local` locally only if you need to test AI summaries:

```text
OPENAI_API_KEY=<shared team API key>
OPENAI_SUMMARY_MODEL=gpt-4.1
```

Then run:

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Security Notes

- The OpenAI API key is read only by `app/api/generate-summaries/route.ts`.
- The browser calls `/api/generate-summaries`; it does not call OpenAI directly.
- The shared hosted page does not include cached Lightdash or Performance Updates CSVs.
- Rotate the API key if it is accidentally committed, posted somewhere broad, or exposed in a browser-visible file.
