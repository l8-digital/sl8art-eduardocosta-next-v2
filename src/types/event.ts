export interface EventCasting {
  // Ajuste depois se souber a estrutura interna
  [key: string]: unknown;
}

export interface EventsByMonth {
  [month: string]: EventType[];
}

export interface EventDetails {
  data: EventType[],
  detail: EventType,
}

export interface EventType {
  id: number;
  person_id: number;
  cities_id: number;
  date: string; // '2026-01-25'
  name: string;
  local: string;
  site: string | null;
  folder: string | null;
  point_sale: string | null;
  link_sale: string | null;
  prize_draw: boolean;
  prize_drawn: boolean | null;
  corporate: boolean;
  show_time_site: boolean;
  time: string | null; // '14:18:00'
  district: string | null;
  tour: boolean;
  latitude: string | null;
  longitude: string | null;
  zip_code: string | null;
  street: string | null;
  number: string | null;
  neighborhood: string | null;
  complement: string | null;
  url: string | null;
  deleted_at: string | null;
  created_at: string;
  updated_at: string;
  xpshows_id: number | null;
  agendaoficial_id: number | null;
  artiz_id: number | null;
  has_date_draw: boolean;
  draw_date: string | null;
  draw_time: string | null;
  casting_id: number | null;
  uuid: string;
  language: string;
  start_date_draw_at: string | null;
  end_date_draw_at: string | null;
  start_time_draw_at: string | null;
  end_time_draw_at: string | null;
  city_name: string;
  state_name: string;
  state_uf: string;
  country_name: string;
  casting: EventCasting | null;
}
