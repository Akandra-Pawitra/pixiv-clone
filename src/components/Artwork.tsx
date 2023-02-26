import { useEffect, useState } from "react";
import { getDownloadURL } from "firebase/storage";
import { useNavigate } from "react-router-dom";
import {
  getRef,
  getArtistName,
  getArtistProfileRef,
  getFanboxRef,
  getPixivLink,
  getFanboxLink,
} from "../module/metadata";
import artistMeta from "../assets/metadata/artists.json";
import likeSvg from "../assets/images/like.svg";
import likedSvg from "../assets/images/liked.svg";
import fav2Svg from "../assets/images/favourite2.svg";
import fav3Svg from "../assets/images/favourite3.svg";
import shareSvg from "../assets/images/share.svg";
import moreSvg from "../assets/images/more.svg";

const Artwork: React.FC<{
  metadata: ArtMetadata;
}> = ({ metadata }) => {
  const [liked, setLiked] = useState(false);
  const [fav, setFav] = useState(false);
  const navigate = useNavigate();
  const imgId = `${metadata.id}-artpage-full`;
  const profileId = `${metadata.id}-artpage-profile`;
  const fanboxId = `${metadata.artist}-fanbox`;
  const artRef = getRef(metadata.full);
  const artist = getArtistName(metadata.artist, artistMeta);
  const pixivLink = getPixivLink(metadata.artist, artistMeta);
  const profileRef = getArtistProfileRef(metadata.artist, artistMeta);
  const fanboxRef = getFanboxRef(metadata.artist, artistMeta);
  const fanboxLink = getFanboxLink(metadata.artist, artistMeta);
  const orientation =
    metadata.height > metadata.width ? "portrait" : "landscape";
  const redirectPixiv = () =>
    navigate("/redirect", { state: { link: pixivLink } });
  const redirectFanbox = () =>
    navigate("/redirect", { state: { link: fanboxLink } });

  useEffect(() => {
    getDownloadURL(artRef).then((url) => {
      const img = document.getElementById(imgId);
      img?.setAttribute("src", url);
    });

    if (profileRef) {
      getDownloadURL(profileRef).then((url) => {
        const img0 = document.getElementById(profileId + "0");
        const img1 = document.getElementById(profileId + "1");
        img0?.setAttribute("src", url);
        img1?.setAttribute("src", url);
      });
    }

    if (fanboxRef) {
      getDownloadURL(fanboxRef).then((url) => {
        const img = document.getElementById(fanboxId);
        img?.setAttribute("src", url);
      });
    }
  }, []);
  return (
    <div className="artpage-container">
      <div className="artpage-art curved-corner">
        <div className={orientation + "artpage-art-image center-item"}>
          <img id={imgId} className={orientation} />
        </div>
        <div className="artpage-action flex">
          <div id="artpage-like" className="artpage-action-button center-item">
            <span
              className="center-item"
              onClick={() => {
                liked ? setLiked(false) : setLiked(true);
              }}
            >
              <img src={liked ? likedSvg : likeSvg} />
              <p id={liked ? "artpage-liked-text" : ""}>Like</p>
            </span>
          </div>
          <div id="artpage-fav" className="artpage-action-button center-item">
            <img
              src={fav ? fav2Svg : fav3Svg}
              onClick={() => {
                fav ? setFav(false) : setFav(true);
              }}
            />
          </div>
          <div id="artpage-share" className="artpage-action-button center-item">
            <img src={shareSvg} />
          </div>
          <div id="artpage-more" className="artpage-action-button center-item">
            <img src={moreSvg} />
          </div>
        </div>
        <div className="artpage-title">{metadata.title}</div>
        <div onClick={redirectPixiv} className="artpage-info flex">
          <div className="artpage-profile">
            <img id={profileId + "0"} />
          </div>
          <div className="artpage-artist">{artist}</div>
          <div className="artpage-info-follow center-item">
            <button className="artpage-follow-button">+ Follow</button>
          </div>
        </div>
      </div>
      <div className="artpage-artist-container">
        <div onClick={redirectPixiv} className="artpage-artist-info flex">
          <div className="artpage-profile">
            <img id={profileId + "1"} />
          </div>
          <div className="artpage-artist">{artist}</div>
        </div>
        <div className="artpage-artist-follow">
          <button className="artpage-follow-button">Follow</button>
        </div>
        <div className="artpage-artist-fanbox">
          <p id="fanbox-title">pixivFanbox</p>
          <div
            onClick={redirectFanbox}
            className="curved-corner fanbox-container relative"
          >
            <img id={fanboxId} className="curved-corner" />
            <div className="fanbox-info-wrapper absolute flex">
              <p>{artist}のFANBOX</p>
              <button>Support</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Artwork;
