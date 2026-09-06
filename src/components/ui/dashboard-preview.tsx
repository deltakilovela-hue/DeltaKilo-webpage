export function DashboardPreview() {
  return (
    <div className="w-full rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-black/60">
      {/* Chrome bar */}
      <div className="bg-[#1a1a1a] px-4 py-3 flex items-center gap-3 border-b border-white/[0.06]">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
          <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
          <div className="w-3 h-3 rounded-full bg-[#28c840]" />
        </div>
        <div className="flex-1 mx-3">
          <div className="bg-[#111] rounded-lg px-3 py-1.5 flex items-center gap-2 max-w-xs mx-auto">
            <div className="w-2 h-2 rounded-full bg-emerald-400 flex-shrink-0" />
            <span className="text-[11px] text-white/40 font-mono truncate">portal.deltakilo.com.mx</span>
          </div>
        </div>
      </div>

      {/* Portal — recreación fiel, mismo sistema de color que la app real */}
      <div className="bg-[#0a0a0f] p-4 sm:p-6">
        <p className="font-mono text-[9px] uppercase tracking-widest text-[#8b9cb0] mb-1">Cliente</p>
        <p className="text-sm sm:text-base font-bold text-[#f2f4f8] mb-4">Delta Kilo Soluciones</p>

        <div className="grid grid-cols-2 gap-3">
          {/* Lima */}
          <div className="rounded border border-[#282c3a] bg-[#14161f] p-3 flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[9px] uppercase tracking-widest text-[#00c8c8]">Lima</span>
              <span className="rounded border border-[#00c8c8]/40 bg-[#00c8c8]/10 px-1.5 py-0.5 font-mono text-[7px] uppercase text-[#00c8c8]">Conectado</span>
            </div>
            <p className="text-[10px] font-semibold text-[#f2f4f8]">Leads &amp; CRM</p>
            <p className="text-xl font-bold text-[#f2f4f8] tabular-nums">82<span className="text-[9px] font-normal text-[#8b9cb0] ml-1">leads en GHL</span></p>
          </div>

          {/* Sierra */}
          <div className="rounded border border-[#282c3a] bg-[#14161f] p-3 flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[9px] uppercase tracking-widest text-[#00c8c8]">Sierra</span>
              <span className="rounded border border-[#00c8c8]/40 bg-[#00c8c8]/10 px-1.5 py-0.5 font-mono text-[7px] uppercase text-[#00c8c8]">Conectado</span>
            </div>
            <p className="text-[10px] font-semibold text-[#f2f4f8]">SEO</p>
            <p className="text-[10px] text-[#8b9cb0]">Search SEO <span className="text-[#f2f4f8] font-bold tabular-nums">76/100</span> <span className="text-[#00c8c8]">(+16)</span></p>
          </div>

          {/* AKBOT / Vox */}
          <div className="rounded border border-[#282c3a] bg-[#14161f] p-3 flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[9px] uppercase tracking-widest text-[#00c8c8]">AKBOT / Vox</span>
              <span className="rounded border border-[#00c8c8]/40 bg-[#00c8c8]/10 px-1.5 py-0.5 font-mono text-[7px] uppercase text-[#00c8c8]">Conectado</span>
            </div>
            <p className="text-[10px] font-semibold text-[#f2f4f8]">Contenido</p>
            <p className="text-xl font-bold text-[#f2f4f8] tabular-nums">39<span className="text-[9px] font-normal text-[#8b9cb0] ml-1">programados</span></p>
          </div>

          {/* Tango */}
          <div className="rounded border border-[#282c3a] bg-[#14161f] p-3 flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[9px] uppercase tracking-widest text-[#00c8c8]">Tango</span>
              <span className="rounded border border-[#ff9a3c]/40 bg-[#ff9a3c]/10 px-1.5 py-0.5 font-mono text-[7px] uppercase text-[#ff9a3c]">Planeación</span>
            </div>
            <p className="text-[10px] font-semibold text-[#f2f4f8]">Pauta</p>
            <p className="text-[10px] text-[#8b9cb0]">Meta 50% · Google 35%</p>
          </div>
        </div>
      </div>
    </div>
  );
}
