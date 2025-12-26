'use client';

import style from './style.module.scss';
import Icon from '@/components/Icon/Icon';
import { useConfigApp } from '@/app/providers/app';

export default function SocialMenu() {
  const { linksocial } = useConfigApp();

  const click = (social: string, url: string) => {
    fetch(`/api/click-social`, {
      method: 'POST',
      body: JSON.stringify({ click: social }),
      headers: { 'Content-Type': 'application/json' }
    });

    if (url) window.open(url, '_blank');
  };

  return (
    <ul className={style.social}>

      {/* TWITTER / X */}
      {linksocial?.twitter && (
        <li className={style.itemFromLeft}>
          <button
            type="button"
            aria-label="Twitter"
            className="block"
            onClick={() =>
              click(
                'twitter_x',
                typeof linksocial.twitter === 'string'
                  ? linksocial.twitter
                  : linksocial.twitter || ''
              )
            }
          >
            <Icon name="icon-x-round" className="w-8 h-8 fill-[#fcf3dd] hover:fill-[#503316] md:hidden" />
            <Icon name="icon-x" className="w-7 h-4 fill-[#fcf3dd] hover:fill-[#503316] hidden md:block" />
          </button>
        </li>
      )}

      {/* TIKTOK */}
      {linksocial?.tiktok && (
        <li className={style.itemFromLeft}>
          <button
            type="button"
            aria-label="Tiktok"
            className="block"
            onClick={() =>
              click(
                'tiktok',
                typeof linksocial.tiktok === 'string'
                  ? linksocial.tiktok
                  : linksocial.tiktok || ''
              )
            }
          >
            <Icon name="icon-tiktok-round" className="w-8 h-8 fill-[#fcf3dd] hover:fill-[#503316] md:hidden" />
            <Icon name="icon-tiktok" className="w-7 h-5 fill-[#fcf3dd] hover:fill-[#503316] hidden md:block" />
          </button>
        </li>
      )}

      {/* INSTAGRAM */}
      {linksocial?.instagram && (
        <li className={style.itemFromLeft}>
          <button
            type="button"
            aria-label="Instagram"
            className="block"
            onClick={() =>
              click(
                'instagram',
                typeof linksocial.instagram === 'string'
                  ? linksocial.instagram
                  : linksocial.instagram || ''
              )
            }
          >
            <Icon name="icon-instagram-round" className="w-8 h-8 fill-[#fcf3dd] hover:fill-[#503316] md:hidden" />
            <Icon name="icon-instagram" className="w-7 h-6 fill-[#fcf3dd] hover:fill-[#503316] hidden md:block" />
          </button>
        </li>
      )}

      {/* FACEBOOK */}
      {linksocial?.facebook && (
        <li className={style.itemFromRight}>
          <button
            type="button"
            aria-label="Facebook"
            className="block"
            onClick={() =>
              click(
                'facebook',
                typeof linksocial.facebook === 'string'
                  ? linksocial.facebook
                  : linksocial.facebook || ''
              )
            }
          >
            <Icon name="icon-facebook-round" className="w-8 h-8 fill-[#fcf3dd] hover:fill-[#503316] md:hidden" />
            <Icon name="icon-facebook-square" className="w-6 h-5 fill-[#fcf3dd] hover:fill-[#503316] hidden md:block" />
          </button>
        </li>
      )}

      {/* YOUTUBE */}
      {linksocial?.youtube && (
        <li className={style.itemFromRight}>
          <button
            type="button"
            aria-label="Youtube"
            className="block"
            onClick={() =>
              click(
                'youtube',
                typeof linksocial.youtube === 'string'
                  ? linksocial.youtube
                  : linksocial.youtube || ''
              )
            }
          >
            <Icon name="icon-youtube-round" className="w-8 h-8 fill-[#fcf3dd] hover:fill-[#503316] md:hidden" />
            <Icon name="icon-youtube-music-symbol" className="w-6 h-6 fill-[#fcf3dd] hover:fill-[#503316] hidden md:block" />
          </button>
        </li>
      )}

    </ul>
  );
}
