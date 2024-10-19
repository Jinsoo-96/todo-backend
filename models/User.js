const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const jwt = require("jsonwebtoken");
require("dotenv").config();
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

const userSchema = Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

userSchema.methods.generateToken = function () {
  const token = jwt.sign({ _id: this.id }, JWT_SECRET_KEY, { expiresIn: "1d" });
  return token;
}; // mongoose 문서에 methods사용법 있음..!  그리고 jwt도 jwt문서에 사용법 있음!

userSchema.methods.toJSON = function () {
  const obj = this._doc;
  delete obj.password;
  return obj;
  // 특정 필드가 보이지 않도록 해줌.
  // toJSON은 generateToken과는 다르게 원래 정의 되어있는 함수.
  // json으로 보낼때 항상 사용되는 함수인데, 커스텀해서 보내지 않을 수 있다..(?)
};

const User = mongoose.model("User", userSchema);

module.exports = User;
