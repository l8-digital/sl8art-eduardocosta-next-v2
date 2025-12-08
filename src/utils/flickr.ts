import { FlickrAlbumType, FlickrPhotoType } from "@/types/flickr";
import axios from "axios";

const API_KEY = "2f0e634b471fdb47446abcb9c5afebdc";

// Buscar todos os álbuns de um usuário
// Cache em memória
type CacheEntry = {
  timestamp: number;
  data: FlickrAlbumType[];
};

const cache: Record<string, CacheEntry> = {};
const CACHE_DURATION = 60 * 60 * 1000; // 1 hora

export async function flickrAlbuns(userId: string): Promise<FlickrAlbumType[]> {
  const now = Date.now();

  // Se já tem cache e ainda está válido
  if (cache[userId] && now - cache[userId].timestamp < CACHE_DURATION) {
    console.log("📦 Retornando do cache");
    return cache[userId].data;
  }

  try {
    const { data } = await axios.get("https://api.flickr.com/services/rest/", {
      params: {
        method: "flickr.photosets.getList",
        api_key: API_KEY,
        user_id: userId,
        primary_photo_extras: "url_o,url_l",
        format: "json",
        nojsoncallback: 1,
      },
    });

    if (!data.photosets?.photoset) throw new Error("Álbuns não encontrados");

    const albuns = data.photosets.photoset as FlickrAlbumType[];

    // Salva no cache
    cache[userId] = {
      timestamp: now,
      data: albuns,
    };

    return albuns;
  } catch (err) {
    console.error("Erro ao buscar álbuns do Flickr:", err);
    throw err;
  }
}


// Buscar fotos de um álbum específico
export async function flickrAlbum(userId: string, albumId: string): Promise<FlickrPhotoType[]> {
  try {
    const { data } = await axios.get("https://api.flickr.com/services/rest/", {
      params: {
        method: "flickr.photosets.getPhotos",
        api_key: API_KEY,
        user_id: userId,
        photoset_id: albumId,
        extras: "url_l",
        format: "json",
        nojsoncallback: 1,
      },
    });

    if (!data.photoset?.photo) throw new Error("Fotos não encontradas");

    return data.photoset.photo
      .map((item: { url_l: string; title: string }) => ({
        src: item.url_l,
        alt: item.title,
      }))
      .filter(Boolean);
  } catch (err) {
    console.error("Erro ao buscar fotos do álbum:", err);
    throw err;
  }
}
