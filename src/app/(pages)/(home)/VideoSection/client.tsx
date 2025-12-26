"use client";
import style from "./style.module.scss";
import { youtube } from "@/utils/youtube";
import { useEffect, useState } from "react";
import YouTubeEmbed from "@/components/YoutubeEmbed/YoutubeEmbed";
import Icon from "@/components/Icon/Icon";

interface YoutubePlaylistResponse {
    items: Array<{
        snippet: {
            resourceId: { videoId: string };
            title: string;
        };
    }>;
}
interface Props {
    playlistId: string;
    linkyoutube: string | null;
}

export default function ContactSection({ playlistId, linkyoutube }: Props) {
    const [playlistPage, setPlaylistPage] = useState<YoutubePlaylistResponse["items"]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [page, setPage] = useState(1);
    const [isPlaying, setIsPlaying] = useState(false);
    const videosPerPage = 3;
    const totalPage = Math.ceil(playlistPage.length / videosPerPage);

    useEffect(() => {
        async function fetchPlaylist() {
            // Declare response dentro da função com o tipo certo:
            const response = await youtube<YoutubePlaylistResponse>(
                "playlistlimit",
                playlistId ? playlistId : '',
                12
            );

            if (response.items.length > 0) {
                setPlaylistPage(response.items);
                setCurrentIndex(0);
                setPage(1);
            }
        }

        fetchPlaylist();
    }, [playlistId]);


    const startIndex = (page - 1) * videosPerPage;
    const endIndex = startIndex + videosPerPage;
    const visibleVideos = playlistPage.slice(startIndex, endIndex);

    const id = playlistPage[currentIndex]?.snippet.resourceId.videoId;
    const titleVideo = playlistPage[currentIndex]?.snippet.title;

    function prevPage() {
        setPage((p) => (p > 1 ? p - 1 : p));
    }

    function nextPage() {
        setPage((p) => (p < totalPage ? p + 1 : p));
    }

    function selectVideo(indexInPage = 0) {
        const realIndex = startIndex + indexInPage;
        setCurrentIndex(realIndex);
    }

    return (
        <section
            id="video"
            className={style["video"]}
            style={{
                backgroundSize: 'cover',
                position: 'relative',
            }}
        >


            <div className="container relative z-[2]">
                <div className="flex flex-col w-full h-full justify-start items-start gap-8">
                    <div className="w-full flex flex-col lg:flex-row gap-12 md:gap-16">
                        <div className="w-full lg:w-8/12 flex items-center z-[2]">
                            <div className={style['video__iframe']}>
                                {id && !isPlaying && (
                                    // 1. A FACHADA (visível quando isPlaying = false)
                                    <div
                                        className={style['youtube-facade']}
                                        onClick={() => setIsPlaying(true)}
                                        style={{ backgroundImage: `url(https://img.youtube.com/vi/${id}/hqdefault.jpg)` }}
                                        title={`Assistir: ${titleVideo}`}
                                    >
                                        <div className="w-max p-4 bg-black/20 rounded-lg flex items-center justify-center hover:bg-red transition-all transform duration-150 ease-in-out hover:scale-110">
                                            <Icon name="icon-play" className="fill-white w-6 h-6" />
                                        </div>
                                    </div>
                                )}
                                {id && isPlaying && (
                                    <YouTubeEmbed id={id} title={titleVideo} />
                                )}
                            </div>
                        </div>

                        <div className={style['video__info']}>
                            <div className="w-full ">
                                <p className={`${style["title"]} relative ${style["name--border-left"]}`}>você está assistindo</p>
                                <div className={`${style["name"]} flex flex-row w-full`}>
                                    <Icon name='icon-arrow' className='w-max stroke-white -rotate-90' />
                                    <p className={`!text-white md:!text-primary`}>
                                        {titleVideo || "Carregando..."}
                                    </p>
                                </div>
                            </div>

                            <div className="w-full h-full flex flex-col justify-between">
                                <p className={`${style["title"]} ${style["title--border-left"]}`}>
                                    ASSISTA TAMBÉM
                                </p>

                                <ul className="flex flex-col gap-4">
                                    {visibleVideos.map((item, index) => {
                                        const realIndex = startIndex + index;
                                        return (
                                            <li key={realIndex}>
                                                <button
                                                    type="button"
                                                    onClick={() => selectVideo(index)}
                                                    className={`${style["name"]} line-clamp-1`}>
                                                    <div>
                                                        <Icon name='icon-arrow' className='w-8 stroke-white -rotate-90' />
                                                    </div>
                                                    {item.snippet.title || ""}
                                                </button>
                                            </li>
                                        );
                                    })}
                                </ul>

                                <div className={style["c-navigation"]}>
                                    <button
                                        type="button"
                                        className={style["c-navigation__button"]}
                                        onClick={prevPage}
                                        disabled={page === 1}
                                        style={{ visibility: page === 1 ? "hidden" : "visible" }}>
                                        ANTERIOR
                                    </button>

                                    <button
                                        type="button"
                                        className={style["c-navigation__button"]}
                                        onClick={nextPage}
                                        disabled={page === totalPage}
                                        style={{ visibility: page === totalPage ? "hidden" : "visible" }}>
                                        PRÓXIMO
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    {linkyoutube &&
                        <a target="_blank" href={linkyoutube} className="hidden md:flex gap-2 md:gap-3 flex-row justify-start  md:items-center w-full md:w-max h-full uppercase text-white font-tertiary transition duration-300 ease-in-out hover:opacity-80 ">
                            <Icon name="icon-youtube-music-symbol" className="w-6 md:w-7 fill-white " />
                            <div className="text-sm md:text-base w-full flex-wrap flex">
                                Inscreva-se no meu canal oficial do Youtube
                            </div>
                        </a>
                    }
                </div>
            </div>
        </section>
    );
}
