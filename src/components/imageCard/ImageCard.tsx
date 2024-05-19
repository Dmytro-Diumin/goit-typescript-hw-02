import { FC } from "react";
import { Photo } from "../../types";

interface ImageCardProps {
  photo: Photo;
  onImageClick: (photo: Photo, size: "regular" | "small") => void;
}

const ImageCard: FC<ImageCardProps> = ({ photo, onImageClick }) => {
  return (
    <div onClick={() => onImageClick(photo, "regular")}>
      <img src={photo.urls.small} alt={photo.alt_description} />
      <div>
        <p>Author: {photo.user.name}</p>
        <p>Created at: {new Date(photo.created_at).toLocaleDateString()}</p>
      </div>
    </div>
  );
};

export default ImageCard;
