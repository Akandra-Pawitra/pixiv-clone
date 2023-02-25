import '../assets/css/Recommended.css'
import artworkMeta from '../assets/metadata/artworks.json'
import artistMeta from '../assets/metadata/artists.json'
import { getDownloadURL } from "firebase/storage"
import { useEffect } from 'react'
import {
  getRef,
  getArtistName,
  getArtistProfileRef
} from '../module/metadata'

const renderRow = (art: ArtMetadata): React.ReactNode => {
  const artist = getArtistName(art.artist, artistMeta)
  const artRef = getRef(art.preview)
  const profileRef = getArtistProfileRef(art.artist, artistMeta)
  const imgId = `${art.id}-recommend-preview`
  const profileId = `${art.artist}-${art.id}`

  useEffect(() => {
    getDownloadURL(artRef).then((url) => {
      const img = document.getElementById(imgId)
      img?.setAttribute('src', url)
    })

    if (profileRef) {
      getDownloadURL(profileRef).then((url) => {
        const img = document.getElementById(profileId)
        img?.setAttribute('src', url)
      })
    }
  }, [])
  return (
    <div key={art.id} className='artrow-item'>
      <div className='artrow-image'>
        <img id={imgId} className="curved-corner" alt={`${art.id}`} />
      </div>
      <div className='artrow-info'>
        <div className='homepage-title artrow-title'>
          {art.title}
        </div>
        <div className='artrow-artist flex'>
          <div className="homepage-artist-profile">
            <img id={profileId} />
          </div>
          <div className="homepage-artist-name">
            {artist}
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