export default function SocialIcon({ name }) {
  const common = { viewBox: '0 0 24 24', width: 32, height: 32, 'aria-hidden': true, focusable: false };
  if (name === 'instagram') return <svg {...common} fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" /></svg>;
  if (name === 'email') return <svg {...common} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m3 6 9 7 9-7M3 19l6-6m6 0 6 6" /></svg>;
  if (name === 'reddit') return <svg {...common} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="m12 9 1.5-6 4.5 1" /><circle cx="19.5" cy="4.5" r="2" /><path d="M4.5 10a2.5 2.5 0 0 0-3 4M19.5 10a2.5 2.5 0 0 1 3 4" /><ellipse cx="12" cy="15" rx="10" ry="6" fill="currentColor" stroke="none" /><circle cx="8" cy="14" r="1.5" fill="#ff4500" stroke="none" /><circle cx="16" cy="14" r="1.5" fill="#ff4500" stroke="none" /><path d="M8 17c2 2 6 2 8 0" stroke="#ff4500" /></svg>;
  return <svg {...common} fill="currentColor"><path d="M18.9 2H22l-6.8 7.8L23.2 22h-6.3L12 14.6 5.5 22H2.3l8.2-9.5L.8 2h6.5l4.5 6.8L18.9 2ZM17.9 20h1.7L6.4 4H4.6l13.3 16Z" /></svg>;
}
