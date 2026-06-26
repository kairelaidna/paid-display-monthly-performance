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

The tool chooses the Performance Updates tab from the latest selected report month. If Lightdash latest complete month is `2026-06`, it first tries `June 2026`, then common variants such as `June`, `Jun 26`, and `2026-06`.

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
