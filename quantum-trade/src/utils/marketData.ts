
export interface AssetData {
    symbol: string;
    name: string;
    returns: number[]; // Daily returns for simulation
    meanReturn: number;
    volatility: number;
}

const ASSETS = [
    { symbol: 'BTC', name: 'Bitcoin', mean: 0.002, vol: 0.04 },
    { symbol: 'ETH', name: 'Ethereum', mean: 0.0025, vol: 0.05 },
    { symbol: 'SOL', name: 'Solana', mean: 0.003, vol: 0.07 },
    { symbol: 'ADA', name: 'Cardano', mean: 0.0015, vol: 0.06 },
    { symbol: 'XRP', name: 'Ripple', mean: 0.001, vol: 0.05 },
    { symbol: 'DOT', name: 'Polkadot', mean: 0.002, vol: 0.065 },
    { symbol: 'DOGE', name: 'Dogecoin', mean: 0.004, vol: 0.09 },
    { symbol: 'USDT', name: 'Tether', mean: 0.0001, vol: 0.001 },
];

// Generate synthetic daily returns using Geometric Brownian Motion approximation
export const generateMarketData = (days: number = 365): AssetData[] => {
    return ASSETS.map(asset => {
        const returns: number[] = [];
        for (let i = 0; i < days; i++) {
            // Random normal distribution (Box-Muller transform)
            const u = 1 - Math.random();
            const v = Math.random();
            const z = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);

            const dailyReturn = asset.mean + asset.vol * z;
            returns.push(dailyReturn);
        }
        return {
            symbol: asset.symbol,
            name: asset.name,
            returns,
            meanReturn: asset.mean,
            volatility: asset.vol
        };
    });
};
