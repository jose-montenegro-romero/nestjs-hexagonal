export class Product {
    id: string;
    name: string;
    price: number;
    stock: number;
    description: string;
    image: string;
    createdAt: Date;

    constructor(
        id: string,
        name: string,
        price: number,
        stock: number,
        description: string,
        image: string,
        createAt: Date
    ) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.stock = stock;
        this.description = description;
        this.image = image;
        this.createdAt = createAt;
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