import React from "react";
import "../assets/css/Homepage.css";
import Selection from "../components/Selection";
import Recommended from "../components/Recommended";
import Rank from "../components/Rank";

const Homepage: React.FC = () => {
  return (
    <main className="content">
      <Selection />
      <Recommended />
      <Rank />
    </main>
  );
};

export default Homepage;
