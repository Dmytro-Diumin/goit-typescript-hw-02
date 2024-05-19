import Modal from "react-modal";
import { FC, KeyboardEvent } from "react";
import { Photo } from "../../types";

interface ImageModalProps {
  isOpen: boolean;
  photo: Photo | null;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

Modal.setAppElement("#root");

const ImageModal: FC<ImageModalProps> = ({
  isOpen,
  photo,
  onClose,
  onNext,
  onPrev,
}) => {
  if (!photo) {
    return null;
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>):void => {
    if (e.key === "ArrowLeft") {
      onPrev();
    } else if (e.key === "ArrowRight") {
      onNext();
    }
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} style={customStyles}>
      <div onKeyDown={handleKeyDown} tabIndex={0}>
        <img src={photo.urls.regular} alt={photo.alt_description} />
      </div>
      <button onClick={onClose}>Close</button>
    </Modal>
  );
};

export default ImageModal;
