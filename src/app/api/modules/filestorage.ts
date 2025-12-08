import { Api } from "@/lib/api";

export class FileStorage extends Api {

    getAll() {
        return this.get(`/users_file`);
    }

    getDepartments(){
        return this.get(`/department_files`)
    }

}
