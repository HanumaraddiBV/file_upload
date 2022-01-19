const app = require("./index");

const connect = require("./configs/db");

app.listen(2233, async () => {
  try {
    await connect();
    console.log("Listening port 2233");
  } catch (e) {
    console.log("e:", e);
  }
});
