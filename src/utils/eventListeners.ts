import { searchInputId } from '../components/Header';

export function slashSearch(e: KeyboardEvent) {
  const target = e.target as HTMLElement;
  if (!('localName' in target)) return;

  if (e.key === '/' && target?.localName !== 'input') {
    const searchInputElement = document.getElementById(searchInputId) as HTMLInputElement | undefined;
    if (searchInputElement) {
      e.preventDefault();
      searchInputElement.focus();
    }
  } else if (e.key === 'Escape' && target?.localName === 'input') {
    target.blur();
  }
}
