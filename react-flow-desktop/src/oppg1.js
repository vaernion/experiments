// @flow

// A. Lag JavaScript-kode for klassen Sirkel.
// Klassen Sirkel skal inneholde to private variabler - radius og farge. Defaultverdien for radius er 1 og defaultverdien for farge er "red".
// Klassen skal ha to konstruktører - en som ikke tar argumenter og en som tar en valgfri radius større enn 0 som argument.
// Klassen skal ha tre offentlige metoder - en som returnerer radiusen til sirkelen, en som returnerer arealet til sirkelen og en som returnerer omkretsen til sirkelen.

// B. Lag kode som oppretter to objekter ved hjelp av klassen Sirkel.
// Opprett den første sirkelen med defaultverdier. Den andre sirkelen skal ha radius 2.
// Skriv ut informasjon om de to sirklene til konsoll eller webside, f.eks. "Sirkelen har en radius på 2, et areal på 12,56 og en omkrets på 12,56". Svarene i utskriften bør rundes av til to desimaler.

// C. Lag JavaScript-kode for klassen Kube.
// Klassen Kube skal inneholde en privat variabel - side.
// Klassen skal ha en konstruktør som tar et sirkelobjekt som argument.

// A.

class Circle {
  radius: number;
  color: string = 'red';

  constructor(radius?: number = 1) {
    // if a circle is created with invalid radius
    // it will default to 1 instead of failing
    this.radius = radius > 0 ? radius : 1;
  }

  getRadius(): number {
    return this.radius;
  }
  getArea(): number {
    return this.radius * this.radius * Math.PI;
  }
  getCircumference(): number {
    return this.radius * 2 * Math.PI;
  }
  getDescription(): string {
    return `The circle has a radius of ${this.getRadius().toFixed(
      2
    )}, an area of ${this.getArea().toFixed(
      2
    )} and an circumference of ${this.getCircumference().toFixed(2)}`;
  }
}

// B.

const defaultCircle = new Circle();
const customCircle = new Circle(2);

console.log(defaultCircle.getDescription());
console.log(customCircle.getDescription());

// C.
// I'm assuming the circle should fit inside the cube

class Cube {
  side: number;
  constructor(circle: Circle) {
    this.side = circle.getRadius() * 2;
  }
}

console.log(new Cube(customCircle));
