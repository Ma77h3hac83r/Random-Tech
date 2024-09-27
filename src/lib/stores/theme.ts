import { writable } from 'svelte/store';
import { browser } from '$app/environment';

type Theme = 'light' | 'dark';

const defaultTheme: Theme = 'light';

const initialTheme = browser 
  ? (localStorage.getItem('theme') as Theme || defaultTheme)
  : defaultTheme;

export const theme = writable<Theme>(initialTheme);

export function toggleTheme() {
  theme.update(currentTheme => {
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    if (browser) {
      localStorage.setItem('theme', newTheme);
      document.documentElement.classList.toggle('dark');
    }
    return newTheme;
  });
}

if (browser) {
  document.documentElement.classList.toggle('dark', initialTheme === 'dark');
}