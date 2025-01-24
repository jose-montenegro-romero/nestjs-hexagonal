import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';

@Entity('products')
export class ProductEntityTypeOrm {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  price: number;

  @Column()
  stock: number;

  @Column()
  description: string;

  @Column()
  image: string;

  @CreateDateColumn()
  createdAt: Date;
}
