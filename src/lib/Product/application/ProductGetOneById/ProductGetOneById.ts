import { ProductRepository } from "../../domain/ProductRepository";

export class ProductGetOneById {
    constructor(private repository: ProductRepository) { }
    async run(
        id: string
    ) {
        return this.repository.getOneById(id);
    }
}