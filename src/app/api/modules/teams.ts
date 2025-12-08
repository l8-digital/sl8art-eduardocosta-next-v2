import { Api } from "@/lib/api";

export class Teams extends Api {

    getAll() {
        return this.get(`/teams`);
    }

    getById(id: string) {
        return this.get(`/teams/${id}`);
    }

}
