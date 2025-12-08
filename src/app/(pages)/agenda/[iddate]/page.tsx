import EventDetails from "@/app/(pages)/agenda/[iddate]/EventDetails/client";
import { api } from "@/app/api";
import { formatDate } from "@/utils/format";

import type { EventDetails as EventDetailsType } from "@/types/event";
import type { ConfigurationTypes } from "@/types/configuration";

async function fetchEvent(iddate: string) {
  const response = await api.events.getByUrl(iddate) as EventDetailsType;
  return response;
}

export async function generateMetadata({ params }: { params: Promise<{ iddate: string }> }) {
  const { iddate } = await params;
  const response = await fetchEvent(iddate);
  const event = response.detail;

  return {
    title: `${formatDate(event.date, { day: 'numeric', month: 'long' })} - ${event.city_name}`,
    description: `Detalhes do evento em ${event.city_name} – ${event.state_uf}`,
    openGraph: {
      title: `${formatDate(event.date, { day: 'numeric', month: 'long' })} - ${event.city_name}`,
      description: `Detalhes do evento em ${event.city_name} – ${event.state_uf}`,
    }
  };
}

export default async function EventDetailsServer(
  { params }: { params: Promise<{ iddate: string }> }
) {
  const { iddate } = await params;
  const response = await fetchEvent(iddate);
  const config = await api.configuration.getAll() as ConfigurationTypes;
  const linkFanclub = config.centralfa ?? "";
  const title = config.basic_configurations[0].meta_title

  return (
    <main>
      <EventDetails data={response} linkFanclub={linkFanclub} title={title}/>
    </main>
  );
}
