import React, { useState, useEffect } from 'react';

const PerformanceMonitor = () => {
  const [fps, setFps] = useState(60);
  const [memory, setMemory] = useState(0);

  useEffect(() => {
    let frameCount = 0;
    let lastTime = performance.now();
    let animationId;

    const measureFPS = (currentTime) => {
      frameCount++;
      
      if (currentTime - lastTime >= 1000) {
        setFps(Math.round((frameCount * 1000) / (currentTime - lastTime)));
        frameCount = 0;
        lastTime = currentTime;
        
        // Measure memory usage if available
        if (performance.memory) {
          setMemory(Math.round(performance.memory.usedJSHeapSize / 1024 / 1024));
        }
      }
      
      animationId = requestAnimationFrame(measureFPS);
    };

    animationId = requestAnimationFrame(measureFPS);

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, []);

  // Only show in development
  if (process.env.NODE_ENV !== 'development') return null;

  return (
    <div className="fixed top-4 right-4 bg-black/80 text-white p-2 rounded text-xs font-mono z-50">
      <div>FPS: {fps}</div>
      {memory > 0 && <div>Memory: {memory}MB</div>}
    </div>
  );
};

export default PerformanceMonitor;