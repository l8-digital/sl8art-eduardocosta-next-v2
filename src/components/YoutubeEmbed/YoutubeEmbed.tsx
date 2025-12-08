// components/YouTubeEmbed.tsx
import React from "react";

type YouTubeEmbedProps = {
  id: string; // ID do vídeo
  title: string;
};

export default function YouTubeEmbed({ id, title }: YouTubeEmbedProps) {
  return (
    <iframe
      width="100%"
      height="100%"
      src={`https://www.youtube.com/embed/${id}`}
      title={title}
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    />
  );
}
