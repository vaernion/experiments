const fetch = require("node-fetch");

// node.exe instead of node because some windows specific issue
// https://stackoverflow.com/questions/45890339/stdout-is-not-a-tty-using-bash-for-node-tape-tap-spec

// USAGE
// node.exe fstd.js "url" > abc.json
//    or to get Steam applist
// node.exe fstd.js -sl > steamAppList.json
//    or to get Steam appdetails
// node.exe fstd.js -sd "appid" > steamapp.json
//    for help
// node fstd || node fstd -h

const args = process.argv.slice(2);

const urlStorage = {
  appList: "https://api.steampowered.com/ISteamApps/GetAppList/v2/",
  appDetails: "https://store.steampowered.com/api/appdetails?appids=",
};

const url = (() => {
  switch (args[0]) {
    case "-h":
      return null;
    case "-sl": // steam appList
      return urlStorage.appList;
    case "-sd": // steam appDetails
      return urlStorage.appDetails + args[1];
    default:
      return args[0];
  }
})();

// console.warn("args:", args, "url:", url);

const helpMessage = "usage: fstd ['url'/-sl/-sd 'appid']";

if (!url || url === "-h" || (args[0] === "-sd" && !args[1])) {
  return console.warn(helpMessage);
}

const getJson = async (path) => {
  try {
    const res = await fetch(path);
    const json = await res.json();
    const stringified = JSON.stringify(json, null, 2);
    writeOutput(stringified);
  } catch (err) {
    console.error(err);
  }
};

const writeOutput = (string) => {
  console.log(string);
};

getJson(url);
