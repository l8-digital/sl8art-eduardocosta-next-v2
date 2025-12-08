import { Api } from "@/lib/api";
import { apiCache } from "@/utils/cache";

export class Spotify extends Api {

    async getAll() {
        const endpoint = "/spotify_all";

        const cached = apiCache.get(endpoint);
        if (cached) return cached;

        const data = await this.get(endpoint);
        apiCache.set(endpoint, data);
        
        return data;
    }

    async getFollowers() {
        const endpoint = "/spotify_followers";

        const cached = apiCache.get(endpoint);
        if (cached) return cached;

        const data = await this.get(endpoint);
        apiCache.set(endpoint, data);

        return data;
    }

    async getAlbuns() {
        const endpoint = "/spotify_albuns";

        const cached = apiCache.get(endpoint);
        if (cached) return cached;

        const data = await this.get(endpoint);
        apiCache.set(endpoint, data);

        return data;
    }

    async getTopTracks() {
        const endpoint = "/spotify_top_tracks";

        const cached = apiCache.get(endpoint);
        if (cached) return cached;

        const data = await this.get(endpoint);
        apiCache.set(endpoint, data);

        return data;
    }

    async getAlbunsSingles() {
        const endpoint = "/spotify_albuns_singles";

        const cached = apiCache.get(endpoint);
        if (cached) return cached;

        const data = await this.get(endpoint);
        apiCache.set(endpoint, data);

        return data;
    }

    async getAlbunsFilter() {
        const endpoint = "/spotify_albuns_filter";

        const cached = apiCache.get(endpoint);

        if (cached) return cached;

        const data = await this.get(endpoint);
        apiCache.set(endpoint, data);

        return data;
    }
}
