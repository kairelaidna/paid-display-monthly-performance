# Paid Display Monthly Performance

Static monthly report generator for Wise Paid Display reporting.

## Hosting Path

Use **GitHub Pages**.

This version has an **API KEY** field on the first page. The key is pasted by the user when generating the report and is not stored in GitHub.

The Google Sheets data is loaded through a Wise Google Apps Script data bridge, so the source sheets can stay Wise-only.

## One-Time Setup

1. Upload this project to the GitHub repository.
2. Open the repository on GitHub.
3. Go to **Settings**.
4. Open **Pages**.
5. Under **Build and deployment**, choose:
   - Source: **Deploy from a branch**
   - Branch: **main**
   - Folder: **/ (root)**
6. Click **Save**.
7. Wait a few minutes for GitHub Pages to publish the site.

The site URL will look like:

```text
https://kairelaidna.github.io/paid-display-monthly-performance/
```

## Monthly Workflow

1. Update the Lightdash source Google Sheet as usual.
2. Update the Performance Updates Google Sheet tab for the completed month, for example `June 2026`.
3. Open the GitHub Pages URL.
4. Paste the shared team key into **API KEY**.
5. Click **Upload Lightdash Data**.
6. Click **Upload Performance Updates**.
7. Click **Generate Monthly Report**.
8. Review the slides.
9. Use **Export Deck**.

The tool pulls the latest Lightdash rows every time **Upload Lightdash Data** is clicked.

The tool then loads all available Performance Updates tabs from the Apps Script bridge and matches them to every month available in the Lightdash data. If Lightdash includes `2026-06`, it matches tabs such as `June 2026`, `June`, `Jun 26`, and `2026-06`. When **Generate Monthly Report** is clicked, it prepares summaries for every matched month in the same session, so changing the month dropdown shows the historical report without another upload or generation step.

## Calculation Rules

- The headline KPI slides and global overview top boxes include all four Paid Display vendors: Google AC, Moloco, TTD, and Avow.
- Platform split tables, platform slides, regional slides, regional cards, summaries, and plans use only Google AC, Moloco, and TTD.
- LTV and payback are weighted averages from the Lightdash values, weighted by MNCs.

## Security Notes

- Do not commit the API key to GitHub.
- Do not add the API key to this README or any `.env` file.
- The key is entered in the browser only when the tool is used.
- GitHub Pages requires the repository to be public unless your account supports private Pages.
- The source sheets remain Wise-only behind the Apps Script bridge.
- Team members must be signed into a Wise Google account that can access the Apps Script deployment.

## Data Bridge

The hosted page reads from:

```text
https://script.google.com/a/macros/wise.com/s/AKfycbyhHkA6OiR_5dA_dQXGDFNdm4RL10BVQMLUutiVpiH7Amp05Qj3lVI7N5eH501rMPJy/exec
```

If that Apps Script deployment is replaced, update `APPS_SCRIPT_DATA_BRIDGE_URL` in `public/marketing-performance-slideshow.html`.

For faster Performance Updates loading, use the v3 bridge in `outputs/apps-script-data-bridge-v3-fast-updates.js`. It supports `allTabs=1&months=2026-05,2026-04`, so the site only reads update tabs that match months in the Lightdash data instead of returning every tab in the workbook.
