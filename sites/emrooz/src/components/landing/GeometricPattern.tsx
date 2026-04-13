export default function GeometricPattern() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {/* Central medallion — large, centered behind the title */}
      <img
        src="/patterns/lotus.svg"
        alt=""
        className="absolute opacity-15"
        style={{
          width: "500px",
          height: "500px",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -55%)",
          animation: "drift 80s ease-in-out infinite",
        }}
      />

      {/* Symmetrical lotus flowers — scattered around the field */}
      {/* Top-left */}
      <img
        src="/patterns/lotus.svg"
        alt=""
        className="absolute opacity-10"
        style={{ width: "120px", top: "8%", left: "8%", animation: "drift 60s ease-in-out infinite" }}
      />
      {/* Top-right */}
      <img
        src="/patterns/lotus.svg"
        alt=""
        className="absolute opacity-10"
        style={{ width: "120px", top: "8%", right: "8%", animation: "drift 60s ease-in-out infinite 3s" }}
      />
      {/* Bottom-left */}
      <img
        src="/patterns/lotus.svg"
        alt=""
        className="absolute opacity-8"
        style={{ width: "100px", bottom: "15%", left: "12%", animation: "drift 70s ease-in-out infinite 5s" }}
      />
      {/* Bottom-right */}
      <img
        src="/patterns/lotus.svg"
        alt=""
        className="absolute opacity-8"
        style={{ width: "100px", bottom: "15%", right: "12%", animation: "drift 70s ease-in-out infinite 2s" }}
      />

      {/* Mid-field smaller lotuses */}
      <img
        src="/patterns/lotus.svg"
        alt=""
        className="absolute opacity-[0.06]"
        style={{ width: "70px", top: "30%", left: "25%", animation: "drift 90s ease-in-out infinite 4s" }}
      />
      <img
        src="/patterns/lotus.svg"
        alt=""
        className="absolute opacity-[0.06]"
        style={{ width: "70px", top: "30%", right: "25%", animation: "drift 90s ease-in-out infinite 7s" }}
      />

      {/* Palmettes — positioned symmetrically along sides */}
      <img
        src="/patterns/palmette.svg"
        alt=""
        className="absolute opacity-[0.12]"
        style={{ width: "80px", top: "18%", left: "20%", transform: "rotate(15deg)", animation: "drift 75s ease-in-out infinite 2s" }}
      />
      <img
        src="/patterns/palmette.svg"
        alt=""
        className="absolute opacity-[0.12]"
        style={{ width: "80px", top: "18%", right: "20%", transform: "rotate(-15deg)", animation: "drift 75s ease-in-out infinite 6s" }}
      />
      <img
        src="/patterns/palmette.svg"
        alt=""
        className="absolute opacity-[0.10]"
        style={{ width: "70px", bottom: "22%", left: "18%", transform: "rotate(180deg)", animation: "drift 85s ease-in-out infinite 4s" }}
      />
      <img
        src="/patterns/palmette.svg"
        alt=""
        className="absolute opacity-[0.10]"
        style={{ width: "70px", bottom: "22%", right: "18%", transform: "rotate(180deg)", animation: "drift 85s ease-in-out infinite 8s" }}
      />

      {/* Arabesque vines — top and bottom bands */}
      <img
        src="/patterns/vine.svg"
        alt=""
        className="absolute opacity-[0.12]"
        style={{ width: "100%", top: "6%", left: "0" }}
      />
      <img
        src="/patterns/vine.svg"
        alt=""
        className="absolute opacity-[0.12]"
        style={{ width: "100%", bottom: "8%", left: "0", transform: "scaleY(-1)" }}
      />

      {/* Side vines — vertical */}
      <img
        src="/patterns/vine.svg"
        alt=""
        className="absolute opacity-[0.08]"
        style={{ width: "100vh", top: "50%", left: "-20%", transform: "rotate(90deg) translateX(-50%)" }}
      />
      <img
        src="/patterns/vine.svg"
        alt=""
        className="absolute opacity-[0.08]"
        style={{ width: "100vh", top: "50%", right: "-20%", transform: "rotate(-90deg) translateX(50%)" }}
      />

      {/* Vignette — darker edges for carpet border depth */}
      <div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse at 50% 42%, transparent 25%, rgba(13,21,38,0.4) 60%, rgba(13,21,38,0.85) 100%)",
        }}
      />
    </div>
  );
}
