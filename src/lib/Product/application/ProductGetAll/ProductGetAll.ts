import { Product } from "../../domain/Product";
import { ProductRepository } from "../../domain/ProductRepository";

export class ProductGetAll {
    constructor(private repository: ProductRepository) { }
    async run(): Promise<Product[]> {
        return this.repository.getAll();
    }
}