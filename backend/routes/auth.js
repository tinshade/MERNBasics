const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const {
  registerValidation,
  loginValidation,
} = require("../middlewares/validation");

router.post("/register", async (req, res) => {
  const { error } = registerValidation(res.body);
  if (error) return res.status(400).json(error.details[0].message);

  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist) return res.status(400).json({ data: "Email already exists" });

  const usernameExist = await User.findOne({ username: req.body.username });
  if (usernameExist)
    return res.status(400).json({ data: "Username already exists" });

  const salt = await bcrypt.genSalt(10);
  const hash_password = await bcrypt.hash(req.body.password, salt);

  const new_user = new User({
    username: req.body.username,
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    password: hash_password,
  });
  try {
    const response = await new_user.save();
    res.status(201).json({ data: response._id });
  } catch (err) {
    res.status(400).json({ data: err });
  }
});

router.post("/login", async (req, res) => {
  //TODO: Allow login with username
  //TODO: Make tokens refreshable
  const { error } = loginValidation(res.body);
  if (error) return res.status(400).json(error.details[0].message);
  try {
    const emailExist = await User.findOne({ email: req.body.email });
    if (!emailExist)
      return res.status(400).json({ data: "Invalid credentials" });

    const validPass = await bcrypt.compare(
      req.body.password,
      emailExist.password
    );
    if (!validPass)
      return res.status(400).json({ data: "Invalid credentials" });

    const token = jwt.sign({ _id: emailExist._id }, process.env.TOKEN_SECRET);
    res.header("Authorization", token).json({ data: token });

    return res.status(200).json({ data: "Login success" });
  } catch (err) {
    console.log(err);
    res.status(401).json({ data: err });
  }
});
module.exports = router;
