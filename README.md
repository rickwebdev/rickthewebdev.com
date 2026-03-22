# React + TypeScript + Vite

## Sanity (Work + Skills)

The site loads Work and Skills from Sanity when `VITE_SANITY_PROJECT_ID` is set. Copy [`.env.example`](./.env.example) to `.env` in the **repo root** (Studio still uses `sanity/.env`). In [sanity.io/manage](https://www.sanity.io/manage) → API → CORS origins, add `http://localhost:5173` for local dev. If those vars are missing, the app uses bundled fallback content.

## Deploy on Vercel

1. **Import** [rickwebdev/rickthewebdev.com](https://github.com/rickwebdev/rickthewebdev.com) as a new project (root directory: repo root).
2. **Framework:** Vite (auto-detected). **Build:** `npm run build` → **Output:** `dist`.
3. **Environment variables** (Production / Preview as needed), mirroring [`.env.example`](./.env.example):
   - `VITE_SANITY_PROJECT_ID` (required for live CMS content)
   - `VITE_SANITY_DATASET` (default `production`)
   - `VITE_SANITY_READ_TOKEN` only if the dataset is not public
   - `VITE_IPINFO_TOKEN` if you use Location Insights
4. In [Sanity manage](https://www.sanity.io/manage) → **API** → **CORS origins**, add every origin the **browser** uses, including:
   - `https://your-domain.com` **and** `https://www.your-domain.com` if you use both (CORS is exact-match).
   - `https://*.vercel.app` or each preview URL for Preview deployments.
5. **Content must be published:** API calls use the **published** perspective; drafts do not appear until you **Publish** in Studio.

**If the live site shows bundled fallback copy:** open DevTools → Console on production. You should see either `[Sanity] VITE_SANITY_PROJECT_ID is present in this build` or a warning that the id was missing (then fix Vercel env and **redeploy**). Other `[Sanity]` lines explain empty datasets vs network/CORS errors.

Sanity Studio in `sanity/` is optional on Vercel; host it with [`sanity deploy`](./sanity/README.md) or run locally.

### Export copy for collaboration (no copy-paste from Studio)

With [`.env`](./.env.example) set (repo root), run:

```bash
npm run export:sanity
```

This writes **`exports/sanity-portfolio-production.json`** with published **work projects**, **case studies**, **skills page**, and **resume PDF** metadata (same perspective as the live site). Open the file or attach it for review / LLM chats. The `exports/` folder is gitignored by default.

**CLI alternative (full dataset backup):** from `sanity/`, run `npx sanity dataset export production backup.tar.gz` (requires `sanity login`).

## Contact form (SMTP via Vercel function)

The CONTACT tab posts to **`/api/contact`**, a serverless handler using [nodemailer](https://nodemailer.com/). It replaces the old PHP handler (`public_html/api/contact.php`).

### Env (never `VITE_*`)

| Variable | Purpose |
|----------|--------|
| `SMTP_USER` | Login for SMTP (Gmail address, or Brevo login email, etc.) |
| `SMTP_PASS` | App password (Gmail) or SMTP key (Brevo, etc.) |
| `CONTACT_TO_EMAIL` | Optional; inbox for submissions (defaults to `SMTP_USER`) |
| `SMTP_HOST` | Optional. If unset, Gmail (`smtp.gmail.com`) is used with ports 465 then 587. |
| `SMTP_PORT` | With `SMTP_HOST`, default `587` |
| `SMTP_SECURE` | With `SMTP_HOST`, set `true` only for port 465-style SSL |
| `SMTP_DEBUG` | Set `1` temporarily to include SMTP error text in the JSON response (remove after debugging) |

### Gmail from Vercel

Use a **[Gmail app password](https://myaccount.google.com/apppasswords)** (requires 2FA), not your normal password. **Google often rejects SMTP from cloud datacenters** (including Vercel). If submissions still fail, check **Vercel → Deployment → Functions → `/api/contact` logs**, or set **`SMTP_DEBUG=1`** and redeploy to see the error in the network response.

### Reliable alternative: Brevo (free SMTP)

1. Sign up at [Brevo](https://www.brevo.com/) → **SMTP & API** → create an SMTP key.
2. Vercel env:

   - `SMTP_HOST=smtp-relay.brevo.com`
   - `SMTP_PORT=587`
   - `SMTP_SECURE=false`
   - `SMTP_USER` = your Brevo account login email
   - `SMTP_PASS` = the SMTP key

3. Redeploy.

**Local testing:** use **`npx vercel dev`** (plain `npm run dev` does not run `/api`).

---

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
})
```
