
import { useState } from 'react';
import { type Subscription, CATEGORIES } from '../types';

interface SubscriptionFormProps {
    onSave: (subscription: Omit<Subscription, 'id'>) => void;
    onCancel: () => void;
}

const SubscriptionForm = ({ onSave, onCancel }: SubscriptionFormProps) => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
    const [nextPaymentDate, setNextPaymentDate] = useState('');
    const [category, setCategory] = useState(CATEGORIES[0].name);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!name || !price || !nextPaymentDate) return;

        const selectedCategory = CATEGORIES.find(c => c.name === category) || CATEGORIES[0];

        onSave({
            name,
            price: parseFloat(price),
            currency: 'EUR', // Default to EUR for now
            billingCycle,
            nextPaymentDate,
            category: selectedCategory.name,
            color: selectedCategory.color
        });
    };

    return (
        <form onSubmit={handleSubmit} className="subscription-form">
            <h2>Add Subscription</h2>

            <div className="form-group">
                <label>Name</label>
                <input
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="e.g. Netflix"
                    required
                />
            </div>

            <div className="form-group">
                <label>Price (€)</label>
                <input
                    type="number"
                    step="0.01"
                    value={price}
                    onChange={e => setPrice(e.target.value)}
                    placeholder="0.00"
                    required
                />
            </div>

            <div className="form-group">
                <label>Billing Cycle</label>
                <select value={billingCycle} onChange={e => setBillingCycle(e.target.value as 'monthly' | 'yearly')}>
                    <option value="monthly">Monthly</option>
                    <option value="yearly">Yearly</option>
                </select>
            </div>

            <div className="form-group">
                <label>Next Payment</label>
                <input
                    type="date"
                    value={nextPaymentDate}
                    onChange={e => setNextPaymentDate(e.target.value)}
                    required
                />
            </div>

            <div className="form-group">
                <label>Category</label>
                <div className="category-selector">
                    {CATEGORIES.map(cat => (
                        <button
                            key={cat.name}
                            type="button"
                            className={`category-btn ${category === cat.name ? 'selected' : ''}`}
                            style={{ backgroundColor: cat.color }}
                            onClick={() => setCategory(cat.name)}
                            title={cat.name}
                        >
                            {category === cat.name && '✓'}
                        </button>
                    ))}
                </div>
            </div>

            <div className="form-actions">
                <button type="button" onClick={onCancel} className="btn-cancel">Cancel</button>
                <button type="submit" className="btn-save">Save Subscription</button>
            </div>

            <style>{`
        .subscription-form {
          background: var(--bg-card);
          padding: 2rem;
          border-radius: var(--card-radius);
          max-width: 500px;
          margin: 0 auto;
          box-shadow: 0 10px 25px rgba(0,0,0,0.3);
        }

        .subscription-form h2 {
          margin-bottom: 1.5rem;
          text-align: center;
        }

        .form-group {
          margin-bottom: 1.25rem;
        }

        .form-group label {
          display: block;
          margin-bottom: 0.5rem;
          color: var(--text-secondary);
          font-size: 0.9rem;
        }

        .form-group input, .form-group select {
          width: 100%;
        }

        .category-selector {
          display: flex;
          gap: 0.5rem;
        }

        .category-btn {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: bold;
          opacity: 0.6;
          transition: all 0.2s;
        }

        .category-btn.selected, .category-btn:hover {
          opacity: 1;
          transform: scale(1.1);
          box-shadow: 0 0 0 2px var(--bg-card), 0 0 0 4px white;
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

export default SubscriptionForm;
