export class Theme {
  name: string;
  id?: number;

  constructor(name: string, id?: number) {
    this.name = name;
    this.id = id;
  }
}
