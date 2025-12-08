import { api } from "@/app/api";
import { ConfigurationTypes } from "@/types/configuration";
import dynamic from "next/dynamic";
const FanSection = dynamic(() =>
    import('@/app/(pages)/(home)/FanSection/client')
);

export default async function ServerGallery() {

    const config = await api.configuration.getAll() as ConfigurationTypes;
    const linkFanclub = config.centralfa;

    return (
        <FanSection linkFanclub={linkFanclub} />
    )
}