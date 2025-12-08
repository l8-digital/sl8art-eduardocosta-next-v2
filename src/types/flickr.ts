export interface FlickrPhotoType {
    src: string | null;
    alt: string | null;
}

export interface FlickrAlbumType {
    id: string;
    title: { _content: string };
    primary_photo_extras: { url_l: string };
}