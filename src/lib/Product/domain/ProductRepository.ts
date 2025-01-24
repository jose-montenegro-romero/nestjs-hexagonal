import { Product } from "./Product";

export interface ProductRepository {
    create(product: Product): Promise<Product>;
    getAll(): Promise<Product[]>;
    getOneById(id: string): Promise<Product | null>;
}