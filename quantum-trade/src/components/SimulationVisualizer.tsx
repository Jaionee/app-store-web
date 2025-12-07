
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

interface SimulationVisualizerProps {
    data: { step: number; energy: number; temperature: number }[];
    isSimulating: boolean;
}

const SimulationVisualizer = ({ data, isSimulating }: SimulationVisualizerProps) => {
    return (
        <div className="panel visualizer">
            <div className="header">
                <h3>// QUANTUM ANNEALING PROCESS</h3>
                {isSimulating && <span className="status-blink">PROCESSING...</span>}
            </div>

            <div className="chart-container">
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={data}>
                        <XAxis dataKey="step" hide />
                        <YAxis domain={['auto', 'auto']} hide />
                        <Tooltip
                            contentStyle={{ background: '#050510', border: '1px solid #00f3ff' }}
                            itemStyle={{ color: '#00f3ff' }}
                            labelStyle={{ color: '#8080a0' }}
                        />
                        <Line
                            type="monotone"
                            dataKey="energy"
                            stroke="#bc13fe"
                            strokeWidth={2}
                            dot={false}
                            animationDuration={0}
                        />
                    </LineChart>
                </ResponsiveContainer>
                <div className="overlay-text">
                    SYSTEM ENERGY (MINIMIZING RISK)
                </div>
            </div>

            <style>{`
        .visualizer {
          margin-bottom: 2rem;
        }

        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
        }

        .status-blink {
          color: var(--neon-green);
          animation: blink 1s infinite;
        }

        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }

        .chart-container {
          position: relative;
          background: rgba(0, 0, 0, 0.2);
          border: 1px dashed var(--grid-color);
          padding: 1rem;
        }

        .overlay-text {
          position: absolute;
          bottom: 10px;
          right: 10px;
          font-size: 0.7rem;
          color: var(--text-dim);
          pointer-events: none;
        }
      `}</style>
        </div>
    );
};

export default SimulationVisualizer;
