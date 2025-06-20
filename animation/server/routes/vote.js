const express = require("express");
const router = express.Router();
const { getDatabase } = require("../config/db");

// 라우트 등록
router.post("/", (req, res) => {
  try {
    const { voteType } = req.body;

    // 투표 타입 유효성 검사
    if (!["딱복", "물복"].includes(voteType)) {
      return res.status(400).json({ error: "유효하지 않은 투표 항목입니다." });
    }

    const db = getDatabase();
    // preparedStatement
    const stmt = db.prepare("INSERT INTO votes (vote_type) VALUES (?)");

    stmt.run(voteType, (err) => {
      if (err) {
        return res.status(500).json({ error: "투표 중 오류 발생" });
      }
      res.status(201).json({ message: "투표 완료" });
    });

    // statement 종료 및 resource 정리
    stmt.finalize();
  } catch (error) {
    res.status(500).json({ error: "서버 오류" });
  }
});

// 투표 결과 조회 라우트
router.get("/", (req, res) => {
  try {
    const db = getDatabase();
    db.all(
      "SELECT vote_type, COUNT(*) as count FROM votes GROUP BY vote_type",
      (err, rows) => {
        if (err) {
          return res.status(500).json({ error: "결과 조회 중 오류 발생" });
        }

        // 총 투표 수 계산
        // Array.reduce() : 배열의 모든 요소에 대해 리듀서를 실행한 단일 값 반환
        const totalVotes = rows.reduce((sum, row) => sum + row.count, 0); // sum 변수의 초기 값은 0

        // 결과 포맷팅
        const results = rows.map((row) => ({
          type: row.vote_type,
          count: row.count,
          percentage: ((row.count / totalVotes) * 100).toFixed(2), // 소수점 둘쨋자리까지
        }));

        res.json(results);
      },
    );
  } catch (error) {
    res.status(500).json({ error: "서버 오류" });
  }
});

module.exports = router;
