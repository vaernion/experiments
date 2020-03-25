let worker;

function testWorker() {
  if (typeof Worker !== "undefined") {
    if (typeof worker == "undefined") {
      worker = new Worker("worker.js");
    }
    worker.onmessage = function(event) {
      document.getElementById("workerOutput").innerHTML = event.data;
    };
  } else {
    document.getElementById("workerOutput").innerHTML =
      "Web Workers are not supported in your browser";
  }
}
function terminateWorker() {
  worker.terminate();
  worker = undefined;
}

function testMainThread() {
  for (var i = 0; i < 200000; i++) {
    document.getElementById("mainThreadOutput").innerHTML =
      "Main Thread Counter: " + i;
  }
}
