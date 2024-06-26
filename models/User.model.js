const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");
const SALT_ROUNDS = 10;

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const userSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: [true, "Username is required"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
});

userSchema.pre("save", function (next) {
  if (this.isModified("password")) {
    bcrypt
    .hash(this.password, SALT_ROUNDS)
    .then((hash) => {
      this.password = hash;
      next();
    })
    .catch((error) => next(error));
  } else{
    next();
  }
});

userSchema.methods.checkPassword = function (paswwordToCheck) {
  return bcrypt.compare(paswwordToCheck, this.password);
};

const User = model("User", userSchema);

module.exports = User;
