"use server-only"

import { api } from "@/app/api";

export const socialClick = async (data: {click: string}) => {
    await api.socialClick.registerClick(data);
}
