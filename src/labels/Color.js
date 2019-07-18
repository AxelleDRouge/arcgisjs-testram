export class Color {
  name;
  hexadecimal = '';

  constructor (name, hexadecimal) {
    Object.assign(this, { name, hexadecimal });
  }

  getHexaColor() {
    return this.hexadecimal;
  }

  getName() {
    return this.name;
  }
}
