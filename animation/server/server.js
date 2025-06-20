const express = require("express");
const cors = require("cors");
const path = require("path");
const { initializeDatabase, closeDatabase } = require("./config/db");
require("dotenv").config();

// express 서버 포트 설정
const app = express();
const PORT = process.env.PORT || 3000;

// 애플리케이션에 cors혀용, express의 json 허용
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 요청 경로와 라우터 매핑
// 라우팅 설정(Spring의 @getRequestMapping과 같은 것)
const voteRoutes = require("./routes/vote");
app.use("/api/vote", voteRoutes);

// 서버 시작 및 데이터베이스 초기화
async function startServer() {
  try {
    // 데이터베이스 초기화
    await initializeDatabase();

    // 서버 연결 확인
    app.listen(PORT, () => {
      console.log(`서버가 ${PORT}번 포트에서 실행 중입니다.`);
    });
  } catch (error) {
    console.error("서버 시작 중 오류 발생:", error);
    process.exit(1);
  }
}

// 프로세스 종료 시 데이터베이스 연결 종료
process.on("SIGINT", async () => {
  try {
    await closeDatabase();
    process.exit(0);
  } catch (error) {
    console.error("데이터베이스 연결 종료 중 오류 발생:", error);
    process.exit(1);
  }
});

// 서버 시작
startServer();

// 백엔드 서버 및 DB
// 백엔드 서버 및 DB 연결 시작(server.js) -> DB 연결 설정 및 테이블 생성(db.js)

// 백엔드 api 요청
// 요청된 api 주소에 따라 맞는 라우터로 이동(server.js) -> DB 연결하여 비즈니스로직 처리(vote.js)

module.exports = app;
