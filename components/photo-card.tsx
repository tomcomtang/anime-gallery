"use client"
import { useEffect, useRef } from "react"
import Image from "next/image"
import { motion } from "framer-motion"

interface PhotoCardProps {
  id: string
  src: string
  alt: string
  onClick: () => void
}

export default function PhotoCard({ id, src, alt, onClick }: PhotoCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!cardRef.current) return

    // 创建彩色冒泡粒子特效
    const createColorBubbles = () => {
      const card = cardRef.current
      if (!card) return

      // 清除现有的粒子
      const existingParticles = card.querySelectorAll(".color-bubble")
      existingParticles.forEach((particle) => particle.remove())

      // 创建新的彩色粒子
      const particleCount = 12
      const colors = [
        "rgba(255, 105, 180, 0.7)", // 粉色
        "rgba(147, 112, 219, 0.7)", // 紫色
        "rgba(64, 224, 208, 0.7)", // 绿松石色
        "rgba(255, 215, 0, 0.7)", // 金色
        "rgba(135, 206, 250, 0.7)", // 天蓝色
      ]

      for (let i = 0; i < particleCount; i++) {
        const bubble = document.createElement("div")
        bubble.classList.add("color-bubble")

        // 随机位置、大小和颜色
        const size = Math.random() * 8 + 4
        const color = colors[Math.floor(Math.random() * colors.length)]

        // 随机位置，但确保在边框附近
        const isHorizontalEdge = Math.random() > 0.5
        let x, y

        if (isHorizontalEdge) {
          x = Math.random() > 0.5 ? -5 : card.offsetWidth + 5
          y = Math.random() * card.offsetHeight
        } else {
          x = Math.random() * card.offsetWidth
          y = Math.random() > 0.5 ? -5 : card.offsetHeight + 5
        }

        bubble.style.width = `${size}px`
        bubble.style.height = `${size}px`
        bubble.style.left = `${x}px`
        bubble.style.top = `${y}px`
        bubble.style.backgroundColor = color
        bubble.style.animationDuration = `${3 + Math.random() * 4}s`
        bubble.style.animationDelay = `${Math.random() * 2}s`

        card.appendChild(bubble)
      }
    }

    createColorBubbles()
    const interval = setInterval(createColorBubbles, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <motion.div
      ref={cardRef}
      className="photo-card relative w-full aspect-square rounded-lg overflow-hidden cursor-pointer" // 添加cursor-pointer
      whileHover={{ scale: 1.03, zIndex: 10 }}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      onClick={onClick}
    >
      <Image src={src || "/placeholder.svg"} alt={alt} fill className="object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />

      {/* 发光边框效果 */}
      <div className="absolute inset-0 border-2 border-pink-500/50 rounded-lg opacity-0 hover:opacity-100 transition-opacity duration-300">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-500 to-purple-500 rounded-lg opacity-30 blur-sm"></div>
      </div>

      {/* 彩色冒泡容器 - 粒子会在这里生成 */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-lg"></div>
    </motion.div>
  )
}
