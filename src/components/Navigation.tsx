import pixiv from "../assets/images/pixiv.svg";
import magnifier from "../assets/images/magnifier.svg";
import inbox from "../assets/images/inbox.svg";
import notif from "../assets/images/notif.svg";
import account from "../assets/images/no_profile.png";
import "../assets/css/Navigation.css";
import { Link } from "react-router-dom";

const Navigation: React.FC = () => {
  return (
    <nav className="flex">
      <div id="logo" className="nav-item flex">
        <Link to="/">
          <img src={pixiv} width="82px" height="32px" />
        </Link>
      </div>
      <div id="search-container" className="center-item nav-item">
        <div id="search-box" className="flex charcoal curved-corner">
          <div id="magnifier" className="center-item">
            <img src={magnifier} />
          </div>
          <input id="search" type="text" placeholder="Search works" disabled />
        </div>
      </div>
      <div id="post-container" className="center-item nav-item">
        <button id="post-button" className="center-item charcoal" disabled>
          Post your work
        </button>
      </div>
      <div id="inbox-container" className="center-item nav-item">
        <img id="inbox" src={inbox} />
      </div>
      <div id="notif-container" className="center-item nav-item">
        <img id="notif" src={notif} />
      </div>
      <div id="account-container" className="center-item nav-item">
        <img id="account" src={account} />
      </div>
    </nav>
  );
};

export default Navigation;
