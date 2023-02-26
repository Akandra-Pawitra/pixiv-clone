import { useLocation } from "react-router-dom"

const Redirect: React.FC = () => {
  const {state} = useLocation()
  const {link} = state
  console.log(link)
  const cancel = (): void => {
    history.back()
  }
  return (
    <main className="content">
      <div id="redirect-wrapper">
        <div className="redirect-warning">
          YOU WILL BE REDIRECTED TO PIXIV OFFICIAL SITE
        </div>
        <div className="redirect-action">
          <button id="redirect-cancel" onClick={cancel}>BACK</button>
          <button id="redirect-confirm">CONTINUE</button>
        </div>
      </div>
    </main>
  )
}

export default Redirect