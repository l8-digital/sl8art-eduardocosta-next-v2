import { Api } from "@/lib/api";

export class Cities extends Api {

    getCities(stateId: string|number) {
        return this.get(`/cities/${stateId}`);
    }

}
