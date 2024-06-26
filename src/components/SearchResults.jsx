import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { FaHandPointLeft } from "react-icons/fa";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import Pagination from '@mui/material/Pagination';
import "../styles/SearchResults.css";
import { fetchImages } from "../redux/api";

const SearchResults = () => {
  const { query } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const { images, status, error, totalPages } = useSelector((state) => state.images);
  const [page, setPage] = useState(1);
  const resultsPerPage = 10;

  useEffect(() => {
    if (query) {
      dispatch(fetchImages({ query, page, resultsPerPage }));
    }
  }, [dispatch, query, page]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const handleBack = () => {
    navigate(`/`);
  };

  const handleImageClick = (imageId) => {
    navigate(`/details/${imageId}`);
  };

  const handleChangePage = (event, value) => {
    setPage(value);
  };

  if (status === "idle" || status === "loading") {
    return (
      <div className="search-results">
        <SkeletonTheme color="#202020" highlightColor="#444">
          <div className="skeleton-container">
            {[...Array(5)].map((_, index) => (
              <div key={index} className="skeleton-item">
                <Skeleton circle={true} height={40} width={40} />
                <Skeleton height={20} width={`80%`} style={{ marginTop: 10 }} />
                <Skeleton height={20} width={`60%`} />
                <Skeleton height={20} width={`90%`} />
                <Skeleton height={20} width={`75%`} />
              </div>
            ))}
          </div>
        </SkeletonTheme>
      </div>
    );
  }

  if (status === "failed") {
    return (
      <div className="search-results">
        <div className="error">
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (status === "succeeded" && images.length === 0) {
    return (
      <div className="search-results">
        <div className="no-results">
          <p>No results found.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="search-results">
      <div className="heading-container">
        <h1>Search Results for "{query}"</h1>
        <button className="backButton" onClick={handleBack}>
          <FaHandPointLeft className="backIcon" />
          Back
        </button>
      </div>
      <div className="results-container">
        {images.map((image) => (
          <div
            key={image.id}
            className="image-item"
            onClick={() => handleImageClick(image.id)}
          >
            <img src={image.urls.small} alt={image.alt_description} />
            <p>{image.alt_description}</p>
          </div>
        ))}
      </div>
      <Pagination 
        count={totalPages} 
        page={page} 
        onChange={handleChangePage} 
      />
      <ToastContainer />
    </div>
  );
};

export default SearchResults;
