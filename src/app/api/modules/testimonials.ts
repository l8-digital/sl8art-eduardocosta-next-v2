import { Api } from "@/lib/api";

export class Testimonials extends Api {

    getAll() {
        return this.get(`/testimonials_all`);
    }

    getById(id: string) {
        return this.get(`/testimonial_by_id/${id}`);
    }

    getByLimited(limit?: string) {
        return this.get(`/testimonials_by_limited//${limit}`);
    }

    getPaginate() {
        return this.get(`/testimonials_paginate`);
    }
}
