const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
  try {
    const authHeader = req.header("Authorization");

    if (!authHeader) {
      return res.status(401).send("Please provide an Authorization header...");
    } 
    const decoded = jwt.verify(authHeader, process.env.SECRET_KEY);
    if (decoded.role !== 'admin') {
      return res.status(401).send("Unauthorized: Only admins are allowed to perform this action.");
  }  
    req.email = decoded.username;
    next();
  } catch (error) {
    res.status(401).send({ error: "Authentication failed" });
  }
};
module.exports = auth;


