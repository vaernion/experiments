const fetch = require("node-fetch");

const args = process.argv.slice(2);

// node.exe fstd.js "url" > abc.json
//    or to get applist
// node.exe fstd.js -a > abc.json
//    or to get appdetails
// node.exe fstd.js -d "appid" > abc.json
//    for help
// node fstd || node fstd -h

// app list
// https://api.steampowered.com/ISteamApps/GetAppList/v2/
// app details
// http://store.steampowered.com/api/appdetails?appids={APP_ID}

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

const helpMessage = "usage: node.exe fstd ['url'/-sl/-sd 'appid']";

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
