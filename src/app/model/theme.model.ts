import {ModelInterface} from './interface/model.interface';

export class Theme implements ModelInterface {
  name: string;
  id?: number;

  constructor(name: string, id?: number) {
    this.name = name;
    this.id = id;
  }
}
