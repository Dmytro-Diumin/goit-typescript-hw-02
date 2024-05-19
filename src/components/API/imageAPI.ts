import axios from "axios";
import { Photo } from "../../types";

export interface GetPhotosResponse {
  results: Photo[];
  total_pages: number;
}

const API_KEY = "En3UhBTNJe6OGbmm_t1hNH9-bZQQ9eaV-Z82Hz8bgpk";
axios.defaults.baseURL = "https://api.unsplash.com/";
const END_POINT = "search/photos";

const getPhotos = async (
  query: string,
  page: number
): Promise<GetPhotosResponse> => {
  const { data } = await axios.get(END_POINT, {
    params: {
      query: query,
      client_id: API_KEY,
      orientation: "landscape",
      per_page: 15,
      page: page,
    },
  });

  return data;
};
export default getPhotos;
