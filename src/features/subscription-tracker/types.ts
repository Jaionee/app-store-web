
export interface Subscription {
    id: string;
    name: string;
    price: number;
    currency: string;
    billingCycle: 'monthly' | 'yearly';
    nextPaymentDate: string; // ISO date string YYYY-MM-DD
    category: string;
    color: string;
}

export const CATEGORIES = [
    { name: 'Entertainment', color: '#ef4444' }, // Red
    { name: 'Utilities', color: '#eab308' },     // Yellow
    { name: 'Work', color: '#3b82f6' },          // Blue
    { name: 'Personal', color: '#22c55e' },      // Green
    { name: 'Other', color: '#94a3b8' }          // Gray
];
