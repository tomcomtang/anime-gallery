"use client"

import { useEffect, useRef } from "react"
import Script from "next/script"

export default function Live2D() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // This will run after the L2Dwidget script is loaded
    if (window.L2Dwidget && containerRef.current) {
      window.L2Dwidget.init({
        model: {
          jsonPath: "https://unpkg.com/live2d-widget-model-shizuku@1.0.5/assets/shizuku.model.json",
        },
        display: {
          position: "left",
          width: 100, // 从150减小到100
          height: 150, // 从200减小到150
          hOffset: 0,
          vOffset: 0,
        },
        mobile: {
          show: true,
          scale: 0.5, // 从0.6减小到0.5
        },
        react: {
          opacityDefault: 0.6, // 从0.7减小到0.6
          opacityOnHover: 0.9, // 从1减小到0.9
        },
      })
    }
  }, [])

  return (
    <>
      <Script
        src="https://cdn.jsdelivr.net/gh/stevenjoezhang/live2d-widget@latest/autoload.js"
        strategy="afterInteractive"
        onLoad={() => {
          console.log("Live2D script loaded")
        }}
      />
      <div ref={containerRef} className="live2d-container"></div>
    </>
  )
}
