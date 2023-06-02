import { Resolver, Query, ID, Args, Mutation } from '@nestjs/graphql';
import { Coffee } from './entities/coffee.entity/coffee.entity';
import { ParseIntPipe } from '@nestjs/common';
import { CreateCoffeeInput } from './dto/creaate-coffee.input/create-coffee.input';
import { CoffeesService } from './coffees.service';
import { UpdateCoffeeInput } from './dto/creaate-coffee.input/update-coffee.input';

@Resolver()
export class CoffeesResolver {
  constructor(private readonly coffeeService: CoffeesService) {}
  @Query(() => [Coffee], { name: 'coffees' })
  async findAll() {
    return [];
  }
  @Query(() => Coffee, { name: 'coffee' })
  async findOne(@Args('id', { type: () => ID }, ParseIntPipe) id: number) {
    return this.coffeeService.findOne(id);
  }

  @Mutation(() => Coffee, { name: 'createCoffee' })
  async create(
    @Args('createCoffeeInput') createCoffeeInput: CreateCoffeeInput,
  ) {
    return this.coffeeService.create(createCoffeeInput);
  }
  @Mutation(() => Coffee, { name: 'updateCoffee' })
  async update(
    @Args('id', ParseIntPipe) id: number,
    @Args('updateCoffeeInput') updateCoffeeInput: UpdateCoffeeInput,
  ) {
    return this.coffeeService.update(id, updateCoffeeInput);
  }
  @Mutation(() => Coffee, { name: 'removeCoffee' })
  async remove(@Args('id', ParseIntPipe) id: number) {
    return this.coffeeService.remove(id);
  }
}
