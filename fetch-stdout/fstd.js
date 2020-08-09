const fetch = require("node-fetch");

const args = process.argv.slice(2);

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

const URL = {
  appList: "https://api.steampowered.com/ISteamApps/GetAppList/v2/",
  appDetails: "http://store.steampowered.com/api/appdetails?appids=",
};

const url = (() => {
  switch (args[0]) {
    case "-h":
      return;
    case "-sl": // steam appList
      return URL.appList;
    case "-sd": // steam appDetails
      return URL.appDetails + args[1];
    default:
      return args[0];
  }
})();

console.warn("args:", args, "url:", url);

const helpMessage = "usage: fstd ['url'/-sl/-sd 'appid']";

if (!url || url === "-h" || (args[0] === "-sd" && !args[1])) {
  return console.warn(helpMessage);
}

const getJson = async (path) => {
  try {
    const res = await fetch(path);
    const json = await res.json();
    const stringified = await JSON.stringify(json, null, 2);
    writeOutput(stringified);
    return json;
  } catch (err) {
    console.error(err);
  }
};

const writeOutput = (string) => {
  console.log(string);
};

getJson(url);
