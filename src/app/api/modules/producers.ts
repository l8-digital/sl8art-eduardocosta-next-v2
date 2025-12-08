import { Api } from "@/lib/api";

export class Producers extends Api {

    getAll() {
        return this.get(`/procuders`);
    }

    getById(id: number){
        return this.get(`/producer/${id}`)
    }

}
