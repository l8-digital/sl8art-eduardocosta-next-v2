import dynamic from "next/dynamic";
const SocialSection = dynamic(() =>
    import('@/app/(pages)/(home)/ParallaxSection/client')
);

export default async function ServerParallax() {
  
    return (
        <SocialSection />
    )
}