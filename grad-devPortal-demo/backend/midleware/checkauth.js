const jwt = require("jsonwebtoken");
const express = require("express");
// checkAuth = express();
checkAuth.use((req, res, next) => {
  try {
    const token = req.headers.auhtoriization.split(" ")[1];
    jwt.verify(token, "secret_this_should_be_longer");
    console.log(token);

    next();
  } catch (error) {
    res.status(401).json({ message: "You are not authenticated" });
  }
});

module.exports = checkAuth;
