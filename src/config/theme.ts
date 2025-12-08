import { api } from "@/app/api";
import type { ThemeTypes } from "@/types/configuration";

export async function getThemeCss(): Promise<string> {
  const info = await api.configuration.getTheme() as ThemeTypes;


  if (!info) return "";

  const colors: Record<string, string | undefined> = {
    "bg-primary": info.color_rgb_back_01,
    "bg-secondary": info.color_rgb_back_02,
    "bg-tertiary": info.color_rgb_back_03,
    "bg-quaternary": info.color_rgb_back_04,
    "bg-quinary": info.color_rgb_back_05,
  };

  const images: Record<string, string | undefined> = {
    "bgdesk-home": info.bgdesk_home_cdn ? `url("${info.bgdesk_home_cdn}")` : undefined,
    "bgdesk-calendar": info.bgdesk_calendar_cdn ? `url("${info.bgdesk_calendar_cdn}")` : undefined,
    "bgdesk-biography": info.bgdesk_biography_cdn ? `url("${info.bgdesk_biography_cdn}")` : undefined,
    "bgdesk-music": info.bgdesk_music_cdn ? `url("${info.bgdesk_music_cdn}")` : undefined,
    "bgdesk-social": info.bgdesk_social_cdn ? `url("${info.bgdesk_social_cdn}")` : undefined,
    "bgdesk-video": info.bgdesk_video_cdn ? `url("${info.bgdesk_video_cdn}")` : undefined,
    "bgdesk-photo": info.bgdesk_photo_cdn ? `url("${info.bgdesk_photo_cdn}")` : undefined,
    "bgdesk-notice": info.bgdesk_notice_cdn ? `url("${info.bgdesk_notice_cdn}")` : undefined,
    "bgdesk-notice-detail": info.bgdesk_notice_detail_cdn ? `url("${info.bgdesk_notice_detail_cdn}")` : undefined,
    "bgdesk-areafa": info.bgdesk_areafa_cdn ? `url("${info.bgdesk_areafa_cdn}")` : undefined,
    "bgdesk-contact": info.bgdesk_contact_cdn ? `url("${info.bgdesk_contact_cdn}")` : undefined,
    "bgdesk-parallax-01": info.bgdesk_parallax_01_cdn ? `url("${info.bgdesk_parallax_01_cdn}")` : undefined,
    "bgdesk-parallax-02": info.bgdesk_parallax_02_cdn ? `url("${info.bgdesk_parallax_02_cdn}")` : undefined,
    "bgdesk-store": info.bgdesk_store_cdn ? `url("${info.bgdesk_store_cdn}")` : undefined,
    "bgdesk-history": info.bgdesk_history_cdn ? `url("${info.bgdesk_history_cdn}")` : undefined,
    "bgvideo-desk": info.bgvideo_desk_cdn ? `url("${info.bgvideo_desk_cdn}")` : undefined,
    "bgmobile-home": info.bgmobile_home_cdn ? `url("${info.bgmobile_home_cdn}")` : undefined,
    "bgmobile-calendar": info.bgmobile_calendar_cdn ? `url("${info.bgmobile_calendar_cdn}")` : undefined,
    "bgmobile-biography": info.bgmobile_biography_cdn ? `url("${info.bgmobile_biography_cdn}")` : undefined,
    "bgmobile-music": info.bgmobile_music_cdn ? `url("${info.bgmobile_music_cdn}")` : undefined,
    "bgmobile-social": info.bgmobile_social_cdn ? `url("${info.bgmobile_social_cdn}")` : undefined,
    "bgmobile-video": info.bgmobile_video_cdn ? `url("${info.bgmobile_video_cdn}")` : undefined,
    "bgmobile-photo": info.bgmobile_photo_cdn ? `url("${info.bgmobile_photo_cdn}")` : undefined,
    "bgmobile-notice": info.bgmobile_notice_cdn ? `url("${info.bgmobile_notice_cdn}")` : undefined,
    "bgmobile-notice-detail": info.bgmobile_notice_detail_cdn ? `url("${info.bgmobile_notice_detail_cdn}")` : undefined,
    "bgmobile-areafa": info.bgmobile_areafa_cdn ? `url("${info.bgmobile_areafa_cdn}")` : undefined,
    "bgmobile-contact": info.bgmobile_contact_cdn ? `url("${info.bgmobile_contact_cdn}")` : undefined,
    "bgmobile-store": info.bgmobile_store_cdn ? `url("${info.bgmobile_store_cdn}")` : undefined,
    "bgmobile-history": info.bgmobile_history_cdn ? `url("${info.bgmobile_history_cdn}")` : undefined,
    "bgvideo-mobile": info.bgvideo_mobile_cdn ? `url("${info.bgvideo_mobile_cdn}")` : undefined,
  };

  const allVars = { ...colors, ...images };

  return Object.entries(allVars)
    .filter(([, value]) => !!value)
    .map(([key, value]) => `--${key}: ${value};`)
    .join("\n");
}
