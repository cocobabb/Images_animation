// server/index.js
const express = require("express");
const cors = require("cors");
require("dotenv").config();

// express 서버 포트 설정
const app = express();
const port = process.env.PORT || 5000;

// express에 cors혀용, json 허용
app.use(cors());
app.use(express.json());

// 요청 경로와 라우터 매핑
// 라우팅 설정(Spring의 getRequestMapping과 같은 것)
const voteRoutes = require("./routes/vote");
app.use("/api/vote", voteRoutes);

// 서버 연결 확인
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

// expess 동작 순서
// server.js로 서버 실행 -> 특정 경로(/api/vote)로 요청 들어오면 특정 라우터로 연결(./routes/vote) -> 맞는 메서드 및 경로 찾아서 연결(vote.js) -> DB와 연결해서 데이터 가져오기(voteController.js)
