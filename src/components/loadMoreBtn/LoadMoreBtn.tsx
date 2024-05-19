import { FC } from "react";

interface LoadMoreBtnProps {
  onLoadMore: () => void;
}

const LoadMoreBtn: FC<LoadMoreBtnProps> = ({ onLoadMore }) => {
  return (
    <div>
      <button onClick={onLoadMore}>Load more</button>
    </div>
  );
};

export default LoadMoreBtn;
