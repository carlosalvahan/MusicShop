export class Instrument {
    id: number;
    type: string;
    price: number;
    name: string;
    stocks: number;
    imageUrl?: string;
    detail: string;

    constructor(mapped: any) {
        const {id, type, price, name, stocks, imageUrl, detail} = mapped;
        this.id = id || 0;
        this.type = type || '';
        this.price = price || 0;
        this.name = name || '';
        this.stocks = stocks || 0;
        this.imageUrl = imageUrl || '';
        this.detail = detail || '';
    }
}