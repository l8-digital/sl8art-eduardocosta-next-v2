'use client';
import Link from 'next/link'
import { useState, useEffect } from 'react';
import Icon from '@/components/Icon/Icon';
import { Button } from '@/components/Button/Button';

export default function CookieConsent() {
  const [accepted, setAccepted] = useState<boolean>(true);

  useEffect(() => {
    const stored = localStorage.getItem('cookies_accepted');
    if (stored !== 'true') {
      setAccepted(false);
    }
  }, []);

  const accept = () => {
    localStorage.setItem('cookies_accepted', 'true');
    setAccepted(true);
  };

  if (accepted) return null;

  return (
    <div className="c-cookies fixed bottom-0 left-0 right-0 p-4 z-[100000] showCookies">
      <div className="container max-w-6xl rounded-lg p-4 bg-gray-100">
        <div className="flex flex-col items-center justify-between gap-3 md:flex-row md:gap-6">
          <div className="flex md:items-center gap-3">
            <Icon name="icon-cookies" className="w-7 h-7 md:w-8 md:h-8 fill-black" />
            <div className="flex-1">
              <p className="text-sm text-black">
                Nós usamos cookies e outras tecnologias semelhantes para melhorar a sua experiência em nossos serviços. Ao utilizar nossos serviços, você concorda com tal monitoramento conforme descrito em nossa{' '}
                <Link href="/politica-privacidade" className="font-bold hover:opacity-90">
                  Política de Privacidade.
                </Link>
              </p>
            </div>
          </div>
          <div className="w-full md:w-3/12">
            <Button type="button" color="black" size="md" onClick={accept} >
              Prosseguir
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
