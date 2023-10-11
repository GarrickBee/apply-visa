import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import { Helmet, HelmetProvider } from "react-helmet-async";
import HomePage from "./page/home.page";

const helmetContext = {};

const App: React.FC<{}> = () => {
  const [theme, setTheme] = useState("dark");

  return (
    <>
      <HelmetProvider context={helmetContext}>
        {/* Default SEO  */}
        <Helmet>
          <meta
            name="description"
            content="Full stack engineer with 4 years of experience in startup, fintech and broadcasting industry. Pioneer engineer in
      building a startup app - Bjak.my that serves more than millions of customers in Malaysia. Leader in setting up an
      RPA team that automates 30+business processes in Astro. Self educated developer with promising learning ability."
          />

          <meta name="keywords" content="programming,coding,nodejs,typescript" />
          <meta name="designer" content="ndf_724@hotmail.com, Garrick" />
          <meta name="author" content="ndf_724@hotmail.com, Garrick" />
          <meta name="robots" content="index, follow" />
          <meta name="revisit-after" content="7 days" />
          <meta
            property="og:image"
            content="https://images.unsplash.com/photo-1484417894907-623942c8ee29?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&q=630"
          />
        </Helmet>

        <BrowserRouter basename="/">
          <Routes>
            <Route path="/" element={<HomePage />}></Route>
          </Routes>
        </BrowserRouter>
      </HelmetProvider>
    </>
  );
};

export default App;
