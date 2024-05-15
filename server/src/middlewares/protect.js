const jwt = require("jsonwebtoken");

const authenticateJWT = (req, res, next) => {
  const token = req.cookies.jwt || (req.header("Authorization") && req.header("Authorization").replace("Bearer ", ""));

  if (!token) {
    return res.status(401).send({
      message: "Authentication failed: No token provided.",
    });
  }

  jwt.verify(token, process.env.secretKey, (err, user) => {
    if (err) {
      return res.status(403).send({
        message: "Authentication failed: Invalid token.",
      });
    }
    req.user = user;
    
    next();
  });
};

module.exports = {authenticateJWT};
