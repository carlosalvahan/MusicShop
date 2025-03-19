export interface Instrument {
    id: number;
    type: string;
    price: number;
    name: string;
    stocks: number;
    imageUrl?: string;
    details: string;
}