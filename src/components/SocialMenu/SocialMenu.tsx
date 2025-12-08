import style from './style.module.scss';
import Icon from '@/components/Icon/Icon';

export default function SocialMenu() {

    const click =  (social: string, url: string) => {

        fetch(`/api/click-social`, {
            method: 'POST',
            body: JSON.stringify({ click: social }),
            headers: {
                'Content-Type': 'application/json',
            }
        });
        window.open(url, '_blank');
    }
  return (
    <ul className={style.social} >

      <li >
        <button type="button" className="block" onClick={() => click('facebook', 'https://www.facebook.com/sl8art')}
          aria-label="Facebook">
          <Icon name="icon-facebook-round" className="w-8 h-8 fill-secondary md:hidden" />
          <Icon name="icon-facebook-round"
            className="w-7 h-7 fill-primary hover:fill-white hidden md:block " />

        </button>
      </li>

      <li >
        <button type="button" className="block" onClick={() => click('instagram', 'https://www.facebook.com/sl8art')}
          aria-label="Instagram">
          <Icon name="icon-instagram-round" className="w-8 h-8 fill-secondary md:hidden" />
          <Icon name="icon-instagram-round"
            className="w-7 h-7 fill-primary hover:fill-white hidden md:block" />
        </button>
      </li>

      <li >
        <button type="button" className="block" onClick={() => click('tiktok', 'https://www.facebook.com/sl8art')}
          aria-label="Tiktok">
          <Icon name="icon-tiktok-round" className="w-8 h-8 fill-secondary md:hidden" />
          <Icon name="icon-tiktok-round"
            className="w-7 h-7 fill-primary hover:fill-white hidden md:block" />
        </button>
      </li>

      <li >
        <button type="button" className="block" onClick={() => click('youtube', 'https://www.facebook.com/sl8art')}
          aria-label="Youtube">
          <Icon name="icon-youtube-round" className="w-8 h-8 fill-secondary  md:hidden" />
          <Icon name="icon-youtube-round"
            className="w-7 h-7 fill-primary hover:fill-white hidden md:block" />
        </button>
      </li>

      <li >
        <button type="button" className="block" onClick={() => click('twitter_x', 'https://www.facebook.com/sl8art')}
          aria-label="Twitter">
          <Icon name="icon-x-round" className="w-8 h-8 fill-secondary md:hidden" />
          <Icon name="icon-x-round" className="w-7 h-7 fill-primary hover:fill-white hidden md:block" />
        </button>
      </li>

    </ul>

  )
}
