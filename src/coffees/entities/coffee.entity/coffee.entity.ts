import { ObjectType, ID, Field } from '@nestjs/graphql';
@ObjectType({ description: 'Coffee Module' })
export class Coffee {
  @Field(() => ID, { description: 'A Unique identifer' })
  id: number;
  name: string;
  brand: string;
  flavors: string[];
}
