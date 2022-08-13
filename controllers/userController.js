const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asynchandler = require("express-async-handler");
const User = require("../models/userModels");

//@desc   REGISTER users
//@routes POST /api/users
//@access Public
const registerUser = asynchandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(404);
    throw new Error("Please fill the fields");
  }

  //Check if the user exist
  const userExist = await User.findOne({ email, name });

  if (userExist) {
    res.status(400);
    throw new Error("Pick a new Username or email");
  }

  //Hash password
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);

  //create user
  const user = await User.create({
    name,
    email,
    password: hashPassword,
  });

  if (user) {
    res.status(200).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(404);
    throw new Error("Invalid data entry");
  }

  res.json({ message: "Register user" });
});

//@desc   AUTHENTICATE users
//@routes POST /api/users/login
//@access Public
const loginUser = asynchandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(404);
    throw new Error("Invalid data entry");
  }
  const user = await User.findOne({ email });
  //login
  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(404);
    throw new Error("Invalid email or password");
  }

  res.json({ message: "Login user" });
});

//@desc   GET users data
//@routes GET /api/users
//@access Private
const getUser = asynchandler(async (req, res) => {
  const { _id, name, email } = await User.findById(req.user.id);

  res.status(200).json({
    id: _id,
    name,
    email,
  });

  res.json({ message: "User data display" });
});

//Generate Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

module.exports = {
  getUser,
  loginUser,
  registerUser,
};
