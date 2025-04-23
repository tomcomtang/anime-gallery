"use client"

import { useState, useEffect } from "react"
import { Sun, Snowflake, CloudRain } from "lucide-react"
import { useWeatherStore } from "@/lib/store"

export default function WeatherEffects() {
  const { weatherType, setWeatherType } = useWeatherStore()
  const [raindrops, setRaindrops] = useState<{ id: number; left: number; delay: number; duration: number }[]>([])
  const [snowflakes, setSnowflakes] = useState<
    { id: number; left: number; size: number; delay: number; duration: number }[]
  >([])

  useEffect(() => {
    if (weatherType === "rain") {
      const drops = Array.from({ length: 100 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 5,
        duration: 0.5 + Math.random() * 0.5,
      }))
      setRaindrops(drops)
    } else if (weatherType === "snow") {
      const flakes = Array.from({ length: 100 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        size: 3 + Math.random() * 5,
        delay: Math.random() * 5,
        duration: 5 + Math.random() * 10,
      }))
      setSnowflakes(flakes)
    }
  }, [weatherType])

  return (
    <>
      <div className="weather-controls">
        <button
          className={`weather-button ${weatherType === "clear" ? "active" : ""}`}
          onClick={() => setWeatherType("clear")}
          aria-label="Clear weather"
          style={{ cursor: "pointer" }} // 确保鼠标指针可见
        >
          <Sun size={20} />
        </button>
        <button
          className={`weather-button ${weatherType === "rain" ? "active" : ""}`}
          onClick={() => setWeatherType("rain")}
          aria-label="Rainy weather"
          style={{ cursor: "pointer" }} // 确保鼠标指针可见
        >
          <CloudRain size={20} />
        </button>
        <button
          className={`weather-button ${weatherType === "snow" ? "active" : ""}`}
          onClick={() => setWeatherType("snow")}
          aria-label="Snowy weather"
          style={{ cursor: "pointer" }} // 确保鼠标指针可见
        >
          <Snowflake size={20} />
        </button>
        <button
          className={`weather-button ${weatherType === "sunny" ? "active" : ""}`}
          onClick={() => setWeatherType("sunny")}
          aria-label="Sunny weather"
          style={{ cursor: "pointer" }} // 确保鼠标指针可见
        >
          <Sun size={20} />
        </button>
      </div>

      {weatherType === "rain" && (
        <div className="rain">
          {raindrops.map((drop) => (
            <div
              key={drop.id}
              className="rain-drop"
              style={{
                left: `${drop.left}%`,
                animationDelay: `${drop.delay}s`,
                animationDuration: `${drop.duration}s`,
              }}
            />
          ))}
        </div>
      )}

      {weatherType === "snow" && (
        <div className="snow">
          {snowflakes.map((flake) => (
            <div
              key={flake.id}
              className="snowflake"
              style={{
                left: `${flake.left}%`,
                width: `${flake.size}px`,
                height: `${flake.size}px`,
                animationDelay: `${flake.delay}s`,
                animationDuration: `${flake.duration}s`,
              }}
            />
          ))}
        </div>
      )}

      {weatherType === "sunny" && <div className="sunshine" />}
    </>
  )
}
