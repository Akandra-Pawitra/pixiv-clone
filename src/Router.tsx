import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import Artpage from "./pages/Artpage";
import Homepage from "./pages/Homepage";
import Redirect from "./pages/Redirect";

const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <Navigation />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/artwork/:id" element={<Artpage />} />
        <Route path="/redirect" element={<Redirect />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
