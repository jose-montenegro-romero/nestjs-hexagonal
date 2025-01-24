import { InjectRepository } from "@nestjs/typeorm";
import { Product } from "../../domain/Product";
import { ProductRepository } from "../../domain/ProductRepository";
import { ProductEntityTypeOrm } from "./ProductEntityTypeOrm";
import { Repository } from "typeorm/repository/Repository";

export class ProductRepositoryTypeOrm implements ProductRepository {

    constructor(
        @InjectRepository(ProductEntityTypeOrm)
        private readonly repository: Repository<ProductEntityTypeOrm>,
    ) { }

    private EntityToDomain(u: ProductEntityTypeOrm) {
        return new Product(
            u.id,
            u.name,
            u.price,
            u.stock,
            u.description,
            u.image,
            u.createdAt,
        );
    }

    async getAll(): Promise<Product[]> {
        const products = await this.repository.find();

        return products.map((product) => this.EntityToDomain(product));
    }

    async create(product: Product): Promise<Product> {
        const productSave = await this.repository.save({
            id: product.id,
            name: product.name,
            price: product.price,
            stock: product.stock,
            description: product.description,
            image: product.image,
            createdAt: product.createdAt,
        });
        console.log("productSave:", productSave);
        return this.EntityToDomain(productSave);

    }

    async getOneById(id: string): Promise<Product | null> {
        const product = await this.repository.findOne({
            where: {
                id: id,
            },
        });

        if (!product) return null;

        return this.EntityToDomain(product);
    }

}