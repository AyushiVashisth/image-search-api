import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SearchResults from "../components/SearchResults";
import ImageDetails from "../components/ImageDetails";

const AllRoutes = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search/:query" element={<SearchResults />} />
        <Route path="/details/:imageId" element={<ImageDetails />} />
        <Route
          path="*"
          element={
            <div className="notFound">
              <p>Not found page</p>
            </div>
          }
        />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default AllRoutes;
