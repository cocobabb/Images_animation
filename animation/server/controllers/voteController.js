const db = require("../config/db");

const getVote = async (req, res) => {
  // 서버 터미널에서 콘솔 로그 학인
  console.log("요청 받음: GET /api/vote"); // 디버깅 로그
  try {
    // DB 커넥션 풀에 쿼리 요청
    const [rows] = await db.query("SELECT * FROM vote");
    console.log("조회 결과:", rows); // 데이터 확인
    // 응답에 json으로 감싸서 전송
    res.json(rows);
  } catch (error) {
    console.error("DB 조회 중 오류 발생:", error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = { getVote };
