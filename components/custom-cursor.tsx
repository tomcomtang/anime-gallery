"use client"

import { useEffect, useState } from "react"

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [trails, setTrails] = useState<{ x: number; y: number; id: number }[]>([])
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY })
      setIsVisible(true)

      // Add new trail
      const newTrail = { x: e.clientX, y: e.clientY, id: Date.now() }
      setTrails((prevTrails) => [...prevTrails, newTrail].slice(-20)) // Keep only the last 20 trails
    }

    const handleMouseLeave = () => {
      setIsVisible(false)
    }

    const handleMouseEnter = () => {
      setIsVisible(true)
    }

    window.addEventListener("mousemove", updatePosition)
    document.addEventListener("mouseleave", handleMouseLeave)
    document.addEventListener("mouseenter", handleMouseEnter)

    return () => {
      window.removeEventListener("mousemove", updatePosition)
      document.removeEventListener("mouseleave", handleMouseLeave)
      document.removeEventListener("mouseenter", handleMouseEnter)
    }
  }, [])

  // Remove old trails
  useEffect(() => {
    const interval = setInterval(() => {
      setTrails((prevTrails) => prevTrails.slice(1))
    }, 50)

    return () => clearInterval(interval)
  }, [])

  if (!isVisible) return null

  return (
    <>
      <div
        className="custom-cursor cursor-star"
        style={{
          transform: `translate(${position.x - 12}px, ${position.y - 12}px)`,
        }}
      />
      {trails.map((trail, index) => (
        <div
          key={trail.id}
          className="cursor-trail"
          style={{
            left: trail.x - 5,
            top: trail.y - 5,
            opacity: index / trails.length,
            transform: `scale(${index / trails.length})`,
          }}
        />
      ))}
    </>
  )
}
