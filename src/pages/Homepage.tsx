import Navigation from "../components/Navigation"
import '../assets/css/Homepage.css'
import Selection from "../components/Selection"
import Recommended from "../components/Recommended"
import Rank from "../components/Rank"

const Homepage: React.FC = () => {
  return (
    <div>
      <Navigation />
      <main className="content">
        <Selection />
        <Recommended />
        <Rank />
      </main>
    </div>
  )
}

export default Homepage