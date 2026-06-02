import NewsPage from "@/app/(pages)/noticias/News/client";
import type { Metadata } from 'next';
import { api } from "@/app/api";
import { NewsType } from "@/types/news";

export const metadata: Metadata = {
    title: 'Notícias',
};

export default async function NewsServer() {

    const response = await api.news.getAll() as NewsType[];
    const emphasis = await api.news.getEmphasis() as NewsType[];

    const data = Array.isArray(response) ? response : [];
    const emphasisData = Array.isArray(emphasis) ? emphasis : [];

    return (
        <main>
            <NewsPage data={data} emphasis={emphasisData} />
        </main>
    );
}
