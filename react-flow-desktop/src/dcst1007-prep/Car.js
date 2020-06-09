// @flow

export class Car {
  _model: string;
  _year: number;

  constructor(model: string, year: number) {
    this.model = model;
    this.year = year;
  }
  get model() {
    return this._model;
  }
  set model(value: string) {
    if (value.length > 0) this._model = value;
    else console.log("invalid model: " + value);
  }
  get year() {
    return this._year;
  }
  set year(value: number) {
    if (Number(value) >= 1900) this._year = Number(value);
    else console.log("invalid year: " + value);
  }
  description(): string {
    return `The car is a ${this.year} ${this.model}`;
  }
}
