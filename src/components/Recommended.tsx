import '../assets/css/Recommended.css'
import artworkMeta from '../assets/metadata/artworks.json'
import artistMeta from '../assets/metadata/artists.json'
import { ref, getDownloadURL } from "firebase/storage"
import { useEffect } from 'react'
import { storage } from '../main'

const getRef = (path: string) => {
  return (ref(storage, path))
}

const getArtistIndex = (id: number): number => {
  let index = -1
  const arr = artistMeta
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].id === id) {
      index = i
      break
    } else continue
  }
  return index
}

const getArtistName = (id: number): string => {
  try {
    const artist = artistMeta
    const index = getArtistIndex(id)
    const name = artist[index].name
    return name
  } catch (error) {
    console.log(error)
    return 'john'
  }
}

const getArtistProfileRef = (id: number) => {
  try {
    const artist = artistMeta
    const index = getArtistIndex(id)
    const path = artist[index].pixiv.image
    return (getRef(path))
  } catch (error) {
    console.log(error)
  }
}

const renderRow = (art: ArtMetadata): React.ReactNode => {
  useEffect(() => {
    const artRef = getRef(art.preview)
    getDownloadURL(artRef).then((url) => {
      const id = `${art.id}-preview`
      const img = document.getElementById(id)
      img?.setAttribute('src', url)
    })

    const profileRef = getArtistProfileRef(art.artist)
    if (profileRef) {
      getDownloadURL(profileRef).then((url) => {
        const id = `${art.artist}-${art.id}`
        const img = document.getElementById(id)
        img?.setAttribute('src', url)
      })
    }
  }, [])
  return (
    <div key={art.id} className='artrow-item'>
      <div className='artrow-image `${art.id}-preview`'>
        <img id={`${art.id}-preview`} className="curved-corner" alt={`${art.id}`} />
      </div>
      <div className='artrow-info'>
        <div className='artrow-title'>
          {art.title}
        </div>
        <div className='artrow-artist flex'>
          <div className="artrow-artist-profile">
            <img id={`${art.artist}-${art.id}`} />
          </div>
          <div className="artrow-artist-name">
          {getArtistName(art.artist)}
          </div>
        </div>
      </div>
    </div>
  )
}

const Recommended: React.FC = () => {
  const arr0 = artworkMeta.slice(0,6)
  const arr1 = artworkMeta.slice(6,12)
  const arr2 = artworkMeta.slice(12, 18)

  const row0 = arr0.map(renderRow)
  const row1 = arr1.map(renderRow)
  const row2 = arr2.map(renderRow)

  return (
    <div id="recommend">
      <div id='recommend-title'>
        <p>Recommended works</p>
      </div>
      <div className='recommend-row flex'>{row0}</div>
      <div className='recommend-row flex'>{row1}</div>
      <div className='recommend-row flex'>{row2}</div>
    </div>
  )
}

export default Recommended