/// <reference types="vite/client" />

interface ArtistMetadata {
  id: number
  name: string
  pixiv: {
    link: string
    image: string
  }
  fanbox: {
    link: string
    image: string
  }
}

interface ArtMetadata {
  id: number
  title: string
  artist: number
  link: string
  width: number
  height: number
  full: string
  preview: string
}