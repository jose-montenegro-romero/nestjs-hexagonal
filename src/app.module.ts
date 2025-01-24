import { Module } from '@nestjs/common';
import { UserModule } from './lib/User/infrastructure/NestJs/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UserEntityTypeOrm } from './lib/User/infrastructure/TypeOrm/UserEntityTypeOrm';
import { ProductEntityTypeOrm } from './lib/Product/infrastructure/TypeOrm/ProductEntityTypeOrm';
import { ProductModule } from './lib/Product/infrastructure/Nestjs/product.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      entities: [
        UserEntityTypeOrm,
        ProductEntityTypeOrm
      ],
      synchronize: process.env.NODE_ENV === 'dev',
    }),
    UserModule,
    ProductModule,
  ],
})
export class AppModule { }
