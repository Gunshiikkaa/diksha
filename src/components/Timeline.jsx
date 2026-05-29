import React from 'react';

export default function Timeline() {
  const milestones = [
    {
      date: 'Oct 24, 2023',
      title: 'The First Hello 👋',
      desc: 'Our eyes met (or our first messages crossed paths) and the universe silently shifted. A simple conversation that quickly turned into continuous messages, shared music playlists, and counting down the hours until we could talk again.',
      icon: '✨'
    },
    {
      date: 'Nov 4, 2023',
      title: 'Our First Date ☕',
      desc: 'Nervous energy, warm coffee, and walking around the park. We talked for hours about everything and nothing. Time flew by, and neither of us wanted the evening to end. That was the day we knew this was something special.',
      icon: '❤️'
    },
    {
      date: 'Dec 15, 2023',
      title: 'Official: Partner in Crime 💍',
      desc: 'Underneath the glowing city lights, we made it official. No longer just two people dating, but a team ready to take on the world together. The beginning of Season 1!',
      icon: '🔒'
    },
    {
      date: 'May 12, 2024',
      title: 'First Road Trip 🚗',
      desc: 'Packing a bag, making the ultimate playlist, and hitting the highway. From singing at the top of our lungs to watching the sunset over the hills, we proved we are the perfect travel companions.',
      icon: '🏔️'
    },
    {
      date: 'July 20, 2025',
      title: 'Building Our Nest 🔑',
      desc: 'Taking the big leap and moving into our own space! Surviving IKEA furniture assembly, packing endless boxes, and cooking our very first dinner in our shared kitchen. Season 2 premiere!',
      icon: '🏡'
    },
    {
      date: 'Present & Beyond 🚀',
      title: 'Writing the Next Chapters...',
      desc: 'Anniversaries, quiet Sunday mornings, major career steps, and big laughs. Celebrating the daily episodes of love, support, and friendship. The best is yet to come!',
      icon: '🌟'
    }
  ];

  return (
    <section className="timeline-section">
      <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
        <h2 style={{ fontSize: '2.5rem', fontFamily: 'var(--font-outfit)', textTransform: 'uppercase' }}>
          Our Milestone <span style={{ color: 'var(--netflix-red)' }}>Timeline</span>
        </h2>
        <p style={{ color: 'var(--text-grey)', marginTop: '0.5rem', fontSize: '1.05rem' }}>
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
