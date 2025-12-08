import EventsMonth from "./EventsMonth/client";
import { api } from "@/app/api";
import type { Metadata } from 'next';
import type { EventsByMonth } from "@/types/event";

export const metadata: Metadata = {
    title: 'Agenda',
};

export default async function EventsServer() {

    const response = await api.events.getMonth() as EventsByMonth;


    return (
        <main>
            <EventsMonth data={response} />
        </main>
    );
}
