import type { Metadata } from "next";
import { FunnelsPage } from "@/components/sections/funnels-page";

export const metadata: Metadata = {
  title: "Funnels Automáticos de Venta",
  description:
    "Captamos leads calificados de forma automática. Flujos de venta que trabajan solos, 24/7.",
};

export default function FunnelsRoute() {
  return <FunnelsPage />;
}
