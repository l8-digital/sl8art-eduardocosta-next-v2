import { api } from "@/app/api";
import dynamic from "next/dynamic";
import type { NewsType } from "@/types/news";

const NewsSection = dynamic(() =>
    import('@/app/(pages)/(home)/NewsSection/client')
);

export default async function ServerNews() {

    const response = await api.news.getEmphasis() as NewsType[];

    return (
        <NewsSection data={response} />
    )
}