"use client";
import { motion } from "framer-motion";

export default function RightSidebar({ systolic, diastolic, breathingRate, exerciseType, exerciseDuration, height, weight }) {
  // Hisoblash BMI
  const bmi = weight / ((height / 100) * (height / 100));
  const bmiCategory = bmi < 18.5 ? "Kam vaznli" : bmi < 25 ? "Normal" : bmi < 30 ? "Ortacha vaznli" : "Semiz";

  // BMI rang
  const bmiColor = bmi < 18.5 ? "#3b82f6" : bmi < 25 ? "#22c55e" : bmi < 30 ? "#eab308" : "#ef4444";

  return (
    <motion.div initial={{ x: 300 }} animate={{ x: 0 }} transition={{ duration: 0.5 }} className="lg:w-80 w-full border-l border-cyan-900/50 p-4 flex flex-col space-y-4 lg:overflow-auto">
      {/* Bo'y & Og'irlik bo'limi */}
      <div className="border border-blue-900 rounded-lg p-4 bg-[#0a0a2e]/80">
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center">
            <h3 className="text-lg font-bold tracking-wider">BO'Y & OG'IRLIK</h3>
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }} className="ml-2">
              <svg className="w-4 h-4 text-cyan-500" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                <path d="M12 6V12L16 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </motion.div>
          </div>
        </div>

        <div className="flex justify-around mb-4">
          <div className="text-center">
            <div className="text-xs text-cyan-500">BO'Y</div>
            <motion.div key={height} initial={{ scale: 1.2 }} animate={{ scale: 1 }} className="text-2xl font-bold">
              {height} <span className="text-sm">cm</span>
            </motion.div>
          </div>
          <div className="text-center">
            <div className="text-xs text-cyan-500">OG'IRLIK</div>
            <motion.div key={weight} initial={{ scale: 1.2 }} animate={{ scale: 1 }} className="text-2xl font-bold">
              {weight} <span className="text-sm">kg</span>
            </motion.div>
          </div>
        </div>

        <div className="bg-[#0f172a] rounded-lg p-3">
          <div className="flex justify-between mb-1">
            <div className="text-xs">BMI</div>
            <div className="text-xs">{bmiCategory}</div>
          </div>

          <div className="h-4 bg-[#1e293b] rounded-full overflow-hidden mb-2">
            <motion.div className="h-full rounded-full" style={{ backgroundColor: bmiColor, width: `${Math.min(100, (bmi / 40) * 100)}%` }} initial={{ width: 0 }} animate={{ width: `${Math.min(100, (bmi / 40) * 100)}%` }} transition={{ duration: 1 }}></motion.div>
          </div>

          <div className="flex justify-between text-xs">
            <div>0</div>
            <div>18.5</div>
            <div>25</div>
            <div>30</div>
            <div>40</div>
          </div>

          <div className="mt-2 text-center">
            <motion.div key={bmi} initial={{ scale: 1.2 }} animate={{ scale: 1 }} className="text-xl font-bold" style={{ color: bmiColor }}>
              {bmi.toFixed(1)}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Mashq bo'limi */}
      <div className="border border-blue-900 rounded-lg p-4 bg-[#0a0a2e]/80">
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center">
            <h3 className="text-lg font-bold tracking-wider">MASHQ</h3>
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }} className="ml-2">
              <svg className="w-4 h-4 text-cyan-500" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                <path d="M12 6V12L16 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </motion.div>
          </div>
        </div>

        <div className="flex flex-col items-center mb-4">
          <div className="text-center mb-2">
            <div className="text-xs text-cyan-500">TURI</div>
            <motion.div key={exerciseType} initial={{ scale: 1.2 }} animate={{ scale: 1 }} className="text-xl font-bold">
              {exerciseType}
            </motion.div>
          </div>

          <div className="w-full bg-[#0f172a] h-4 rounded-full overflow-hidden mb-1">
            <motion.div className="h-full bg-cyan-500 rounded-full" initial={{ width: 0 }} animate={{ width: `${Math.min(100, (exerciseDuration / 60) * 100)}%` }} transition={{ duration: 1 }}></motion.div>
          </div>

          <div className="flex justify-between w-full text-xs">
            <div>0 daq</div>
            <div>30 daq</div>
            <div>60 daq</div>
          </div>

          <div className="mt-4 text-center">
            <motion.div key={exerciseDuration} initial={{ scale: 1.2 }} animate={{ scale: 1 }} className="text-2xl font-bold">
              {exerciseDuration} <span className="text-sm">daq</span>
            </motion.div>
            <div className="text-xs text-cyan-500 mt-1">{exerciseDuration < 15 ? "KAM" : exerciseDuration < 30 ? "O'RTACHA" : "KUCHLI"} FAOLIK</div>
          </div>
        </div>
      </div>

      {/* Qon bosimi bo'limi */}
      <div className="border border-blue-900 cursor-not-allowed opacity-40 select-none rounded-lg p-4 bg-[#0a0a2e]/80">
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center">
            <h3 className="text-lg font-bold tracking-wider">QON BOSIMI</h3>
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }} className="ml-2">
              <svg className="w-4 h-4 text-cyan-500" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                <path d="M12 6V12L16 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </motion.div>
          </div>
        </div>

        <div className="flex justify-center mb-4">
          <div className="relative w-40 h-40">
            {/* Doira grafikasi */}
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <circle cx="50" cy="50" r="45" fill="#0f172a" />

              <motion.circle
                cx="50"
                cy="50"
                r="40"
                fill="none"
                stroke="#eab308"
                strokeWidth="3"
                strokeDasharray="251.2"
                strokeDashoffset="50"
                initial={{ rotate: -90, scale: 0.8 }}
                animate={{
                  rotate: -90,
                  scale: 1,
                  strokeDashoffset: 251.2 - (systolic / 200) * 251.2,
                }}
                transition={{ duration: 1 }}
              />

              <motion.circle
                cx="50"
                cy="50"
                r="35"
                fill="none"
                stroke="#22c55e"
                strokeWidth="3"
                strokeDasharray="219.8"
                strokeDashoffset="50"
                initial={{ rotate: -90, scale: 0.8 }}
                animate={{
                  rotate: -90,
                  scale: 1,
                  strokeDashoffset: 219.8 - (diastolic / 120) * 219.8,
                }}
                transition={{ duration: 1 }}
              />
            </svg>

            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="flex items-baseline">
                <motion.span key={systolic} initial={{ scale: 1.2 }} animate={{ scale: 1 }} className="text-2xl font-bold">
                  {systolic}
                </motion.span>
                <span className="text-xs ml-1">Sistolik</span>
              </div>
              <div className="flex items-baseline">
                <motion.span key={diastolic} initial={{ scale: 1.2 }} animate={{ scale: 1 }} className="text-2xl font-bold">
                  {diastolic}
                </motion.span>
                <span className="text-xs ml-1">Diastolik</span>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center text-xs">{systolic < 120 && diastolic < 80 ? <span className="text-green-500">Normal</span> : systolic < 130 && diastolic < 80 ? <span className="text-blue-500">Yuksalgan</span> : systolic < 140 || diastolic < 90 ? <span className="text-yellow-500">1-DARAJALI GIPERTENZIYA</span> : <span className="text-red-500">2-DARAJALI GIPERTENZIYA</span>}</div>
      </div>

      {/* Nafas olish tezligi bo'limi */}
      <div className="border cursor-not-allowed opacity-40 select-none border-blue-900 rounded-lg p-4 bg-[#0a0a2e]/80">
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center">
            <h3 className="text-lg font-bold tracking-wider">NAFAS OLISH TEZLIGI</h3>
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }} className="ml-2">
              <svg className="w-4 h-4 text-cyan-500" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                <path d="M12 6V12L16 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </motion.div>
          </div>
        </div>

        <div className="flex space-x-4">
          <div className="w-2/3">
            <div className="h-32 w-full bg-[#0a0a2e] border border-blue-900/50 rounded p-2 flex items-end justify-around">
              {breathingRate.map((rate, index) => (
                <motion.div key={index} initial={{ height: 0 }} animate={{ height: `${(rate / 30) * 100}%` }} transition={{ duration: 0.5, delay: index * 0.1 }} className={`w-6 ${index === 4 ? "bg-red-500" : "bg-green-500"} rounded-t`}></motion.div>
              ))}
            </div>
            <div className="flex justify-around mt-1 text-xs">
              <div>0</div>
              <div>1</div>
              <div>2</div>
              <div>3</div>
              <div>4</div>
              <div>5</div>
            </div>
          </div>

          <div className="w-1/3">
            <div className="h-32 w-full bg-[#0a0a2e] border border-blue-900/50 rounded p-2 relative overflow-hidden">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <defs>
                  <linearGradient id="lungGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#3b82f6" />
                    <stop offset="100%" stopColor="#22c55e" />
                  </linearGradient>
                </defs>
                <path d="M50,10 C60,10 70,20 70,30 C70,40 60,50 70,60 C80,70 80,80 70,90 C60,100 40,100 30,90 C20,80 20,70 30,60 C40,50 30,40 30,30 C30,20 40,10 50,10 Z" fill="url(#lungGradient)" />

                {/* Kislorod uchun animatsiyali nuqtalar */}
                {Array.from({ length: 20 }).map((_, i) => (
                  <motion.circle
                    key={i}
                    cx={30 + Math.random() * 40}
                    cy={30 + Math.random() * 40}
                    r={1 + Math.random() * 1.5}
                    fill="#22d3ee"
                    initial={{ opacity: 0.2 }}
                    animate={{
                      opacity: [0.2, 0.8, 0.2],
                      y: [0, -5, 0],
                    }}
                    transition={{
                      duration: 2 + Math.random() * 2,
                      repeat: Number.POSITIVE_INFINITY,
                      delay: Math.random() * 2,
                    }}
                  />
                ))}
              </svg>
            </div>
          </div>
        </div>

        <div className="mt-2 text-center">
          <motion.div key={Math.max(...breathingRate)} initial={{ scale: 1.2 }} animate={{ scale: 1 }} className="text-2xl font-bold">
            {Math.max(...breathingRate)} <span className="text-sm">BPM</span>
          </motion.div>
          <div className="text-xs text-cyan-500 mt-1">{Math.max(...breathingRate) < 12 ? "Normaldan past" : Math.max(...breathingRate) > 20 ? "Normaldan yuqori" : "Normal"} TEZLIK</div>
        </div>
      </div>
    </motion.div>
  );
}