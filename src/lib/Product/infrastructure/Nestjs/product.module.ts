import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntityTypeOrm } from '../TypeOrm/ProductEntityTypeOrm';
import { ProductController } from './product.controller';
import { ProductRepositoryTypeOrm } from '../TypeOrm/ProductRepositoryTypeOrm';
import { ProductGetAll } from '../../application/ProductGetAll/ProductGetAll';
import { ProductGetOneById } from '../../application/ProductGetOneById/ProductGetOneById';
import { ProductCreate } from '../../application/ProductCreate/ProductCreate';

@Module({
    imports: [TypeOrmModule.forFeature([ProductEntityTypeOrm])],
    controllers: [ProductController],
    providers: [
        {
            provide: 'ProductRepository',
            useClass: ProductRepositoryTypeOrm,
        },
        {
            provide: 'ProductGetAll',
            useFactory: (repository: ProductRepositoryTypeOrm) =>
                new ProductGetAll(repository),
            inject: ['ProductRepository'],
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
    ],
})
export class ProductModule { }
