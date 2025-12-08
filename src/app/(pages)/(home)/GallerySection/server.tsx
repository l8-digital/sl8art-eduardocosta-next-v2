import { api } from "@/app/api";
import { PlataformsIdTypes } from "@/types/configuration";
import dynamic from "next/dynamic";
const GallerySection = dynamic(() =>
    import('@/app/(pages)/(home)/GallerySection/client')
);

export default async function ServerGallery() {

    const basic = await api.configuration.getPlataformsId() as PlataformsIdTypes[];
    const flickId = basic[0].flickrid;

    return (

        <>
            {flickId && (
                <GallerySection flickrId={flickId} />
            )}
        </>
    )
}