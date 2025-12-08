'use client';
import { useState, ReactNode, useRef, useEffect } from 'react';
import style from './style.module.scss';

import Icon from '@/components/Icon/Icon';


type AccordionProps = {
  question: string;
  theme?: 'light' | 'dark';
  children: ReactNode;
};

export default function Accordion({ question, theme = 'light', children }: AccordionProps) {
  const [isOpen, setIsOpen] = useState(false);
  // 1. Criamos uma referência para o elemento que contém o conteúdo
  const contentRef = useRef<HTMLDivElement>(null);

  const toggleAccordion = () => setIsOpen(!isOpen);

  // 2. Usamos useEffect para reagir a mudanças no estado `isOpen`
  useEffect(() => {
    if (contentRef.current) {
      // Se estiver abrindo, define o max-height para a altura total do conteúdo.
      // Se estiver fechando, define max-height de volta para 0.
      contentRef.current.style.maxHeight = isOpen
        ? `${contentRef.current.scrollHeight}px`
        : '0px';
    }
  }, [isOpen]);

  return (
    <div
      className={`${style['accordion-question']} ${theme === 'dark' ? style.dark : ''}`}
      onClick={toggleAccordion}
    >
      <div className={`${style['accordion-question__item']}`}>
        <h3 className={style.question} dangerouslySetInnerHTML={{ __html: question }} />
        <div className="rounded-full ml-8">
          <Icon name="icon-arrow" className={`${style['icon-arrow']} ${isOpen ? style.active : ''}`} />
        </div>
      </div>
      
      {/* 3. Adicionamos a ref ao container do conteúdo */}
      <div
        ref={contentRef}
        className={`${style['accordion-request']} ${isOpen ? style.active : ''}`}
      >
        {/* 4. (Melhoria) Adicionamos um div interno para o padding, garantindo uma animação mais suave */}
        <div className={style['accordion-content-inner']}>
          {children}
        </div>
      </div>
    </div>
  );
}
