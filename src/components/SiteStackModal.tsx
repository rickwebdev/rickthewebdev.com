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
        <p className="site-stack-lede">
          Built with <strong>React</strong> and <strong>TypeScript</strong>, bundled by <strong>Vite</strong>,
          and deployed on <strong>Vercel</strong> for fast global delivery. Content — work, case studies,
          and skills — is managed through <strong>Sanity</strong>, so everything stays fresh without
          touching the codebase. Publish an update in Sanity and it&apos;s live instantly, no redeploy
          needed.
        </p>
        <p className="site-stack-subhead">A few things worth noting under the hood:</p>
        <ul className="site-stack-list">
          <li>
            Content is served via Sanity&apos;s API and CDN, so returning visitors get updates without a
            page reload
          </li>
          <li>
            If Sanity isn&apos;t configured, the app falls back to hardcoded copy in the repo so nothing
            breaks
          </li>
          <li>
            The whole thing ships as a static app, which keeps it fast, secure, and cheap to run
          </li>
        </ul>
        <p className="site-stack-links-label">Stack</p>
        <div className="site-stack-links">
          {links.map(({ label, href }) => (
            <a key={href} href={href} target="_blank" rel="noopener noreferrer">
              {label}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
