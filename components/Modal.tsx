"use client";

import { motion } from "framer-motion";
import { X } from "lucide-react";
import { useEffect, useRef } from "react";

export function Modal({
  title,
  onClose,
  children
}: {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    closeRef.current?.focus();
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-50 grid place-items-center bg-black/70 p-4 backdrop-blur-sm motion-reduce:transition-none"
      role="dialog"
      aria-modal="true"
      aria-label={title}
      onClick={onClose}
    >
      <motion.section
        initial={{ y: 30, scale: 0.96 }}
        animate={{ y: 0, scale: 1 }}
        className="max-h-[90vh] w-full max-w-lg overflow-auto rounded-[2rem] border-4 border-[#29b6f6] bg-[#14152c] p-6 shadow-2xl motion-reduce:transform-none"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-2 flex items-center justify-between">
          <h2 className="display text-2xl font-black uppercase text-[#f5f5ff]">{title}</h2>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="rounded-full p-2 text-[#f5f5ff] transition hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ffc93c]"
          >
            <X size={22} />
          </button>
        </div>
        {children}
      </motion.section>
    </motion.div>
  );
}
