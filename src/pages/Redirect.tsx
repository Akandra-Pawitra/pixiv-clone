import React from "react";
import { useLocation } from "react-router-dom";
import "../assets/css/Redirect.css";

const Redirect: React.FC = () => {
  const { state } = useLocation();
  const { link } = state;
  const cancel = (): void => {
    history.back();
  };
  const confirm = (): void => {
    window.location.href = link;
  };
  return (
    <main className="content">
      <div id="redirect-wrapper" className="center-item">
        <div id="redirect-warning" className="flex">
          <p id="redirect-warning-message">You will be redirected to &nbsp;</p>
          <p id="redirect-link">{link}</p>
        </div>
        <div id="redirect-action" className="flex">
          <button id="redirect-cancel" className="charcoal" onClick={cancel}>
            GO BACK
          </button>
          <button id="redirect-confirm" className="charcoal" onClick={confirm}>
            CONTINUE
          </button>
        </div>
      </div>
    </main>
  );
};

export default Redirect;
