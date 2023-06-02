import { Injectable } from '@nestjs/common';
import { CreateCoffeeInput } from './dto/creaate-coffee.input/create-coffee.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Coffee } from './entities/coffee.entity/coffee.entity';
import { Repository } from 'typeorm';
import { UserInputError } from 'apollo-server-express';
import { UpdateCoffeeInput } from './dto/creaate-coffee.input/update-coffee.input';
import { Flavor } from './entities/flavor.entity/flavor.entity';

@Injectable()
export class CoffeesService {
  constructor(
    @InjectRepository(Flavor)
    private readonly flavorRepositoy: Repository<Flavor>,
    @InjectRepository(Coffee)
    private readonly coffeeRepositoy: Repository<Coffee>,
  ) {}
  async findAll() {
    return this.coffeeRepositoy.find();
  }
  async findOne(id: number) {
    const coffee = await this.coffeeRepositoy.findOne({ where: { id } });
    if (!coffee) {
      throw new UserInputError('No coffee');
    }
    return coffee;
  }
  async create(createCoffeeInput: CreateCoffeeInput) {
    const flavors = await Promise.all(
      createCoffeeInput.flavors.map((name) => this.preloadFlavorByName(name)),
    );
    const newCoffee = this.coffeeRepositoy.create({
      ...createCoffeeInput,
      flavors,
    });
    return this.coffeeRepositoy.save(newCoffee);
  }
  async update(id: number, updateCoffeeInput: UpdateCoffeeInput) {
    const flavors = await Promise.all(
      updateCoffeeInput.flavors.map((name) => this.preloadFlavorByName(name)),
    );
    const coffee = await this.coffeeRepositoy.preload({
      id,
      ...updateCoffeeInput,
      flavors,
    });
    if (!coffee) {
      throw new UserInputError('no coffee update');
    }
    return this.coffeeRepositoy.save(coffee);
    // const newCoffee = this.coffeeRepositoy.create(updateCoffeeInput);
    // return this.coffeeRepositoy.save(newCoffee);
  }
  async remove(id: number) {
    const coffee = await this.coffeeRepositoy.findOneBy({ id });
    return this.coffeeRepositoy.remove(coffee);
  }
  private async preloadFlavorByName(name: string): Promise<Flavor> {
    const existingFlavor = await this.flavorRepositoy.findOneBy({ name });
    if (existingFlavor) {
      return existingFlavor;
    }
    return this.flavorRepositoy.create({ name });
  }
}
