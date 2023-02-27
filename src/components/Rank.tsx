import "../assets/css/Rank.css";
import artworkMeta from "../assets/metadata/artworks.json";
import artistMeta from "../assets/metadata/artists.json";
import rankMeta from "../assets/metadata/rank.json";
import { getDownloadURL } from "firebase/storage";
import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  getRef,
  getArtMetadata,
  getArtistName,
  getArtistProfileRef,
  getRank,
  getPixivLink,
} from "../module/metadata";
import fav1 from "../assets/images/favourite1.svg";
import fav2 from "../assets/images/favourite2.svg";

const renderRank = (id: number): React.ReactNode => {
  const [fav, setFav] = useState(false);
  const navigate = useNavigate();

  const metadata = getArtMetadata(id, artworkMeta);
  const rank = getRank(id, rankMeta) + 1;
  const artist = getArtistName(metadata.artist, artistMeta);
  const pixivLink = getPixivLink(metadata.artist, artistMeta);
  const redirectPixiv = () =>
    navigate("/redirect", { state: { link: pixivLink } });
  const profileRef = getArtistProfileRef(metadata.artist, artistMeta);
  const artRef = getRef(metadata.preview);

  useEffect(() => {
    getDownloadURL(artRef).then((url) => {
      document.getElementById(`${id}-rank-preview`)?.setAttribute("src", url);
      document.getElementById(`rank-image-${rank}`)?.classList.remove("hidden");
      document.getElementById(`${id}-rank-fav`)?.classList.remove("hidden");
    });

    if (profileRef) {
      getDownloadURL(profileRef).then((url) => {
        document.getElementById(`${id}-rank-profile`)?.setAttribute("src", url);
      });
    }
  }, []);
  return (
    <div key={id} className="rank-item">
      <div className="rank-image relative">
        <Link to={`artwork/${id}`}>
          <span
            id={`rank-image-${rank}`}
            className={
              rank < 4 ? "absolute hidden" : "absolute hidden rank-span"
            }
          >
            {rank}
          </span>
          <img
            id={`${id}-rank-preview`}
            className="rank-artwork curved-corner"
            alt={`${id}`}
          />
        </Link>
        <img
          id={`${id}-rank-fav`}
          src={fav ? fav2 : fav1}
          onClick={() => {
            fav ? setFav(false) : setFav(true);
          }}
          className="homepage-fav absolute hidden"
        />
      </div>
      <div className="rank-info">
        <Link to={`artwork/${id}`}>
          <div className="homepage-title">{metadata.title}</div>
        </Link>
        <div onClick={redirectPixiv}>
          <div className="rank-artist flex">
            <div className="homepage-artist-profile">
              <img id={`${id}-rank-profile`} />
            </div>
            <div className="homepage-artist-name rank-artist-name">
              {artist}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Rank: React.FC = () => {
  const row = [...rankMeta].map(renderRank);
  return (
    <div id="rank">
      <div id="rank-title">Daily rank</div>
      <div id="rank-date">Feb 24th ranking</div>
      <div id="rank-wrapper">
        <div className="rank-row flex">{row}</div>
      </div>
    </div>
  );
};

export default Rank;
