import {ModelInterface} from './interface/model.interface';

export class ProductLine implements ModelInterface {
  id?: number;
  name: string;

  constructor(name: string, id?: number) {
    this.name = name;
    this.id = id;
  }
}
