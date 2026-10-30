import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DEFAULT_CONFIG } from './config';
import BackgroundElements from './components/BackgroundElements';
import SparkleTrail from './components/SparkleTrail';
import AudioPlayer from './components/AudioPlayer';

// Scenes
import Scene1Password from './components/scenes/Scene1Password';
import Scene2Reveal from './components/scenes/Scene2Reveal';
import Scene3Balloons from './components/scenes/Scene3Balloons';
import Scene4Cake from './components/scenes/Scene4Cake';
import Scene5Letter from './components/scenes/Scene5Letter';
import Scene6Celebration from './components/scenes/Scene6Celebration';

import { sceneVariants } from './utils/motionVariants';

const STORAGE_KEY = 'birthday_surprise_config_v8';

export default function App() {
  const [currentScene, setCurrentScene] = useState(1);
  const [direction, setDirection] = useState(1);
  const [config, setConfig] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        parsed.recipientName = DEFAULT_CONFIG.recipientName;
        parsed.secretPin = DEFAULT_CONFIG.secretPin;
        parsed.pinHint = DEFAULT_CONFIG.pinHint;
        return parsed;
      }
    } catch {
      // Fallback
    }
    return DEFAULT_CONFIG;
  });

  const goToScene = (nextScene) => {
    setDirection(nextScene > currentScene ? 1 : -1);
    setCurrentScene(nextScene);
  };

  return (
    <div className="relative min-h-screen bg-[#030712] text-[#FFF8E7] flex flex-col justify-center overflow-x-hidden selection:bg-[#E5C07B] selection:text-[#030712]">
      {/* Interactive Golden Stardust Trail on Cursor & Touch */}
      <SparkleTrail />

      {/* Floating Audio Controller */}
      <AudioPlayer audioConfig={config.audio} />

      {/* Dynamic Magical Background Elements (Shooting Stars, Petals, Butterflies) */}
      <BackgroundElements />

      {/* Main Interactive Stage with Kinetic Directional Scene Transitions */}
      <main className="flex-1 flex flex-col items-center justify-center relative z-10 w-full max-w-5xl mx-auto px-4 py-6">
        <AnimatePresence custom={direction} mode="wait">
          {currentScene === 1 && (
            <motion.div
              key="scene-1"
              custom={direction}
              variants={sceneVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="w-full flex justify-center"
            >
              <Scene1Password
                config={config}
                onUnlock={() => goToScene(2)}
              />
            </motion.div>
          )}

          {currentScene === 2 && (
            <motion.div
              key="scene-2"
              custom={direction}
              variants={sceneVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="w-full flex justify-center"
            >
              <Scene2Reveal
                config={config}
                onNext={() => goToScene(3)}
              />
            </motion.div>
          )}

          {currentScene === 3 && (
            <motion.div
              key="scene-3"
              custom={direction}
              variants={sceneVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="w-full flex justify-center"
            >
              <Scene3Balloons
                config={config}
                onNext={() => goToScene(4)}
              />
            </motion.div>
          )}

          {currentScene === 4 && (
            <motion.div
              key="scene-4"
              custom={direction}
              variants={sceneVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="w-full flex justify-center"
            >
              <Scene4Cake
                config={config}
                onNext={() => goToScene(5)}
              />
            </motion.div>
          )}

          {currentScene === 5 && (
            <motion.div
              key="scene-5"
              custom={direction}
              variants={sceneVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="w-full flex justify-center"
            >
              <Scene5Letter
                config={config}
                onNext={() => goToScene(6)}
              />
            </motion.div>
          )}

          {currentScene === 6 && (
            <motion.div
              key="scene-6"
              custom={direction}
              variants={sceneVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="w-full flex justify-center"
            >
              <Scene6Celebration
                config={config}
                onReplay={() => goToScene(1)}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
