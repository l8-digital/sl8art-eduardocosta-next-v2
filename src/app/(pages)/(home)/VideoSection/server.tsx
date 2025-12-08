import { api } from "@/app/api";
import dynamic from "next/dynamic";
import type { PlataformsIdTypes, SocialType } from "@/types/configuration";

const VideoSection = dynamic(() =>
    import('@/app/(pages)/(home)/VideoSection/client')
);

export default async function ServerVideo() {

    const basic = await api.configuration.getPlataformsId() as PlataformsIdTypes[];
    const social = await api.configuration.getSocial() as SocialType[]
    const playlistId = basic[0]?.youtubeidplaylist;
    return (
        <VideoSection playlistId={playlistId ? playlistId : ''} linkyoutube={social[0]?.youtube}/>
    )

}