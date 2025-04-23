"use client"

import { useEffect, useRef } from "react"

export default function WaterWave() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // 设置画布尺寸
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = 80 // 水波高度
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // 水波参数
    const waves = [
      { y: 15, length: 0.5, amplitude: 10, speed: 0.03, color: "rgba(0, 153, 255, 0.6)" },
      { y: 25, length: 0.7, amplitude: 15, speed: 0.02, color: "rgba(0, 153, 255, 0.4)" },
      { y: 35, length: 0.9, amplitude: 20, speed: 0.01, color: "rgba(0, 153, 255, 0.2)" },
    ]

    let animationFrame: number
    const startTime = Date.now()

    // 绘制水波
    const drawWaves = () => {
      if (!ctx || !canvas) return

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const currentTime = Date.now()
      const elapsed = currentTime - startTime

      waves.forEach((wave) => {
        ctx.beginPath()
        ctx.moveTo(0, canvas.height)

        // 绘制水波路径
        for (let x = 0; x <= canvas.width; x++) {
          const dx = x / canvas.width
          const offsetY = Math.sin(dx * Math.PI * 2 * wave.length + (elapsed * wave.speed) / 100) * wave.amplitude
          ctx.lineTo(x, canvas.height - wave.y - offsetY)
        }

        // 完成路径
        ctx.lineTo(canvas.width, canvas.height)
        ctx.closePath()

        // 填充水波
        ctx.fillStyle = wave.color
        ctx.fill()
      })

      animationFrame = requestAnimationFrame(drawWaves)
    }

    drawWaves()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      cancelAnimationFrame(animationFrame)
    }
  }, [])

  return (
    <div className="water-wave-container">
      <canvas ref={canvasRef} className="water-wave-canvas" />
    </div>
  )
}
