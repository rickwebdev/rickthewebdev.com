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
          Built as a <strong>React</strong> + <strong>TypeScript</strong> SPA, bundled with{' '}
          <strong>Vite</strong>, deployed on <strong>Vercel</strong>. Content is managed through{' '}
          <strong>Sanity</strong> — work and skills update instantly without a redeploy. The
          architecture separates content from code the way it should be.
        </p>
        <p className="site-stack-lede">
          A few decisions worth noting: static deployment keeps it fast, secure, and essentially free to
          run. <strong>Sanity</strong>&apos;s CDN means returning visitors get fresh content without a page
          reload. If <strong>Sanity</strong> isn&apos;t configured the app falls back to hardcoded copy, so
          nothing ever breaks in production.
        </p>
        <p className="site-stack-lede">
          There&apos;s also a hidden easter egg. The Konami code does something.
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
