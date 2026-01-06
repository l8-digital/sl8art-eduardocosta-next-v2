
export const dynamic = "force-dynamic";

import { api } from "@/app/api";
import { EventType } from "@/types/event";
import dynamicImport from "next/dynamic";

// client component carregado normalmente
const EventsSection = dynamicImport(
  () => import("@/app/(pages)/(home)/EventsSection/client"),
  { ssr: true } // opcional, mas explícito
);

export default async function ServerCalendar() {
  const response = (await api.events.getLimited(12)) as EventType[];

  return <EventsSection data={response} />;
}
