import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./components/bhavCopyComponents/Home"; // Home page import

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
  );
};

export default App;
