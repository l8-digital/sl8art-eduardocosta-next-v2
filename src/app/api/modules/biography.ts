import { Api } from "@/lib/api";

export class Biography extends Api {

    getAll() {
        return this.get(`/biography`);
    }

}
