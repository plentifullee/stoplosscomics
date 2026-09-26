const characters = [
  { name: 'Max', role: 'Professional bagholder.', icon: '₿', detail: 'Messy hair. Black hoodie. Unreasonably high conviction.' },
  { name: 'Luna', role: 'The closest thing this group has to risk management.', icon: '↗', detail: 'Calm, analytical, and surrounded by very bad ideas.' },
  { name: 'Chad', role: 'Ape first. Ask questions never.', icon: '✦', detail: 'One confident gorilla. Zero second thoughts.' },
  { name: 'Satoshi', role: 'Knows exactly what will happen. Refuses to elaborate.', icon: '?', detail: 'The orange cat who has seen this all before.' },
];

export default function CharacterSection() {
  return <section id="characters" className="character-section section-container page-section" aria-labelledby="characters-title">
    <div className="section-heading-row"><h2 id="characters-title" className="section-title brush-heading">Meet the degens</h2><p className="margin-note">Same bad ideas.<br />Different approaches. <span aria-hidden="true">↙</span></p></div>
    <div className="character-grid">{characters.map(({ name, role, icon, detail }) => <article key={name} className={`character-card character-${name.toLowerCase()}`}>
      <div className="portrait-frame"><img src={`/images/characters/${name.toLowerCase()}.webp`} alt={`${name}: ${detail}`} width="560" height={name === 'Satoshi' ? '840' : '560'} loading="lazy" /><span className="character-doodle" aria-hidden="true">{icon}</span></div>
      <div className="character-copy"><h3>{name}</h3><p>{role}</p></div>
    </article>)}</div>
  </section>;
}
