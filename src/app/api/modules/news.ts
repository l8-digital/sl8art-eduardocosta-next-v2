import { Api } from "@/lib/api";

export class News extends Api {

    getAll() {
        return this.get(`/news`);
    }

    getById(id: string) {
        return this.get(`/new/${id}`);
    }

    getByUrl(url: string) {
        return this.get(`/new_url/${url}`);
    }

    getByTag(tag: string, id?: string) {
        return this.get(`/new_tag/${tag}/${id}`);
    }

    getExclusive() {
        return this.get(`/new_exclusive`);
    }

    getEmphasis() {
        return this.get(`/new_emphasis`);
    }
}