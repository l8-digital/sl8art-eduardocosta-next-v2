export interface DepartamentType {

  id: number;
  person_id: number;
  description: string;
  responsible: string;
  phone1: string;
  phone2: string;
  email1: string;
  email2: string;
  image: string;
  is_show: boolean;
  choice: string | null;
  deleted_at: string | null;
  created_at: string;
  updated_at: string;
  url: string | null;
  language: string;
  image_cdn: string;

}