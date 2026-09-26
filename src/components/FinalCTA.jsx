import BookLink from './BookLink';
export default function FinalCTA() {
  return <section className="final-cta" aria-labelledby="final-title"><div className="section-container"><span className="final-spark" aria-hidden="true">✦</span><div><h2 id="final-title">Join the degeneracy</h2><p>Get Volume 1 and be part of the chaos.</p></div><BookLink location="final_cta" /><span className="final-spark" aria-hidden="true">✧</span></div></section>;
}
