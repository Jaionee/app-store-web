

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-brand">
            <h3>AppStore</h3>
            <p>Premium apps for everyone.</p>
          </div>
          <div className="footer-links">
            <div className="link-group">
              <h4>Product</h4>
              <a href="#">Features</a>
              <a href="#">Pricing</a>
            </div>
            <div className="link-group">
              <h4>Company</h4>
              <a href="#">About</a>
              <a href="#">Contact</a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2025 AppStore. All rights reserved.</p>
        </div>
      </div>
      <style>{`
        .footer {
          background: var(--bg-secondary);
          padding: 4rem 0 2rem;
          margin-top: 4rem;
          border-top: 1px solid var(--border-color);
        }

        .footer-content {
          display: flex;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 2rem;
          margin-bottom: 3rem;
        }

        .footer-brand h3 {
          font-size: 1.5rem;
          margin-bottom: 0.5rem;
        }

        .footer-brand p {
          color: var(--text-secondary);
        }

        .footer-links {
          display: flex;
          gap: 4rem;
        }

        .link-group h4 {
          margin-bottom: 1rem;
          color: var(--text-primary);
        }

        .link-group a {
          display: block;
          color: var(--text-secondary);
          margin-bottom: 0.5rem;
          font-size: 0.9rem;
        }

        .link-group a:hover {
          color: var(--accent-primary);
        }

        .footer-bottom {
          text-align: center;
          padding-top: 2rem;
          border-top: 1px solid var(--border-color);
          color: var(--text-secondary);
          font-size: 0.85rem;
        }
      `}</style>
    </footer>
  );
};

export default Footer;
