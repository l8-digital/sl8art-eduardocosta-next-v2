"use server-only"

import { api } from "@/app/api";
import { Contacts } from "@/types/contact";

export const saveContact = async (contactData: Contacts) => {
    const response = await api.contacts.setContact(contactData);
    return response;
}
