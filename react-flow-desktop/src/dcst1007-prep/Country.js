// @flow

export class Country {
  name: string;
  area: number;
  population: number;
  domain: string;
  constructor(name: string, population: number, area: number, domain: string) {
    this.name = name;
    this.population = population;
    this.area = area;
    this.domain = domain;
  }
  density(): string {
    return (this.population / this.area).toFixed(2);
  }
  densityDescribed(): string {
    return `${this.density()} inhabitants per square km`;
  }
  summary(): string {
    return `${this.name} has ${this.population} inhabitants and an area of ${this.area} km^2`;
  }
  static domainToCountryName(domain: string, countries: Array<Country>): string {
    const topDomain = domain.split('.').reverse()[0];
    const result = countries.find((e) => e.domain === topDomain);
    return result ? result.name : '';
  }
}
