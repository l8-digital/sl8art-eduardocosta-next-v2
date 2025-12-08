import { Api } from "@/lib/api";

export class States extends Api {

    getStates() {
        return this.get(`/states`);
    }

}
