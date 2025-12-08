import { Api } from "@/lib/api";

export class Services extends Api {

    getAll() {
        return this.get(`/services`);
    }

    getById(id: string) {
        return this.get(`/service/${id}`);
    }

    getCategoryById(id: string) {
        return this.get(`/services_category/${id}`);
    }

    getCategories() {
        return this.get(`/services_categories`);
    }

    getCategoriesPaginate() {
        return this.get(`/services_categories_paginate`);
    }

    setClick(data: []) {
        return this.post(`/services_click/${data}`);
    }

}