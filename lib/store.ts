"use client"

import { create } from "zustand"

type WeatherType = "clear" | "rain" | "snow" | "sunny"

interface WeatherState {
  weatherType: WeatherType
  setWeatherType: (type: WeatherType) => void
}

export const useWeatherStore = create<WeatherState>((set) => ({
  weatherType: "clear",
  setWeatherType: (weatherType) => set({ weatherType }),
}))

interface ScrollState {
  scrollToAlbums: () => void
  scrollToHome: () => void
}

export const useScrollStore = create<ScrollState>((set) => ({
  scrollToAlbums: () => {
    const albumsSection = document.getElementById("albums-section")
    if (albumsSection) {
      albumsSection.scrollIntoView({ behavior: "smooth" })
    }
  },
  scrollToHome: () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  },
}))
