const fetch = require("node-fetch");

const steamAppDetails = "http://store.steampowered.com/api/appdetails?appids=";

// export
const getApp = async (id) => {
  const url = steamAppDetails + id;

  try {
    const res = await fetch(url);
    const json = await res.json();
    const stringified = await JSON.stringify(json, null, 2);
    return stringified;
    return json;
  } catch (err) {
    console.error(err);
  }
};

console.log(getApp(500));
