import { FlickrPhotoType } from '@/types/flickr';
import { SlideshowLightbox } from 'lightbox.js-react';


interface SlideshowModalProps {
  images: FlickrPhotoType[]; // A biblioteca espera um array de objetos com a chave 'src'
  isOpen: boolean;
  onClose: () => void;
}

export default function Lightbox({ images, isOpen, onClose }: SlideshowModalProps) {

  // Renderiza o componente lightbox APENAS se isOpen for true
  return (


    <SlideshowLightbox className='hidden'
      backgroundColor="rgba(0, 0, 0, 0.90)"
      images={images}
      iconColor="white"
      showControls={true} // Oculta todos os controles
      showMagnificationIcons={true} // Exibe os ícones de zoom
      showSlideshowIcon={false} // Oculta o ícone de slideshow
      showThumbnails={true}
      open={isOpen} // A prop 'open' garante que ele já abra em modo lightbox
      onClose={onClose}
    />


  );
}