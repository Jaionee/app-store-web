
import { AssetData } from './marketData';

export interface PortfolioState {
    weights: number[]; // Must sum to 1
    energy: number;    // Negative Sharpe Ratio (we want to minimize Energy = maximize Sharpe)
    return: number;
    risk: number;
}

// Calculate portfolio metrics
const calculateMetrics = (weights: number[], assets: AssetData[]) => {
    let portfolioReturn = 0;
    let portfolioVariance = 0;

    // Expected Return
    weights.forEach((w, i) => {
        portfolioReturn += w * assets[i].meanReturn * 252; // Annualized
    });

    // Portfolio Risk (Simplified Covariance)
    // Assuming correlation of 0.5 between all crypto assets for simplicity in this demo
    // Variance = sum(w_i^2 * sigma_i^2) + sum(w_i * w_j * cov_ij)
    for (let i = 0; i < weights.length; i++) {
        for (let j = 0; j < weights.length; j++) {
            const cov = i === j
                ? Math.pow(assets[i].volatility, 2)
                : assets[i].volatility * assets[j].volatility * 0.5; // Correlation 0.5

            portfolioVariance += weights[i] * weights[j] * cov;
        }
    }

    const portfolioRisk = Math.sqrt(portfolioVariance * 252); // Annualized
    const sharpeRatio = (portfolioReturn - 0.02) / portfolioRisk; // Risk-free rate 2%

    return {
        return: portfolioReturn,
        risk: portfolioRisk,
        energy: -sharpeRatio // We minimize energy, so negative Sharpe
    };
};

// Generate a neighbor state by slightly perturbing weights
const getNeighbor = (currentWeights: number[]): number[] => {
    const n = currentWeights.length;
    const newWeights = [...currentWeights];

    // Pick two random assets to swap some weight
    const i = Math.floor(Math.random() * n);
    const j = Math.floor(Math.random() * n);

    const amount = (Math.random() - 0.5) * 0.1; // Shift up to 5%

    newWeights[i] -= amount;
    newWeights[j] += amount;

    // Normalize to ensure sum is 1 and no negative weights
    let sum = 0;
    for (let k = 0; k < n; k++) {
        newWeights[k] = Math.max(0, newWeights[k]);
        sum += newWeights[k];
    }
    return newWeights.map(w => w / sum);
};

// Generator function to yield states for visualization
export function* simulatedAnnealing(assets: AssetData[]) {
    const n = assets.length;
    // Initial random weights
    let currentWeights = new Array(n).fill(1 / n);
    let currentMetrics = calculateMetrics(currentWeights, assets);

    let bestWeights = [...currentWeights];
    let bestEnergy = currentMetrics.energy;

    let temperature = 1.0;
    const coolingRate = 0.99;
    const minTemperature = 0.01;

    while (temperature > minTemperature) {
        const neighborWeights = getNeighbor(currentWeights);
        const neighborMetrics = calculateMetrics(neighborWeights, assets);

        // Acceptance probability
        const deltaEnergy = neighborMetrics.energy - currentMetrics.energy;

        // If better (lower energy), accept. If worse, accept with probability exp(-delta/T)
        if (deltaEnergy < 0 || Math.random() < Math.exp(-deltaEnergy / temperature)) {
            currentWeights = neighborWeights;
            currentMetrics = neighborMetrics;

            if (currentMetrics.energy < bestEnergy) {
                bestEnergy = currentMetrics.energy;
                bestWeights = [...currentWeights];
            }
        }

        // Yield current state for visualization
        yield {
            weights: currentWeights,
            energy: currentMetrics.energy,
            return: currentMetrics.return,
            risk: currentMetrics.risk,
            temperature
        };

        temperature *= coolingRate;
    }

    // Final yield with best result
    const finalMetrics = calculateMetrics(bestWeights, assets);
    return {
        weights: bestWeights,
        energy: finalMetrics.energy,
        return: finalMetrics.return,
        risk: finalMetrics.risk,
        temperature: 0
    };
}
