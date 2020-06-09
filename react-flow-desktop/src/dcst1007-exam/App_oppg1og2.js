// @flow

import React from 'react';

export function App() {
  // oppg1

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

  // oppg2

  class Piece {
    x: string;
    y: number;
    color: string;

    constructor(x: string, y: number, isWhite: boolean) {
      this.x = x.toUpperCase();
      this.y = y;
      this.color = isWhite ? 'white' : 'black';
    }
  }

  class Pawn extends Piece {
    type: string = 'Pawn';
  }
  class King extends Piece {
    type: string = 'King';
  }
  class Queen extends Piece {
    type: string = 'Queen';
  }
  class Rook extends Piece {
    type: string = 'Rook';
  }
  class Bishop extends Piece {
    type: string = 'Bishop';
  }
  class Knight extends Piece {
    type: string = 'Knight';
  }

  let whitePieces: Piece[] = [
    new King('e', 1, true),
    new Queen('d', 1, true),
    new Rook('a', 1, true),
    new Rook('h', 1, true),
    new Bishop('c', 1, true),
    new Bishop('f', 1, true),
    new Knight('b', 1, true),
    new Knight('g', 1, true),
  ];

  let blackPieces: Piece[] = [
    new King('e', 8, false),
    new Queen('d', 8, false),
    new Rook('a', 8, false),
    new Rook('h', 8, false),
    new Bishop('c', 8, false),
    new Bishop('f', 8, false),
    new Knight('b', 8, false),
    new Knight('g', 8, false),
  ];

  const columns = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
  for (let i = 0; i < 8; i++) {
    whitePieces.push(new Pawn(columns[i], 2, true));
    blackPieces.push(new Pawn(columns[i], 7, false));
  }

  console.log(whitePieces);
  console.log(blackPieces);

  return <>{customCircle.getDescription()}</>;
}
