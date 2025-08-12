const User = require("../models/auth-model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  const { name, email, password } = req.body;
  let errors = [];
  if (!name) errors.push({ field: name, message: "name is required" });
  if (!email) errors.push({ field: email, message: "email is required" });
  if (!password) errors.push({ field: password, message: "password is required" });
  if (errors.length > 0) return res.status(404).json(errors);

  try {
    const emailExists = await User.ifEmailExists(email);
    if (emailExists)
      return res.status(400).json({ message: "Email is already registered." });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    try {
      await User.createUser(name, email, hashedPassword);
    } catch (error) {
      console.log(error);
    }

    res.status(201).json({ message: "User has been created successfully." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ message: "Email and password required" });

  try {
    const user = await User.ifEmailExists(email); // returns first user or undefined
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user.id, email: user.email }, "secretkey", { expiresIn: "1h" });

    res
      .cookie("token", token, {
        httpOnly: true,
        sameSite: "lax",
        maxAge: 1000 * 60 * 60 // 1 hour
      })
      .status(200)
      .json({ message: "Login successful" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { register, login };
