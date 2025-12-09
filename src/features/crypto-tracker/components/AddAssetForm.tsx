
import { useState, useEffect } from 'react';
import { searchCoins } from '../services/api';
import type { CoinSearchResult } from '../types';

interface AddAssetFormProps {
    onAdd: (asset: { id: string; quantity: number; avg_buy_price?: number }) => void;
    onCancel: () => void;
}

const AddAssetForm = ({ onAdd, onCancel }: AddAssetFormProps) => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<CoinSearchResult[]>([]);
    const [selectedCoin, setSelectedCoin] = useState<CoinSearchResult | null>(null);
    const [quantity, setQuantity] = useState('');
    const [buyPrice, setBuyPrice] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const timer = setTimeout(async () => {
            if (query.length > 2 && !selectedCoin) {
                setLoading(true);
                const coins = await searchCoins(query);
                setResults(coins.slice(0, 5)); // Limit to 5 results
                setLoading(false);
            } else {
                setResults([]);
            }
        }, 500); // Debounce search

        return () => clearTimeout(timer);
    }, [query, selectedCoin]);

    const handleSelect = (coin: CoinSearchResult) => {
        setSelectedCoin(coin);
        setQuery(coin.name);
        setResults([]);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedCoin || !quantity) return;

        onAdd({
            id: selectedCoin.id,
            quantity: parseFloat(quantity),
            avg_buy_price: buyPrice ? parseFloat(buyPrice) : undefined
        });
    };

    return (
        <form onSubmit={handleSubmit} className="add-asset-form">
            <h2>Add Asset</h2>

            <div className="form-group">
                <label>Search Coin</label>
                <div className="search-container">
                    <input
                        type="text"
                        value={query}
                        onChange={e => {
                            setQuery(e.target.value);
                            setSelectedCoin(null);
                        }}
                        placeholder="e.g. Bitcoin"
                        required
                    />
                    {loading && <span className="loading-spinner">...</span>}
                    {results.length > 0 && (
                        <ul className="search-results">
                            {results.map(coin => (
                                <li key={coin.id} onClick={() => handleSelect(coin)}>
                                    <img src={coin.thumb} alt={coin.symbol} />
                                    <span>{coin.name}</span>
                                    <span className="symbol">({coin.symbol})</span>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>

            {selectedCoin && (
                <>
                    <div className="form-group">
                        <label>Quantity</label>
                        <input
                            type="number"
                            step="any"
                            value={quantity}
                            onChange={e => setQuantity(e.target.value)}
                            placeholder="0.00"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Avg. Buy Price (USD) <small>(Optional)</small></label>
                        <input
                            type="number"
                            step="any"
                            value={buyPrice}
                            onChange={e => setBuyPrice(e.target.value)}
                            placeholder="0.00"
                        />
                    </div>

                    <div className="form-actions">
                        <button type="button" onClick={onCancel} className="btn-cancel">Cancel</button>
                        <button type="submit" className="btn-save">Add Asset</button>
                    </div>
                </>
            )}

            <style>{`
        .add-asset-form {
          background: var(--bg-card);
          padding: 2rem;
          border-radius: var(--card-radius);
          max-width: 500px;
          width: 100%;
          margin: 0 auto;
          box-shadow: 0 10px 25px rgba(0,0,0,0.3);
        }

        .add-asset-form h2 {
          margin-bottom: 1.5rem;
          text-align: center;
        }

        .form-group {
          margin-bottom: 1.25rem;
          position: relative;
        }

        .form-group label {
          display: block;
          margin-bottom: 0.5rem;
          color: var(--text-secondary);
          font-size: 0.9rem;
        }

        .form-group input {
          width: 100%;
        }

        .search-container {
          position: relative;
        }

        .loading-spinner {
          position: absolute;
          right: 10px;
          top: 50%;
          transform: translateY(-50%);
          color: var(--text-secondary);
        }

        .search-results {
          position: absolute;
          top: 100%;
          left: 0;
          right: 0;
          background: var(--bg-secondary);
          border: 1px solid var(--bg-card);
          border-radius: 8px;
          list-style: none;
          max-height: 200px;
          overflow-y: auto;
          z-index: 10;
          margin-top: 5px;
        }

        .search-results li {
          padding: 0.75rem;
          display: flex;
          align-items: center;
          gap: 0.75rem;
          cursor: pointer;
          transition: background 0.2s;
        }

        .search-results li:hover {
          background: var(--bg-card);
        }

        .search-results img {
          width: 20px;
          height: 20px;
          border-radius: 50%;
        }

        .search-results .symbol {
          color: var(--text-secondary);
          font-size: 0.8rem;
          text-transform: uppercase;
        }

        .form-actions {
          display: flex;
          gap: 1rem;
          margin-top: 2rem;
        }

        .form-actions button {
          flex: 1;
          padding: 0.75rem;
          border-radius: 8px;
          font-weight: 600;
        }

        .btn-cancel {
          background: transparent;
          border: 1px solid var(--text-secondary);
          color: var(--text-secondary);
        }

        .btn-save {
          background: var(--accent-primary);
          color: white;
        }
        
        .btn-save:hover {
          background: var(--accent-hover);
        }
      `}</style>
        </form>
    );
};

export default AddAssetForm;
