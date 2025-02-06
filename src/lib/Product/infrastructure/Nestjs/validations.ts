import { IsBoolean, IsEmail, IsNumber, IsString, Length } from 'class-validator';

export class FindOneParams {
  @IsString()
  @Length(5, 255)
  id: string;
}

export class Create {

  @IsString()
  name: string;

  @IsNumber()
  price: number;

  @IsNumber()
  stock: number;

  @IsString()
  description: string;

  @IsString()
  image: string;

  @IsBoolean()
  enabled: boolean;
}

export class UpdateEnabled {
  @IsBoolean()
  enabled: boolean;
}