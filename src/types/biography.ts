export interface BiographyType {
  id: number;
  person_id: number;
  title: string;
  description: string;
  image: string;
  class: string;
  created_at: string;   // ISO datetime
  updated_at: string;   // ISO datetime
  language: string;
  image_cdn: string;
}
