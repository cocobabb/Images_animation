import { motion } from "framer-motion";

export default function DescriptComponent({
  direction,
  imageSrc,
  title,
  contents,
  order,
}) {
  const contentsArr = contents.split(",");
  return (
    <motion.section
      initial={{ opacity: 0, x: direction === "left" ? "-20vw" : "20vw" }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ amount: order === "first" ? 0.5 : 0.3 }}
      transition={{
        type: "tween", // 스프링 말고 tween 사용
        duration: 0.6, // 0.6초간 실행
        ease: "easeOut", // 자연스럽게 멈추는 곡선
      }}
      className="flex items-center"
    >
      <div className="mt-56 flex w-[clamp(280px,80vw,60vw)] flex-col items-center gap-4 md:flex-row">
        <div className="flex w-full items-center justify-center md:w-3/5">
          <img
            src={imageSrc}
            alt=""
            className="aspect-square max-w-full rounded-md object-cover"
          />
        </div>

        <div className="flex flex-col justify-around text-center text-[clamp(1rem,2vw,5vw)] md:w-2/5 md:text-left">
          <span className="font-semibold">{title}</span>
          <br />
          <ul>
            {contentsArr.map((content, i) => {
              return <li key={i}>- {content}</li>;
            })}
          </ul>
        </div>
      </div>
    </motion.section>
  );
}
