# Paid Display Monthly Performance

Static monthly report generator for Wise Paid Display reporting.

## VoD Campaign Canvas

The daily VoD campaign graph tool lives at:

```text
public/vod-campaign-canvas.html
```

In local Next development, open:

```text
/vod-campaign-canvas.html
```

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
5. Click **Generate Report**.
6. Watch the button progress from 1% to 100% while the tool loads both Google Sheets and generates all available monthly reports.
7. Review the slides.
8. Use **Export Deck** for the presentation PDF.
9. Use **Copy Summary** to copy the Slack-ready summary for the currently selected month.

The tool pulls the latest Lightdash rows every time **Generate Report** is clicked.

The tool then loads all available Performance Updates tabs from the Apps Script bridge and matches them to every month available in the Lightdash data. If Lightdash includes `2026-06`, it matches tabs such as `June 2026`, `June`, `Jun 26`, and `2026-06`. When **Generate Report** is clicked, it prepares summaries for every matched month in the same session, so changing the month dropdown shows the historical report without another upload or generation step. Summary generation is parallelized so multiple months are prepared at the same time.

## Calculation Rules

- The headline KPI slides and global overview top boxes include all four Paid Display vendors: Google AC, Moloco, TTD, and Avow.
- Platform split tables, platform slides, regional slides, regional cards, summaries, and plans use only Google AC, Moloco, and TTD.
- LTV and payback are weighted averages from the Lightdash values, weighted by rounded MNCs, matching the original CSV-upload version of the tool.

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
