import { ref, StorageReference } from "firebase/storage";
import { storage } from "../main";

const NullMeta = {
  id: 0,
  title: 'No Image',
  artist: 0,
  link: 'https://www.pixiv.net/en',
  width: 0,
  height: 0,
  full: '/no_image.png',
  preview: '/no_image.png'
}

const NullPixiv = 'https://www.pixiv.net/en'
const NullFanbox = 'https://www.fanbox.cc'

export const getRef = (path: string): StorageReference => {
  return ref(storage, path);
};

export const getArtMetadata = (id: number, arr: ArtMetadata[]): ArtMetadata => {
  try {
    for (let i = 0; i < arr.length; i++) if (arr[i].id === id) return arr[i];
    throw Error("Artwork not found");
  } catch (error) {
    console.log(error);
    return NullMeta
  }
};

export const getArtistIndex = (id: number, arr: ArtistMetadata[]): number => {
  try {
    for (let i = 0; i < arr.length; i++) if (arr[i].id == id) return i
    throw Error(`Artist ${id} not found`);
  } catch (error) {
    console.log(error);
    return -1
  }
};

export const getArtistName = (id: number, arr: ArtistMetadata[]): string => {
  try {
    const index = getArtistIndex(id, arr);
    if (index >= 0) {
      const name = arr[index].name;
      return name;
    } else throw Error(`Artist ${id} not found`);
  } catch (error) {
    console.log(error);
    return 'No Artist'
  }
};

export const getArtistProfileRef = (id: number, arr: ArtistMetadata[]): StorageReference => {
  try {
    const index = getArtistIndex(id, arr);
    if (index !== undefined) {
      const path = arr[index].pixiv.image;
      return getRef(path);
    } else throw Error(`Artist ${id} profile reference not found`);
  } catch (error) {
    console.log(error);
    return ref(storage, "/no_image.png");
  }
};

export const getRank = (id: number, arr: number[]): number => {
  try {
    const rank = arr.indexOf(id);
    if (rank !== -1) return rank;
    else throw Error(`Artwork ${id} does not appear in rank`);
  } catch (error) {
    console.log(error);
    return -1
  }
};

export const getFanboxRef = (id: number, arr: ArtistMetadata[]): StorageReference => {
  try {
    const index = getArtistIndex(id, arr);
    if (index >= 0) {
      const path = arr[index].fanbox.image;
      return getRef(path);
    } else throw Error(`Artist ${id} Fanbox reference not found`);
  } catch (error) {
    console.log(error);
    return ref(storage, "/no_image.png");
  }
};

export const getPixivLink = (id: number, arr: ArtistMetadata[]): string => {
  try {
    const index = getArtistIndex(id, arr);
    if (index !== undefined) {
      const path = arr[index].pixiv.link;
      return path;
    } else throw Error(`Artist ${id} Pixiv link not found`);
  } catch (error) {
    console.log(error);
    return NullPixiv
  }
};

export const getFanboxLink = (id: number, arr: ArtistMetadata[]): string => {
  try {
    const index = getArtistIndex(id, arr);
    if (index !== undefined) {
      const path = arr[index].fanbox.link;
      return path;
    } else throw Error(`Artist ${id} Fanbox link not found`);
  } catch (error) {
    console.log(error);
    return NullFanbox
  }
};
