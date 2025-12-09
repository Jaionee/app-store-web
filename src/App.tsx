import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import CryptoTracker from './pages/CryptoTracker';
import SubscriptionTracker from './pages/SubscriptionTracker';
import QuantumTrade from './pages/QuantumTrade';
import './index.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/crypto-tracker" element={<CryptoTracker />} />
        <Route path="/subscription-tracker" element={<SubscriptionTracker />} />
        <Route path="/quantum-trade" element={<QuantumTrade />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
