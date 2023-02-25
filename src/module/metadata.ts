import { ref } from "firebase/storage"
import { storage } from '../main'

export const getRef = (path: string) => {
  return (ref(storage, path))
}

export const getArtistIndex = (id: number, arr: ArtistMetadata[]): number => {
  let index = -1
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].id === id) {
      index = i
      break
    } else continue
  }
  if (index !== -1) {
    return index
  } else {
    throw Error('Artist not found')
  }
}

export const getArtistName = (id: number, arr: ArtistMetadata[]): string => {
  try {
    const index = getArtistIndex(id, arr)
    const name = arr[index].name
    return name
  } catch (error) {
    console.log(error)
    return 'john'
  }
}

export const getArtistProfileRef = (id: number, arr: ArtistMetadata[]) => {
  try {
    const index = getArtistIndex(id, arr)
    const path = arr[index].pixiv.image
    return (getRef(path))
  } catch (error) {
    console.log(error)
  }
}
