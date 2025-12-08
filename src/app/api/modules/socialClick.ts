import { Api } from "@/lib/api";

export class SocialClick extends Api {

    registerClick(data: { click: string }) {
        return this.post(`/click`, data);
    }

}
