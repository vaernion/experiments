// @flow

import * as React from "react";
import ReactDOM from "react-dom";

// Ingrediens
class Product {
  name: string; // Navn
  measurementUnit: string; // Måleenhet
  countInStorage: number; // Mengde på lager
  purchase: number; // Innkjøpspris
  expiryDate: ?Date; // Holdbarhetsdato

  constructor(
    name: string,
    measurementUnit: string,
    countInStorage: number,
    purchase: number,
    expiryDate?: Date
  ) {
    this.name = name;
    this.measurementUnit = measurementUnit;
    this.countInStorage = countInStorage;
    this.purchase = purchase;
    this.expiryDate = expiryDate;
  }

  toString() {
    return (
      "Det er " +
      this.countInStorage +
      " " +
      this.measurementUnit +
      " " +
      this.name +
      " på lager" +
      (this.expiryDate
        ? " med holdbarhet til " + this.expiryDate.toString()
        : "")
    );
  }

  // Utsalgspris
  retail() {
    return this.purchase * 1.25;
  }
}

let flour = new Product("mel", "kg", 15, 200, new Date("Jun 15 2014"));
let water = new Product("vann", "l", 10, 100);

let root = document.getElementById("root");
if (root)
  ReactDOM.render(
    <div>
      <div>
        Mel:<div>{flour.toString()}</div>
        <div>Innkjøpspris: {flour.purchase}</div>
        <div>Utsalgspris: {flour.retail()}</div>
      </div>
      <div>
        Vann:<div>{water.toString()}</div>
        <div>Innkjøpspris: {water.purchase}</div>
        <div>Utsalgspris: {water.retail()}</div>
      </div>
    </div>,
    root
  );
