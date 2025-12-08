import { Api } from "@/lib/api";

export class BannerPopup extends Api {

    getAll() {
        return this.get(`/bannerpopup`);
    }

}
