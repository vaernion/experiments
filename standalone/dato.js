class MyDate extends Date {
  constructor() {
    super();
  }
  showDate() {
    let mnd = [
      "jan",
      "feb",
      "mars",
      "april",
      "mai",
      "juni",
      "juli",
      "aug",
      "sept",
      "okt",
      "nov",
      "des",
    ];
    return (
      this.getDate() + ". " + mnd[this.getMonth()] + " " + this.getFullYear()
    );
  }
}

let norskDato = new MyDate();
console.log(norskDato.showDate());
