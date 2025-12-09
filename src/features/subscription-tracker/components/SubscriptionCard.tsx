
import type { Subscription } from '../types';

interface SubscriptionCardProps {
    subscription: Subscription;
    onDelete: (id: string) => void;
}

const SubscriptionCard = ({ subscription, onDelete }: SubscriptionCardProps) => {
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    };

    return (
        <div className="subscription-card" style={{ borderLeft: `4px solid ${subscription.color}` }}>
            <div className="card-main">
                <div className="card-header">
                    <h3>{subscription.name}</h3>
                    <span className="category-tag" style={{ backgroundColor: subscription.color + '20', color: subscription.color }}>
                        {subscription.category}
                    </span>
                </div>
                <div className="card-details">
                    <span className="billing-cycle">{subscription.billingCycle}</span>
                    <span className="next-payment">Next: {formatDate(subscription.nextPaymentDate)}</span>
                </div>
            </div>

            <div className="card-actions">
                <div className="price">
                    <span className="currency">€</span>
                    <span className="amount">{subscription.price.toFixed(2)}</span>
                </div>
                <button onClick={() => onDelete(subscription.id)} className="btn-delete" title="Delete">
                    ×
                </button>
            </div>

            <style>{`
        .subscription-card {
          background: var(--bg-card);
          border-radius: 8px;
          padding: 1.25rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
          transition: transform 0.2s;
        }

        .subscription-card:hover {
          transform: translateY(-2px);
        }

        .card-header {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 0.5rem;
        }

        .card-header h3 {
          font-size: 1.1rem;
          margin: 0;
        }

        .category-tag {
          font-size: 0.75rem;
          padding: 0.2rem 0.5rem;
          border-radius: 4px;
          font-weight: 600;
          text-transform: uppercase;
        }

        .card-details {
          display: flex;
          gap: 1rem;
          font-size: 0.85rem;
          color: var(--text-secondary);
        }

        .card-actions {
          display: flex;
          align-items: center;
          gap: 1.5rem;
        }

        .price {
          text-align: right;
          font-weight: 700;
          font-size: 1.25rem;
        }

        .btn-delete {
          background: transparent;
          color: var(--text-secondary);
          font-size: 1.5rem;
          line-height: 1;
          padding: 0 0.5rem;
          border-radius: 4px;
        }

        .btn-delete:hover {
          color: var(--danger);
          background: rgba(239, 68, 68, 0.1);
        }
      `}</style>
        </div>
    );
};

export default SubscriptionCard;
