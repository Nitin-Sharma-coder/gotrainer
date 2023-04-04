const mongoose = require("mongoose");
const brcypt = require("bcrypt");
const validator = require("validator");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

//static signup method
userSchema.statics.signup = async function (email, password) {
  //validation
  if (!email || !password) {
    throw Error("All fields must be filled");
  }

  if (!validator.isEmail(email)) {
    throw Error("Invalid Email");
  }
  if (!validator.isStrongPassword(password)) {
    throw Error("Password not Strong Enough");
  }

  const exists = await this.findOne({ email });

  if (exists) {
    throw Error("Email Already Exists");
  }

  const salt = await brcypt.genSalt(10);
  const hash = await brcypt.hash(password, salt);

  const user = await this.create({ email, password: hash });

  return user;
};

//static login method
userSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw Error("All fields must be filled");
  }

  const user = await this.findOne({ email });

  if (!user) {
    throw Error("Incorrect Email");
  }

  const match = await brcypt.compare(password, user.password);
  if (!match) {
    throw Error("Password Incorrect");
  }
  return user;
};

module.exports = mongoose.model("User", userSchema);
