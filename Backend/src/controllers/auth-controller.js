const { JWT_TOKEN, JWT_EXPIRE_IN } = require("../config");
const { createResponseObject } = require("../utility");
const Users = require("../models/Users");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// const fetchFromPythonServer = async (email) => {
//   fetch("https://pythonserver.com/api/check-email-quality", {
//     method: "POST",
//     body: JSON.stringify({ email }),
//     headers: {
//       "Content-Type": "application/json",
//     },
//   });
// };

class AuthenticationController {
  login = async (req, res) => {
    const { email, password } = req.body;

    // check email quality from python server;
    // const res = await fetchFromPythonServer(email);

    if (!email || !password)
      return res.status(400).json("All Fields are required1");

    // const isUser = users.find((user) => user.email === email);
    const isUser = await Users.findOne({ email: email });

    if (!isUser) return res.status(404).json("Register yourself!");

    // compare hash with password
    const isPasswordMatch = await bcrypt.compare(password, isUser.password);

    if (!isPasswordMatch) return res.status(400).json("Password not matched!");

    // token generation
    const payload = { email, id: isUser._id, role: isUser.role };
    const token = jwt.sign(payload, JWT_TOKEN, {
      expiresIn: JWT_EXPIRE_IN,
    });

    // delete password and id
    const user = {
      email: email,
      firstName: isUser.firstName,
      lastName: isUser.lastName,
      contactNumber: isUser.contactNumber,
    };

    return res
      .status(200)
      .json({ message: "Login successful!", user: user, token });
  };

  loginWithAdmin = async (req, res) => {
    const { email, password } = req.body;

    // check email quality from python server;
    // const res = await fetchFromPythonServer(email);

    if (!email || !password)
      return res.status(400).json("All Fields are required1");

    // const isUser = users.find((user) => user.email === email);
    const isUser = await Users.findOne({ email: email });

    if (!isUser) return res.status(404).json("Register yourself!");

    // if (isUser.role !== "admin")
    //   return res
    //     .status(403)
    //     .json(
    //       createResponseObject(false, "Only admins can login from here!", null)
    // );

    // compare hash with password
    const isPasswordMatch = await bcrypt.compare(password, isUser.password);

    if (!isPasswordMatch) return res.status(400).json("Password not matched!");

    // token generation
    const payload = { email, id: isUser._id, role: isUser.role };
    const token = jwt.sign(payload, JWT_TOKEN, {
      expiresIn: JWT_EXPIRE_IN,
    });

    // delete password and id
    const user = {
      email: email,
      firstName: isUser.firstName,
      lastName: isUser.lastName,
      contactNumber: isUser.contactNumber,
      role: isUser.role,
    };

    return res
      .status(200)
      .json({ message: "Login successful!", user: user, token });
  };

  register = async (req, res) => {
    const { firstName, lastName, email, contactNumber, password } = req.body;
    if (!firstName || !lastName || !email || !contactNumber || !password)
      return res.status(400).json("All Fields are required!");

    // const isEmailAlready = users.find((user) => user.email === email);
    const isEmailAlready = await Users.findOne({ email: email });
    if (isEmailAlready) return res.status(400).json("Email is already taken!");

    const isPhoneAlready = await Users.findOne({
      contactNumber: contactNumber,
    });
    if (isPhoneAlready) return res.status(400).json("Phone is already taken!");

    // 1. hash the password
    const SALT_ROUNDS = 10;
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    const user = await Users.create({
      firstName,
      lastName,
      email,
      contactNumber,
      role: "user",
      password: hashedPassword,
    });

    return res.status(201).json({ name: "User created successfully!", user });
  };
}

module.exports = AuthenticationController;
