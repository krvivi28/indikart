const express = require("express");
const cookieParser = require("cookie-parser");
const errorMiddleware = require("./middleware/error");
const app = express();
app.use(express.json());
app.use(cookieParser());

// import routes
const productRoute = require("./routes/productRoute");
const userRoute = require("./routes/userRoute");
app.use("/api/v1", productRoute);
app.use("/api/v1", userRoute);
// error middleware
app.use(errorMiddleware);

module.exports = app;
