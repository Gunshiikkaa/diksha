import React from 'react';

export default function Timeline() {
  const milestones = [
    {
      date: '9th May, 2024',
      title: 'The First Hello 👋',
      desc: '9th May — the day our eyes met for the first time. I hid my nerves behind a restroom door, while my heart searched for the boy in the purple sweatshirt I\'d admired from afar. After countless "hmm", "yes", and "okay" conversations, Clay witnessed us finding comfort in each other. And before we knew it, the 11th brought our Pakki. Time flies, but some moments stay beautifully frozen forever.',
      icon: '✨'
    },
    {
      date: '6th June, 2024',
      title: 'Making It Official 💍',
      desc: 'After endless midnight talks and a thousand little moments of getting to know each other, we knew it was time to make it official. A Roka filled with laughter, a birthday celebration that lasted until sunrise, and a video call that continued even after we got home—because saying goodbye was never our strong suit. Then came the whirlwind of preparations, dreams, and anticipation, leading us closer to the next chapter of our story.',
      icon: '🔒'
    },
    {
      date: '30th November, 2024',
      title: 'The Wedding Day 💒',
      desc: 'After five months of endless preparations, late-night discussions, little dates & countless surprises, we finally arrived at 30 November. Somewhere between all the planning, our hearts found their way closer to each other. I think I\'ve never enjoyed myself this much as much as I did on my own wedding, those 2 days were the greatest party I\'ll ever attend. But I still remember being nervous beyond words, until your bouquet of my favorite flowers and that heartfelt letter found me. In that moment, every fear disappeared. As "Ae Meri Jaan" played and I walked towards you, it felt as if the world stood still. And ever since that day, life has felt like the most beautiful dream—one I never want to wake up from. ❤️',
      icon: '❤️'
    },
    {
      date: '13th March, 2025',
      title: 'Falling Even Deeper 🌙',
      desc: 'Starting a new chapter of life is never easy, but somehow, you never let me feel alone for even a second. All I ever had to do was tell you what was bothering me, and you\'d find a way to make it better. I remember the night of 13th March. I suddenly fell sick, shivering, scared, and missing my mum. At 1 a.m., I called her in tears. But then your mum woke up from her sleep, cared for me like her own — even adhi raat ko meri nazar utari — and stayed by my side until I felt better. Somewhere that night, I started missing my mum a little less. And you—the man who can\'t sleep without AC—spent the entire night awake beside me, checking my temperature, making sure I was comfortably tucked and taken care of, and gently putting me to sleep by giving thapki all night. You didn\'t sleep the whole night just so that I can sleep peacefully. By morning, I realized something I didn\'t think was possible: I had fallen in love with you even more than before. ❤️',
      icon: '🏡'
    },
    {
      date: '9th May, 2025',
      title: 'The Full Circle 🌟',
      desc: 'The day I met you for the first time to a year later, nothing\'s changed — you\'re still very much a gentleman and as I get to know you more I feel astonished every time.! I just have no more words than — I love you G.! ❤️',
      icon: '🔄'
    }
  ];

  return (
    <section className="timeline-section">
      <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
        <h2 style={{ fontSize: '2.5rem', fontFamily: "'Cinzel', 'Georgia', serif", textTransform: 'uppercase' }}>
          Our Milestone <span style={{ color: 'var(--netflix-red)' }}>Timeline</span>
        </h2>
        <p style={{ color: 'var(--text-grey)', marginTop: '0.35rem', fontSize: '0.9rem' }}>
          Chronological episodes of our journey together
        </p>
      </div>

      <div className="timeline-wrapper">
        {milestones.map((node, index) => (
          <div key={index} className="timeline-node">
            <div className="timeline-dot"></div>
            
            <div className="timeline-content-card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <span className="timeline-date">{node.date}</span>
                <span style={{ fontSize: '1.3rem' }}>{node.icon}</span>
              </div>
              <h3 className="timeline-node-title">{node.title}</h3>
              <p className="timeline-node-desc">{node.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
