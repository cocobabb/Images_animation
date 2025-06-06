import { clamp, motion } from "framer-motion";

export default function App() {
  return (
    <section>
      {/* CSS의 clamp함수
        clamp(최소값, 유동값, 최대값)
        최소값: 요소의 제일 작은 크기 설정
        유동값: viewPort 너비의 설정% 크기 만큼 증가 
          ex) 2vw => 제일 작거나 큰 화면이 아닌 화면 크기이면 화면 너비의 2% 크기 만큼 증감
        최대값: 요소의 제일 큰 크기 설정

        최소값, 최대값은 rem, px, vw 등으로 조절
      */}
      <motion.h1 className="font-nanum text-[clamp(1rem,8vw,5rem)] font-bold text-pink-400">
        복숭아
      </motion.h1>

      {/* Tailwind에서 clamp 적용*/}
      <img
        src="/images/peach.jpg"
        alt="복숭아"
        className="w-[clamp(5vw,30vw,100vw)]"
      />

      {/* 일반적인 CSS환경에서 clamp적용 */}
      <img
        src="/images/peach.jpg"
        alt="복숭아"
        style={{
          width: "clamp(100px, 30vw, 400px)",
        }}
      />
    </section>
  );
}
