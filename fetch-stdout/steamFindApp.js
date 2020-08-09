const apps = require("./steamAppList.json").applist.apps;

const args = process.argv.slice(2);

// options (only use one)
// -all: filter includes
// -any: find includes
// -id: find by id
// otherwise find exact name

const helpMessage = "usage: steamFindApp [-any/-all] 'app name' | -id 'app id'";
if (!args[0] || args[0] === "-h") return console.warn(helpMessage);

const findApp = (name) => {
  name = name.toLowerCase();
  if ((args[0] === "-all" && args[1]) || args[1] === "-all") {
    return apps.filter((e) => e.name.toLowerCase().includes(name));
  } else if ((args[0] === "-any" && args[1]) || args[1] === "-any") {
    return apps.find((e) => e.name.toLowerCase().includes(name));
  } else if ((args[0] === "-id" && args[1]) || (args[1] && args[1] === "-id")) {
    return apps.find((e) => e.appid === Number(name));
  } else {
    return apps.find((e) => e.name.toLowerCase() === name);
  }
};

if (args[0] === "-any" || args[0] === "-all" || args[0] === "-id") {
  console.log(findApp(args[1]));
} else {
  console.log(findApp(args[0]));
}
