import { useEffect } from 'react';
import { searchInputId } from '../components/Header';

export function useCustomEventListeners() {
  useEffect(() => {
    document.addEventListener('keydown', slashSearch);
    document.addEventListener('keydown', firefoxHomeEndFix);
    return () => {
      document.removeEventListener('keydown', slashSearch);
      document.removeEventListener('keydown', firefoxHomeEndFix);
    };
  }, []);
}

export function slashSearch(e: KeyboardEvent) {
  /**
   * Focus search on / if the target is now input, if is input then unfocus on Esc
   */
  const target = e.target as HTMLElement;
  if (!['/', 'Escape'].includes(e.key) || !('localName' in target)) return;

  if (e.key === '/' && target?.localName !== 'input') {
    const searchInputElement = document.getElementById(searchInputId) as HTMLInputElement | undefined;
    if (searchInputElement) {
      e.preventDefault();
      console.log('prevent /');
      searchInputElement.focus();
    }
  } else if (e.key === 'Escape' && target?.localName === 'input') {
    target.blur();
  }
}

export function firefoxHomeEndFix(e: KeyboardEvent) {
  /*
   * Pressing Home/End in Firefox causes flickering somehow, Chrome is fine
   */
  const target = e.target as HTMLElement;
  if (!['Home', 'End'].includes(e.key) || !('localName' in target)) return;

  if (target?.localName !== 'input') {
    console.log('prevent firefox');
    e.preventDefault();
    switch (e.key) {
      case 'End':
        window.scroll(0, document.body.scrollHeight);
        break;
      case 'Home':
        window.scroll(0, 0);
        break;
    }
  }
}
