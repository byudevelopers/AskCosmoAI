import "./SiteFooter.css";

function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer__content">
        <div>
          <div className="site-footer__brand">AskCosmoAI</div>
          <p>
            Empowering every campus with a conversational layer that is
            trustworthy, accessible, and inclusive.
          </p>
        </div>
        <div className="site-footer__links">
          <div>
            <h4>Product</h4>
            <ul>
              <li>
                <a href="#features">Overview</a>
              </li>
              <li>
                <a href="#pricing">Pricing</a>
              </li>
              <li>
                <a href="#chat">Launch</a>
              </li>
            </ul>
          </div>
          <div>
            <h4>Company</h4>
            <ul>
              <li>
                <a href="#why">About</a>
              </li>
              <li>
                <a href="#educators">Partners</a>
              </li>
              <li>
                <a href="#support">Support</a>
              </li>
            </ul>
          </div>
          <div>
            <h4>Resources</h4>
            <ul>
              <li>
                <a href="#docs">Docs</a>
              </li>
              <li>
                <a href="#security">Security</a>
              </li>
              <li>
                <a href="#status">Status</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="site-footer__meta">
        <small>© {new Date().getFullYear()} AskCosmoAI. All rights reserved.</small>
        <div className="site-footer__meta-links">
          <a href="#privacy">Privacy</a>
          <a href="#terms">Terms</a>
          <a href="#accessibility">Accessibility</a>
        </div>
      </div>
    </footer>
  );
}

export default SiteFooter;
