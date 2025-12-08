export interface Contacts {
    id?: number;
    person_id: string|number;
    departament_contact_id: string|number;
    cities_id?: string|number;
    name: string;
    email?: string|null;
    phone?: string|null;
    message?: string|null;
    date_show?: string|null;
    attachment?: string|null;
}
