"use client";

export function AgentePage() {
  return (
    <div className="min-h-screen bg-[#030810] flex flex-col items-center justify-center relative overflow-hidden">
      {/* Deep glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 90% 70% at 50% 50%, rgba(0,50,180,0.20) 0%, rgba(13,207,207,0.05) 55%, transparent 80%)",
        }}
      />

      {/* Title */}
      <div className="relative z-10 text-center">
        <p className="text-[11px] uppercase tracking-[0.25em] text-[#0dcfcf]/60 font-semibold mb-4">
          Delta Kilo Soluciones
        </p>
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-black text-white leading-tight">
          Agente de
          <br />
          <span
            className="bg-clip-text text-transparent"
            style={{ backgroundImage: "linear-gradient(135deg, #0dcfcf 0%, #7dd3fc 100%)" }}
          >
            Voz IA
          </span>
        </h1>
      </div>
    </div>
  );
}
