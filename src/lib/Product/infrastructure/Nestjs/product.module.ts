import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntityTypeOrm } from '../TypeOrm/ProductEntityTypeOrm';
import { ProductController } from './product.controller';
import { ProductRepositoryTypeOrm } from '../TypeOrm/ProductRepositoryTypeOrm';
import { ProductGetAll } from '../../application/ProductGetAll/ProductGetAll';
import { ProductGetOneById } from '../../application/ProductGetOneById/ProductGetOneById';
import { ProductCreate } from '../../application/ProductCreate/ProductCreate';
import { ProductSetEnabledById } from '../../application/ProductSetEnabledById/ProductSetEnabledById';
import { ProductDynamoRepository } from '../dynamodb/productDynamo.repository';

@Module({
    imports: [TypeOrmModule.forFeature([ProductEntityTypeOrm])],
    controllers: [ProductController],
    providers: [
        {
            provide: 'ProductRepository',
            useClass: ProductRepositoryTypeOrm,
        },
        {
            provide: 'ProductRepositoryDynamoDB',
            useClass: ProductDynamoRepository,
        },
        {
            provide: 'ProductGetAll',
            useFactory: (repository: ProductDynamoRepository) =>
                new ProductGetAll(repository),
            inject: ['ProductRepositoryDynamoDB'],
        },
        {
            provide: 'ProductGetOneById',
            useFactory: (repository: ProductRepositoryTypeOrm) =>
                new ProductGetOneById(repository),
            inject: ['ProductRepository'],
        },
        {
            provide: 'ProductCreate',
            useFactory: (repository: ProductRepositoryTypeOrm) =>
                new ProductCreate(repository),
            inject: ['ProductRepository'],
        },
        {
            provide: 'ProductSetEnabledById',
            useFactory: (repository: ProductRepositoryTypeOrm) =>
                new ProductSetEnabledById(repository),
            inject: ['ProductRepository'],
        },
    ],
})
export class ProductModule { }
