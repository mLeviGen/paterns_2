const DISCOUNT_MAP = {
    food: (p) => p * 0.9,       
    electronics: (p) => p * 1.2, 
    default: (p) => p
};

export class Order {
    constructor(items, customer) {
        this.items = items;
        this.customer = customer;
    }

    calculateTotal() {
        return this.items.reduce((total, item) => {
            const strategy = DISCOUNT_MAP[item.type] || DISCOUNT_MAP.default;
            return total + strategy(item.price);
        }, 0);
    }

    printReceipt() {
        console.log(`--- Чек для: ${this.customer} ---`);
        this.items.forEach(item => console.log(`${item.name}: ${item.price} грн`));
        console.log(`Разом: ${this.calculateTotal().toFixed(2)} грн`);
    }
}