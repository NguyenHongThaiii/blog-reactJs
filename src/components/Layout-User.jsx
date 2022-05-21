import React from "react";
import BackArrow from "./Back-Arrow";
import Footer from "./Footer";
import Header from "./Header";
import Nav from "./Nav";

function LayoutUser({ children }) {
  return (
    <>
      <Header />
      {children}
      <Nav />
      <BackArrow />
      <Footer />
    </>
  );
}

export default LayoutUser;
