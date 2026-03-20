import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { sanityConfigured } from './lib/sanity'

if (import.meta.env.PROD) {
  if (sanityConfigured) {
    console.info('[Sanity] VITE_SANITY_PROJECT_ID is present in this build.')
  } else {
    console.warn(
      '[Sanity] VITE_SANITY_PROJECT_ID missing at build time — site uses bundled fallback copy.',
    )
  }
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
