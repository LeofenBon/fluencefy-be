const server = require("./app");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

const sequelizeInstance = require("./db");

sequelizeInstance
  .authenticate()
  .then(() => {
    console.log("Connected to db");
  })
  .catch((err) => {
    console.log(err);
  });

const port = process.env.PORT || 4000;

server.listen(port, () => {
  console.log(
    `server started at port ${port} at `,
    new Date().toLocaleTimeString()
  );
});
