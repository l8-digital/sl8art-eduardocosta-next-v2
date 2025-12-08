import { api } from "@/app/api";
import dynamic from "next/dynamic";
import type { ThemeTypes } from "@/types/configuration";

const VideoParallax = dynamic(() =>
    import('@/app/(pages)/(home)/VideoParallax/client')
);

export default async function ServerVideoParallax() {

    const theme = await api.configuration.getTheme() as ThemeTypes;
    const bgvideo = theme?.bgvideo_desk_cdn;

    return (
        bgvideo &&
        <VideoParallax bgvideo={bgvideo} />
    )

}