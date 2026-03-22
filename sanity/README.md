# Sanity Studio

Content for **Work** (project grid + case studies) and **Skills**.

## First run

1. [Create a Sanity project](https://www.sanity.io/get-started) (free tier is fine) and note the **Project ID**.
2. Copy env:

   ```bash
   cp .env.example .env
   ```

   Set `SANITY_STUDIO_PROJECT_ID` to your real ID (no quotes, no spaces). Leave the line out or empty and Studio cannot start. Optionally set `SANITY_STUDIO_DATASET` (default `production`).

   Dev scripts preload `sanity/.env` via `dotenv` so Vite sees your ID before the Studio bundle loads.

3. Install and start Studio:

   ```bash
   npm install
   npm run dev
   ```

   (`npm run studio` is the same as `npm run dev`.)

4. Open the URL shown in the terminal (usually `http://localhost:3333`).

## Content model

| Type           | Use |
|----------------|-----|
| **Work project** | Cards on the WORK grid. **Order:** open **Work projects** in the desk and **drag and drop** (uses `orderRank`). First time, use **Reset order** in that list’s menu if cards look wrong. Legacy `sortOrder` is hidden but still used as a fallback in API queries. |
| **Case study**   | Same ordering model under **Case studies** (drag and drop). |
| **Skills page**  | Single document (fixed id `skillsPage`): core skill lines + labeled technology blocks. |
| **Resume PDF**   | Single document (fixed id `resumePdf`): upload a PDF; the site’s résumé link uses it (falls back to `/ricko_resume.pdf` if missing). |

Create singletons from the desk: **Skills page** and **Resume PDF** (upload your PDF and **Publish** so the live site picks it up).

## Migrate from the repo (one-off)

Pushes WORK + SKILLS content (mirrored in `scripts/seed-from-repo.mjs` from `Portfolio.tsx` / `Header.tsx`) into Sanity: uploads matching files under `public/images/`, creates `skillsPage`, `workProject` docs (`migrate-work-0` …), and `caseStudy` docs (`migrate-case-1` …). Safe to re-run (same `_id`s). After you change the React source, update the script (or edit in Studio) before migrating again.

1. [API → Tokens](https://www.sanity.io/manage): create a token with **Editor** (write) access.
2. In `sanity/.env` add: `SANITY_API_WRITE_TOKEN=<token>` (never commit this).
3. From `sanity/`:

   ```bash
   npm run migrate
   ```

## Deploy Studio (optional)

Host the editor at `*.sanity.studio` (this project defaults to **`https://rickthewebdev.sanity.studio`** — see `studioHost` in `sanity.cli.ts`):

```bash
npx sanity deploy
```

Your site on Vercel can still use the **Content API** only; deploying Studio is optional.
