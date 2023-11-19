import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./page/home.page";
import NewHomePage from "./page/new-home.page";
import "flowbite";

const App: React.FC<{}> = () => {
  return (
    <BrowserRouter basename="/">
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/new" element={<NewHomePage />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
