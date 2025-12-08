import { Api } from "@/lib/api";

export class Events extends Api {

    getById(id: string) {
        return this.get(`/calendar_id/${id}`);
    }

    getByUrl(url: string) {
        return this.get(`/calendar_url/${url}`);
    }

    getMonth() {
        return this.get(`/calendar_month`);
    }

    getLimited(limit?: number) {
        return this.get(`/calendar_limited/${limit}`);
    }

}