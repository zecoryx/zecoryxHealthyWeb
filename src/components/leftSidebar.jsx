"use client";

import { useRef, useEffect } from "react";
import { motion } from "framer-motion";

export default function LeftSidebar({ pulseRate, spo2, temperature, steps, sleepQuality }) {
  const canvasRef = useRef(null);

  // ECG grafik chizish
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    const width = canvas.width;
    const height = canvas.height;

    ctx.clearRect(0, 0, width, height);

    // Grid chizish
    ctx.strokeStyle = "#1e3a8a30";
    ctx.lineWidth = 1;

    // Vertikal chiziqlar
    for (let i = 0; i <= width; i += 20) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i, height);
      ctx.stroke();
    }

    // Gorizontal chiziqlar
    for (let i = 0; i <= height; i += 20) {
      ctx.beginPath();
      ctx.moveTo(0, i);
      ctx.lineTo(width, i);
      ctx.stroke();
    }

    // ECG chizig'i
    ctx.strokeStyle = "#22c55e";
    ctx.lineWidth = 2;
    ctx.beginPath();

    const segment = width / 20;
    const x = 0;

    // Asosiy ECG naqshi
    for (let i = 0; i < 4; i++) {
      const startX = i * segment * 5;

      // P to'lqini
      ctx.moveTo(startX, height / 2);
      ctx.quadraticCurveTo(startX + segment * 0.5, height / 2 - 10, startX + segment, height / 2);

      // PR segment
      ctx.lineTo(startX + segment * 1.5, height / 2);

      // QRS kompleks
      ctx.lineTo(startX + segment * 1.6, height / 2 + 5);
      ctx.lineTo(startX + segment * 1.7, height / 2 - 40);
      ctx.lineTo(startX + segment * 1.9, height / 2 + 20);
      ctx.lineTo(startX + segment * 2, height / 2);

      // ST segment
      ctx.lineTo(startX + segment * 3, height / 2);

      // T to'lqini
      ctx.quadraticCurveTo(startX + segment * 3.5, height / 2 - 15, startX + segment * 4, height / 2);

      // TP segment
      ctx.lineTo(startX + segment * 5, height / 2);
    }

    ctx.stroke();
  }, [pulseRate]);

  return (
    <motion.div initial={{ x: -300 }} animate={{ x: 0 }} transition={{ duration: 0.5 }} className="lg:w-80 w-full border-r border-cyan-900/50 p-4 flex flex-col space-y-4 lg:overflow-auto">
      {/* Qadamlar soni bo'limi */}
      <div className="border border-blue-900 rounded-lg p-4 bg-[#0a0a2e]/80">
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center">
            <h3 className="text-lg font-bold tracking-wider">QADAMLAR SONI</h3>
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }} className="ml-2">
              <svg className="w-4 h-4 text-cyan-500" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                <path d="M12 6V12L16 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </motion.div>
          </div>
        </div>

        <div className="flex items-center justify-center h-24 relative">
          <svg className="w-full h-full" viewBox="0 0 200 100">
            {/* Progress bar background */}
            <rect x="10" y="40" width="180" height="20" rx="10" fill="#0f172a" />

            {/* Progress bar fill */}
            <motion.rect x="10" y="40" height="20" rx="10" fill="#0ea5e9" initial={{ width: 0 }} animate={{ width: Math.min(180, (steps / 10000) * 180) }} transition={{ duration: 1 }} />

            {/* Qadamlar ikonkasi */}
            <motion.g initial={{ x: 0 }} animate={{ x: Math.min(180, (steps / 10000) * 180) }} transition={{ duration: 1 }}>
              <circle cx="10" cy="50" r="15" fill="#0284c7" />
              <path d="M7,50 L10,45 L13,50 L16,45 L19,50" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            </motion.g>

            {/* Maqsad chizig'i */}
            <line x1="150" y1="35" x2="150" y2="65" stroke="#ef4444" strokeWidth="2" strokeDasharray="4" />
            <text x="150" y="30" textAnchor="middle" fill="#ef4444" fontSize="10">
              MAQSAD
            </text>
          </svg>

          <div className="absolute bottom-0 left-0 right-0 flex justify-between px-2 text-xs">
            <div>0</div>
            <div>5000</div>
            <div>10000</div>
          </div>
        </div>

        <div className="mt-2 flex justify-center">
          <motion.div key={steps} initial={{ scale: 1.2 }} animate={{ scale: 1 }} className="text-3xl font-bold text-center">
            {steps.toLocaleString()}
            <div className="text-xs text-cyan-500">BUGUNDAGI QADAMLAR</div>
          </motion.div>
        </div>
      </div>

      {/* Uyqu sifati bo'limi */}
      <div className="border border-blue-900 rounded-lg p-4 bg-[#0a0a2e]/80">
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center">
            <h3 className="text-lg font-bold tracking-wider">UYQU SIFATI</h3>
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }} className="ml-2">
              <svg className="w-4 h-4 text-cyan-500" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                <path d="M12 6V12L16 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </motion.div>
          </div>
        </div>

        <div className="flex justify-center items-center h-32">
          <div className="relative w-32 h-32">
            <svg viewBox="0 0 100 100" className="w-full h-full">
              {/* Orqa fondagi aylana */}
              <circle cx="50" cy="50" r="45" fill="#0f172a" />

              {/* Progress arc */}
              <motion.path d={`M 50,50 L 50,5 A 45,45 0 ${sleepQuality > 50 ? 1 : 0},1 ${50 + 45 * Math.sin((sleepQuality / 100) * Math.PI * 2)},${50 - 45 * Math.cos((sleepQuality / 100) * Math.PI * 2)} Z`} fill="#0ea5e9" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }} />

              {/* Oy ikonkasi */}
              <path d="M39,35 C39,45 47,55 57,55 C52,55 45,50 45,40 C45,30 52,25 57,25 C47,25 39,25 39,35 Z" fill="#e2e8f0" transform="translate(10, 10)" />

              {/* Yulduzlar */}
              {[
                { x: 25, y: 30, size: 1.5 },
                { x: 70, y: 25, size: 2 },
                { x: 80, y: 45, size: 1 },
                { x: 65, y: 70, size: 1.5 },
                { x: 30, y: 65, size: 1 },
              ].map((star, i) => (
                <motion.circle
                  key={i}
                  cx={star.x}
                  cy={star.y}
                  r={star.size}
                  fill="#e2e8f0"
                  animate={{ opacity: [0.2, 1, 0.2] }}
                  transition={{
                    duration: 2 + Math.random() * 2,
                    repeat: Number.POSITIVE_INFINITY,
                    delay: Math.random() * 2,
                  }}
                />
              ))}
            </svg>

            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div key={sleepQuality} initial={{ scale: 1.2 }} animate={{ scale: 1 }} className="text-3xl font-bold">
                {sleepQuality}%
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Puls tezligi bo'limi */}
      <div className="border cursor-not-allowed opacity-40 select-none border-blue-900 rounded-lg p-4 bg-[#0a0a2e]/80">
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center">
            <h3 className="text-lg font-bold tracking-wider">PULS TEZLIGI</h3>
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }} className="ml-2">
              <svg className="w-4 h-4 text-cyan-500" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                <path d="M12 6V12L16 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </motion.div>
          </div>
        </div>

        <div className="h-32 w-full mb-4 bg-[#0a0a2e] border border-blue-900/50 rounded">
          <canvas ref={canvasRef} width="280" height="128" className="w-full h-full"></canvas>
        </div>

        <div className="flex justify-around text-center">
          <div>
            <motion.div key={pulseRate} initial={{ scale: 1.2 }} animate={{ scale: 1 }} className="text-3xl font-bold">
              {pulseRate}
            </motion.div>
            <div className="text-xs text-cyan-500">BPM</div>
          </div>
          <div>
            <motion.div key={spo2} initial={{ scale: 1.2 }} animate={{ scale: 1 }} className="text-3xl font-bold">
              {spo2}
            </motion.div>
            <div className="text-xs text-cyan-500">SPO2</div>
          </div>
        </div>
      </div>

      {/* Tana isilishi bo'limi */}
      <div className="border cursor-not-allowed opacity-40 select-none border-blue-900 rounded-lg p-4 bg-[#0a0a2e]/80">
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center">
            <h3 className="text-lg font-bold tracking-wider">TANA ISIQLIGI</h3>
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }} className="ml-2">
              <svg className="w-4 h-4 text-cyan-500" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                <path d="M12 6V12L16 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </motion.div>
          </div>
        </div>

        <div className="flex justify-center items-center h-32">
          <div className="relative w-16 flex flex-col items-center justify-center">
            <div className="absolute h-full w-4 bg-gradient-to-b from-red-500 via-yellow-500 to-blue-500 rounded-full opacity-30"></div>
            <div className="absolute bottom-0 h-full w-4 bg-black/50 rounded-full"></div>

            <div className="absolute h-1 w-8 bg-white left-4 top-[20%]"></div>
            <div className="absolute h-1 w-8 bg-white left-4 top-[50%]"></div>
            <div className="absolute h-1 w-8 bg-white left-4 top-[80%]"></div>

            <div className="absolute left-14 top-[20%] text-xs">38.0°</div>
            <div className="absolute left-14 top-[50%] text-xs">36.5°</div>
            <div className="absolute left-14 top-[80%] text-xs">35.0°</div>

            <motion.div className="absolute w-12 h-1 bg-white left-0 rounded-full" initial={{ top: "50%" }} animate={{ top: `${100 - ((temperature - 35) / 3) * 100}%` }} transition={{ duration: 1 }}></motion.div>
          </div>

          <div className="ml-16 flex flex-col items-center">
            <motion.div key={temperature} initial={{ scale: 1.2 }} animate={{ scale: 1 }} className="text-3xl font-bold">
              {temperature.toFixed(1)}°C
            </motion.div>
            <div className="text-xs text-cyan-500 mt-2">{temperature < 36 ? "ODATDAN PAST" : temperature > 37.5 ? "ODATDAN YUQORI" : "NORMAL"}</div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}