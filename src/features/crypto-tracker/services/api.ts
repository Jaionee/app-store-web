
import type { Asset, CoinSearchResult } from '../types';

const BASE_URL = 'https://api.coingecko.com/api/v3';

export const searchCoins = async (query: string): Promise<CoinSearchResult[]> => {
    if (!query) return [];
    try {
        const response = await fetch(`${BASE_URL}/search?query=${query}`);
        const data = await response.json();
        return data.coins || [];
    } catch (error) {
        console.error('Error searching coins:', error);
        return [];
    }
};

export const getMarketData = async (ids: string[]): Promise<Partial<Asset>[]> => {
    if (ids.length === 0) return [];
    try {
        const response = await fetch(
            `${BASE_URL}/coins/markets?vs_currency=usd&ids=${ids.join(',')}&order=market_cap_desc&per_page=100&page=1&sparkline=false`
        );
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching market data:', error);
        return [];
    }
};
