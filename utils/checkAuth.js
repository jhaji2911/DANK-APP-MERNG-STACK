const { AuthenticationError } = require("apollo-server");
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../config");

module.exports = (context) => {
  const auth = context.req.headers.authorization;

  if (auth) {
    const token = auth.split("Bearer ")[1];
    if (token) {
      try {
        let user = jwt.verify(token, SECRET_KEY);
        return user;
      } catch (err) {
        throw new AuthenticationError("invalid token");
      }
    }
    throw new Error("please put  in the   'Bearer [token]");
  }
  throw new Error("incorrect way of  placing tokens");
};
