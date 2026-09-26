import { trackEvent } from '../lib/analytics';

export default function BookLink({ children = 'Get Volume 1', location, className = '' }) {
  return <a className={`comic-button ${className}`} href="https://books2read.com/stoplosscomicsvolume1" onClick={() => trackEvent('book_cta_click', { location })}>
    {children}<span aria-hidden="true">↗</span>
  </a>;
}
