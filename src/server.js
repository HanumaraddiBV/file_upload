const app = require("./index");
require("dotenv").config()
const connect = require("./configs/db");
const port = process.env.PORT || 2000;
app.listen(port, async () => {
  try {
    await connect();
    console.log(`Listening port ${port}`);
  } catch (e) {
    console.log("e:", e);
  }
});
