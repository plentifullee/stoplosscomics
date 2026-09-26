import { trackEvent } from '../lib/analytics';
export default function ExtensionLink({ extension, location, children, className = '', onClick }) {
  return <a href={extension.href} target="_blank" rel="noopener noreferrer" className={className} onClick={() => {
    trackEvent('external_extension_click', { destination: extension.id, location });
    onClick?.();
  }}>{children}<span aria-hidden="true"> ↗</span><span className="sr-only"> (opens in a new tab)</span></a>;
}
