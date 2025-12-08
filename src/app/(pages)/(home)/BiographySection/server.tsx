import { api } from "@/app/api";
import { BiographyType } from "@/types/biography";
import dynamic from "next/dynamic";
const BiographySection = dynamic(() =>
    import('@/app/(pages)/(home)/BiographySection/client')
);

export default async function ServerBiography() {

    const response = await api.biography.getAll() as BiographyType[] ;
    const data = response[0];

  
    return (
        <BiographySection data={data} />
    )
}