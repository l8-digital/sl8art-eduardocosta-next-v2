export interface NewsType {
  id: number;
  person_id: number;
  title: string;
  text: string;
  image: string;
  date: string; // você pode trocar para Date se quiser
  url: string;
  tags: string;
  emphasis: number;
  deleted_at: string | null;
  created_at: string;
  updated_at: string;
  subtitle: string;
  image_subtitle: string;
  image_source: string;
  author: string;
  exclusive: number;
  image_mobile: string;
  news_categories_id: number | null;
  news_subcategories_id: number | null;
  language: string;
  image_cdn: string;
  image_mobile_cdn: string;
}
