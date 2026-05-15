import type { Metadata } from "next";
import { PaginasWebPage } from "@/components/sections/paginas-web-page";

export const metadata: Metadata = {
  title: "Páginas Web Conectadas a Ventas — Delta Kilo Soluciones",
  description:
    "Páginas web profesionales, rápidas y conectadas a tu proceso comercial. Para que tus visitantes entiendan tu valor, confíen en tu negocio y sepan cómo contactarte.",
};

export default function PaginasWebRoute() {
  return <PaginasWebPage />;
}
