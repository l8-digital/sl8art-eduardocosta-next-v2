"use server-only"

import { api } from "@/app/api";

export const getCities = async (stateId: string | number) => {
    const cities = await api.cities.getCities(stateId);
    return cities;
}
