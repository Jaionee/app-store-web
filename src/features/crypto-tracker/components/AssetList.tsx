
import type { Asset } from '../types';

interface AssetListProps {
    assets: Asset[];
    onDelete: (id: string) => void;
}

const AssetList = ({ assets, onDelete }: AssetListProps) => {
    return (
        <div className="asset-list">
            {assets.map(asset => {
                const value = asset.current_price * asset.quantity;
                const profitLoss = asset.avg_buy_price
                    ? (asset.current_price - asset.avg_buy_price) * asset.quantity
                    : 0;
                const isProfit = profitLoss >= 0;

                return (
                    <div key={asset.id} className="asset-card">
                        <div className="asset-info">
                            <img src={asset.image} alt={asset.name} />
                            <div>
                                <h3>{asset.name}</h3>
                                <span className="symbol">{asset.symbol.toUpperCase()}</span>
                            </div>
                        </div>

                        <div className="asset-stats">
                            <div className="stat">
                                <span className="label">Price</span>
                                <span className="value">${asset.current_price.toLocaleString()}</span>
                            </div>
                            <div className="stat">
                                <span className="label">Holdings</span>
                                <span className="value">{asset.quantity} {asset.symbol.toUpperCase()}</span>
                            </div>
                            <div className="stat">
                                <span className="label">Value</span>
                                <span className="value">${value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                            </div>
                            {asset.avg_buy_price && (
                                <div className="stat">
                                    <span className="label">P/L</span>
                                    <span className={`value ${isProfit ? 'profit' : 'loss'}`}>
                                        {isProfit ? '+' : ''}${Math.abs(profitLoss).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                    </span>
                                </div>
                            )}
                        </div>

                        <button onClick={() => onDelete(asset.id)} className="btn-delete" title="Remove Asset">
                            ×
                        </button>
                    </div>
                );
            })}

            <style>{`
        .asset-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .asset-card {
          background: var(--bg-card);
          padding: 1.25rem;
          border-radius: var(--card-radius);
          display: flex;
          align-items: center;
          justify-content: space-between;
          transition: transform 0.2s;
        }

        .asset-card:hover {
          transform: translateY(-2px);
        }

        .asset-info {
          display: flex;
          align-items: center;
          gap: 1rem;
          min-width: 150px;
        }

        .asset-info img {
          width: 40px;
          height: 40px;
          border-radius: 50%;
        }

        .asset-info h3 {
          font-size: 1.1rem;
          margin: 0;
        }

        .asset-info .symbol {
          color: var(--text-secondary);
          font-size: 0.85rem;
          font-weight: 600;
        }

        .asset-stats {
          display: flex;
          gap: 2rem;
          flex: 1;
          justify-content: flex-end;
          margin-right: 2rem;
        }

        .stat {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
        }

        .stat .label {
          font-size: 0.75rem;
          color: var(--text-secondary);
          text-transform: uppercase;
          margin-bottom: 0.25rem;
        }

        .stat .value {
          font-weight: 600;
          font-size: 1rem;
        }

        .profit { color: var(--success); }
        .loss { color: var(--danger); }

        .btn-delete {
          background: transparent;
          color: var(--text-secondary);
          font-size: 1.5rem;
          padding: 0.5rem;
          line-height: 1;
          border-radius: 50%;
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .btn-delete:hover {
          background: rgba(239, 68, 68, 0.1);
          color: var(--danger);
        }

        @media (max-width: 768px) {
          .asset-card {
            flex-direction: column;
            align-items: flex-start;
            gap: 1.5rem;
            position: relative;
          }
          
          .asset-stats {
            width: 100%;
            justify-content: space-between;
            margin-right: 0;
            flex-wrap: wrap;
            gap: 1rem;
          }

          .btn-delete {
            position: absolute;
            top: 1rem;
            right: 1rem;
          }
        }
      `}</style>
        </div>
    );
};

export default AssetList;
