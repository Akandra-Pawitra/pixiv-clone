import '../assets/css/Rank.css'
import artworkMeta from '../assets/metadata/artworks.json'
import artistMeta from '../assets/metadata/artists.json'
import { getDownloadURL } from "firebase/storage"
import { useEffect } from 'react'
import {
  getRef,
  getArtMetadata,
  getArtistName,
  getArtistProfileRef
} from '../module/metadata'

const dailyRank = [
  99508232, 85672547, 71646603, 86036732,
  105565364, 103680674, 92076107, 67175703,
  105029610, 48395655
]

const renderRank = (id: number): React.ReactNode => {
  const metadata = getArtMetadata(id, artworkMeta)
  const imageId = `${id}-rank-preview`
  const profileId = `${id}-rank-profile`
  const title = metadata.title
  const artist = getArtistName(metadata.artist, artistMeta)
  const profileRef = getArtistProfileRef(metadata.artist, artistMeta)
  const artRef = getRef(metadata.preview)
  
  useEffect(() => {
    getDownloadURL(artRef).then((url) => {
      const img = document.getElementById(imageId)
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
    <div key={id} className="rank-item">
      <div className="rank-image curved-corner">
        <img id={imageId} className='curved-corner' alt={`${id}`}/>
      </div>
      <div className="rank-info">
         <div className='homepage-title'>
          {title}
        </div>
        <div className='rank-artist flex'>
          <div className="homepage-artist-profile">
            <img id={profileId}/>
          </div>
          <div className="homepage-artist-name rank-artist-name">
            {artist}
          </div>
        </div>
      </div>
    </div>
  )
}


const Rank: React.FC = () => {
  const row = dailyRank.map(renderRank)
  return (
    <div id='rank'>
      <div id="rank-title">Daily rank</div>
      <div id="rank-date">Feb 24th ranking</div>
      <div id="rank-wrapper">
        <div className="rank-row flex">{row}</div>
      </div>
    </div>
  )
}

export default Rank