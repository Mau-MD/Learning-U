import axios from "axios";
import dotenv from "dotenv";
import { IUnsplashLinks } from "../types/image";

dotenv.config();

const unsplashUrl = "https://api.unsplash.com";

export const getImagesByQuery = async (query: string) => {
  try {
    const images = await axios.get(
      `${unsplashUrl}/search/photos?page=1&query=${encodeURIComponent(
        query
      )}&client_id=${process.env.UNSPLASH_ACCESS_KEY}`
    );

    return images.data.results.map((image) => {
      return { ...image.urls };
    }) as Array<IUnsplashLinks>;
  } catch (err) {
    console.log(err);
  }
};
