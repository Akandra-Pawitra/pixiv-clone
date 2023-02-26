import '../assets/css/Recommended.css'
import artworkMeta from '../assets/metadata/artworks.json'
import artistMeta from '../assets/metadata/artists.json'
import { getDownloadURL } from "firebase/storage"
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  getRef,
  getArtistName,
  getArtistProfileRef,
  getPixivLink
} from '../module/metadata'
import fav1 from '../assets/images/favourite1.svg'
import fav2 from '../assets/images/favourite2.svg'
import { Link } from 'react-router-dom'

const renderRow = (art: ArtMetadata): React.ReactNode => {
  const [fav, setFav] = useState(false)
  const navigate = useNavigate()

  const artist = getArtistName(art.artist, artistMeta)
  const artRef = getRef(art.preview)
  const profileRef = getArtistProfileRef(art.artist, artistMeta)
  const imgId = `${art.id}-recommend-preview`
  const favId = `${art.id}-recommend-fav`
  const profileId = `${art.artist}-${art.id}`
  const pixivLink = getPixivLink(art.artist, artistMeta)
  const redirectPixiv = () => navigate('/redirect', {state: {link: pixivLink}})

  useEffect(() => {
    getDownloadURL(artRef).then((url) => {
      const img = document.getElementById(imgId)
      const fav = document.getElementById(favId)
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
    <div key={art.id} className='artrow-item'>
      <div className='artrow-image relative'>
        <Link to={`artwork/${art.id}`}>
          <img
            id={imgId}
            className="artrow-artwork curved-corner"
            alt={`${art.id}`} />
        </Link>
        <img
          id={favId}
          src={fav ? fav2 : fav1}
          onClick={() => { fav ? setFav(false) : setFav(true) }}
          className='homepage-fav absolute hidden' />
        </div>
      <div className='artrow-info'>
        <Link to={`artwork/${art.id}`}>
          <div className='homepage-title artrow-title'>
            {art.title}
          </div>
        </Link>
        <div onClick={redirectPixiv}>
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