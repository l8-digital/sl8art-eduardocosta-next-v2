import { Configuration } from "./modules/configurations";
import { About } from "./modules/about";
import { Banner } from "./modules/banner";
import { BannerPopup } from "./modules/bannerpopup";
import { Biography } from "./modules/biography";
import { Castings } from "./modules/castings";
import { Contacts } from "./modules/contacts";
import { Events } from "./modules/events";
import { FileStorage } from "./modules/filestorage";
import { History } from "./modules/history";
import { News } from "./modules/news";
import { Producers } from "./modules/producers";
import { Products } from "./modules/products";
import { Questions } from "./modules/questions";
import { Services } from "./modules/services";
import { Spotify } from "./modules/spotify";
import { Teams } from "./modules/teams";
import { Testimonials } from "./modules/testimonials";
import { Video } from "./modules/video";
import { States } from "./modules/states";
import { Cities } from "./modules/cities";
import { SocialClick } from "./modules/socialClick";

export const api = {
  configuration: new Configuration(),

  about: new About(),
  banner: new Banner(),
  banner_popup: new BannerPopup(),
  biography: new Biography(),
  castings: new Castings(),
  contacts: new Contacts(),
  events: new Events(),
  file_storage: new FileStorage(),
  history: new History(),
  news: new News(),
  producers: new Producers(),
  products: new Products(),
  questions: new Questions(),
  services: new Services(),
  spotify: new Spotify(),
  teams: new Teams(),
  testimonials: new Testimonials(),
  video: new Video(),
  states: new States(),
  cities: new Cities(),
  socialClick: new SocialClick(),

};
