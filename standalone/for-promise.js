for (let i = 0; i < 10; i++) {
  let x = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(i);
    }, Math.floor(Math.random() * 1000));
  });

  x.then((y) => console.log(y));
}
