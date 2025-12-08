import { Api } from "@/lib/api";

export class Banner extends Api {

    getAll() {
        return this.get(`/banner`);
    }

}
