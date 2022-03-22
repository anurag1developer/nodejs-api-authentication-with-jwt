const jwt = require("jsonwebtoken");

function authorization(req, res, next) {
  const loginToken = req.header("auth-token");
  const ownerToken = jwt.sign(
    { _id: req.params.userId },
    process.env.TOKEN_SECRET
  );
  const loginTokenVerified = jwt.verify(loginToken, process.env.TOKEN_SECRET);
  const ownerTokenVerified = jwt.verify(ownerToken, process.env.TOKEN_SECRET);

  if (loginTokenVerified._id !== ownerTokenVerified._id) {
    return res.status(401).send("Access Denied");
  }
  next();
}

module.exports = authorization;
