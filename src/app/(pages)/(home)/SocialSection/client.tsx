'use client'
import Icon from '@/components/Icon/Icon';
import style from './style.module.scss';;

export default function SocialSection() {


  return (

    <section id="social" className={style['social']}>
      <div className="container">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <h2 className={style['social__title']} >
            REDES <br />SOCIAIS
          </h2>

          <div className="flex flex-col lg:flex-row items-center md:items-end md:gap-4" >
            <p className={`${style['social__subtitle']} text-center md:text-end lg:mb-6`} >
              <Icon name="icon-youtube-round" className="fill-secondary w-7 h-7 mb-1.5 mx-auto md:mr-0 md:ml-auto" />
              VISUALIZAÇÕES <br /> NO <br className="hidden lg:block" /> YOUTUBE
            </p>

            <p className={`${style['social__number']} text-6xl md:text-8xl lg:text-9xl`}>
              3.300.000

            </p>
            {/* <NumberAnimation className="social__number md:text-8xl lg:text-9xl" ref="number1" :from="0"
                :to="viewsYoutube" :format="theFormat" animationPaused @start="true" :duration="2" :delay="0"
                        easing="linear" /> */}
          </div>
        </div>

        <ul className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <li className="flex flex-col lg:flex-row items-center lg:items-end gap-3 md:gap-4">
            <p className={style['social__subtitle']}>
              <Icon name="icon-spotify-round" className="fill-secondary h-7 mb-1.5 mx-auto md:mx-0" />
              SEGUIDORES <br /> NO <br className="hidden lg:block" /> SPOTIFY
            </p>

            <p className={`${style['social__number']} text-6xl md:text-5xl lg:text-7xl`}>
              4.014.240
            </p>

            {/* <NumberAnimation className="social__number" ref="number2" :from="0" :to="followersSpotify"
                        :format="theFormat" animationPaused @start="true" :duration="1.4" :delay="1" easing="linear" /> */}
          </li>

          <li className="flex flex-col lg:flex-row items-center lg:items-end gap-3 md:gap-4 justify-center" >
            <p className={`${style['social__subtitle']} text-center md:text-start `} >
              <Icon name="icon-facebook-round" className="fill-secondary h-7 mb-1.5 mx-auto md:mx-0" />
              LIKES <br /> NO <br className="hidden lg:block" /> FACEBOOK
            </p>

            <p className={`${style['social__number']} text-6xl md:text-5xl lg:text-7xl`}>
              9.468.889
            </p>
            {/* <NumberAnimation className="social__number" ref="number3" :from="0" :to="followersFacebook"
                        :format="theFormat" animationPaused @start="true" :duration="1.6" :delay="2" easing="linear" /> */}
          </li>

          <li className="flex flex-col lg:flex-row items-center lg:items-end gap-3 md:gap-4 justify-end" >
            <p className={`${style['social__subtitle']} text-center md:text-start `} >
              <Icon name="icon-instagram-round" className="fill-secondary h-7 mb-1.5 mx-auto md:mx-0" />
              SEGUIDORES <br /> NO <br className="hidden lg:block" /> INSTAGRAM
            </p>

            <p className={`${style['social__number']} text-6xl md:text-5xl lg:text-7xl`}>
              9.846.840
            </p>

            {/* <NumberAnimation className="social__number" ref="number4" :from="0" :to="followersInstagram"
                        :format="theFormat" animationPaused @start="true" :duration="1.8" :delay="3" easing="linear" /> */}
          </li>
        </ul>
      </div>
    </section>
  )
}
