const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();
const mongoose_url = process.env.URL;
mongoose.connect(mongoose_url);
app.listen(process.env.PORT, () => {
  console.log("listening");
});
app.use(express.json());
const User = mongoose.model("Users", {
  name: String,
  email: String,
  password: String,
});

app.post("/signup", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const name = req.body.name;

  const existingUser = await User.findOne({ email: username });

  const user = new User({
    name: name,
    email: username,
    password: password,
  });
  user.save();
  res.send("data sent");
});
