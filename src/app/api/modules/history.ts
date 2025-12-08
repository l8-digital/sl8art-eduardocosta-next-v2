import { Api } from "@/lib/api";

export class History extends Api {

    getAll() {
        return this.get(`/history`);
    }

}
