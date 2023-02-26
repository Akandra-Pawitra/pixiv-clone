import { useParams } from "react-router-dom"
import { getArtMetadata } from "../module/metadata"
import NotFound from "../components/Notfound"
import Artwork from "../components/Artwork"
import artworkMeta from "../assets/metadata/artworks.json"
import "../assets/css/Artwork.css"

const Artpage: React.FC = () => {
  const param = useParams()
  const id = param.id
  const metadata = id ? getArtMetadata(parseInt(id), artworkMeta) : null
  return (
    <main className="content">
      {metadata ? <Artwork metadata={metadata} /> : <NotFound />}
    </main>
  )
}

export default Artpage