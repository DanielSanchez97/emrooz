import { motion } from "motion/react";

// Each motif layer animates from center outward with staggered delays
function BloomImg({
  src,
  delay,
  duration = 1.2,
  className,
  style,
}: {
  src: string;
  delay: number;
  duration?: number;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <motion.img
      src={src}
      alt=""
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay, duration, ease: "easeOut" }}
      className={className}
      style={{ transformOrigin: "center center", ...style }}
    />
  );
}

export default function CarpetBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {/* === Layer 1: Center medallion lotus (blooms first) === */}
      <BloomImg
        src="/patterns/lotus.svg"
        delay={0.3}
        duration={1.5}
        className="absolute"
        style={{
          width: "420px",
          height: "420px",
          top: "50%",
          left: "50%",
          marginTop: "-210px",
          marginLeft: "-210px",
          opacity: 0.12,
        }}
      />

      {/* === Layer 2: Inner ring of lotuses (bloom outward) === */}
      {[
        { top: "10%", left: "10%", size: "110px", delay: 0.8 },
        { top: "10%", right: "10%", size: "110px", delay: 0.9 },
        { bottom: "18%", left: "10%", size: "90px", delay: 1.0 },
        { bottom: "18%", right: "10%", size: "90px", delay: 1.1 },
      ].map((pos, i) => (
        <BloomImg
          key={`lotus-${i}`}
          src="/patterns/lotus.svg"
          delay={pos.delay}
          className="absolute"
          style={{
            width: pos.size,
            top: pos.top,
            left: pos.left,
            right: pos.right,
            bottom: pos.bottom,
            opacity: 0.07,
          }}
        />
      ))}

      {/* Small scattered lotuses */}
      {[
        { top: "32%", left: "22%", size: "60px", delay: 1.0 },
        { top: "32%", right: "22%", size: "60px", delay: 1.1 },
        { bottom: "35%", left: "28%", size: "50px", delay: 1.15 },
        { bottom: "35%", right: "28%", size: "50px", delay: 1.2 },
      ].map((pos, i) => (
        <BloomImg
          key={`lotus-sm-${i}`}
          src="/patterns/lotus.svg"
          delay={pos.delay}
          className="absolute"
          style={{
            width: pos.size,
            top: pos.top,
            left: pos.left,
            right: pos.right,
            bottom: pos.bottom,
            opacity: 0.05,
          }}
        />
      ))}

      {/* === Layer 3: Palmettes at mid-field === */}
      {[
        { top: "15%", left: "22%", rotate: "15deg", delay: 1.2 },
        { top: "15%", right: "22%", rotate: "-15deg", delay: 1.3 },
        { bottom: "22%", left: "20%", rotate: "180deg", delay: 1.4 },
        { bottom: "22%", right: "20%", rotate: "180deg", delay: 1.5 },
      ].map((pos, i) => (
        <BloomImg
          key={`palm-${i}`}
          src="/patterns/palmette.svg"
          delay={pos.delay}
          className="absolute"
          style={{
            width: "65px",
            top: pos.top,
            left: pos.left,
            right: pos.right,
            bottom: pos.bottom,
            transform: `rotate(${pos.rotate})`,
            opacity: 0.08,
          }}
        />
      ))}

      {/* === Layer 4: Vines draw outward from center === */}
      {/* Top vine */}
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 1 }}
        transition={{ delay: 1.6, duration: 1.2, ease: "easeOut" }}
        className="absolute"
        style={{
          top: "8%",
          left: 0,
          right: 0,
          transformOrigin: "center center",
          opacity: 0.09,
        }}
      >
        <img src="/patterns/vine.svg" alt="" className="w-full" />
      </motion.div>

      {/* Bottom vine */}
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 1 }}
        transition={{ delay: 1.8, duration: 1.2, ease: "easeOut" }}
        className="absolute"
        style={{
          bottom: "10%",
          left: 0,
          right: 0,
          transformOrigin: "center center",
          transform: "scaleY(-1)",
          opacity: 0.09,
        }}
      >
        <img src="/patterns/vine.svg" alt="" className="w-full" />
      </motion.div>

      {/* === Layer 5: Border frame lines fade in at edges === */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.0, duration: 1.0 }}
        className="absolute inset-0"
      >
        {/* Top */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
        {/* Bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
        {/* Left */}
        <div className="absolute top-4 bottom-4 left-0 w-px bg-gradient-to-b from-transparent via-gold/12 to-transparent" />
        {/* Right */}
        <div className="absolute top-4 bottom-4 right-0 w-px bg-gradient-to-b from-transparent via-gold/12 to-transparent" />
      </motion.div>

      {/* === Vignette (lighter than before) === */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1.5 }}
        className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse at 50% 40%, transparent 30%, rgba(13,21,38,0.3) 65%, rgba(13,21,38,0.6) 100%)",
        }}
      />
    </div>
  );
}
