// @flow

import React from "react";
import { Car } from "./Car";

export function App() {
  let toyota = new Car("toyota awesome", 1800);
  console.log(toyota);
  let honda = new Car("honda", 1900);
  console.log(honda);
  let tesla = new Car("Tesla Model S", 2015);
  console.log(tesla);

  return (
    <>
      <h1>car class</h1>
      {toyota.description()}
      <br />
      {honda.description()}
      <br />
      {tesla.description()}
    </>
  );
}
