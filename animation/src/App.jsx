import { motion } from "framer-motion";
import DescriptComponent from "./components/DescriptComponent";
import ImageSlider from "./components/ImageSlider";

export default function App() {
  const images = [
    "/images/h_peach1.jpg",
    "/images/s_peach4.jpg",
    "/images/h_peach2.jpg",
    "/images/s_peach2.jpg",
    "/images/h_peach3.jpg",
    "/images/s_peach3.jpg",
  ];

  return (
    <article className="flex flex-col items-center gap-4 overflow-hidden">
      <h1 className="font-nanum text-[clamp(30px,10vw,20vw)] font-bold text-pink-400">
        복숭아
      </h1>

      <ImageSlider images={images} />

      <motion.span
        initial={{ opacity: 0, y: 200 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          type: "tween",
          duration: 0.5,
          ease: "easeOut", // 자연스럽게 멈추는 곡선
        }}
        // viewport={{ once: true }} // 모션 한번만(설정 안하면 viewPort에 잡힐 때마다 모션 실행됨)
        className="mt-10 text-[clamp(30px,8vw,20vw)] xl:mt-56"
      >
        딱복 VS 물복
      </motion.span>

      <DescriptComponent
        title="딱복: 딱딱한 복숭아"
        contents="아삭한 식감,긴 보관 기간,적은 과즙"
        imageSrc="/images/h_peach4.jpg"
        direction="left"
        order="first"
      />
      <DescriptComponent
        title="물복: 물렁한 복숭아"
        contents="부드러운 식감,짧은 보관 기간,많은 과즙"
        imageSrc="/images/s_peach1.jpg"
        direction="right"
        order="second"
      />
    </article>
  );
}
