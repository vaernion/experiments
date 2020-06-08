// @flow

import React from 'react';
import { Car } from './Car';
import { Country } from './Country';
// import { scoreService } from service.js

export function App() {
  let toyota = new Car('toyota awesome', 1800);
  console.log(toyota);
  let honda = new Car('honda', 1900);
  console.log(honda);
  let tesla = new Car('Tesla Model S', 2015);
  console.log(tesla);

  const countries = [
    new Country('Norway', 5320045, 323802, 'no'),
    new Country('Sweden', 9960487, 450295, 'se'),
    new Country('Russia', 142257519, 17098242, 'ru'),
    new Country('China', 1379302771, 9596960, 'cn'),
  ];

  const countryName = Country.domainToCountryName('cdn2.this.that.fancyname.cn', countries);
  const country = countries.find((e) => e.name === countryName);
  const countryDensity = country ? country.densityDescribed() : '';

  const scores = [
    { id: 0, name: 'abc', score: 12345 },
    { id: 1, name: 'fasfasf', score: 214214 },
    { id: 2, name: 'taatweqeqwe', score: 99999 },
  ];

  return (
    <>
      {toyota.description()}
      <br />
      {honda.description()}
      <br />
      {tesla.description()}
      <br />
      <br />
      {countries.map((country) => (
        <div key={country.domain}>{country.summary()}</div>
      ))}
      <br />
      {countryName} {countryDensity}
      <br />
      <br />
      <table>
        <tbody>
          <tr>
            <th>Spiller</th>
            <th>Poeng</th>
            <th />
          </tr>
          {scores.map((score) => (
            <tr key={score.id}>
              <td>{score.name}</td>
              <td>{score.score}</td>
              <td>
                <button
                  onClick={() => {
                    console.log(score.id, score.score);
                    // scoreService.updateScore(score.id, score.score + 1, () => {
                    //   this.updateScores();
                    // });
                  }}
                >
                  +
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
