import { Api } from "@/lib/api";

export class Products extends Api {

    getAll() {
        return this.get(`/products`);
    }

    getById(id: string) {
        return this.get(`/product/${id}`);
    }

    getPaginate() {
        return this.get(`/products_paginate`);
    }

    getEmphasis(limit?: number) {
        return this.get(`/products_paginate/${limit}`);
    }

    getCategoryById(id: string) {
        return this.get(`/products_category/${id}`);
    }

    getSubcategoryById(id: string) {
        return this.get(`/products_subcategory/${id}`);
    }

    setSearch(data: []) {
        return this.post(`/products_search/${data}`);
    }

    setClick(data: []) {
        return this.post(`/products_click/${data}`);
    }

}
