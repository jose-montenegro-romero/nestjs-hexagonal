import { ProductNotFoundError } from "../../domain/ProductNotFoundError";
import { ProductRepository } from "../../domain/ProductRepository";

export class ProductSetEnabledById {
    constructor(private repository: ProductRepository) { }
    async run(
        id: string,
        enabled: boolean
    ) {
        const product = await this.repository.setEnabledById(id, enabled);

        if (!product) throw new ProductNotFoundError('Product not found'); // retorna 404
        
        return product;
    }
}