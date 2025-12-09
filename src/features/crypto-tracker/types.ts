
export interface Asset {
    id: string;          // CoinGecko ID (e.g., 'bitcoin')
    symbol: string;      // e.g., 'btc'
    name: string;        // e.g., 'Bitcoin'
    image: string;       // URL to icon
    current_price: number;
    price_change_percentage_24h: number;
    quantity: number;    // User held amount
    avg_buy_price?: number; // Optional: User's average buy price
}

export interface CoinSearchResult {
    id: string;
    name: string;
    symbol: string;
    thumb: string;
    large: string;
}
