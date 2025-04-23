import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// 模拟数据
export const albums = [
  {
    id: "1",
    title: "春日樱花",
    date: "2023-04-15",
    coverImage: "/ablums_cover_sakura.png?height=800&width=1200",
    photos: [
      { id: "101", src: "/album_1_1.jpg?height=800&width=1200", alt: "樱花树下的少女" },
      { id: "102", src: "/placeholder.svg?height=800&width=1200", alt: "飘落的樱花瓣" },
      { id: "103", src: "/placeholder.svg?height=800&width=1200", alt: "樱花隧道" },
      { id: "104", src: "/placeholder.svg?height=800&width=1200", alt: "樱花与蓝天" },
      { id: "105", src: "/placeholder.svg?height=800&width=1200", alt: "樱花特写" },
      { id: "106", src: "/placeholder.svg?height=800&width=1200", alt: "樱花与古建筑" },
    ],
  },
  {
    id: "2",
    title: "夏日海边",
    date: "2023-07-20",
    coverImage: "/placeholder.svg?height=800&width=1200",
    photos: [
      { id: "201", src: "/placeholder.svg?height=800&width=1200", alt: "蓝色海洋" },
      { id: "202", src: "/placeholder.svg?height=800&width=1200", alt: "沙滩日落" },
      { id: "203", src: "/placeholder.svg?height=800&width=1200", alt: "海边少女" },
      { id: "204", src: "/placeholder.svg?height=800&width=1200", alt: "贝壳收集" },
      { id: "205", src: "/placeholder.svg?height=800&width=1200", alt: "海浪特写" },
    ],
  },
  {
    id: "3",
    title: "秋日枫叶",
    date: "2023-10-10",
    coverImage: "/placeholder.svg?height=800&width=1200",
    photos: [
      { id: "301", src: "/placeholder.svg?height=800&width=1200", alt: "红色枫叶" },
      { id: "302", src: "/placeholder.svg?height=800&width=1200", alt: "枫叶小径" },
      { id: "303", src: "/placeholder.svg?height=800&width=1200", alt: "秋日公园" },
      { id: "304", src: "/placeholder.svg?height=800&width=1200", alt: "枫叶与少女" },
    ],
  },
  {
    id: "4",
    title: "冬日雪景",
    date: "2023-12-25",
    coverImage: "/placeholder.svg?height=800&width=1200",
    photos: [
      { id: "401", src: "/placeholder.svg?height=800&width=1200", alt: "雪中小屋" },
      { id: "402", src: "/placeholder.svg?height=800&width=1200", alt: "雪花特写" },
      { id: "403", src: "/placeholder.svg?height=800&width=1200", alt: "雪中漫步" },
      { id: "404", src: "/placeholder.svg?height=800&width=1200", alt: "冰晶装饰" },
      { id: "405", src: "/placeholder.svg?height=800&width=1200", alt: "雪中城市" },
    ],
  },
  {
    id: "5",
    title: "动漫展会",
    date: "2024-01-15",
    coverImage: "/placeholder.svg?height=800&width=1200",
    photos: [
      { id: "501", src: "/placeholder.svg?height=800&width=1200", alt: "Cosplay合影" },
      { id: "502", src: "/placeholder.svg?height=800&width=1200", alt: "展会全景" },
      { id: "503", src: "/placeholder.svg?height=800&width=1200", alt: "手办展示" },
      { id: "504", src: "/placeholder.svg?height=800&width=1200", alt: "签名会" },
      { id: "505", src: "/placeholder.svg?height=800&width=1200", alt: "动漫周边" },
      { id: "506", src: "/placeholder.svg?height=800&width=1200", alt: "舞台表演" },
    ],
  },
  {
    id: "6",
    title: "二次元壁纸",
    date: "2024-02-10",
    coverImage: "/placeholder.svg?height=800&width=1200",
    photos: [
      { id: "601", src: "/placeholder.svg?height=800&width=1200", alt: "动漫风景" },
      { id: "602", src: "/placeholder.svg?height=800&width=1200", alt: "动漫人物" },
      { id: "603", src: "/placeholder.svg?height=800&width=1200", alt: "科幻场景" },
      { id: "604", src: "/placeholder.svg?height=800&width=1200", alt: "奇幻世界" },
      { id: "605", src: "/placeholder.svg?height=800&width=1200", alt: "校园日常" },
    ],
  },
]

// 检查getAlbum函数的实现
// 确保它能正确根据ID返回相册数据

// 添加一些调试信息
export function getAlbum(id: string) {
  console.log("Fetching album with ID:", id)
  console.log("Available albums:", albums)
  const album = albums.find((album) => album.id === id)
  console.log("Found album:", album)
  return album
}

export function getAllAlbums() {
  return albums
}
