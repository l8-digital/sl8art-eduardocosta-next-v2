import { Api } from "@/lib/api";

export class Events extends Api {

    getById(id: string) {
        return this.get(`/calendar_id/${id}`);
    }

    getByUrl(url: string) {
        return this.get(`/calendar_url/${url}`);
    }

    getMonth(init?: RequestInit) {
        return this.get(`/calendar_month`, "", init);
    }

    getLimited(limit?: number, init?: RequestInit) {
        return this.get(`/calendar_limited/${limit}`, "", init);
    }

}