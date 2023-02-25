import '../assets/css/Rank.css'
import artworkMeta from '../assets/metadata/artworks.json'
import artistMeta from '../assets/metadata/artists.json'
import { getDownloadURL } from "firebase/storage"
import { useEffect, useState } from 'react'
import {
  getRef,
  getArtMetadata,
  getArtistName,
  getArtistProfileRef,
  getRank
} from '../module/metadata'
import fav1 from '../assets/images/favourite1.svg'
import fav2 from '../assets/images/favourite2.svg'

const dailyRank = [
  85672547, 99508232, 71646603, 86036732,
  105565364, 103680674, 92076107, 67175703,
  105029610, 48395655
]

const renderRank = (id: number): React.ReactNode => {
  const [fav, setFav] = useState(false)

  const metadata = getArtMetadata(id, artworkMeta)
  const rank = getRank(id, dailyRank) + 1
  const rankId = `rank-image-${rank}`
  const imageId = `${id}-rank-preview`
  const profileId = `${id}-rank-profile`
  const favId = `${id}-rank-fav`
  const artist = getArtistName(metadata.artist, artistMeta)
  const profileRef = getArtistProfileRef(metadata.artist, artistMeta)
  const artRef = getRef(metadata.preview)
  
  useEffect(() => {
    getDownloadURL(artRef).then((url) => {
      const rank = document.getElementById(rankId)
      const img = document.getElementById(imageId)
      const fav = document.getElementById(favId)
      rank?.classList.remove('hidden')
      img?.setAttribute('src', url)
      fav?.classList.remove('hidden')
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
      <div className="rank-image relative">
        <span
          id={rankId}
          className={ rank < 4 ? 'absolute hidden' : 'absolute hidden rank-span'} >
          {rank}
        </span>
        <img id={imageId} className='curved-corner' alt={`${id}`}/>
        <img
          id={favId}
          src={fav ? fav2 : fav1}
          onClick={() => { fav ? setFav(false) : setFav(true) }}
          className='homepage-fav absolute hidden' />
      </div>
      <div className="rank-info">
         <div className='homepage-title'>
          {metadata.title}
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