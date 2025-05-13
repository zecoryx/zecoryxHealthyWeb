"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function HealthDataModal({ initialData, onClose, onSubmit }) {
  const [formData, setFormData] = useState(initialData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "steps" || name === "sleepQuality" || name === "height" || name === "weight" || name === "bloodPressureSys" || name === "bloodPressureDia" || name === "exerciseDuration" ? Number(value) : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }} className="bg-[#0c1033] border border-cyan-900 rounded-lg w-full max-w-2xl p-6 text-cyan-400" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold tracking-wider">SALOMATLIK MA'LUMOTLARINI KIRITISH</h2>
          <button onClick={onClose} className="text-cyan-400 hover:text-cyan-300 cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Qadamlar soni */}
            <div className="space-y-2">
              <label className="block text-sm font-medium">Qadamlar soni</label>
              <div className="relative">
                <input type="number" name="steps" value={formData.steps} onChange={handleChange} className="w-full bg-[#0a0a2e] border border-cyan-900 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500" min="0" max="50000" />
                <div className="absolute right-3 top-2.5 text-cyan-600">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 3a1 1 0 00-1 1v5H4a1 1 0 100 2h5v5a1 1 0 102 0v-5h5a1 1 0 100-2h-5V4a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Uyqu sifati (%) */}
            <div className="space-y-2">
              <label className="block text-sm font-medium">Uyqu sifati (%)</label>
              <div className="relative">
                <input type="number" name="sleepQuality" value={formData.sleepQuality} onChange={handleChange} className="w-full bg-[#0a0a2e] border border-cyan-900 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500" min="0" max="100" />
                <div className="absolute right-3 top-2.5 text-cyan-600">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Bo'y (sm) */}
            <div className="space-y-2">
              <label className="block text-sm font-medium">Bo'y (sm)</label>
              <div className="relative">
                <input type="number" name="height" value={formData.height} onChange={handleChange} className="w-full bg-[#0a0a2e] border border-cyan-900 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500" min="100" max="250" />
                <div className="absolute right-3 top-2.5 text-cyan-600">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Og'irlik (kg) */}
            <div className="space-y-2">
              <label className="block text-sm font-medium">Og'irlik (kg)</label>
              <div className="relative">
                <input type="number" name="weight" value={formData.weight} onChange={handleChange} className="w-full bg-[#0a0a2e] border border-cyan-900 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500" min="30" max="200" />
                <div className="absolute right-3 top-2.5 text-cyan-600">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>


            {/* Mashq turi */}
            <div className="space-y-2">
              <label className="block text-sm font-medium">Mashq turi</label>
              <select name="exerciseType" value={formData.exerciseType} onChange={handleChange} className="w-full bg-[#0a0a2e] border border-cyan-900 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500">
                <option value="Running">Yugurish</option>
                <option value="Walking">Yurish</option>
                <option value="Swimming">Hovuzda suzish</option>
                <option value="Cycling">Velosipedda yurish</option>
                <option value="Weightlifting">Og'irlik ko'tarish</option>
                <option value="Yoga">Yoga</option>
                <option value="None">Hech nima</option>
              </select>
            </div>

            {/* Mashq davomiyligi (daqiqalar) */}
            <div className="space-y-2">
              <label className="block text-sm font-medium">Mashq davomiyligi (daqiqalar)</label>
              <div className="relative">
                <input type="number" name="exerciseDuration" value={formData.exerciseDuration} onChange={handleChange} className="w-full bg-[#0a0a2e] border border-cyan-900 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500" min="0" max="300" />
                <div className="absolute right-3 top-2.5 text-cyan-600">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-4 pt-4 border-t border-cyan-900">
            <motion.button type="button" onClick={onClose} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="px-6 cursor-pointer py-2 border border-cyan-700 rounded-md text-cyan-400 hover:bg-cyan-900/30">
              BEKOR QILISH
            </motion.button>
            <motion.button type="submit" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="px-6 py-2 bg-cyan-700 cursor-pointer rounded-md text-white hover:bg-cyan-600">
              SAQLASH & BOSHLASH
            </motion.button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}