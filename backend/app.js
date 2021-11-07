const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const { verifyToken } = require("./middlewares/verifyToken");

require("dotenv").config();
app.use(cors()); // to allow cross origin resource sharing
mongoose.connect(
  `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_MONGO_URL}/${process.env.DB_NAME}`,
  { useNewUrlParser: true, useUnifiedTopology: true }
);

const db = mongoose.connection;
db.on("connection", (stream) => {
  console.log(`Connected to MongoDB at ${stream.host}`);
  console.log("connected to database");
});
db.on("error", console.error.bind(console, "connection error:"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//TODO: Add an auth middleware
//!ROUTES
const postsRoute = require("./routes/posts");
app.use("/posts", [verifyToken, postsRoute]); //Middlewre for posts routing

const authRoute = require("./routes/auth");
app.use("/auth", authRoute); //Middlewre for users routing

//!Run server on port 8000
app.listen(8000, () => {
  console.log("Server is running on port 8000");
});
