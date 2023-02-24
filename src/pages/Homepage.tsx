import Navigation from "../components/Navigation"
import '../assets/css/Homepage.css'
import Selection from "../components/Selection"
import Recommended from "../components/Recommended"

const Homepage: React.FC = () => {
  return (
    <div>
      <Navigation />
      <main className="content">
        <Selection />
        <Recommended />
        <div id="rank"></div>
      </main>
    </div>
  )
}

export default Homepage