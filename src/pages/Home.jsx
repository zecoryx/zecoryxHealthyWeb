"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../widgets/Navbar";
import HolographicAvatar from "../components/HolographicAvatar";
import LeftSidebar from "../components/leftSidebar";
import HealthDataModal from "../components/healthData-modal";
import RightSidebar from "../components/rightSidebar";

export default function Home() {
  const [scanning, setScanning] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [healthData, setHealthData] = useState({
    steps: 0,
    sleepQuality: 0,
    height: 0,
    weight: 0,
    bloodPressureSys: 0,
    bloodPressureDia: 0,
    exerciseType: "Running",
    exerciseDuration: 0,
  });

  // Initialize all metrics to 0
  const [pulseRate, setPulseRate] = useState(0);
  const [spo2, setSpo2] = useState(0);
  const [temperature, setTemperature] = useState(0);
  const [breathingRate, setBreathingRate] = useState([0, 0, 0, 0, 0, 0]);

  // Update metrics based on health data only if data has been entered
  useEffect(() => {
    // Check if any data has been entered
    const hasData = healthData.steps > 0 || healthData.sleepQuality > 0 || healthData.height > 0 || healthData.weight > 0 || healthData.bloodPressureSys > 0 || healthData.bloodPressureDia > 0 || healthData.exerciseDuration > 0;

    if (scanning && hasData) {
      // Calculate pulse rate based on exercise type and duration
      // const basePulse = 60 + (healthData.exerciseDuration / 60) * 10;
      // const exerciseMultiplier = healthData.exerciseType === "Running" ? 1.5 : healthData.exerciseType === "Swimming" ? 1.3 : healthData.exerciseType === "Cycling" ? 1.4 : 1.2;
      const basePulse = 0;
      const exerciseMultiplier = 0;

      // Simulate changing values with some randomness
      const interval = setInterval(() => {
        // const calculatedPulse = Math.floor(basePulse * exerciseMultiplier + (Math.random() * 10 - 5));
        // setPulseRate(calculatedPulse);
        // setSpo2(Math.min(99, Math.floor(100 - (calculatedPulse - 60) / 10) + Math.floor(Math.random() * 2)));
        const calculatedPulse = 0;
        setPulseRate(calculatedPulse);
        setSpo2(0);

        // Temperature slightly affected by exercise
        // const baseTemp = 36.5 + (healthData.exerciseDuration / 120) * 0.5;
        // setTemperature(baseTemp + Math.random() * 0.3);
        const baseTemp = 0;
        setTemperature(0);

        // Breathing rate affected by exercise type and duration
        // const baseBreathingRate = 12 + (healthData.exerciseDuration / 30) * 3;
        // setBreathingRate([Math.floor(baseBreathingRate * 0.7 + Math.random() * 3), Math.floor(baseBreathingRate * 0.8 + Math.random() * 3), Math.floor(baseBreathingRate * 0.9 + Math.random() * 3), Math.floor(baseBreathingRate * 1.0 + Math.random() * 3), Math.floor(baseBreathingRate * 0.9 + Math.random() * 3), Math.floor(baseBreathingRate * 0.8 + Math.random() * 3)]);
        const baseBreathingRate = 0;
        setBreathingRate([0, 0, 0]);
      }, 2000);

      return () => clearInterval(interval);
    } else if (!hasData) {
      // Reset all values to 0 if no data has been entered
      setPulseRate(0);
      setSpo2(0);
      setTemperature(0);
      setBreathingRate([0, 0, 0, 0, 0, 0]);
    }
  }, [scanning, healthData]);

  const handleStopButton = () => {
    setScanning(false);
    setShowModal(true);
  };

  const handleModalSubmit = (newData) => {
    setHealthData({ ...healthData, ...newData });
    setShowModal(false);
    setScanning(true);
  };
  const audioRef = useRef(null);
  useEffect(() => {
    const audio = new Audio("/public/preview.mp3");
    audioRef.current = audio;

    const playAudio = () => {
      audio.play().catch((error) => {
        console.error("Autoplay was prevented:", error);
      });
    };

    const handleVisibilityChange = () => {
      if (!document.hidden) {
        playAudio();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    playAudio();

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      audio.pause();
    };
  }, []);

  return (
    <div className="flex flex-col bg-[#0a0a2e] text-cyan-400 font-mono overflow-scroll">
      <Navbar />
      <div className="flex lg:flex-row flex-col overflow-hidden">
        <LeftSidebar pulseRate={pulseRate} spo2={spo2} temperature={temperature} steps={healthData.steps} sleepQuality={healthData.sleepQuality} />

        <main className="flex-1 flex flex-col items-center justify-center relative p-4">
          <HolographicAvatar scanning={scanning} healthData={healthData} />

          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={handleStopButton} className="lg:absolute cursor-pointer bottom-8 right-8 bg-red-600 text-white px-8 py-3 rounded-md font-bold tracking-widest">
            Malumot Qoshish
          </motion.button>
        </main>

        <RightSidebar systolic={healthData.bloodPressureSys} diastolic={healthData.bloodPressureDia} breathingRate={breathingRate} exerciseType={healthData.exerciseType} exerciseDuration={healthData.exerciseDuration} height={healthData.height} weight={healthData.weight} />
      </div>

      <AnimatePresence>{showModal && <HealthDataModal initialData={healthData} onClose={() => setShowModal(false)} onSubmit={handleModalSubmit} />}</AnimatePresence>
    </div>
  );
}
