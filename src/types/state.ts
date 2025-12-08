export interface State {
    id: number;
    countries_id: number|string;
    name: string;
    uf: string;
    region?: string|null;
    latitude?: string|null;
    longitude?: string|null;

}
