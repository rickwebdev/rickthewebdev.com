import React, { useEffect, useId, useRef } from 'react';

interface SiteStackModalProps {
  open: boolean;
  onClose: () => void;
}

const links = [
  { label: 'React', href: 'https://react.dev' },
  { label: 'TypeScript', href: 'https://www.typescriptlang.org' },
  { label: 'Vite', href: 'https://vitejs.dev' },
  { label: 'Sanity', href: 'https://www.sanity.io' },
  { label: 'Vercel', href: 'https://vercel.com' },
] as const;

export const SiteStackModal: React.FC<SiteStackModalProps> = ({ open, onClose }) => {
  const titleId = useId();
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  useEffect(() => {
    if (open) panelRef.current?.focus();
  }, [open]);

  if (!open) return null;

  return (
    <div
      className="site-stack-backdrop"
      role="presentation"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        ref={panelRef}
        className="site-stack-panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
      >
        <button type="button" className="site-stack-close" onClick={onClose} aria-label="Close">
          ×
        </button>
        <h2 id={titleId} className="site-stack-title">
          About This Site
        </h2>
        <h3 className="site-stack-subtitle">How to navigate</h3>
        <p className="site-stack-lede">
          The home screen is intentionally minimal — name, intro, skills at a glance. The actual
          portfolio is one click away: tap the lightbulb on the photo to open the Work · Skills ·
          Contact panel.
        </p>
        <h3 className="site-stack-subtitle">How it&apos;s built</h3>
        <p className="site-stack-lede">
          <strong>React</strong> + <strong>TypeScript</strong> SPA, bundled with <strong>Vite</strong>,
          deployed on <strong>Vercel</strong>. Content lives in <strong>Sanity</strong> — work and skills
          update without a redeploy, and the app falls back gracefully to hardcoded copy if Sanity
          isn&apos;t configured. Static deployment keeps it fast, secure, and cheap to run.
        </p>
        <p className="site-stack-lede">
          There&apos;s a Konami code easter egg if you&apos;re into that kind of thing.
        </p>
        <p className="site-stack-lede site-stack-stack-line">
          <span className="site-stack-stack-prefix">Stack:</span>{' '}
          {links.map(({ label, href }, i) => (
            <React.Fragment key={href}>
              {i > 0 ? ' · ' : null}
              <a href={href} target="_blank" rel="noopener noreferrer">
                <strong>{label}</strong>
              </a>
            </React.Fragment>
          ))}
        </p>
      </div>
    </div>
  );
};
