import { ObjectType, ID, Field } from '@nestjs/graphql';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Flavor } from '../flavor.entity/flavor.entity';
@Entity()
@ObjectType({ description: 'Coffee Module' })
export class Coffee {
  @PrimaryGeneratedColumn()
  @Field(() => ID, { description: 'A Unique identifer' })
  id: number;
  @Column()
  name: string;
  @Column()
  brand: string;
  @JoinTable()
  @ManyToMany((type) => Flavor, (flavor) => flavor.coffees, { cascade: true })
  flavors?: Flavor[];
}
