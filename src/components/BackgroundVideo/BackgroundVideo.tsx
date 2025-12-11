import { useRef } from 'react';
import style from './style.module.scss';
// import Icon from '../Icon/Icon';

type BackgroundVideoProps = {
    src: string;

};

export default function BackgroundVideo({ src }: BackgroundVideoProps) {
    // const [isSoundOn, setIsSoundOn] = useState(false);
    const videoRef = useRef(null);

    // const buttonClasses = `
    //     ${style.buttonVideo}
    //     font-medium tracking-none text-white absolute font-tertiary w-full h-full z-[2] top-0 left-0 ${isSoundOn ? 'opacity-0 cursor-auto' : 'opacity-40  hover:opacity-70 cursor-pointer'}
    // `;
    return (
        <>
            {/* <button aria-label='Botao' id="buttonVideo"
                className={buttonClasses}
                onClick={() => {
                    setIsSoundOn(true)
                }}>
                <Icon name="icon-touch" className={`${style['icon']} mx-auto w-9 mb-2 text-center fill-white ` }/>
                Ative o som
            </button> */}

            <video
                ref={videoRef}
                className={style.video}
                id="bgVideo"
                loop
                muted
                playsInline
                autoPlay>
                <source src={src} type="video/webm" />

                <track 
                    src="/video/home/parallax.vtt" 
                    kind="captions" 
                    srcLang="pt-br" 
                    label="Português (Brasil)"
                />
            </video>
    </>
    );
}
