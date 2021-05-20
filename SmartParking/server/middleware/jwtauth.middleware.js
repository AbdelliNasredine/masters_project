const jwt = require("jsonwebtoken");
const config = require("../config");

function authenticateJwt(req, res, next) {
  const authorizationHeader = req.headers.authorization;

  if (authorizationHeader) {
    const token = authorizationHeader.split(" ")[1];
    try {
      const decoded = jwt.verify(token, config.auth.tokenSecret);
      req.auth = decoded;
      next();
    } catch (e) {
      res.sendStatus(403);
    }
  } else {
    res.sendStatus(401);
  }
}

module.exports = authenticateJwt;
