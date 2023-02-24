import Navigation from "../components/Navigation"
import '../assets/css/Homepage.css'
import Selection from "../components/Selection"

const Homepage: React.FC = () => {
  return (
    <div>
      <Navigation />
      <main className="content">
        <Selection />
        <div id="recommended"></div>
        <div id="rank"></div>
      </main>
    </div>
  )
}

export default Homepage