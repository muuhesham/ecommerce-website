const jwt = require("jsonwebtoken");
const secretKey = "n8OxfoIKrX";

exports.createAccessToken = (data) => {
  return jwt.sign(data, secretKey, { expiresIn: "1h" });
};

exports.authMW = (req, res, next) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (token) {
      const verified = jwt.verify(token, secretKey);
      req.user = verified;
      next();
    } else {
      res.status(401).json({ error: "Access denied, token missing" });
    }
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
};

exports.isAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    return next(); 
  }
  res.status(403).json({ error: "Access denied, Admins only" }); 
};