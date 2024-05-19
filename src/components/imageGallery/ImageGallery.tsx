import { FC } from "react";
import ImageCard from "../imageCard/ImageCard";
import style from "./ImageGallery.module.css";
import { Photo } from "../../types";

interface ImageGalleryProps {
  photos: Photo[];
  openModal: (photo: Photo, size: "regular" | "small") => void;
}

const ImageGallery: FC<ImageGalleryProps> = ({ photos, openModal }) => {
  return (
    <ul className={style.ImageWrap}>
      {photos.map((photo, index) => (
        <li key={photo.id + index}>
          <ImageCard
            key={photo.id + index}
            photo={photo}
            onImageClick={openModal}
          />
        </li>
      ))}
    </ul>
  );
};

export default ImageGallery;
