const User = require("../models/User");
const bcrypt = require("bcrypt");

const saltRounds = 10; // 10 정도로 설정

const userController = {};

// 회원 가입 기능
userController.createUser = async (req, res) => {
  try {
    const { email, name, password } = req.body;
    const user = await User.findOne({ email }); // {email: email} 인데, 자바스크립트 심플문법?이 있다고 함.
    if (user) {
      throw new Error("이미 가입이 된 유저 입니다.");
    }
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(password, salt);
    const newUser = new User({ email, name, password: hash });
    await newUser.save();
    res.status(200).json({ status: "success" });
  } catch (error) {
    res.status(400).json({ status: "fail", error });
  }
};

// 로그인기능
userController.loginWithEmail = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }, "-createdAt -updatedAt -__v");
    if (user) {
      const isMatch = bcrypt.compareSync(password, user.password);
      if (isMatch) {
        const token = user.generateToken();
        return res.status(200).json({ status: "success", user, token });
      }
    } else {
      throw new Error("아이디 또는 비밀번호가 일치하지 않습니다.");
    }
  } catch (error) {
    res.status(400).json({ status: "fail", error });
  }
};

// 회원 탈퇴 기능
userController.deleteUser = async (req, res) => {
  try {
    const { email } = req.body; // 이메일을 통해 유저를 찾음

    const user = await User.findOneAndDelete({ email });

    if (!user) {
      return res.status(404).json({ message: "유저를 찾을 수 없습니다." });
    }

    res.status(200).json({ message: "회원 탈퇴가 완료되었습니다." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "서버 에러" });
  }
};

module.exports = userController;
