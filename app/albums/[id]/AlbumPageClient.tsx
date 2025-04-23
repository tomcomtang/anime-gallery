"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { ArrowLeft } from "lucide-react"
import PhotoCard from "@/components/photo-card"
import PhotoCarousel from "@/components/photo-carousel"
import { getAlbum, getAllAlbums } from "@/lib/utils"
import BackgroundEffects from "@/components/background-effects"
import Image from "next/image"

export default function AlbumPageClient({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [album, setAlbum] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [selectedPhotoId, setSelectedPhotoId] = useState<string | null>(null)

  // 使用useEffect来获取相册数据，避免hydration不匹配
  useEffect(() => {
    // 添加调试信息
    console.log("Client-side rendering with params:", params)

    let info = (params as any).value;
    info = JSON.parse(info);
    console.log(info);
    if (info && info.id) {
      const albumData = getAlbum(info.id)
      console.log("Retrieved album data:", albumData)
      setAlbum(albumData)
    } else {
      console.error("No album ID provided in params")
    }

    setLoading(false)
  }, [params])

  // 显示加载状态
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">加载中...</h1>
        </div>
      </div>
    )
  }

  // 相册不存在
  if (!album) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">相册不存在</h1>
          <p className="mb-4">请求的ID: {params?.id || "未提供"}</p>
          <p className="mb-4">
            可用的相册IDs:{" "}
            {getAllAlbums()
              .map((a) => a.id)
              .join(", ")}
          </p>
          <button
            onClick={() => router.push("/")}
            className="px-4 py-2 bg-pink-600 rounded-lg hover:bg-pink-700 transition-colors"
          >
            返回首页
          </button>
        </div>
      </div>
    )
  }

  const handleCloseCarousel = () => {
    console.log("Closing carousel")
    setSelectedPhotoId(null)
  }

  return (
    <main className="min-h-screen bg-gray-900 py-20 px-4 relative">
      {/* 添加背景图和渐变 */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images_bg.jpg?height=1080&width=1920"
          alt="相册详情背景"
          fill
          className="object-cover opacity-50"
          priority
        />
        {/* 增强的渐变遮罩层 */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/40 via-gray-900/50 to-pink-900/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/70 via-gray-900/30 to-indigo-900/30" />
      </div>

      {/* 添加背景特效 */}
      <BackgroundEffects />

      <div className="container mx-auto relative z-10">
        <div className="flex items-center mb-8">
          <button
            onClick={() => router.push("/")}
            className="flex items-center text-white hover:text-pink-400 transition-colors"
          >
            <ArrowLeft size={20} className="mr-2" />
            返回相册列表
          </button>
        </div>

        <motion.h1
          className="text-3xl md:text-4xl font-bold text-white mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {album.title}
        </motion.h1>

        <motion.p
          className="text-gray-300 mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {album.date}
        </motion.p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-6xl mx-auto relative z-20">
          {album.photos.map((photo: any, index: number) => (
            <PhotoCard
              key={photo.id}
              id={photo.id}
              src={photo.src}
              alt={photo.alt}
              onClick={() => setSelectedPhotoId(photo.id)}
            />
          ))}
        </div>
      </div>

      {selectedPhotoId && (
        <PhotoCarousel photos={album.photos} initialPhotoId={selectedPhotoId} onClose={handleCloseCarousel} />
      )}
    </main>
  )
}
