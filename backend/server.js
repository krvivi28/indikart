const app = require("./app");
const dotenv = require("dotenv");
const chalk = require("chalk");
const connectDb = require("./config/db");

// Uncaught Exception Error
process.on("uncaughtException", (err) => {
  console.log(chalk.bgRedBright(`Error:${err.message}`));
  console.log(
    chalk.bgYellowBright(`shutting down the server due to uncaught server`)
  );
  process.exit(1);
});

// config
dotenv.config({ path: "backend/config/config.env" });
// db connection
connectDb();

const server = app.listen(process.env.PORT, () => {
  console.log(
    chalk.bgGreenBright(`server is running on localhost ${process.env.PORT}`)
  );
});

// Unhandled Promise Rejection
process.on("unhandledRejection", (err) => {
  console.log(chalk.bgRedBright(`Error:${err.message}`));
  console.log(
    chalk.bgYellowBright(`shutting down the server due to uhandled promise`)
  );
  server.close(() => {
    process.exit(1);
  });
});
