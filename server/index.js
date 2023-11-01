const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { r_router } = require("./routes/ratingRouter.js");
const { u_router } = require("./routes/userRouter.js");
const { b_router } = require("./routes/brandRouter.js");
const { t_router } = require("./routes/typeRouter.js");
const { d_router } = require("./routes/deviceRouter.js");
const { bk_router } = require("./routes/basketRouter.js");
const errorHandler = require("./middleware/ErrorHandlingMiddleware.js");
const path = require("path");
const fileUpload = require("express-fileupload");
dotenv.config();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.resolve(__dirname, "static")));
app.use(fileUpload({}));
app.use(cookieParser());
app.use(cors());

app.get("/", (req, res) => {
  res.status(200).json({ message: "server working!!!" });
});

app.listen(process.env.PORT, () => {
  console.log(`run on port ${process.env.PORT}`);
});

app.use("/api/user", u_router);
app.use("/api/brand", b_router);
app.use("/api/device", d_router);
app.use("/api/type", t_router);
app.use("/api/basket", bk_router);
app.use("/api/rating", r_router);
app.use(errorHandler);

// app.use(express.static(path.join(__dirname, "/client/build")));
// app.get("*", (req, res) => {
//   res.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
// });
