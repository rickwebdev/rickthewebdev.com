# Static fallback content (backup)

`portfolioFallback.ts` and `skillsFallback.ts` are used when **`VITE_SANITY_PROJECT_ID` is missing**, when a **fetch fails**, or when the API returns **no usable documents**. With Sanity configured, the UI **waits on the API** first so there is no flash of this copy. These files stay in git as a safety net.

To refresh the backup after intentional CMS-only edits, copy from Studio or re-run `npm run migrate` and mirror changes here if you want parity without Sanity.
