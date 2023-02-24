import '../assets/css/Recommended.css'
import artworkMeta from '../assets/metadata/artworks.json'
import artistMeta from '../assets/metadata/artists.json'

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

const renderRow = (art: ArtMetadata): React.ReactNode => {
    return (
      <div key={art.id} className='artrow-item'>
        <div className='artrow-image'>
          <img alt={(art.id).toString()} />
        </div>
        <div className='artrow-info'>
          <div className='artrow-title'>
            {art.title}
          </div>
          <div className='artrow-artist flex'>
            <div className="artrow-artist-profile charcoal"></div>
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