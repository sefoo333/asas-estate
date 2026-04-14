"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";

export default function PageTransitionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname} // مهم علشان يعمل إعادة أنيميشن لما تتغير الصفحة
        initial={{ opacity: 0, y: 20 }}  // بداية
        animate={{ opacity: 1, y: 0 }}   // دخول
        exit={{ opacity: 0, y: -20 }}    // خروج
        transition={{ duration: 0.4, ease: "easeInOut" }}
        className="h-full"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
