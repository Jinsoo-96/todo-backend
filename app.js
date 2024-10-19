const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const indexRouter = require("./routes/index");
require("dotenv").config();

const app = express();
const MONGODB_URI_PROD = process.env.MONGODB_URI_PROD;
console.log("mongoouri", MONGODB_URI_PROD);

app.use(
  cors({
    origin: "*", // 모든 도메인 허용
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
  })
);
app.use(bodyParser.json());
app.use("/api", indexRouter); // api 주소를 명확하게 구분하는 것이 좋음. 주소 앞에 api가 붙음

const mongoURI = MONGODB_URI_PROD;

mongoose
  .connect(mongoURI)
  .then(() => {
    console.log("mongoose connected");
  })
  .catch((err) => {
    console.log("DB connection fail", err);
  });

// Heroku가 제공하는 PORT 환경 변수를 사용해야 함 // 없을땐 http://localhost:9999주소 사용가능
const PORT = process.env.PORT || 9999;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// 1. 회원가입
// 유저가 이메일, 패스워드. 유저이름 입력해서 보냄
// 받은 정보를 저장함 (데이터베이스 모델필요)
// 패스워드를 암호화 시켜서 저장
