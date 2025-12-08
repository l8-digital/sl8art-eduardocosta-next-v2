"use server"
import { api } from "@/app/api";
import { ConfigurationTypes, SocialType } from "@/types/configuration";
import { DepartamentType } from "@/types/department";
import { State } from "@/types/state";
import dynamic from "next/dynamic";
const ContactSection = dynamic(() =>
    import('@/app/(pages)/(home)/ContactSection/client')
);

export default async function ServerContact() {

    const response = await api.contacts.getAllDepartments() as DepartamentType[];
    const config = await api.configuration.getAll() as ConfigurationTypes;
    const social = await api.configuration.getSocial() as SocialType[];
    const states = await api.states.getStates() as State[];
    const linkDriver = config?.l8driver;

    const logo = social[0]?.logo_cdn

    return (
        <ContactSection data={response} linkDriver={linkDriver} logo={logo} states={states} />
    )
}
