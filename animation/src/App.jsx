import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function App() {
  const images = [
    "/images/peach.jpg",
    "/images/painting_waterful_peach.jpg",
    "/images/real_peaches_photo.jpg",
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
    const clickX = e.clientX + rect.left; // 이미지 내부에서 클릭한 x좌표
    const half = rect.width / 2;

    if (clickX < half) {
      // 왼쪽 영역 클릭
      preSlide();
    } else if (clickX > half) {
      // 오른쪽 영역 클릭
      nextSlide();
    }
  };

  return (
    <section className="flex flex-col items-center gap-4">
      <h1 className="font-nanum text-[clamp(20vw,20vw,100px)] font-bold text-pink-400">
        복숭아
      </h1>

      {/* overflow-hidden으로 박스 범위 밖에 이미지는 hidden 처리 */}
      <div
        className="aspect-[3/2] w-[clamp(200px,80vw,700px)] overflow-hidden rounded-xl shadow-lg"
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
          onClick={onImageClick}
          style={{ cursor: "pointer" }}
        >
          {/* 이미지 배열의 인덱스로 3개의 이미지 태그 생성*/}
          {[getIndex(-1), getIndex(0), getIndex(1)].map((idx, i) => {
            return (
              <img
                key={i}
                src={images[idx]}
                // flex-shrink-0이 없다면, 부모 컨테이너보다 커질 때 자식 태그가 강제로 줄어들어서 찌그러질 수 있음
                // 자식태그가 자기 너비만큼 정확히 자리를 차지
                className="aspect-[3/2] w-full flex-shrink-0 object-cover"
              />
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
