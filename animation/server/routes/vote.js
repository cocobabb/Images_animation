const express = require("express");
const router = express.Router();
const { getVote } = require("../controllers/voteController");

// 메서드 설정 및 경로와 요청 api 연결(get, post, delte, put, patch ...)
router.get("/", getVote);

module.exports = router;
