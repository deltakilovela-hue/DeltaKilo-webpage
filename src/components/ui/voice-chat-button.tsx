"use client";
import { Mic } from "lucide-react";

export function VoiceChatButton() {
  const openWidget = () => {
    // GHL chat widget — intenta abrir el bubble programáticamente
    const el =
      document.querySelector<HTMLElement>("chat-widget") ??
      document.querySelector<HTMLElement>("[data-widget-id]");
    if (el) {
      const btn = (el.shadowRoot ?? el).querySelector<HTMLElement>("button");
      btn?.click();
    }
  };

  return (
    <button
      onClick={openWidget}
      className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#0dcfcf]/10 border border-[#0dcfcf]/25 text-[#0dcfcf] text-sm font-semibold hover:bg-[#0dcfcf]/20 hover:border-[#0dcfcf]/40 transition-all cursor-pointer"
    >
      <Mic size={15} />
      Iniciar conversación
    </button>
  );
}
