"use client"

import { useEffect, useRef } from "react"
import { useWeatherStore } from "@/lib/store"

export default function BackgroundEffects() {
  const { weatherType } = useWeatherStore()
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const container = containerRef.current

    // 清除现有特效
    container.innerHTML = ""

    if (weatherType === "rain") {
      // 创建雨滴
      for (let i = 0; i < 100; i++) {
        const drop = document.createElement("div")
        drop.classList.add("bg-effect-drop")
        drop.style.left = `${Math.random() * 100}%`
        drop.style.animationDuration = `${0.5 + Math.random() * 0.5}s`
        drop.style.animationDelay = `${Math.random() * 5}s`
        container.appendChild(drop)
      }
    } else if (weatherType === "snow") {
      // 创建雪花
      for (let i = 0; i < 50; i++) {
        const flake = document.createElement("div")
        flake.classList.add("bg-effect-flake")
        flake.style.left = `${Math.random() * 100}%`
        flake.style.width = `${3 + Math.random() * 5}px`
        flake.style.height = `${3 + Math.random() * 5}px`
        flake.style.animationDuration = `${5 + Math.random() * 10}s`
        flake.style.animationDelay = `${Math.random() * 5}s`
        container.appendChild(flake)
      }
    } else if (weatherType === "sunny") {
      // 创建阳光粒子
      const sunlight = document.createElement("div")
      sunlight.classList.add("bg-effect-sunlight")
      container.appendChild(sunlight)

      // 添加一些光斑
      for (let i = 0; i < 20; i++) {
        const glare = document.createElement("div")
        glare.classList.add("bg-effect-glare")
        glare.style.left = `${Math.random() * 100}%`
        glare.style.top = `${Math.random() * 100}%`
        glare.style.width = `${20 + Math.random() * 50}px`
        glare.style.height = `${20 + Math.random() * 50}px`
        glare.style.animationDuration = `${3 + Math.random() * 7}s`
        glare.style.animationDelay = `${Math.random() * 5}s`
        container.appendChild(glare)
      }
    }
  }, [weatherType])

  return <div ref={containerRef} className="absolute inset-0 pointer-events-none z-10"></div>
}
