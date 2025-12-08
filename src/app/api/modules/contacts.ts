import { Api } from "@/lib/api";
import { Contacts as ContactType } from "@/types/contact";

export class Contacts extends Api {

    getAllDepartments() {
        return this.get(`/department`);
    }

    setContact(data: ContactType) {
        return this.post(`/contact_create`, data);
    }

}
