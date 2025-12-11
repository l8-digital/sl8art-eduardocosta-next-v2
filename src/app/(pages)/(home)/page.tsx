import ServerHero from '@/app/(pages)/(home)/HeroSection/server';
import ServerVideoParallax from '@/app/(pages)/(home)/VideoParallax/server';
import ServerEvent from '@/app/(pages)/(home)/EventsSection/server';
import ServerMusic from '@/app/(pages)/(home)/MusicSection/server';
import ServerBiography from '@/app/(pages)/(home)/BiographySection/server';
import ServerVideos from '@/app/(pages)/(home)/VideoSection/server';
import ServerSocial from '@/app/(pages)/(home)/SocialSection/server';
import ServerContact from '@/app/(pages)/(home)/ContactSection/server';

export default function Home() {

  return (
    <main className="main ">

      <ServerHero />
      <ServerVideoParallax />
      <ServerEvent />
      <ServerMusic/>
      <ServerVideos />
      <ServerSocial />
      <ServerBiography />
      <ServerContact />

    </main>
  )
}