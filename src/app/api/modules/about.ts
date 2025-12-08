import { Api } from "@/lib/api";

export class About extends Api {

    getAll() {
        return this.get(`/about`);
    }

}
