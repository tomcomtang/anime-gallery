"use client"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { useEffect, useRef } from "react"

interface AlbumCardProps {
  id: string
  title: string
  date: string
  coverImage: string
}

export default function AlbumCard({ id, title, date, coverImage }: AlbumCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!cardRef.current) return

    // 创建冒泡特效
    const createBubbles = () => {
      const card = cardRef.current
      if (!card) return

      // 清除现有的冒泡
      const existingBubbles = card.querySelectorAll(".bubble")
      existingBubbles.forEach((bubble) => bubble.remove())

      // 创建新的冒泡
      const bubbleCount = 15
      for (let i = 0; i < bubbleCount; i++) {
        const bubble = document.createElement("div")
        bubble.classList.add("bubble")

        // 随机位置和大小
        const size = Math.random() * 10 + 5
        bubble.style.width = `${size}px`
        bubble.style.height = `${size}px`
        bubble.style.left = `${Math.random() * 100}%`
        bubble.style.animationDuration = `${Math.random() * 3 + 2}s`
        bubble.style.animationDelay = `${Math.random() * 2}s`

        card.appendChild(bubble)
      }
    }

    createBubbles()
    const interval = setInterval(createBubbles, 5000)

    return () => clearInterval(interval)
  }, [])

  // 添加调试信息
  console.log("Rendering album card with ID:", id)

  return (
    <motion.div
      ref={cardRef}
      className="album-card relative w-full h-64 md:h-72 rounded-lg overflow-hidden cursor-pointer" // 添加cursor-pointer
      whileHover={{
        rotateY: 15,
        scale: 1.05,
        boxShadow: "0 15px 30px rgba(0,0,0,0.3)",
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* 确保链接格式正确 */}
      <Link href={`/albums/${id}`} passHref>
        <div className="relative w-full h-full cursor-pointer">
          {" "}
          {/* 添加cursor-pointer */}
          <Image src={coverImage || "/placeholder.svg"} alt={title} fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
          <div className="absolute bottom-0 left-0 p-4 text-white">
            <h3 className="text-xl font-bold">{title}</h3>
            <p className="text-sm opacity-80">{date}</p>
          </div>
          {/* 翻页提示 */}
          <div className="absolute top-0 right-0 w-12 h-12 bg-gradient-to-bl from-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="absolute bottom-0 right-0 w-12 h-12 bg-gradient-to-tl from-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
      </Link>
    </motion.div>
  )
}
