
import { useState, useEffect, useRef } from 'react';
import AssetSelector from './components/AssetSelector';
import SimulationVisualizer from './components/SimulationVisualizer';
import ResultsDisplay from './components/ResultsDisplay';
import { generateMarketData, AssetData } from './utils/marketData';
import { simulatedAnnealing } from './utils/simulatedAnnealing';

function App() {
  console.log('App rendering...');
  const [allAssets] = useState<AssetData[]>(() => generateMarketData());
  const [selectedSymbols, setSelectedSymbols] = useState<string[]>(['BTC', 'ETH', 'SOL']);
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulationData, setSimulationData] = useState<{ step: number; energy: number; temperature: number }[]>([]);
  const [finalResult, setFinalResult] = useState<{ weights: number[]; metrics: any } | null>(null);

  const simulationRef = useRef<Generator | null>(null);
  const stepRef = useRef(0);

  const toggleAsset = (symbol: string) => {
    if (selectedSymbols.includes(symbol)) {
      setSelectedSymbols(prev => prev.filter(s => s !== symbol));
    } else {
      if (selectedSymbols.length < 5) {
        setSelectedSymbols(prev => [...prev, symbol]);
      } else {
        alert('Maximum 5 assets allowed for this demo.');
      }
    }
  };

  const startSimulation = () => {
    if (selectedSymbols.length < 2) {
      alert('Select at least 2 assets.');
      return;
    }

    setIsSimulating(true);
    setSimulationData([]);
    setFinalResult(null);
    stepRef.current = 0;

    const selectedAssetsData = allAssets.filter(a => selectedSymbols.includes(a.symbol));
    simulationRef.current = simulatedAnnealing(selectedAssetsData);
  };

  useEffect(() => {
    if (!isSimulating) return;

    const interval = setInterval(() => {
      if (!simulationRef.current) return;

      const { value, done } = simulationRef.current.next();

      if (done) {
        setIsSimulating(false);
        setFinalResult({
          weights: value.weights,
          metrics: { return: value.return, risk: value.risk, energy: value.energy }
        });
        clearInterval(interval);
      } else {
        stepRef.current += 1;
        // Update chart data every few steps to keep performance high
        if (stepRef.current % 5 === 0) {
          setSimulationData(prev => [
            ...prev.slice(-50), // Keep last 50 points for rolling effect
            { step: stepRef.current, energy: value.energy, temperature: value.temperature }
          ]);
        }
      }
    }, 10); // Fast simulation speed

    return () => clearInterval(interval);
  }, [isSimulating]);

  return (
    <div className="app-container">
      <header className="main-header">
        <h1>QUANTUM TRADE</h1>
        <div className="status-bar">
          <span>// SYSTEM STATUS: ONLINE</span>
          <span>// QUBITS: SIMULATED</span>
        </div>
      </header>

      <div className="main-grid">
        <div className="left-col">
          <AssetSelector
            assets={allAssets}
            selectedAssets={selectedSymbols}
            onToggle={toggleAsset}
          />

          <button
            className="btn-optimize"
            onClick={startSimulation}
            disabled={isSimulating}
          >
            {isSimulating ? 'ANNEALING...' : 'INITIATE OPTIMIZATION'}
          </button>
        </div>

        <div className="right-col">
          <SimulationVisualizer data={simulationData} isSimulating={isSimulating} />

          {finalResult && (
            <ResultsDisplay
              weights={finalResult.weights}
              assets={selectedSymbols}
              metrics={finalResult.metrics}
            />
          )}
        </div>
      </div>

      <style>{`
        .main-header {
          text-align: center;
          margin-bottom: 3rem;
          border-bottom: 1px solid var(--grid-color);
          padding-bottom: 1rem;
        }

        .status-bar {
          display: flex;
          justify-content: center;
          gap: 2rem;
          color: var(--neon-purple);
          font-family: var(--font-mono);
          font-size: 0.8rem;
        }

        .main-grid {
          display: grid;
          grid-template-columns: 300px 1fr;
          gap: 2rem;
        }

        @media (max-width: 900px) {
          .main-grid {
            grid-template-columns: 1fr;
          }
        }

        .btn-optimize {
          width: 100%;
          font-size: 1.1rem;
          font-weight: bold;
          margin-top: 1rem;
          background: rgba(0, 243, 255, 0.1);
        }

        .btn-optimize:hover:not(:disabled) {
          background: var(--neon-blue);
          color: black;
        }
      `}</style>
    </div>
  );
}

export default App;
