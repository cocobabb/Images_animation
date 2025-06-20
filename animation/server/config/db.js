const sqlite3 = require("sqlite3").verbose();
const path = require("path");

// 데이터베이스 경로 설정
const dbPath = path.resolve(__dirname, "../votes.db");

// 데이터베이스 인스턴스
let db = null;

// 데이터베이스 연결 및 초기화 함수
function initializeDatabase() {
  return new Promise((resolve, reject) => {
    // 데이터베이스 연결
    db = new sqlite3.Database(dbPath, (err) => {
      if (err) {
        console.error("데이터베이스 연결 오류:", err.message);
        reject(err);
        return;
      }
      console.log("데이터베이스에 성공적으로 연결되었습니다.");

      // 테이블 생성
      db.run(
        `
        CREATE TABLE IF NOT EXISTS votes (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          vote_type TEXT NOT NULL,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
        `,
        (err) => {
          if (err) {
            console.error("테이블 생성 오류:", err.message);
            reject(err);
          } else {
            console.log("votes 테이블 생성 완료");
            resolve(db);
          }
        },
      );
    });
  });
}

// 데이터베이스 연결 종료 함수
function closeDatabase() {
  return new Promise((resolve, reject) => {
    if (db) {
      db.close((err) => {
        if (err) {
          console.error("데이터베이스 닫기 오류:", err.message);
          reject(err);
        } else {
          console.log("데이터베이스 연결 종료");
          db = null;
          resolve();
        }
      });
    } else {
      resolve();
    }
  });
}

// 데이터베이스 인스턴스 반환 함수
function getDatabase() {
  if (!db) {
    throw new Error("데이터베이스가 초기화되지 않았습니다.");
  }
  return db;
}

module.exports = {
  initializeDatabase,
  closeDatabase,
  getDatabase,
};
