import React, { useState, useEffect } from "react";
import axios from "axios";

const VoteComponent = () => {
  const [voteType, setVoteType] = useState("");
  const [voteResults, setVoteResults] = useState([]);
  const [error, setError] = useState("");

  // 투표 결과 불러오기
  const fetchVoteResults = async () => {
    try {
      const response = await axios.get("/api/vote");
      console.log(response);
      setVoteResults(response.data);
    } catch (err) {
      console.error("투표 결과 조회 중 오류:", err);
      setError("투표 결과를 불러오는 데 실패했습니다.");
    }
  };

  // 투표 제출
  const handleVote = async () => {
    if (!voteType) {
      setError("투표 항목을 선택해주세요.");
      return;
    }

    try {
      await axios.post("/api/vote", { voteType });
      setError("");
      fetchVoteResults(); // 투표 후 결과 새로고침
    } catch (err) {
      console.error("투표 중 오류:", err);
      setError("투표 제출에 실패했습니다.");
    }
  };

  // 컴포넌트 마운트 시 초기 결과 불러오기
  useEffect(() => {
    fetchVoteResults();
  }, []);

  return (
    <div className="vote-container">
      <h2>복숭아 투표</h2>

      {/* 투표 선택 섹션 */}
      <div className="vote-selection">
        <label>
          <input
            type="radio"
            value="딱복"
            checked={voteType === "딱복"}
            onChange={() => setVoteType("딱복")}
          />
          딱복
        </label>
        <label>
          <input
            type="radio"
            value="물복"
            checked={voteType === "물복"}
            onChange={() => setVoteType("물복")}
          />
          물복
        </label>
      </div>

      {/* 투표 버튼 */}
      <button onClick={handleVote} className="vote-button">
        투표하기
      </button>

      {/* 에러 메시지 */}
      {error && <div className="error-message">{error}</div>}

      {/* 투표 결과 */}
      <div className="vote-results">
        <h3>투표 결과</h3>
        {voteResults.map((result, index) => (
          <div key={index} className="result-item">
            <span>{result.type}</span>
            <span>
              {result.count}표 ({result.percentage}%)
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VoteComponent;
