import { Body, Controller, Get, HttpStatus, Inject, NotFoundException, Param, Patch, Post, Res } from '@nestjs/common';
import { Create, FindOneParams, UpdateEnabled } from './validations';
import { ProductNotFoundError } from '../../domain/ProductNotFoundError';
import { ProductGetAll } from '../../application/ProductGetAll/ProductGetAll';
import { ProductGetOneById } from '../../application/ProductGetOneById/ProductGetOneById';
import { ProductCreate } from '../../application/ProductCreate/ProductCreate';
import { ProductSetEnabledById } from '../../application/ProductSetEnabledById/ProductSetEnabledById';
import { Product } from '../../domain/Product';
// External libraries
import { Response } from 'express';
import { v4 as uuidv4 } from 'uuid';

@Controller('product')
export class ProductController {

    constructor(
        @Inject('ProductGetAll') private readonly productGetAll: ProductGetAll,
        @Inject('ProductGetOneById') private readonly productGetOneById: ProductGetOneById,
        @Inject('ProductCreate') private readonly productCreate: ProductCreate,
        @Inject('ProductSetEnabledById') private readonly productSetEnabledById: ProductSetEnabledById,
    ) { }

    @Get()
    async getAll() {
        return (await this.productGetAll.run()).map((u: Product) => {
            return u.toPlainObject()
        });
    }

    @Get(':id')
    async getOneById(@Param() params: FindOneParams) {
        try {
            const product = await this.productGetOneById.run(params.id);
            return product.toPlainObject();
        } catch (error) {
            if (error instanceof ProductNotFoundError) {
                throw new NotFoundException("Product not found");
            }

            throw error;
        }
    }

    @Post()
    async create(@Body() body: Create, @Res() res: Response) {
        const product = await this.productCreate.run(
            uuidv4(),
            body.name,
            body.price,
            body.stock,
            body.description,
            body.image,
            body.enabled,
            new Date(),
        );
        res.status(HttpStatus.CREATED).json(product);
    }

    @Patch("enabled/:id")
    async updateEnabledById(@Param() params: FindOneParams, @Body() body: UpdateEnabled, @Res() res: Response) {
        try {
            const product = await this.productSetEnabledById.run(
                params.id,
                body.enabled
            );
            res.status(HttpStatus.FOUND).json(product.toPlainObject());
        } catch (error) {
            if (error instanceof ProductNotFoundError) {
                throw new NotFoundException("Product not found");
            }

            throw error;
        }
    }

}