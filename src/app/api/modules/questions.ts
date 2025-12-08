import { Api } from "@/lib/api";

export class Questions extends Api {

    getAll() {
        return this.get(`/questions_answers_all`);
    }

    getById(id: string) {
        return this.get(`/question_answer_id/${id}`);
    }

    getByLimited(limit?: string) {
        return this.get(`/question_answer_limited/${limit}`);
    }

    getPaginate() {
        return this.get(`/question_answer_paginate`);
    }

}