import { DynamoDBClient, ScanCommand } from "@aws-sdk/client-dynamodb";
import { ProductRepository } from "../../domain/ProductRepository";
import { Product } from "../../domain/Product";


export class ProductDynamoRepository implements ProductRepository {
    private readonly tableName: string = "products";
    private readonly dynamoDB: DynamoDBClient;

    constructor() {
        this.dynamoDB = new DynamoDBClient({
            region: "us-east-1",
            endpoint: "http://localhost:4566"
        });
    }

    private EntityToDomain(u: any) {
        return new Product(
            u.id.S,
            u.name.S,
            u.price.N,
            u.stock?.N,
            u.description.S,
            u.image?.S,
            u.enabled?.BOOL,
            u.createdAt?.S,
        );
    }

    create(product: Product): Promise<Product> {
        throw new Error("Method not implemented.");
    }

    async getAll(): Promise<Product[]> {
        const products: any = [];

        const command = new ScanCommand({
            TableName: this.tableName
        });

        const response = await this.dynamoDB.send(command);

        if (response.Items) {
            response.Items.forEach((product: any) => {
                products.push(this.EntityToDomain(product));
            });

        };

        console.log("Convert Data Dynamo db", products);

        return products;
    }

    getOneById(id: string): Promise<Product | null> {
        throw new Error("Method not implemented.");
    }

    setEnabledById(id: string, enabled: boolean): Promise<Product | null> {
        throw new Error("Method not implemented.");
    }
}