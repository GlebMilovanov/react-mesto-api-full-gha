import { useEffect } from 'react';

export const usePopupClose = (isOpen, closePopup) => {
  useEffect(() => {
    if (!isOpen) return;

    const handleOverlayClick = (e) => {
      if (e.target.classList.contains('popup_opened')) {
        closePopup();
      }
    };
    const handleEscKeyClose = (e) => {
      if (e.key === 'Escape') {
        closePopup();
      }
    };

    document.addEventListener('keydown', handleEscKeyClose);
    document.addEventListener('mousedown', handleOverlayClick);

    return () => {
      document.removeEventListener('keydown', handleEscKeyClose);
      document.removeEventListener('mousedown', handleOverlayClick);
    };
  }, [closePopup, isOpen]);
};
