import axios from "axios";

const API_KEY = "34990362-54e8377378381fe38c3fa12ad";
const BASE_URL = "https://pixabay.com/api";

async function fetchImages (searchQuery, page) {
    const searchParams = new URLSearchParams({
        key: API_KEY,
        q: searchQuery,
        image_type:"photo", 
        orientation: "horizontal",
        per_page:12,
    });

    const url=`${BASE_URL}/?${searchParams}&page=${page}`;
    const response = await axios.get(url);
    const images = response.data;
    return images;
   ;
};

const api = {fetchImages};
export default api;
