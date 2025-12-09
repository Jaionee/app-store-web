
import { AssetData } from '../utils/marketData';

interface AssetSelectorProps {
    assets: AssetData[];
    selectedAssets: string[];
    onToggle: (symbol: string) => void;
}

const AssetSelector = ({ assets, selectedAssets, onToggle }: AssetSelectorProps) => {
    return (
        <div className="panel asset-selector">
            <h3>// SELECT ASSETS</h3>
            <div className="asset-grid">
                {assets.map(asset => {
                    const isSelected = selectedAssets.includes(asset.symbol);
                    return (
                        <div
                            key={asset.symbol}
                            className={`asset-item ${isSelected ? 'selected' : ''}`}
                            onClick={() => onToggle(asset.symbol)}
                        >
                            <div className="checkbox-visual">
                                {isSelected && <div className="check-mark" />}
                            </div>
                            <div className="asset-info">
                                <span className="symbol">{asset.symbol}</span>
                                <span className="name">{asset.name}</span>
                            </div>
                        </div>
                    );
                })}
            </div>

            <style>{`
        .asset-selector {
          margin-bottom: 2rem;
        }

        .asset-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
          gap: 1rem;
          margin-top: 1rem;
        }

        .asset-item {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 0.8rem;
          border: 1px solid var(--grid-color);
          cursor: pointer;
          transition: all 0.2s;
          background: rgba(0, 0, 0, 0.3);
        }

        .asset-item:hover {
          border-color: var(--neon-blue);
          box-shadow: 0 0 10px rgba(0, 243, 255, 0.2);
        }

        .asset-item.selected {
          border-color: var(--neon-green);
          background: rgba(10, 255, 10, 0.05);
          box-shadow: 0 0 10px rgba(10, 255, 10, 0.2);
        }

        .checkbox-visual {
          width: 20px;
          height: 20px;
          border: 1px solid var(--text-dim);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .asset-item.selected .checkbox-visual {
          border-color: var(--neon-green);
        }

        .check-mark {
          width: 12px;
          height: 12px;
          background: var(--neon-green);
          box-shadow: 0 0 5px var(--neon-green);
        }

        .asset-info {
          display: flex;
          flex-direction: column;
        }

        .symbol {
          font-weight: bold;
          color: var(--text-primary);
        }

        .name {
          font-size: 0.8rem;
          color: var(--text-dim);
        }
      `}</style>
        </div>
    );
};

export default AssetSelector;
