const userModel = require("../Models/user.model");
const hash = require("../Util/hash");
const auth = require("../Util/auth");
const { body, validationResult } = require("express-validator");

exports.register = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  let { name, email, password , isAdmin } = req.body;
  try {
    let user = await userModel.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: "User already exists" });
    }

    const hashPassword = await hash.hashPassword(password);
    password = hashPassword;

    user = await userModel.create({ name, email, password: hashPassword , isAdmin});
    res.status(200).json({ msg: `User registered successfully`, user });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

exports.login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { email, password } = req.body;
  try {
    let user = await userModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: "User not found" });
    }

    const isMatch = await hash.isMatch(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Password doesn't match" });
    } else {
      const token = auth.createAccessToken({
        userId: user.id,
        isAdmin: user.isAdmin,
      });
      return res.status(200).json({ token });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

exports.logout = (req, res) => {
   try {
    // TODO: IN FRONTEND WILL MAKE LOGOUT 
     res.status(200).json({ message: "Logged out successfully" });
   } catch (err) {
     res.status(500).json({ error: err.message });
   }
}

exports.getTotalUsers = async (req, res) => {
  try {
    const count = await userModel.countDocuments();
    res.json({ count });
  } catch (err) {
    res.status(500).send("Server Error");
  }
};