"use client"

import { motion, useScroll } from "framer-motion"
import { cn } from "@/lib/utils"

interface ScrollProgressProps {
  className?: string
}

export function ScrollProgress({ className }: ScrollProgressProps) {
  const { scrollYProgress } = useScroll()

  return (
    <motion.div
      className={cn(
        "fixed inset-x-0 top-0 z-[200] h-[2px] origin-left",
        "bg-gradient-to-r from-[#0dcfcf] via-[#D4AF37] to-[#0dcfcf]",
        className
      )}
      style={{
        scaleX: scrollYProgress,
      }}
    />
  )
}
