import { Body, Controller, Get, HttpStatus, Inject, NotFoundException, Param, Post, Res } from '@nestjs/common';
import { Create, FindOneParams } from './validations';
import { ProductNotFoundError } from '../../domain/ProductNotFoundError';
import { ProductGetAll } from '../../application/ProductGetAll/ProductGetAll';
import { ProductGetOneById } from '../../application/ProductGetOneById/ProductGetOneById';
import { ProductCreate } from '../../application/ProductCreate/ProductCreate';
import { Response } from 'express';
// External libraries
import { v4 as uuidv4 } from 'uuid';

@Controller('product')
export class ProductController {

    constructor(
        @Inject('ProductGetAll') private readonly productGetAll: ProductGetAll,
        @Inject('ProductGetOneById') private readonly productGetOneById: ProductGetOneById,
        @Inject('ProductCreate') private readonly productCreate: ProductCreate,
    ) { }

    @Get()
    async getAll() {
        return (await this.productGetAll.run()).map((u) => u.toPlainObject());
    }

    @Get(':id')
    async getOneById(@Param() params: FindOneParams) {
        try {
            return (await this.productGetOneById.run(params.id)).toPlainObject();
        } catch (error) {
            if (error instanceof ProductNotFoundError) {
                throw new NotFoundException();
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
            new Date(),
        );
        res.status(HttpStatus.CREATED).json(product);
    }

}