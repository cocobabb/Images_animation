import { motion } from "framer-motion";

export default function DescriptComponent({
  direction,
  imageSrc,
  title,
  contents,
  order,
}) {
  return (
    <motion.section
      // variants={descriptVariants}
      initial={{ opacity: 0, x: direction === "left" ? "-20vw" : "20vw" }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ amount: order === "first" ? 0.5 : 0.3 }}
      transition={{
        type: "tween", // 스프링 말고 tween 사용
        duration: 0.6, // 0.6초간 실행
        ease: "easeOut", // 자연스럽게 멈추는 곡선
      }}
    >
      <div className="w-[clamp(250px, 80vw, 600px)] mt-56 flex flex-col items-center gap-4 lg:flex-row">
        <img
          src={imageSrc}
          alt=""
          className="aspect-square basis-1/3 rounded-md object-cover"
        />
        <p className="basis-2/3 text-center text-[clamp(0.8rem,1.5vw,10vw)] lg:text-left">
          <span className="font-semibold">{title}</span>
          <br />
          {contents}
        </p>
      </div>
    </motion.section>
  );
}
