import dynamic from "next/dynamic";
const Parallax2Section = dynamic(() =>
    import('@/app/(pages)/(home)/Parallax2Section/client')
);

export default async function ServerParallax2() {
  
    return (
        <Parallax2Section />
    )
}