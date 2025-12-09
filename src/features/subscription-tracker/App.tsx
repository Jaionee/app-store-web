
import { useState, useEffect } from 'react';
import type { Subscription } from './types';
import SubscriptionForm from './components/SubscriptionForm';
import SubscriptionCard from './components/SubscriptionCard';

function App() {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>(() => {
    const saved = localStorage.getItem('subscriptions');
    return saved ? JSON.parse(saved) : [];
  });
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    localStorage.setItem('subscriptions', JSON.stringify(subscriptions));
  }, [subscriptions]);

  const addSubscription = (newSub: Omit<Subscription, 'id'>) => {
    const subscription: Subscription = {
      ...newSub,
      id: crypto.randomUUID()
    };
    setSubscriptions([...subscriptions, subscription]);
    setShowForm(false);
  };

  const deleteSubscription = (id: string) => {
    if (confirm('Are you sure you want to delete this subscription?')) {
      setSubscriptions(subscriptions.filter(sub => sub.id !== id));
    }
  };

  const totalMonthlyCost = subscriptions.reduce((total, sub) => {
    return total + (sub.billingCycle === 'monthly' ? sub.price : sub.price / 12);
  }, 0);

  return (
    <div className="app-container">
      <header className="app-header">
        <div>
          <h1>Subscription Tracker</h1>
          <p className="subtitle">Manage your recurring expenses</p>
        </div>
        <button onClick={() => setShowForm(true)} className="btn-add">
          + Add New
        </button>
      </header>

      <div className="summary-cards">
        <div className="summary-card">
          <h3>Monthly Spend</h3>
          <div className="amount">€{totalMonthlyCost.toFixed(2)}</div>
        </div>
        <div className="summary-card">
          <h3>Active Subs</h3>
          <div className="amount">{subscriptions.length}</div>
        </div>
      </div>

      {showForm && (
        <div className="modal-overlay">
          <SubscriptionForm
            onSave={addSubscription}
            onCancel={() => setShowForm(false)}
          />
        </div>
      )}

      <div className="subscription-list">
        {subscriptions.length === 0 ? (
          <div className="empty-state">
            <p>No subscriptions yet. Add one to get started!</p>
          </div>
        ) : (
          subscriptions.map(sub => (
            <SubscriptionCard
              key={sub.id}
              subscription={sub}
              onDelete={deleteSubscription}
            />
          ))
        )}
      </div>

      <style>{`
        .app-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
        }

        .subtitle {
          color: var(--text-secondary);
          font-size: 0.9rem;
        }

        .btn-add {
          background: var(--accent-primary);
          color: white;
          padding: 0.75rem 1.5rem;
          border-radius: 8px;
          font-weight: 600;
          transition: background 0.2s;
        }

        .btn-add:hover {
          background: var(--accent-hover);
        }

        .summary-cards {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1rem;
          margin-bottom: 2rem;
        }

        .summary-card {
          background: var(--bg-card);
          padding: 1.5rem;
          border-radius: var(--card-radius);
          text-align: center;
        }

        .summary-card h3 {
          font-size: 0.9rem;
          color: var(--text-secondary);
          margin-bottom: 0.5rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .summary-card .amount {
          font-size: 2rem;
          font-weight: 700;
          color: var(--text-primary);
        }

        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.7);
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
