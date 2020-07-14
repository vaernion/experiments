const apps = require("./steamAppList.json").applist.apps;

const args = process.argv.slice(2);

// options
// -all: filter
// -any: find includes
// otherewise find exact

const helpMessage = "usage: node findApp [-any/-all] 'app name'";
if (!args[0] || args[0] === "-h") return console.warn(helpMessage);

const findApp = (name) => {
  name = name.toLowerCase();
  if ((args[0] === "-all" && args[1]) || (args[1] && args[1] === "-all")) {
    return apps.filter((e) => e.name.toLowerCase().includes(name));
  } else if (
    (args[0] === "-any" && args[1]) ||
    (args[1] && args[1] === "-any")
  ) {
    return apps.find((e) => e.name.toLowerCase().includes(name));
  } else {
    return apps.find((e) => e.name.toLowerCase() === name);
  }
};

if (args[0] === "-any" || args[0] === "-all") {
  console.log(findApp(args[1]));
} else {
  console.log(findApp(args[0]));
}
