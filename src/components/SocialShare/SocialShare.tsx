// components/SocialShare.tsx
import React from 'react';

type SocialShareProps = {
  social: 'whatsapp' | 'telegram' | 'facebook' | 'twitter';
  url: string;
  title: string;
  className?: string;
  children: React.ReactNode;
};

const SocialShare: React.FC<SocialShareProps> = ({ social, url, title, className, children }) => {
  const shareUrls: Record<string, string> = {
    whatsapp: `https://api.whatsapp.com/send?text=${encodeURIComponent(url)}`,
    telegram: `https://telegram.me/share/url?url=${encodeURIComponent(url)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
  };

  return (
    <a
      href={shareUrls[social] || '#'}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={social}
      className={className}
    >
      {children}
    </a>
  );
};

export default SocialShare;
