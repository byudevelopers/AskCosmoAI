import "./SiteHeader.css";

const primaryLinks = [
  { label: "Why Cosmo AI", href: "#why" },
  { label: "Features", href: "#features" },
  { label: "Pricing", href: "#pricing" },
  { label: "For Educators", href: "#educators" },
];

function SiteHeader() {
  return (
    <header className="site-header">
      <div className="site-header__container">
        <a className="site-header__brand" href="/" aria-label="AskCosmo AI home">
          AskCosmo<span>AI</span>
        </a>
        <nav aria-label="Primary">
          <ul className="site-header__nav">
            {primaryLinks.map((link) => (
              <li key={link.label}>
                <a href={link.href}>{link.label}</a>
              </li>
            ))}
          </ul>
        </nav>
        <a className="site-header__cta" href="#chat">
          Launch App
        </a>
      </div>
    </header>
  );
}

export default SiteHeader;
