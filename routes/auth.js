const router = require("express").Router();
const User = require("../model/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const verify = require("./verifyToken");
const authorization = require("./authorization");

// Validation
const { loginValidation, registerValidation } = require("../validation");

router.post("/register", async (req, res) => {
  // Lets validate the data before we make a user

  // Validation from validation.js
  const { error } = registerValidation(req.body);
  // res.send(error);
  if (error) return res.status(400).send(error.details[0].message);

  // Checking if the user is already in the database
  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist) return res.status(400).send("Email already exists");

  // const contactExist = await User.findOne({ contact1: req.body.contact1 });
  // if (contactExist) return res.status(400).send("Contact already exist!");

  // Hash the password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  // Contact Validation
  const contactValidation = (contact) => {
    if (!contact) {
      return false;
    }
    if (contact.toString().length !== 10) {
      // console.log(contact);
      return "10digit";
    }
    if (
      contact.toString()[0] != 9 &&
      contact.toString()[0] != 8 &&
      contact.toString()[0] != 7 &&
      contact.toString()[0] != 6
    ) {
      return "9876";
    }
  };
  const c1 = contactValidation(req.body.contact1);
  const c2 = contactValidation(req.body.contact2);
  const c3 = contactValidation(req.body.contact3);

  if (c1 === "10digit" || c2 === "10digit" || c3 === "10digit") {
    return res.status(406).send("Phone number can only be of 10 digits");
  }
  if (c1 === "9876" || c2 === "9876" || c3 === "9876") {
    return res
      .status(406)
      .send("Phone number can only start with 9, 8, 7 or 6");
  }

  // Create a new user
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
    contact1: req.body.contact1,
    contact2: req.body.contact2,
    contact3: req.body.contact3,
  });
  try {
    // JWT
    // Create and assign a token
    const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
    // user.tokens.push(token);
    const savedUser = await user.save();
    res
      .header("auth-token", token)
      .json({ savedUser: savedUser, token: token });
  } catch (err) {
    res.status(400).send(err);
  }
});

// Login
router.post("/login", async (req, res) => {
  // Let's validate the data
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // Check if the user is already in the database or not
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Email or password is wrong");
  // Password is correct
  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass) return res.status(400).send("Invalid password or email ");

  // res.send("Logged in!");

  // JWT
  // Create and assign a token
  const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
  // await user.tokens.push(token);
  await user.save();
  res.header("auth-token", token).json({ success: "Logged In!", user: user });
});

router.post("/logout", verify, async (req, res) => {
  // try {
  const user = await User.findOne({ _id: req.body.userId });
  if (!user) return res.status(400).send("User not found");

  const ownerToken = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
  const loginToken = req.header("auth-token");

  const loginTokenVerified = jwt.verify(loginToken, process.env.TOKEN_SECRET);
  const ownerTokenVerified = jwt.verify(ownerToken, process.env.TOKEN_SECRET);

  if (loginTokenVerified._id !== ownerTokenVerified._id) {
    return res.status(401).send("Access Denied");
  }

  res.removeHeader("auth-token");
  const isToken = req.header("auth-token");
  res.json({ tokenStillExist: isToken });
  // } catch (err) {
  //   res.status(500).json(err);
  // }
});

module.exports = router;
