"use client"
import Image from "next/image"
import { motion } from "framer-motion"
import { ChevronDown } from "lucide-react"
import WaterWave from "@/components/water-wave"
import { useScrollStore } from "@/lib/store"
import AlbumCard from "@/components/album-card"
import { getAllAlbums } from "@/lib/utils"

// 导入背景特效组件
import BackgroundEffects from "@/components/background-effects"

export default function Home() {
  const { scrollToAlbums, scrollToHome } = useScrollStore()
  const albums = getAllAlbums()

  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      {/* 首页部分 */}
      <section className="relative w-full h-screen flex flex-col items-center justify-center text-white">
        <div className="absolute inset-0 z-0">
          <Image
            src="/home_bg.jpg?height=1080&width=1920"
            alt="二次元背景"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/30" />
        </div>

        <motion.div
          className="z-10 text-center px-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="mb-6 flex justify-center">
            <Image
              src="/avatar.png?height=200&width=200"
              alt="头像"
              width={120}
              height={120}
              className="rounded-full border-4 border-white/50"
            />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-4">二次元画廊</h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
            「在这里，每一张图片都是一个故事，每一个故事都是一段旅程。」
          </p>
          <div className="mb-12">
            <p className="text-lg opacity-80 italic">收集美好，留住感动，这是我的二次元世界。</p>
          </div>
        </motion.div>

        <motion.button
          className="scroll-down z-10"
          onClick={scrollToAlbums}
          whileHover={{ y: 5 }}
          animate={{
            y: [0, -10, 0],
          }}
          transition={{
            repeat: Number.POSITIVE_INFINITY,
            duration: 2,
          }}
        >
          <ChevronDown size={36} />
        </motion.button>

        <WaterWave />
      </section>

      {/* 相册列表部分 */}
      <section id="albums-section" className="w-full min-h-screen bg-gray-900 py-20 px-4 relative">
        {/* 添加背景图和渐变 */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/albums_bg.jpg?height=1080&width=1920"
            alt="相册列表背景"
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
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-white mb-12 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            我的相册集
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto px-6 relative z-20">
            {albums.map((album) => (
              <AlbumCard
                key={album.id}
                id={album.id}
                title={album.title}
                date={album.date}
                coverImage={album.coverImage}
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
