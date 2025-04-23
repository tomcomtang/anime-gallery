"use client"

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, X } from "lucide-react"

interface Photo {
  id: string
  src: string
  alt: string
}

interface PhotoCarouselProps {
  photos: Photo[]
  initialPhotoId: string
  onClose: () => void
}

export default function PhotoCarousel({ photos, initialPhotoId, onClose }: PhotoCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)

  useEffect(() => {
    // Find the index of the initial photo
    const index = photos.findIndex((photo) => photo.id === initialPhotoId)
    if (index !== -1) {
      setCurrentIndex(index)
    }

    // Disable scrolling on the body
    document.body.style.overflow = "hidden"

    // Handle keyboard navigation
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose()
      } else if (e.key === "ArrowLeft") {
        navigatePrev()
      } else if (e.key === "ArrowRight") {
        navigateNext()
      }
    }

    window.addEventListener("keydown", handleKeyDown)

    return () => {
      // Re-enable scrolling
      document.body.style.overflow = "auto"
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [initialPhotoId, photos, onClose])

  const navigateNext = useCallback(() => {
    setDirection(1)
    setCurrentIndex((prevIndex) => (prevIndex + 1) % photos.length)
  }, [photos.length])

  const navigatePrev = useCallback(() => {
    setDirection(-1)
    setCurrentIndex((prevIndex) => (prevIndex - 1 + photos.length) % photos.length)
  }, [photos.length])

  // 修改动画变体，使用平滑滑动而不是跳动
  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? "100%" : "-100%",
      opacity: 0.5,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? "100%" : "-100%",
      opacity: 0.5,
    }),
  }

  return (
    <div className="fixed inset-0 bg-black/90 z-[1000] flex items-center justify-center pt-20">
      {/* 关闭按钮移到左上角 */}
      <div
        className="absolute top-4 left-4 z-[1200] bg-white/20 hover:bg-white/40 w-12 h-12 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 border-2 border-white/50"
        onClick={onClose}
      >
        <X size={24} className="text-white" />
      </div>

      <div className="relative w-full h-full flex flex-col items-center justify-center">
        <div className="relative w-full flex-grow flex items-center justify-center">
          <AnimatePresence initial={false} custom={direction} mode="popLayout">
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "tween", duration: 0.5, ease: "easeInOut" },
                opacity: { duration: 0.3 },
              }}
              className="absolute w-full h-full flex items-center justify-center"
            >
              <Image
                src={photos[currentIndex].src || "/placeholder.svg"}
                alt={photos[currentIndex].alt}
                width={1200}
                height={800}
                className="max-w-[90%] max-h-[70vh] object-contain"
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* 缩略图列表 */}
        <div className="w-full max-w-4xl mx-auto mt-4 mb-8 px-10">
          <div className="bg-black/30 rounded-lg p-2">
            <div className="flex gap-2 overflow-x-auto py-2 px-1 scrollbar-thin">
              {photos.map((photo, index) => (
                <div
                  key={photo.id}
                  className={`relative cursor-pointer flex-shrink-0 transition-transform duration-200 ${
                    index === currentIndex ? "scale-105" : ""
                  }`}
                  onClick={() => {
                    setDirection(index > currentIndex ? 1 : -1)
                    setCurrentIndex(index)
                  }}
                >
                  <Image
                    src={photo.src || "/placeholder.svg"}
                    alt={photo.alt}
                    width={100}
                    height={100}
                    className="object-cover w-16 h-16 rounded-md"
                  />
                  {index === currentIndex && <div className="absolute inset-0 border-2 border-white rounded-md"></div>}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <button
        className="absolute left-4 top-1/2 -translate-y-1/2 z-[1100] bg-white/20 hover:bg-white/40 w-12 h-12 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300"
        onClick={navigatePrev}
      >
        <ChevronLeft size={24} className="text-white" />
      </button>

      <button
        className="absolute right-4 top-1/2 -translate-y-1/2 z-[1100] bg-white/20 hover:bg-white/40 w-12 h-12 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300"
        onClick={navigateNext}
      >
        <ChevronRight size={24} className="text-white" />
      </button>
    </div>
  )
}
