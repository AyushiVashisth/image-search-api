import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/ImageDetails.css";
import { clearSelectedImage } from "../redux/imageSlice";
import AOS from "aos";
import "aos/dist/aos.css";
import { fetchImageDetails } from "../redux/api";

const ImageDetails = () => {
  const { imageId } = useParams();
  const dispatch = useDispatch();

  const { selectedImage, imageStatus, imageError } = useSelector(
    (state) => state.images
  );
  console.log("s", selectedImage);

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  useEffect(() => {
    if (imageId) {
      dispatch(fetchImageDetails(imageId));
    }
    return () => {
      dispatch(clearSelectedImage());
    };
  }, [dispatch, imageId]);

  useEffect(() => {
    if (imageError) {
      toast.error(imageError);
    }
  }, [imageError]);

  if (imageStatus === "loading") {
    return (
      <div className="image-details-overlay">
        <div className="image-details loading" data-aos="fade-in">
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  if (imageStatus === "failed") {
    return (
      <div className="image-details-overlay">
        <div className="image-details error" data-aos="fade-in">
          <p>Error: {imageError}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="image-details-overlay">
      {selectedImage && (
        <div className="image-details" data-aos="fade-in">
          <div>
            <img
              src={selectedImage.urls.regular}
              alt={selectedImage.alt_description}
              data-aos="zoom-in"
            />
          </div>
          <div className="details" data-aos="fade-up">
            <h2>{selectedImage.alt_description}</h2>
            <p>
              <strong data-aos="fade-up" data-aos-delay="100">
                Height:
              </strong>{" "}
              {selectedImage.height}
            </p>
            <p>
              <strong data-aos="fade-up" data-aos-delay="100">
                Views:
              </strong>{" "}
              {selectedImage.views}
            </p>
            <p>
              <strong data-aos="fade-up" data-aos-delay="100">
                Actors:
              </strong>{" "}
              {selectedImage.Actors}
            </p>
            <p>
              <strong data-aos="fade-up" data-aos-delay="100">
                Update Date:
              </strong>{" "}
              {selectedImage.updated_at}
            </p>
            <p>
              <strong data-aos="fade-up" data-aos-delay="100">
                Likes:
              </strong>{" "}
              {selectedImage.likes}
            </p>
            <p>
              <strong data-aos="fade-up" data-aos-delay="100">
                Downloads:
              </strong>{" "}
              {selectedImage.downloads}
            </p>
            <p>
              <strong data-aos="fade-up" data-aos-delay="100">
                Created Date:
              </strong>{" "}
              {selectedImage.created_at}
            </p>
          </div>
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default ImageDetails;
