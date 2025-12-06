

const Hero = () => {
  return (
    <section className="hero" id="home">
      <div className="container hero-content">
        <div className="hero-text fade-in">
          <h1>
            Discover the Future of <span className="gradient-text">Apps</span>
          </h1>
          <p>
            Explore a curated collection of premium applications designed to enhance your digital life.
            Experience the best in design and functionality.
          </p>
          <div className="hero-buttons">
            <a href="#apps" className="btn-primary">Explore Apps</a>
            <a href="#apps" className="btn-secondary">Learn More</a>
          </div>
        </div>
        <div className="hero-visual fade-in" style={{ animationDelay: '0.2s' }}>
          <div className="visual-circle"></div>
          <div className="visual-card">
            <div className="card-header">
              <div className="dot red"></div>
              <div className="dot yellow"></div>
              <div className="dot green"></div>
            </div>
            <div className="card-body">
              <div className="skeleton-line w-75"></div>
              <div className="skeleton-line w-50"></div>
              <div className="skeleton-box"></div>
            </div>
          </div>
        </div>
      </div>
      <style>{`
        .hero {
          min-height: 90vh;
          display: flex;
          align-items: center;
          position: relative;
          overflow: hidden;
          padding-top: var(--nav-height);
        }

        .hero::before {
          content: '';
          position: absolute;
          top: -20%;
          right: -10%;
          width: 600px;
          height: 600px;
          background: radial-gradient(circle, var(--accent-glow) 0%, transparent 70%);
          opacity: 0.4;
          z-index: -1;
        }

        .hero-content {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          align-items: center;
        }

        .hero-text h1 {
          font-size: 4rem;
          line-height: 1.1;
          margin-bottom: 1.5rem;
          font-weight: 800;
        }

        .gradient-text {
          background: linear-gradient(135deg, var(--accent-primary), var(--accent-secondary));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .hero-text p {
          font-size: 1.2rem;
          color: var(--text-secondary);
          margin-bottom: 2.5rem;
          max-width: 500px;
        }

        .hero-buttons {
          display: flex;
          gap: 1rem;
        }

        .btn-secondary {
          background: transparent;
          color: var(--text-primary);
          padding: 0.6rem 1.5rem;
          border-radius: 50px;
          font-weight: 600;
          font-size: 0.9rem;
          border: 1px solid var(--border-color);
          transition: all 0.3s ease;
        }

        .btn-secondary:hover {
          border-color: var(--text-primary);
          background: rgba(255, 255, 255, 0.05);
        }

        .hero-visual {
          position: relative;
          display: flex;
          justify-content: center;
        }

        .visual-circle {
          position: absolute;
          width: 400px;
          height: 400px;
          border-radius: 50%;
          border: 1px solid rgba(255, 255, 255, 0.1);
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }

        .visual-card {
          width: 320px;
          height: 400px;
          background: rgba(30, 30, 30, 0.6);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 20px;
          padding: 20px;
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5);
          transform: rotate(-5deg);
          transition: transform 0.5s ease;
        }

        .visual-card:hover {
          transform: rotate(0deg) scale(1.02);
        }

        .card-header {
          display: flex;
          gap: 8px;
          margin-bottom: 20px;
        }

        .dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
        }
        .red { background: #ff5f56; }
        .yellow { background: #ffbd2e; }
        .green { background: #27c93f; }

        .skeleton-line {
          height: 12px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 6px;
          margin-bottom: 12px;
        }
        .w-75 { width: 75%; }
        .w-50 { width: 50%; }

        .skeleton-box {
          height: 150px;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 12px;
          margin-top: 20px;
        }

        @media (max-width: 768px) {
          .hero-content {
            grid-template-columns: 1fr;
            text-align: center;
          }
          .hero-text h1 {
            font-size: 2.5rem;
          }
          .hero-text p {
            margin: 0 auto 2rem;
          }
          .hero-buttons {
            justify-content: center;
          }
          .hero-visual {
            display: none;
          }
        }
      `}</style>
    </section>
  );
};

export default Hero;
