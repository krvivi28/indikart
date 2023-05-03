const mongoose = require("mongoose");
const chalk = require("chalk");
const connectDb = async () => {
  try {
    const data = await mongoose.connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(
      chalk.bgBlueBright
        .underline`connection successfull with ${data.connection.host}`
    );
  } catch (error) {
    console.log(error);
  }
};
module.exports = connectDb;
