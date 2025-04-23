import { getAllAlbums } from "@/lib/utils"
import AlbumPageClient from "./AlbumPageClient"

// 添加这个函数以支持静态生成
export function generateStaticParams() {
  const albums = getAllAlbums()
  return albums.map((album) => ({
    id: album.id,
  }))
}

export default function AlbumPage({ params }: { params: { id: string } }) {
  // 添加调试信息
  console.log("Server-side rendering album page with params:", params)
  return <AlbumPageClient params={params} />
}
