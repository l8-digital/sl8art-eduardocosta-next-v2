export interface City {
    id: number;
    name: string;
    latitude?: string|null;
    longitude?: string|null;
    siafi_id?: string|null;
    ddd?: string|null;
    timezone?: string|null;
    capital?: string|null;
    states_id?: number|null;
}
