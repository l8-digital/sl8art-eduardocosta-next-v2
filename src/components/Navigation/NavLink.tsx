'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';

const handleScroll = (to: string, offset = 0) => {
  const scrollToElement = () => {
    const el = document.getElementById(to);
    if (el) {
      window.scrollTo({
        top: el.offsetTop + offset,
        behavior: 'smooth',
      });
    } else {
      requestAnimationFrame(scrollToElement);
    }
  };

  scrollToElement();
};

interface NavLinkProps {
  to: string;
  offset?: number;
  className?: string;
  children?: React.ReactNode;
}

export default function NavLink({ to, offset = 0, className, children }: NavLinkProps) {
  const pathname = usePathname();
  const router = useRouter();
  const href = `/#${to}`;

  const [mobileOffset, setMobile] = useState(() => {
    if (typeof window !== 'undefined' && window.innerWidth <= 768) {
      return 0;
    }
    return offset;
  });

  // 🎯 Corrigido: só depende do offset
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const handleResize = () => {
        setMobile(window.innerWidth <= 768 ? 0 : offset);
      };

      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, [offset]);

  // 🎯 Criamos a função corretamente com useCallback
  const scrollToSection = useCallback(() => {
    handleScroll(to, mobileOffset);
  }, [to, mobileOffset]);

  // 🎯 Corrigimos o useEffect removendo expressão complexa
  useEffect(() => {
    if (pathname === '/' && location.hash === `#${to}`) {
      scrollToSection();
    }
  }, [pathname, to, scrollToSection]); // ✔ sem warnings

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    if (pathname === '/') {
      scrollToSection();
    } else {
      router.push(href);
      requestAnimationFrame(() => handleScroll(to, mobileOffset));
    }
  };

  return (
    <Link
      href={href}
      scroll={false}
      className={className}
      onClick={handleClick}
    >
      {children}
    </Link>
  );
}
