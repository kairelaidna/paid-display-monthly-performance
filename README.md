# Paid Display Monthly Performance

Static monthly report generator for Wise Paid Display reporting.

## Hosting Path

Use **GitHub Pages**.

This version has an **API KEY** field on the first page. The key is pasted by the user when generating the report and is not stored in GitHub.

## One-Time Setup

1. Upload this project to the private GitHub repository.
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

The tool chooses the Performance Updates tab from the latest selected report month. If Lightdash latest complete month is `2026-06`, it reads `June 2026`; if it is `2026-07`, it reads `July 2026`.

## Security Notes

- Do not commit the API key to GitHub.
- Do not add the API key to this README or any `.env` file.
- The key is entered in the browser only when the tool is used.
- Keep the GitHub repository private and share the GitHub Pages URL only with the team.
- Team members must be signed into a Wise Google account that can access the two Google Sheets.
