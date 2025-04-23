import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import Live2D from "@/components/live2d"
import WeatherEffects from "@/components/weather-effects"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "二次元画廊",
  description: "一个展示二次元图片的画廊网站",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh">
      <body className={inter.className}>
        {children}
        {/* 移除了 CustomCursor 组件 */}
        <Live2D />
        <WeatherEffects />
      </body>
    </html>
  )
}
