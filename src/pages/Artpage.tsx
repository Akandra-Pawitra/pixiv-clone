import { useParams } from "react-router-dom";
import React from "react";
import { getArtMetadata } from "../module/metadata";
import Artwork from "../components/Artwork";
import artworkMeta from "../assets/metadata/artworks.json";
import "../assets/css/Artwork.css";

const Artpage: React.FC = () => {
  const param = useParams();
  const id = param.id;
  const metadata = id ? getArtMetadata(parseInt(id), artworkMeta) : null;
  return (
    <main className="content">
      {metadata ? <Artwork metadata={metadata} /> : "Artwork not found"}
    </main>
  );
};

export default Artpage;
