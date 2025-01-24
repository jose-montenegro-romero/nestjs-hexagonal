export class Product {
    id: string;
    name: string;
    price: number;
    stock: number;
    description: string;
    image: string;

    constructor(
        id: string,
        name: string,
        price: number,
        stock: number,
        description: string,
        image: string
    ) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.stock = stock;
        this.description = description;
        this.image = image;
    }

    public toPlainObject() {
        return {
            id: this.id,
            name: this.name,
            price: this.price,
            stock: this.stock,
            description: this.description,
            image: this.image
        }
    }
}