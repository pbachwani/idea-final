"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const faqs = [
  {
    q: "What's the typical project timeline?",
    a: "Most portfolio and marketing sites take 4-6 weeks. Ecommerce builds run 6-8 weeks depending on scope.",
  },
  {
    q: "Do you work with international clients?",
    a: "Yes, we work with clients globally, and are comfortable working across time zones.",
  },
  {
    q: "What's included after launch?",
    a: "Optional retainers for ongoing updates and iteration. Plus a 60-day support window for fixes.",
  },
];

function FaqItem({ item, isOpen, onClick }) {
  return (
    <div className="w-full border-b border-white/15">
      <button
        onClick={onClick}
        className="flex w-full items-center justify-between gap-4 py-2 text-left"
      >
        <span className="min-w-0 flex-1 text-sm text-white/70">{item.q}</span>
        <span
          className={`shrink-0 text-accent transition-transform duration-300 ${
            isOpen ? "rotate-45" : "rotate-0"
          }`}
        >
          +
        </span>
      </button>

      <AnimatePresence initial={false} mode="wait">
        {isOpen && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2, ease: "easeOut", delay: 0.2 }}
              exit={{ opacity: 0 }}
              className="w-full pb-5 pr-8 text-sm leading-relaxed text-white/90"
            >
              {item.a}
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <div className="flex min-w-72 max-w-72 flex-col gap-2 mx-auto">
      <div className="md:hidden">FAQ&apos;s</div>
      {faqs.map((item, i) => (
        <FaqItem
          key={item.q}
          item={item}
          isOpen={openIndex === i}
          onClick={() => setOpenIndex(openIndex === i ? null : i)}
        />
      ))}
    </div>
  );
}
