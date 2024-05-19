import { useEffect, useState, useRef } from "react";
import "./App.css";
import { Toaster } from "react-hot-toast";
import ImageModal from "./components/imageModal/ImageModal";
import LoadMoreBtn from "./components/loadMoreBtn/LoadMoreBtn";
import SearchBar from "./components/searchBar/SearchBar";
import getPhotos, { GetPhotosResponse } from "./components/API/imageAPI";
import ErrorMessage from "./components/errorMessage/ErrorMessage";
import ImageGallery from "./components/imageGallery/ImageGallery";

import { DNA } from "react-loader-spinner";
import { Photo } from "./types";

function App() {
  const [query, setQuery] = useState<string>("");
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loader, setLoader] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalPhoto, setModalPhoto] = useState<Photo | null>(null);
  const [modalPhotoIndex, setModalPhotoIndex] = useState<number | null>(null);
  const imageListRef = useRef<HTMLUListElement>(null);

  const handleNextPhoto = (): void => {
    setModalPhotoIndex((prevIndex) =>
      prevIndex !== null
        ? prevIndex === photos.length - 1
          ? 0
          : prevIndex + 1
        : null
    );
  };

  const handlePrevPhoto = (): void => {
    setModalPhotoIndex((prevIndex) =>
      prevIndex !== null
        ? prevIndex === 0
          ? photos.length - 1
          : prevIndex - 1
        : null
    );
  };

  const handleLoadMore = (): void => {
    setPage((prevPage) => prevPage + 1);
  };

  useEffect(() => {
    const fetchPhotos = async () => {
      if (query.length > 0) {
        try {
          setLoader(true);
          setError(false);
          const fetchedData: GetPhotosResponse = await getPhotos(query, page);
          setTotalPages(fetchedData.total_pages);
          setPhotos((prevPhotos) => [...prevPhotos, ...fetchedData.results]);
        } catch (error) {
          setError(true);
        } finally {
          setLoader(false);
        }
      }
    };
    fetchPhotos().then(() => {
      if (imageListRef.current) {
        const firstImage = imageListRef.current
          .firstElementChild as HTMLElement;
        if (firstImage) {
          const firstImageHeight = firstImage.getBoundingClientRect().height;
          imageListRef.current.scrollTop -= 2 * firstImageHeight;
        }
      }
    });
  }, [query, page]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent): void => {
      if (isModalOpen) {
        if (e.key === "ArrowLeft") {
          handlePrevPhoto();
        } else if (e.key === "ArrowRight") {
          handleNextPhoto();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isModalOpen, handleNextPhoto, handlePrevPhoto]);

  useEffect(() => {
    if (isModalOpen && photos.length > 0) {
      setModalPhotoIndex(0);
    }
  }, [isModalOpen, photos]);

  const handleSearch = (query: string): void => {
    setQuery(query);
    setPhotos([]);
    setPage(1);
  };

  const openModal = (photo: Photo, size: "regular" | "small") => {
    setModalPhoto(photo);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalPhoto(null);
  };

  return (
    <>
      <SearchBar onSearch={handleSearch} />
      <Toaster position="top-right" reverseOrder={false} />
      {error && <ErrorMessage message="Error fetching photos" />}
      <ImageGallery photos={photos} openModal={openModal} />
      {loader ? (
        <DNA />
      ) : (
        <>{totalPages > page && <LoadMoreBtn onLoadMore={handleLoadMore} />}</>
      )}
      {isModalOpen && (
        <ImageModal
          isOpen={isModalOpen}
          photo={photos[modalPhotoIndex || 0]}
          onClose={closeModal}
          onNext={handleNextPhoto}
          onPrev={handlePrevPhoto}
        />
      )}
    </>
  );
}

export default App;
