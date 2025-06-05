import { motion } from "framer-motion";

export default function App() {
  return (
    <section>
      <div>App</div>
      <img src="/images/peach.jpg" alt="" />
      <img src="/images/peach.jpg" alt="" />
      <img src="/images/peach.jpg" alt="" />

      <motion.img
        src="/images/painting_waterful_peach.jpg"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 2, ease: "easeOut" }}
        viewport={{ once: true }} // 모션 한번만(설정 안하면 viewPort에 잡힐 때마다 모션 실행됨)
      />

      <motion.img
        src="/images/peach.jpg"
        whileInView={{ x: 100 }}
        transition={{
          type: "spring",
          stiffness: 200, // 크기가 클수록 강하게 당김
          damping: 1, // 마찰의 크기, 크기가 클수록 튕김이 없음
        }}
      />

      <motion.img
        src="/images/peach.jpg"
        drag // 해당 태그 드래그 가능하게 함
        dragConstraints={{ left: -100, right: 400 }} // 드래그 가능 범위 설정
        // 관성 효과처럼 부드럽게 멈추게 함
        dragTransition={{
          bounceStiffness: 600, // 튕기는 강도
          bounceDamping: 30, // 마찰 크기
        }}
      />

      <motion.img
        src="/images/peach.jpg"
        whileInView={{ opacity: 1 }}
        initial={{ opacity: 0 }}
        transition={{
          type: "tween",
          duration: 3,
          ease: "easeInOut",
          // repeat: Infinity, // 모션 반복 횟수
          // repeatDelay: 1, // 모션 재실행 시간
        }}
      />
      <motion.img
        src="/images/peach.jpg"
        whileInView={{
          scale: [1, 2, 2, 1, 1],
          rotate: [0, 0, 180, 180, 0],
          borderRadius: ["0%", "0%", "50%", "50%", "0%"],
        }}
        transition={{
          duration: 2,
          ease: "easeInOut",
          times: [0, 0.2, 0.5, 0.8, 1],
          // repeat: Infinity,
          // repeatDelay: 1,
        }}
      />
    </section>
  );
}
