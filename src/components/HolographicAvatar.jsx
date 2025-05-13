"use client";
import { motion } from "framer-motion";
import { avatar } from "../assets";

export default function HolographicAvatar({ scanning, healthData = {} }) {
  // Calculate BMI if height and weight are available
  const bmi = healthData.height && healthData.weight ? (healthData.weight / ((healthData.height / 100) * (healthData.height / 100))).toFixed(1) : 0;

  // Function to get recommendations based on health metrics
  const getRecommendations = () => {
    if (!healthData) return [];

    const recommendations = [];

    // Steps recommendation
    if (healthData.steps !== undefined) {
      if (healthData.steps === 0) {
        // No data entered yet
      } else if (healthData.steps < 3000) {
        recommendations.push({
          metric: "Qadamlar",
          value: healthData.steps,
          status: "danger",
          icon: "🔴",
          message: "Juda kam harakat, kuniga kamida 6,000 qadam yuring!",
        });
      } else if (healthData.steps < 7000) {
        recommendations.push({
          metric: "Qadamlar",
          value: healthData.steps,
          status: "warning",
          icon: "🟡",
          message: "Yaxshi, lekin biroz ko'proq harakat zarur",
        });
      } else if (healthData.steps < 10000) {
        recommendations.push({
          metric: "Qadamlar",
          value: healthData.steps,
          status: "success",
          icon: "🟢",
          message: "A'lo! Sog'lom hayot uchun yetarli faollik!",
        });
      } else {
        recommendations.push({
          metric: "Qadamlar",
          value: healthData.steps,
          status: "excellent",
          icon: "🟣",
          message: "Mukammal! Jismoniy faollik a'lo darajada!",
        });
      }
    }

    // Sleep quality recommendation
    if (healthData.sleepQuality !== undefined) {
      if (healthData.sleepQuality === 0) {
        // No data entered yet
      } else if (healthData.sleepQuality < 40) {
        recommendations.push({
          metric: "Uyqu sifati",
          value: `${healthData.sleepQuality}%`,
          status: "danger",
          icon: "🔴",
          message: "Uyqu sifati juda yomon. Ertalab charchoq sezilsa, uyqu gigiyenasini tekshiring.",
        });
      } else if (healthData.sleepQuality < 70) {
        recommendations.push({
          metric: "Uyqu sifati",
          value: `${healthData.sleepQuality}%`,
          status: "warning",
          icon: "🟡",
          message: "Yetarli emas, tinchroq muhit, telefonni uxlaganda o'chirish yordam beradi.",
        });
      } else if (healthData.sleepQuality < 90) {
        recommendations.push({
          metric: "Uyqu sifati",
          value: `${healthData.sleepQuality}%`,
          status: "success",
          icon: "🟢",
          message: "Uyqu sifatli, yaxshi davom eting",
        });
      } else {
        recommendations.push({
          metric: "Uyqu sifati",
          value: `${healthData.sleepQuality}%`,
          status: "excellent",
          icon: "🟣",
          message: "Mukammal uyqu! Tana va ong tiklanmoqda. Zo'r!",
        });
      }
    }

    // BMI recommendation
    if (bmi > 0) {
      if (bmi < 18.5) {
        recommendations.push({
          metric: "BMI",
          value: bmi,
          status: "warning",
          icon: "🟡",
          message: "Ozg'inlik. Ko'proq ovqat, jismoniy faoliyatni balanslash",
        });
      } else if (bmi < 25) {
        recommendations.push({
          metric: "BMI",
          value: bmi,
          status: "success",
          icon: "🟢",
          message: "Ideal vazn! Shu holatda davom eting",
        });
      } else if (bmi < 30) {
        recommendations.push({
          metric: "BMI",
          value: bmi,
          status: "warning",
          icon: "🟡",
          message: "Ortiqcha vazn. Harakatni oshiring, dietani kuzating",
        });
      } else {
        recommendations.push({
          metric: "BMI",
          value: bmi,
          status: "danger",
          icon: "🔴",
          message: "Semizlik. Jiddiy dietologik nazorat zarur",
        });
      }
    }

    // Exercise recommendation
    if (healthData.exerciseDuration !== undefined) {
      if (healthData.exerciseDuration === 0) {
        // No data entered yet
      } else if (healthData.exerciseDuration < 15) {
        recommendations.push({
          metric: "Mashq",
          value: `${healthData.exerciseDuration} daqiqa`,
          status: "warning",
          icon: "🟡",
          message: "Jismoniy faollik kam. Kuniga kamida 30 daqiqa mashq qilish tavsiya etiladi.",
        });
      } else if (healthData.exerciseDuration < 30) {
        recommendations.push({
          metric: "Mashq",
          value: `${healthData.exerciseDuration} daqiqa`,
          status: "success",
          icon: "🟢",
          message: "Yaxshi! Muntazam mashq qilish davom eting.",
        });
      } else {
        recommendations.push({
          metric: "Mashq",
          value: `${healthData.exerciseDuration} daqiqa`,
          status: "excellent",
          icon: "🟣",
          message: "A'lo! Jismoniy faollik yuqori darajada.",
        });
      }
    }

    return recommendations;
  };

  const recommendations = getRecommendations();
  const hasRecommendations = recommendations.length > 0;

  const hasData = healthData.steps > 0 || healthData.sleepQuality > 0 || healthData.height > 0 || healthData.weight > 0 || healthData.bloodPressureSys > 0 || healthData.bloodPressureDia > 0 || healthData.exerciseDuration > 0;

  return (
    <div className="flex flex-col items-center">
      {scanning && hasData && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: scanning ? 1 : 0, y: scanning ? 0 : 20 }} transition={{ duration: 1 }} className="text-center mb-4 w-full">
          <motion.h2 animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }} className="text-2xl md:text-3xl tracking-widest">
            {hasRecommendations ? "Tavsiya" : "TAHLIL QILINMOQDA..."}
          </motion.h2>

          {!hasRecommendations && (
            <div className="w-full h-0.5 bg-cyan-500/30 mt-1 relative overflow-hidden">
              <motion.div
                className="absolute top-0 left-0 h-full bg-cyan-500"
                animate={{ x: ["0%", "100%"] }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                }}
                style={{ width: "30%" }}
              />
            </div>
          )}
        </motion.div>
      )}

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.5 }} className="relative w-[250px] h-[400px] md:w-[300px] md:h-[500px] mx-auto">
        {/* Rotating body with scan */}
        <motion.div
          animate={{ rotateY: [0, 10, 0, -10, 0] }}
          transition={{
            rotateY: {
              duration: 8,
              repeat: Infinity,
              ease: "linear",
            },
          }}
          className="origin-center"
        >
          <img src={avatar} alt="Human Body" className="w-full h-full" />
          <svg width="100%" height="100%" viewBox="0 0 300 500" className="absolute top-0 left-0">
            {/* Scanning line */}
            {scanning && (
              <motion.line
                x1="0"
                y1="250"
                x2="300"
                y2="250"
                stroke="#0ea5e9"
                strokeWidth="2"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: [0, 1, 0],
                  y1: [0, 500],
                  y2: [0, 500],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
            )}
          </svg>
        </motion.div>

        {/* Scanning grid effect */}
        {scanning && (
          <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
            <svg width="100%" height="100%" viewBox="0 0 300 500" className="w-full h-full">
              {/* Horizontal grid */}
              {Array.from({ length: 20 }).map((_, i) => (
                <motion.line key={`h-${i}`} x1="0" y1={i * 25} x2="300" y2={i * 25} stroke="#0ea5e920" strokeWidth="1" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: i * 0.05 }} />
              ))}
              {/* Vertical grid */}
              {Array.from({ length: 12 }).map((_, i) => (
                <motion.line key={`v-${i}`} x1={i * 25} y1="0" x2={i * 25} y2="500" stroke="#0ea5e920" strokeWidth="1" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: i * 0.05 }} />
              ))}
            </svg>
          </div>
        )}

        {/* Highlighted body points */}
        {scanning && (
          <svg width="100%" height="100%" viewBox="0 0 300 500" className="absolute top-0 left-0">
            {[
              { x: 150, y: 60 }, // Head
              { x: 150, y: 130 }, // Chest
              { x: 150, y: 185 }, // Abs
              { x: 100, y: 140 }, // Left arm
              { x: 200, y: 140 }, // Right arm
              { x: 130, y: 280 }, // Left thigh
              { x: 170, y: 280 }, // Right thigh
            ].map((point, i) => (
              <motion.circle
                key={i}
                cx={point.x}
                cy={point.y}
                r="4"
                fill="#0ea5e9"
                initial={{ opacity: 0, r: 0 }}
                animate={{
                  opacity: [0, 1, 0],
                  r: [0, 4, 0],
                }}
                transition={{
                  duration: 2,
                  delay: i * 0.3,
                  repeat: Infinity,
                  repeatDelay: 3,
                }}
              />
            ))}
          </svg>
        )}
      </motion.div>

      {/* Enhanced Base platform */}
      <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, delay: 1.5 }} className="mt-4 relative w-[300px] md:w-[400px] h-[80px] md:h-[100px]">
        <div className="absolute inset-0 bg-cyan-500/10 rounded-full blur-2xl z-[-1]"></div>

        <svg viewBox="0 0 400 100" className="w-full h-full">
          {/* Outer glow */}
          <ellipse cx="200" cy="50" rx="200" ry="50" fill="#0c4a6e" />
          {/* Platform layers with more depth */}
          <ellipse cx="200" cy="50" rx="180" ry="45" fill="#0369a1" />
          <ellipse cx="200" cy="50" rx="160" ry="40" fill="#0284c7" />
          <ellipse cx="200" cy="50" rx="140" ry="35" fill="#0ea5e9" />
          <ellipse cx="200" cy="50" rx="120" ry="30" fill="#38bdf8" />
          <ellipse cx="200" cy="50" rx="100" ry="25" fill="#7dd3fc" fillOpacity="0.5" />

          {/* Rotating elements - more pronounced and stable */}
          <motion.g
            animate={{ rotate: 360 }}
            style={{ transformOrigin: "200px 50px" }} // Rotate markazini aniqlaymiz
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            {Array.from({ length: 16 }).map((_, i) => (
              <motion.line
                key={i}
                x1="200"
                y1="50"
                x2={200 + 190 * Math.cos((i * Math.PI) / 8)}
                y2={50 + 47 * Math.sin((i * Math.PI) / 8)}
                stroke="#7dd3fc"
                strokeWidth="1.5"
                strokeOpacity="0.7"
                animate={{
                  opacity: [0.3, 0.8, 0.3],
                  strokeWidth: [1, 2, 1],
                }}
                transition={{
                  duration: 3,
                  delay: i * 0.1,
                  repeat: Infinity,
                }}
              />
            ))}
          </motion.g>

          {/* Inner pulse effect */}
          <motion.circle
            cx="200"
            cy="50"
            r="30"
            fill="none"
            stroke="#bae6fd"
            strokeWidth="1.5"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
              opacity: [0, 0.5, 0],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: 4,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />
        </svg>
      </motion.div>

      {/* Health recommendations section - made more responsive */}
      {hasRecommendations && (
        <motion.div className="mt-8 w-full max-w-2xl bg-[#0a0a2e]/80 border border-cyan-900 rounded-lg p-4 mx-4" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.5 }}>
          <h3 className="text-xl font-bold text-cyan-400 mb-4 text-center">SALOMATLIK TAHLILI</h3>

          <div className="space-y-4">
            {recommendations.map((rec, index) => (
              <motion.div key={index} className={`p-3 rounded-lg border ${rec.status === "danger" ? "border-red-600 bg-red-900/20" : rec.status === "warning" ? "border-yellow-600 bg-yellow-900/20" : rec.status === "success" ? "border-green-600 bg-green-900/20" : "border-purple-600 bg-purple-900/20"}`} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3, delay: index * 0.1 }}>
                <div className="flex items-start">
                  <span className="text-2xl mr-3">{rec.icon}</span>
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-1 gap-1">
                      <h4 className="font-bold text-cyan-300">{rec.metric}</h4>
                      <span className="text-sm font-mono bg-[#0a0a2e] px-2 py-1 rounded inline-block">{rec.value}</span>
                    </div>
                    <p className="text-sm text-cyan-100">{rec.message}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Summary section */}
          {hasRecommendations && (
            <motion.div className="mt-6 p-4 border border-cyan-800 rounded-lg bg-cyan-900/10" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: recommendations.length * 0.1 + 0.3 }}>
              <h4 className="font-bold text-cyan-300 mb-2">UMUMIY TAVSIYA</h4>
              <p className="text-sm text-cyan-100">{recommendations.filter((r) => r.status === "danger").length > 0 ? "Salomatligingizda e'tibor talab qiladigan holatlar mavjud. Yuqoridagi tavsiyalarga amal qiling." : recommendations.filter((r) => r.status === "warning").length > 0 ? "Salomatligingiz qoniqarli, lekin yaxshilash imkoniyatlari bor. Tavsiyalarga amal qiling." : "Salomatligingiz yaxshi holatda! Shu tartibda davom eting."}</p>
            </motion.div>
          )}
        </motion.div>
      )}
    </div>
  );
}