import './PublicPage.css';

/**
 * Shared wrapper for simple public/marketing pages: standard hero
 * (eyebrow + H1 + lead) inside the page container. Header/Footer come from
 * the root layout, so this only renders page content. Server component.
 */
export default function PublicPage({
  eyebrow,
  title,
  lead,
  children,
}: {
  eyebrow?: string;
  title: string;
  lead?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="public-page">
      <header className="public-hero">
        {eyebrow && <span className="public-hero__eyebrow">{eyebrow}</span>}
        <h1 className="public-hero__title">{title}</h1>
        {lead && <p className="public-hero__lead">{lead}</p>}
      </header>
      {children}
    </div>
  );
}
