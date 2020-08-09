class Husdyr {
  constructor(navn) {
    this.navn = navn;
  }
  get navn() {
    return this._navn;
  }
  set navn(navn) {
    this._navn = navn;
  }
  snakk() {
    return this.navn + " lager en lyd";
  }
}
class Hund extends Husdyr {
  snakk() {
    return " bjeffer";
  }
}
class Rottweiler extends Hund {
  snakk() {
    return " er en hunderase og" + super.snakk();
  }
}
class Katt extends Husdyr {
  snakk() {
    return "katten " + this.navn + " mjauer";
  }
}
let hest = new Husdyr("hest");
let fido = new Hund("fido");
let rott = new Rottweiler("rott");
let pus = new Katt("pus");

console.log(
  hest.snakk() +
    "\n" +
    fido.navn +
    fido.snakk() +
    "\n" +
    pus.navn +
    pus.snakk() +
    "\n" +
    rott.navn +
    rott.snakk()
);
