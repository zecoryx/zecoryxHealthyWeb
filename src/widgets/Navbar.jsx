"use client";
import { motion } from "framer-motion";

export default function Navbar() {
  return (
    <motion.nav initial={{ y: -50 }} animate={{ y: 0 }} transition={{ duration: 0.5 }} className="bg-[#0a0a2e] border-b border-cyan-900/50 p-4 flex justify-between items-center">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="flex items-center">
        <svg className="w-8 h-8 text-cyan-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <span className="ml-2 text-xl font-bold tracking-wider">ZEC-BIOSYNC</span>
      </motion.div>

      <motion.div className="flex space-x-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5, staggerChildren: 0.1 }}>
        <motion.button whileHover={{ y: -2 }} className="px-3 py-1 cursor-pointer rounded border border-cyan-700 text-sm">
          BOSH SAXIFA
        </motion.button>
        <motion.button whileHover={{ y: -2 }} className="px-3 py-1 cursor-pointer rounded text-sm">
          PATIENTS
        </motion.button>
        <motion.button whileHover={{ y: -2 }} className="px-3 py-1 cursor-pointer rounded text-sm">
          TARIX
        </motion.button>
        <motion.button whileHover={{ y: -2 }} className="px-3 py-1 cursor-pointer rounded text-sm">
          SOZLAMALAR
        </motion.button>
      </motion.div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }} className="flex items-center">
        <div className="w-8 h-8 rounded-full bg-cyan-600 flex items-center justify-center">
          <span className="font-bold">DZ</span>
        </div>
        <span className="ml-2">Dr. ZecAI</span>
      </motion.div>
    </motion.nav>
  );
}