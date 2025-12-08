
import DetailsNewsPage from "@/app/(pages)/noticia/[slug]/NewsDetails/client";
import { api } from "@/app/api";
import { NewsType } from "@/types/news";

async function fetchEvent(slug: string) {
  const response = await api.news.getByUrl(slug) as NewsType;
  return response;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const response = await fetchEvent(slug);

  return {
    title: response.title,
    description: `Leia a matéria completa sobre ${response.title} e fique por dentro de todos os detalhes.`,
    keywords: response.tags,
    openGraph: {
      title: response.title,
      description: `Leia a matéria completa sobre ${response.title} e fique por dentro de todos os detalhes.`,
      keywords: response.tags,
    }
  };
}

export default async function NewsDetails(
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const response = await fetchEvent(slug);
  const news = await api.news.getAll() as NewsType[];

  return (
    <main>
      <DetailsNewsPage data={response} news={news} />
    </main>
  );
}