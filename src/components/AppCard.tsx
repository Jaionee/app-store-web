
interface AppProps {
  id: number;
  name: string;
  description: string;
  rating: number;
  color: string;
  icon: string;
  url: string;
}

const AppCard = ({ app }: { app: AppProps }) => {
  return (
    <div className="app-card">
      <div className="card-icon" style={{ background: app.color }}>
        {app.icon}
      </div>
      <div className="card-content">
        <h3>{app.name}</h3>
        <p>{app.description}</p>
        <div className="card-footer">
          <span className="rating">★ {app.rating}</span>
          <a href={app.url} target="_blank" rel="noopener noreferrer" className="btn-download">Get</a>
        </div>
      </div>
      <style>{`
        .app-card {
          background: var(--bg-card);
          border-radius: var(--card-radius);
          padding: 1.5rem;
          transition: all 0.3s ease;
          border: 1px solid transparent;
          cursor: pointer;
          position: relative;
          overflow: hidden;
        }

        .app-card:hover {
          transform: translateY(-10px);
          border-color: rgba(255, 255, 255, 0.1);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        }

        .app-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(45deg, transparent, rgba(255, 255, 255, 0.03), transparent);
          transform: translateX(-100%);
          transition: transform 0.6s ease;
        }

        .app-card:hover::before {
          transform: translateX(100%);
        }

        .card-icon {
          width: 60px;
          height: 60px;
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
          margin-bottom: 1.5rem;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
        }

        .card-content h3 {
          font-size: 1.25rem;
          margin-bottom: 0.5rem;
        }

        .card-content p {
          color: var(--text-secondary);
          font-size: 0.9rem;
          margin-bottom: 1.5rem;
          line-height: 1.5;
        }

        .card-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .rating {
          color: #ffbd2e;
          font-weight: 600;
          font-size: 0.9rem;
        }

        .btn-download {
          background: rgba(255, 255, 255, 0.1);
          color: var(--text-primary);
          padding: 0.4rem 1.2rem;
          border-radius: 20px;
          font-size: 0.85rem;
          font-weight: 600;
          transition: all 0.2s ease;
          text-decoration: none;
          display: inline-block;
        }

        .app-card:hover .btn-download {
          background: var(--accent-primary);
          color: white;
        }
      `}</style>
    </div>
  );
};

export default AppCard;
