import { ApiProperty } from '@nestjs/swagger';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('users')
export class User {
  @ApiProperty({
    example: 'cd533345-f1f3-48c9-a62e-7dc2da50c8f8',
    description: 'user ID',
    uniqueItems: true,
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    example: 'testing@gmail.com',
    description: 'user email',
    uniqueItems: true,
  })
  @Column('text', {
    unique: true,
  })
  email: string;

  @ApiProperty({
    example: 'tdsadSASDSADXASDs',
    description: 'password',
    nullable: false,
  })
  @Column('text', {
    select: false,
  })
  password: string;

  @ApiProperty({
    example: 'John Doe',
    description: 'Name',
    nullable: false,
  })
  @Column('text')
  fullName: string;

  @ApiProperty({
    description: 'User Active',
    default: true,
  })
  @Column('bool', {
    default: true,
  })
  isActive: true;

  @ApiProperty({
    description: 'User Rol',
    default: ['user'],
  })
  @Column('text', {
    array: true,
    default: ['user'],
  })
  roles: string[];
}
