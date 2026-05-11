import type { Metadata } from "next";
import { PaginasWebPage } from "@/components/sections/paginas-web-page";

export const metadata: Metadata = {
  title: "Páginas Web Profesionales — Delta Kilo Soluciones",
  description:
    "¿Así te gustaría tu página web? Diseñamos sitios modernos, rápidos y diseñados para vender. Demo interactivo disponible.",
};

export default function PaginasWebRoute() {
  return <PaginasWebPage />;
}
