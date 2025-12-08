import { api } from "@/app/api";
import { EventType } from "@/types/event";
import dynamic from "next/dynamic";
const EventsSection = dynamic(() =>
    import('@/app/(pages)/(home)/EventsSection/client')
);


export default async function ServerCalendar() {

    const response = await api.events.getLimited(12) as EventType[];
   
    return (
        <EventsSection data={response} />
    )
}