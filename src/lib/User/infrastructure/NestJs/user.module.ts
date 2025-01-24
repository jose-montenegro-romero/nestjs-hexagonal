import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserGetAll } from '../../application/UserGetAll/UserGetAll';
import { UserRepositoryTypeOrm } from '../TypeOrm/UserRepositoryTypeOrm';
import { UserGetOneById } from '../../application/UserGetOneById/UserGetOneById';
import { UserCreate } from '../../application/UserCreate/UserCreate';
import { UserEdit } from '../../application/UserEdit/UserEdit';
import { UserDelete } from '../../application/UserDelete/UserDelete';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntityTypeOrm } from '../TypeOrm/UserEntityTypeOrm';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntityTypeOrm])],
  controllers: [UserController],
  providers: [
    {
      provide: 'UserRepository',
      useClass: UserRepositoryTypeOrm,
    },
    {
      provide: 'UserGetAll',
      useFactory: (repository: UserRepositoryTypeOrm) =>
        new UserGetAll(repository),
      inject: ['UserRepository'],
    },
    {
      provide: 'UserGetOneById',
      useFactory: (repository: UserRepositoryTypeOrm) =>
        new UserGetOneById(repository),
      inject: ['UserRepository'],
    },
    {
      provide: 'UserCreate',
      useFactory: (repository: UserRepositoryTypeOrm) =>
        new UserCreate(repository),
      inject: ['UserRepository'],
    },
    {
      provide: 'UserEdit',
      useFactory: (repository: UserRepositoryTypeOrm) =>
        new UserEdit(repository),
      inject: ['UserRepository'],
    },
    {
      provide: 'UserDelete',
      useFactory: (repository: UserRepositoryTypeOrm) =>
        new UserDelete(repository),
      inject: ['UserRepository'],
    },
  ],
})
export class UserModule {}
