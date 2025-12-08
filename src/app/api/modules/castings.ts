import { Api } from "@/lib/api";

export class Castings extends Api {

    getAll() {
        return this.get(`/castings`);
    }

    getById(id: string) {
        return this.get(`/casting/${id}`);
    }

    getByName(name: string) {
        return this.get(`/casting_by_name/${name}`);
    }

    getBySlug(slug: string) {
        return this.get(`/casting_by_name/${slug}`);
    }

    getCategories() {
        return this.get(`/casting_musical_styles`);
    }

    getCategoryById(id?: string) {
        return this.get(`/casting_musical_styles/${id}`);
    }

    getLimited(limit?: number, style?: string) {
        return this.get(`/casting_musical_styles/${limit}/${style}`);
    }

    getPaginate(page?: number, limit?: number, style?: string) {
        return this.get(`/casting_paginate/${page}/${limit}/${style}`);
    }

    getEmphasis() {
        return this.get(`/casting_emphasis`);
    }
}
