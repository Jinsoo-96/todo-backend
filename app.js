const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const indexRouter = require("./routes/index");
require("dotenv").config();

const app = express();
const MONGODB_URI_PROD = process.env.MONGODB_URI_PROD;
console.log("mongoouri", MONGODB_URI_PROD);
app.use(cors());
app.use(bodyParser.json());
app.use("/api", indexRouter); // api 주소가 불필요 할 수 있지만 명확하게 구분하는 것에 도움이 됨.

const mongoURI = MONGODB_URI_PROD;

mongoose
  .connect(mongoURI)
  .then(() => {
    console.log("mongoose connected");
  })
  .catch((err) => {
    console.log("DB connection fail", err);
  }); //try catch

app.listen(9999, () => {
  console.log("server on 9999");
}); // connect(mongoURI, { useNewUrlParser: true })
// useNewUrlParser 옵션이 더 이상 필요 없다는 경고 메시지를 받고 있는 것 같아.
// MongoDB Node.js 드라이버 4.0.0 이후로 이 옵션은 기본값으로 설정되어 있으니 삭제해도 돼.
