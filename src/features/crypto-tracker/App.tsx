
import { useState, useEffect } from 'react';
import type { Asset } from './types';
import { getMarketData } from './services/api';
import AddAssetForm from './components/AddAssetForm';
import AssetList from './components/AssetList';

function App() {
  const [assets, setAssets] = useState<Asset[]>(() => {
    const saved = localStorage.getItem('crypto_assets');
    return saved ? JSON.parse(saved) : [];
  });
  const [showForm, setShowForm] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  // Persistence
  useEffect(() => {
    localStorage.setItem('crypto_assets', JSON.stringify(assets));
  }, [assets]);

  // Auto-refresh prices
  const refreshPrices = async () => {
    if (assets.length === 0) return;
    setRefreshing(true);
    const ids = assets.map(a => a.id);
    const marketData = await getMarketData(ids);

    setAssets(prev => prev.map(asset => {
      const updated = marketData.find(m => m.id === asset.id);
      return updated ? { ...asset, ...updated } : asset;
    }));
    setRefreshing(false);
  };

  useEffect(() => {
    refreshPrices();
    const interval = setInterval(refreshPrices, 60000); // 60s auto-refresh
    return () => clearInterval(interval);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const addAsset = async (newAsset: { id: string; quantity: number; avg_buy_price?: number }) => {
    // Fetch initial data for the new asset
    const [marketData] = await getMarketData([newAsset.id]);
    if (!marketData) return; // Error handling could be better

    const asset: Asset = {
      ...marketData as Asset, // Cast because API returns partial but we need full
      quantity: newAsset.quantity,
      avg_buy_price: newAsset.avg_buy_price
    };

    setAssets(prev => {
      // Check if already exists, if so update quantity
      const existing = prev.find(a => a.id === asset.id);
      if (existing) {
        return prev.map(a => a.id === asset.id ? { ...a, quantity: a.quantity + asset.quantity } : a);
      }
      return [...prev, asset];
    });
    setShowForm(false);
  };

  const deleteAsset = (id: string) => {
    if (confirm('Remove this asset from portfolio?')) {
      setAssets(assets.filter(a => a.id !== id));
    }
  };

  const totalValue = assets.reduce((sum, asset) => sum + (asset.current_price * asset.quantity), 0);
  const totalCost = assets.reduce((sum, asset) => sum + ((asset.avg_buy_price || 0) * asset.quantity), 0);
  const totalProfit = totalValue - totalCost;
  const hasBuyPrices = assets.some(a => a.avg_buy_price);

  return (
    <div className="app-container">
      <header className="app-header">
        <div className="header-title">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24Z" fill="#F7931A" />
            <path d="M16.498 8.955C16.326 8.25 15.698 7.635 14.546 7.35V5.55H12.824V7.215C12.434 7.125 12.044 7.05 11.669 6.99V5.55H9.947V6.87C9.947 6.87 9.467 6.81 9.422 6.81H8.042V8.415C8.042 8.415 8.927 8.43 8.942 8.445C9.422 8.505 9.512 8.85 9.527 9.075V14.805C9.512 14.82 9.422 15.165 8.942 15.225C8.927 15.24 8.042 15.255 8.042 15.255V17.01H9.467C9.512 17.01 9.947 17.085 9.947 17.085V18.45H11.669V17.16C12.029 17.115 12.389 17.055 12.749 16.98V18.45H14.471V16.755C16.391 16.395 17.156 15.435 17.261 14.16C17.351 13.125 16.631 12.54 15.821 12.21C16.661 11.985 17.201 11.235 16.498 8.955ZM14.336 13.995C14.156 14.715 12.986 14.76 12.056 14.76V12.915C12.986 12.915 14.501 12.945 14.336 13.995ZM14.006 10.635C13.856 11.235 12.866 11.265 12.056 11.265V9.66C12.866 9.66 14.156 9.615 14.006 10.635Z" fill="white" />
          </svg>
          <div>
            <h1>Crypto Tracker</h1>
            <p className="subtitle">Real-time Portfolio Manager</p>
          </div>
        </div>
        <div className="header-actions">
          <button onClick={refreshPrices} className="btn-refresh" disabled={refreshing}>
            {refreshing ? '↻' : '↻'}
          </button>
          <button onClick={() => setShowForm(true)} className="btn-add">
            + Add Asset
          </button>
        </div>
      </header>

      <div className="portfolio-summary">
        <div className="summary-card main">
          <h3>Total Balance</h3>
          <div className="amount">${totalValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
        </div>
        {hasBuyPrices && (
          <div className="summary-card">
            <h3>Total Profit/Loss</h3>
            <div className={`amount ${totalProfit >= 0 ? 'profit' : 'loss'}`}>
              {totalProfit >= 0 ? '+' : ''}${Math.abs(totalProfit).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
          </div>
        )}
      </div>

      {showForm && (
        <div className="modal-overlay">
          <AddAssetForm
            onAdd={addAsset}
            onCancel={() => setShowForm(false)}
          />
        </div>
      )}

      <div className="content-area">
        {assets.length === 0 ? (
          <div className="empty-state">
            <p>Your portfolio is empty. Add an asset to start tracking!</p>
          </div>
        ) : (
          <AssetList assets={assets} onDelete={deleteAsset} />
        )}
      </div>

      <style>{`
        .app-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
        }

        .header-title {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .subtitle {
          color: var(--text-secondary);
          font-size: 0.9rem;
        }

        .header-actions {
          display: flex;
          gap: 1rem;
        }

        .btn-refresh {
          background: var(--bg-card);
          color: var(--text-primary);
          width: 40px;
          height: 40px;
          border-radius: 8px;
          font-size: 1.2rem;
          transition: all 0.2s;
        }

        .btn-refresh:hover {
          background: var(--bg-secondary);
          transform: rotate(180deg);
        }

        .btn-add {
          background: var(--accent-primary);
          color: white;
          padding: 0.5rem 1.5rem;
          border-radius: 8px;
          font-weight: 600;
          transition: background 0.2s;
        }

        .btn-add:hover {
          background: var(--accent-hover);
        }

        .portfolio-summary {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 1.5rem;
          margin-bottom: 2.5rem;
        }

        .summary-card {
          background: var(--bg-card);
          padding: 2rem;
          border-radius: var(--card-radius);
          text-align: center;
          position: relative;
          overflow: hidden;
        }

        .summary-card.main {
          background: linear-gradient(135deg, var(--bg-card), rgba(247, 147, 26, 0.1));
          border: 1px solid rgba(247, 147, 26, 0.2);
        }

        .summary-card h3 {
          font-size: 0.9rem;
          color: var(--text-secondary);
          margin-bottom: 0.5rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .summary-card .amount {
          font-size: 2.5rem;
          font-weight: 700;
          color: var(--text-primary);
        }

        .profit { color: var(--success); }
        .loss { color: var(--danger); }

        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.8);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          padding: 1rem;
          backdrop-filter: blur(4px);
        }

        .empty-state {
          text-align: center;
          padding: 4rem 0;
          color: var(--text-secondary);
          border: 2px dashed var(--bg-card);
          border-radius: var(--card-radius);
        }
      `}</style>
    </div>
  );
}

export default App;
