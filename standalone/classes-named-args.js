class Plane {
  static unitsBuilt = 0;
  speed = 0;

  constructor({ maxSpeed = 666, accelPerSec = 10, type = "" }) {
    this._maxSpeed =
      typeof maxSpeed === "number" && !isNaN(maxSpeed) ? maxSpeed : 0;
    this.accelPerSec =
      typeof accelPerSec === "number" && !isNaN(accelPerSec) ? accelPerSec : 0;
    this.type = String(type);
    Plane.planeBuilt();
  }
  get maxSpeed() {
    return this._maxSpeed;
  }
  set maxSpeed(x) {
    this._maxSpeed = x;
  }
  accelerate(seconds) {
    let newSpeed = this.speed;
    for (let i = 0; i < seconds; i++) {
      newSpeed += this.accelPerSec * (1 - newSpeed / this.maxSpeed);
    }
    this.speed =
      newSpeed < this.maxSpeed ? Number(newSpeed.toFixed(2)) : this.maxSpeed;
  }

  static planeBuilt() {
    this.unitsBuilt++;
  }
}

let test1 = new Plane({ maxSpeed: 500, accelPerSec: 15, type: "Boing" });
let test2 = new Plane({ maxSpeed: 400, accelPerSec: 5, type: "Azera" });
let test3 = new Plane({ maxSpeed: 700, type: "Dongh" });
let test4 = new Plane({
  maxSpeed: false,
  accelPerSec: NaN,
  type: { true: true },
});
let test5 = new Plane(test1);

test1.accelerate(30);
test2.accelerate(20);
test3.accelerate(20);

console.log(test1);
console.log(test2);
console.log(test3);
console.log(test4);
console.log(test5);

console.log("built", Plane.unitsBuilt);
