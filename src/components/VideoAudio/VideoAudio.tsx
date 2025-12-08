import style from './style.module.scss';

type BackgroundVideoProps = {
  src: string;
};

export default function BackgroundVideo({ src }: BackgroundVideoProps) {
  return (

    <video
      className={style.video}
      id="bgVideo"
      loop
      muted
      playsInline
      autoPlay>
      <source src={src} type="video/webm" />
    </video>
  );
}

