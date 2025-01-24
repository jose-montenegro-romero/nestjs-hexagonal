import { Product } from "../../domain/Product";
import { ProductRepository } from "../../domain/ProductRepository";

export class ProductCreate {

    constructor(private repository: ProductRepository) { }

    async run(
        id: string,
        name: string,
        price: number,
        stock: number,
        description: string,
        image: string,
        createAt: Date
    ): Promise<Product> {
        const product = new Product(
            id,
            name,
            price,
            stock,
            description,
            image,
            createAt
        );

        return this.repository.create(product);
    }
}