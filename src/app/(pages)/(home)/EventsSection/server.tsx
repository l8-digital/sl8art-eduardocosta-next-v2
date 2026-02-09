import { api } from "@/app/api";
import { EventType } from "@/types/event";
import dynamicImport from "next/dynamic";

const EventsSection = dynamicImport(
  () => import("@/app/(pages)/(home)/EventsSection/client"),
  { ssr: true }
);

export default async function ServerCalendar() {
  // Agenda atualizada a cada 60 segundos (ISR)
  const response = (await api.events.getLimited(12, { next: { revalidate: 60 } })) as EventType[];

  return <EventsSection data={response} />;
}
