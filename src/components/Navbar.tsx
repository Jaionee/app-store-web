import { useState, useEffect } from 'react';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="container nav-content">
        <div className="logo">
          <span className="logo-text">AppStore</span>
          <div className="logo-dot"></div>
        </div>
        <div className="nav-links">
          <a href="#home" className="nav-link active">Home</a>
          <a href="#apps" className="nav-link">Apps</a>
          <a href="#about" className="nav-link">About</a>
        </div>
        <a href="#apps" className="btn-primary">Get Started</a>
      </div>
      <style>{`
        .navbar {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: var(--nav-height);
          z-index: 1000;
          transition: all 0.3s ease;
          background: transparent;
        }
        
        .navbar.scrolled {
          background: rgba(10, 10, 10, 0.8);
          backdrop-filter: blur(10px);
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }

        .nav-content {
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .logo {
          display: flex;
          align-items: baseline;
          gap: 4px;
          font-size: 1.5rem;
          font-weight: 700;
          letter-spacing: -0.5px;
        }

        .logo-dot {
          width: 8px;
          height: 8px;
          background: var(--accent-primary);
          border-radius: 50%;
        }

        .nav-links {
          display: flex;
          gap: 2rem;
        }

        .nav-link {
          font-size: 0.95rem;
          font-weight: 500;
          color: var(--text-secondary);
          position: relative;
        }

        .nav-link:hover, .nav-link.active {
          color: var(--text-primary);
        }

        .nav-link::after {
          content: '';
          position: absolute;
          bottom: -4px;
          left: 0;
          width: 0;
          height: 2px;
          background: var(--accent-primary);
          transition: width 0.3s ease;
        }

        .nav-link:hover::after, .nav-link.active::after {
          width: 100%;
        }

        .btn-primary {
          background: var(--accent-primary);
          color: white;
          padding: 0.6rem 1.5rem;
          border-radius: 50px;
          font-weight: 600;
          font-size: 0.9rem;
          transition: all 0.3s ease;
          box-shadow: 0 4px 15px var(--accent-glow);
        }

        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px var(--accent-glow);
          background: var(--accent-secondary);
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
