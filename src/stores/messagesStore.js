import { writable } from 'svelte/store';
export const messages = writable([
  {
    username: 'Dan',
    message: 'Hello'
  },
  {
    username: 'Louis',
    message: 'Hi guys'
  },
  {
    username: 'Chris',
    message: 'How are you guys?'
  },
  {
    username: 'Dan',
    message: "I'm ok."
  },
]);
