"use client";

import React, { useState, useRef, useCallback, useEffect } from "react";

// =============================================================================
// BeforeAfterSlider — Drag-to-compare image slider
// Works with both mouse and touch. Smooth, responsive, no lag.
// =============================================================================

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  caption?: string;
  beforeLabel?: string;
  afterLabel?: string;
}

export function BeforeAfterSlider({
  beforeImage,
  afterImage,
  caption,
  beforeLabel = "Before",
  afterLabel = "After",
}: BeforeAfterSliderProps) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const updatePosition = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  }, []);

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      setIsDragging(true);
      updatePosition(e.clientX);
    },
    [updatePosition]
  );

  const handleTouchStart = useCallback(
    (e: React.TouchEvent) => {
      setIsDragging(true);
      updatePosition(e.touches[0].clientX);
    },
    [updatePosition]
  );

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      e.preventDefault();
      updatePosition(e.clientX);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isDragging) return;
      updatePosition(e.touches[0].clientX);
    };

    const handleEnd = () => setIsDragging(false);

    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleEnd);
      window.addEventListener("touchmove", handleTouchMove, { passive: true });
      window.addEventListener("touchend", handleEnd);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleEnd);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleEnd);
    };
  }, [isDragging, updatePosition]);

  return (
    <div className="space-y-3">
      <div
        ref={containerRef}
        className="relative w-full h-[280px] md:h-[320px] lg:h-[420px] rounded-xl overflow-hidden cursor-col-resize select-none shadow-lg"
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
        role="slider"
        aria-label="Before and after comparison slider"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(sliderPosition)}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "ArrowLeft") setSliderPosition((p) => Math.max(0, p - 2));
          if (e.key === "ArrowRight") setSliderPosition((p) => Math.min(100, p + 2));
        }}
      >
        {/* After Image (full background) */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-[var(--color-primary-light)]"
          style={{ backgroundImage: `url(${afterImage})` }}
        >
          {/* Placeholder content when no image */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-white/20 text-2xl font-bold">AFTER</span>
          </div>
        </div>

        {/* Before Image (clipped) */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-[var(--color-primary)]"
          style={{
            backgroundImage: `url(${beforeImage})`,
            clipPath: `inset(0 ${100 - sliderPosition}% 0 0)`,
          }}
        >
          {/* Placeholder content when no image */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-white/20 text-2xl font-bold">BEFORE</span>
          </div>
        </div>

        {/* Slider Line & Handle */}
        <div
          className="absolute top-0 bottom-0 w-1 bg-white shadow-lg z-10"
          style={{ left: `${sliderPosition}%`, transform: "translateX(-50%)" }}
        >
          {/* Handle */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[44px] h-[44px] bg-white rounded-full shadow-[0_0_15px_rgba(255,255,255,0.7)] border border-gray-200 flex items-center justify-center">
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              className="text-[var(--color-primary)]"
            >
              <path
                d="M6 10L2 10M2 10L5 7M2 10L5 13M14 10L18 10M18 10L15 7M18 10L15 13"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>

        {/* Labels */}
        <div className="absolute top-2 left-2 md:top-4 md:left-4 bg-black/60 backdrop-blur-sm text-white text-xs font-semibold px-2 md:px-3 py-1 md:py-1.5 rounded-full">
          {beforeLabel}
        </div>
        <div className="absolute top-2 right-2 md:top-4 md:right-4 bg-black/60 backdrop-blur-sm text-white text-xs font-semibold px-2 md:px-3 py-1 md:py-1.5 rounded-full">
          {afterLabel}
        </div>
      </div>

      {/* Caption */}
      {caption && (
        <p className="text-sm text-[var(--color-text-muted)] text-center px-4">
          {caption}
        </p>
      )}
    </div>
  );
}
