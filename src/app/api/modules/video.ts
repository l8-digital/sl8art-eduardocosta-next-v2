import { Api } from "@/lib/api";

export class Video extends Api {

    getAll() {
        return this.get(`/video_fixed`);
    }

}
