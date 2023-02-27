import React from "react";

const Selection: React.FC = () => {
  return (
    <div id="selection" className="flex">
      <div id="illust" className="select-type">
        <div className="select-status selected"></div>
        <p>Illustrations</p>
      </div>
      <div id="manga" className="select-type">
        <div className="select-status"></div>
        <p>Manga</p>
      </div>
      <div id="novel" className="select-type">
        <div className="select-status"></div>
        <p>Novels</p>
      </div>
    </div>
  );
};

export default Selection;
