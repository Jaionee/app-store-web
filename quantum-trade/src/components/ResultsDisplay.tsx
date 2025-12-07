
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';

interface ResultsDisplayProps {
    weights: number[];
    assets: string[];
    metrics: { return: number; risk: number; energy: number };
}

const COLORS = ['#00f3ff', '#bc13fe', '#0aff0a', '#ff0055', '#ffff00'];

const ResultsDisplay = ({ weights, assets, metrics }: ResultsDisplayProps) => {
    const data = assets.map((asset, i) => ({
        name: asset,
        value: weights[i]
    })).filter(d => d.value > 0.01); // Filter out negligible weights

    return (
        <div className="panel results">
            <h3>// OPTIMAL QUANTUM STATE FOUND</h3>

            <div className="results-grid">
                <div className="metrics">
                    <div className="metric-item">
                        <span className="label">EXPECTED RETURN</span>
                        <span className="value">{(metrics.return * 100).toFixed(2)}%</span>
                    </div>
                    <div className="metric-item">
                        <span className="label">ESTIMATED RISK</span>
                        <span className="value">{(metrics.risk * 100).toFixed(2)}%</span>
                    </div>
                    <div className="metric-item highlight">
                        <span className="label">SHARPE RATIO</span>
                        <span className="value">{(-metrics.energy).toFixed(3)}</span>
                    </div>
                </div>

                <div className="chart-wrapper">
                    <ResponsiveContainer width="100%" height={250}>
                        <PieChart>
                            <Pie
                                data={data}
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={80}
                                paddingAngle={5}
                                dataKey="value"
                            >
                                {data.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke="none" />
                                ))}
                            </Pie>
                            <Tooltip
                                contentStyle={{ background: '#050510', border: '1px solid #00f3ff' }}
                                itemStyle={{ color: '#fff' }}
                                formatter={(value: number) => `${(value * 100).toFixed(1)}%`}
                            />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>

            <style>{`
        .results-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2rem;
          margin-top: 1.5rem;
        }

        @media (max-width: 768px) {
          .results-grid {
            grid-template-columns: 1fr;
          }
        }

        .metric-item {
          display: flex;
          justify-content: space-between;
          padding: 1rem;
          border-bottom: 1px solid var(--grid-color);
          margin-bottom: 0.5rem;
        }

        .metric-item.highlight {
          border: 1px solid var(--neon-green);
          background: rgba(10, 255, 10, 0.1);
          border-radius: 4px;
        }

        .label {
          color: var(--text-dim);
          font-size: 0.9rem;
        }

        .value {
          font-family: var(--font-mono);
          font-size: 1.2rem;
          color: var(--text-primary);
        }

        .highlight .value {
          color: var(--neon-green);
        }
      `}</style>
        </div>
    );
};

export default ResultsDisplay;
