import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import axios from "axios";

export default function App() {
  const [vote, setVote] = useState([]);

  useEffect(() => {
    const getVote = async () => {
      try {
        const res = await axios.get("/api/vote");
        console.log(res);
        console.log(res.data);
        setVote(res.data);
      } catch (error) {
        console.error(error);
      }
    };

    getVote();
  }, []);

  const images = [
    "/images/h_peach1.jpg",
    "/images/s_peach4.jpg",
    "/images/h_peach2.jpg",
    "/images/s_peach2.jpg",
    "/images/h_peach3.jpg",
    "/images/s_peach3.jpg",
  ];

  // [현재 이미지 인덱스, 방향] direction: 1=next, -1=prev
  const [[currentIdx, direction], setCurrent] = useState([0, 0]);
  const [isPaused, setIsPaused] = useState(false); // 슬라이드 멈춤 상태 저장

  // 이전 이미지
  const preSlide = () => {
    setCurrent(([idx]) => [(idx - 1 + images.length) % images.length, -1]);
  };

  // 다음 이미지지
  const nextSlide = () => {
    setCurrent(([idx]) => [(idx + 1) % images.length, 1]);
  };

  // 자동 슬라이드
  useEffect(() => {
    if (isPaused) return; // 이미지 박스 위에 마우스 올라오면 자동 슬라이드 멈춤
    const interval = setInterval(() => {
      nextSlide();
    }, 2000);
    // interval 클리어 하지 않으면 2초 후 넘어가는게 아니라 계속 넘어감
    return () => clearInterval(interval);
  }, [currentIdx, isPaused]);

  const getIndex = (move) =>
    (currentIdx + move + images.length) % images.length;

  // 클릭 위치에 따라 이전/다음 슬라이드 실행
  const onImageClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left; // 이미지 내부에서 클릭한 x좌표
    const half = rect.width / 2;

    console.log(rect);
    console.log("clickX: " + clickX);
    console.log("half: " + half);

    if (clickX < half) {
      // 왼쪽 영역 클릭
      preSlide();
    } else if (clickX > half) {
      // 오른쪽 영역 클릭
      nextSlide();
    }
  };

  return (
    // overflow-hidden: 뷰포트 바깥으로 나가는 요소가 보이지 않게 되어 스크롤이 생기지 않음
    <article className="flex flex-col items-center gap-4 overflow-hidden">
      <h1 className="font-nanum text-[clamp(30px,10vw,20vw)] font-bold text-pink-400">
        복숭아
      </h1>

      {/* overflow-hidden으로 박스 범위 밖에 이미지는 hidden 처리 */}
      <div
        className="aspect-[3/2] w-[clamp(350px,80vw,40vw)] overflow-hidden rounded-xl shadow-lg"
        onMouseEnter={() => setIsPaused(true)} // 마우스가 이미지 박스 위에 올라오면 멈춤
        onMouseLeave={() => setIsPaused(false)} // 마우스가 나가면 다시 자동 슬라이드
      >
        <motion.div
          // flex로 3개의 이미지 한줄로 렌더링
          className="flex"
          initial={{ x: direction > 0 ? "0%" : "-200%" }} // 방향에 따라 시작 위치 지정
          animate={{ x: "-100%" }} // 항상 가운데로 이동
          transition={{ duration: 0.3 }}
          key={currentIdx}
          style={{ cursor: "pointer" }}
        >
          {/* 이미지 배열의 인덱스로 3개의 이미지 태그 생성*/}
          {[getIndex(-1), getIndex(0), getIndex(1)].map((idx, i) => {
            return (
              <img
                key={i}
                src={images[idx]}
                onClick={onImageClick}
                // flex-shrink-0이 없다면, 부모 컨테이너보다 커질 때 자식 태그가 강제로 줄어들어서 찌그러질 수 있음
                // 자식태그가 자기 너비만큼 정확히 자리를 차지
                className="aspect-[3/2] w-full flex-shrink-0 object-cover"
              />
            );
          })}
        </motion.div>
      </div>
      <motion.span
        initial={{ opacity: 0, y: 200 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          type: "tween",
          duration: 0.5,
          ease: "easeOut", // 자연스럽게 멈추는 곡선
        }}
        // viewport={{ once: true }} // 모션 한번만(설정 안하면 viewPort에 잡힐 때마다 모션 실행됨)
        className="mt-10 text-[clamp(20px,6vw,30vw)] xl:mt-56"
      >
        딱복 VS 물복
      </motion.span>

      <motion.section
        initial={{ opacity: 0, x: "-20vw" }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ amount: 0.5 }}
        transition={{
          type: "tween",
          duration: 0.5,
          ease: "easeOut",
        }}
      >
        <div className="w-[clamp(250px, 80vw, 600px)] mt-16 flex flex-col items-center gap-4 lg:flex-row">
          <img
            src="/images/h_peach4.jpg"
            alt=""
            className="aspect-square basis-1/4 rounded-md object-cover"
          />
          <p className="basis-3/4 text-center text-[clamp(0.8rem,1.5vw,10vw)] lg:text-left">
            <span className="font-semibold">딱복: 딱딱한 복숭아</span>
            <br />
            아삭한 식감, 긴 보관 기간, 적은 과즙
          </p>
        </div>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, x: "20vw" }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ amount: 0.3 }}
        transition={{
          type: "tween", // 스프링 말고 tween 사용
          duration: 0.6, // 0.6초간 실행
          ease: "easeOut", // 자연스럽게 멈추는 곡선
        }}
      >
        <div className="w-[clamp(250px, 80vw, 600px)] mb-56 mt-20 flex flex-col items-center gap-4 lg:flex-row">
          <img
            src="/images/s_peach1.jpg"
            alt=""
            className="aspect-square basis-1/3 rounded-md object-cover"
          />
          <p className="basis-2/3 text-center text-[clamp(0.8rem,1.5vw,10vw)] lg:text-left">
            <span className="font-semibold">물복: 물렁한 복숭아</span>
            <br />
            부드러운 식감, 짧은 보관 기간, 많은 과즙
          </p>
        </div>
      </motion.section>

      <h1>Vote List</h1>
      <ul>
        {vote.map((v) => (
          <li key={v.id}>{v.name}</li>
        ))}
      </ul>
    </article>
  );
}
