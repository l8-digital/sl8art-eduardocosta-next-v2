'use client';

import { ReactNode, useEffect, useState } from 'react';
import Icon from '@/components/Icon/Icon';
import style from './style.module.scss';

interface ModalProps {
    show: boolean;
    size?: 'md' | 'lg' | string;
    onClose: () => void;
    header?: ReactNode;
    body?: ReactNode;
    footer?: ReactNode;
}

export default function Modal({
    show,
    size = '550px',
    onClose,
    header,
    body,
    footer,
}: ModalProps) {
    const [isVisible, setIsVisible] = useState(show);

    useEffect(() => {
        if (show) {
            setIsVisible(true);
            document.body.style.overflow = 'hidden';
        } else {
            setIsVisible(false);
            document.body.style.overflow = '';
        }

        return () => {
            document.body.style.overflow = '';
        };
    }, [show]);

    useEffect(() => {

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                handleClose();
            }
        };

        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };

    });

    const handleClose = () => {
        setIsVisible(false);
        setTimeout(onClose, 200);
    };

    const sizeClasses = (() => {
        switch (size) {
            case 'md':
                return '768px';
            case 'lg':
                return '1080px';
            default:
                return '550px';
        }
    })();

    if (!isVisible) return null;

    return (
        <div className={style['modal-mask']}>
            <div className="container flex justify-end pt-4 md:pt-4">
            
                <button
                    type="button"
                    className={`${style['modal-default-button']} font-black text-xl text-center hover:opacity-70`}
                    onClick={handleClose}
                    aria-label="Fechar">
                    <Icon name="icon-close" className="w-4 md:w-6 object-contain text-white fill-white" />
                </button>

            </div>
            <div className={style['modal-wrapper']}>

                <div className={style['modal-container']} style={{ width: sizeClasses }}>

                    <div className={style['modal-header']}>{header}</div>

                    {body && <div className={style['modal-body']}>{body}</div>}

                    {footer && <div className={style['modal-footer']}>{footer}</div>}
                    
                </div>
            </div>
        </div>
    );
}
