import dynamic from "next/dynamic";
const SocialSection = dynamic(() =>
    import('@/app/(pages)/(home)/SocialSection/client')
);

export default async function ServerSocial() {
  
    return (
        <SocialSection />
    )
}