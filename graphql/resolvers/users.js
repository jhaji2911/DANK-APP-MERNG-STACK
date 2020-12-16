const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { UserInputError } = require("apollo-server");

const User = require("../../models/User");
const { SECRET_KEY } = require("../../config");
const {
  validationRegisters,
  loginValidator,
} = require("../../utils/validtors");

function userTokenGenerator(user) {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      username: user.username,
    },
    SECRET_KEY,
    { expiresIn: "1h" }
  );
}

module.exports = {
  Mutation: {
    async login(_, { username, password }) {
      const { errors, valid } = loginValidator(username, password);
      if (!valid) {
        throw new UserInputError("fields cannot be empty", { errors });
      }
      const user = await User.findOne({ username });
      if (!user) {
        errors.general = "user not found!";
        throw new UserInputError("user not found!", { errors });
      }

      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        errors.general = "Invalid password!";
        throw new UserInputError("invalid password", { errors });
      }

      const token = userTokenGenerator(user);
      return {
        ...user._doc,
        id: user._id,
        token,
      };
    },
    async register(
      _,
      { registerInput: { username, email, password, confirmPassword } } // we have to provide four arguments to it but here we don't have any parent so we will use _
    ) {
      const { valid, errors } = validationRegisters(
        username,
        email,
        password,
        confirmPassword
      );
      if (!valid) {
        throw new UserInputError("Errors", { errors });
      }

      const user = await User.findOne({ username });
      if (user) {
        throw new UserInputError("username already exits", {
          errors: {
            username: "this username is already taken!",
          },
        });
      }

      password = await bcrypt.hash(password, 12);

      const newUser = new User({
        email,
        username,
        password,
        createdAt: new Date().toISOString(),
      });

      const res = await newUser.save();

      const token = userTokenGenerator(res);
      return {
        ...res._doc,
        id: res._id,
        token,
      };
    },
  },
};
