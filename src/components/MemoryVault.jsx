import React, { useState } from 'react';

export default function MemoryVault({ onCardClick }) {
  const [activeFilter, setActiveFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['All', 'Dates', 'Trips', 'Silly'];

  const memories = [
    {
      id: 'v1',
      title: 'The Chai Incident 🤪',
      category: 'Silly',
      date: '2024',
      location: 'Garden',
      img: '/vault_chai_garden.jpg',
      desc: 'The time I wanted to impress everyone & bought my handmade Chai in garden & ended up becoming the joke of the day to a very beautiful day 🤪',
      matchRate: '100% Comedy',
      year: '2024',
      objectPosition: 'top'
    },
    {
      id: 'v2',
      title: 'The Activa Chronicles 🛵',
      category: 'Silly',
      date: '2024',
      location: 'On the road',
      img: '/vault_activa_fall.jpg',
      desc: 'The time I fell from your Activa TWICE.! You were so worried & me very normal coz I know I\'m clumsy 😂 That day you learned that you have to hold my hand like a baby everywhere we go 😂🙈 which you still do everyday 😘',
      matchRate: '100% Comedy',
      year: '2024',
      objectPosition: 'top'
    },
    {
      id: 'v3',
      title: 'Bombay Dhaba Nightmares 🫠',
      category: 'Dates',
      date: '2024',
      location: 'Bombay Dhaba',
      img: '/vault_bombay_dhaba.jpg',
      desc: 'We had such a great dayout watching movies, having fun goofing around, until we decided to go Bombay Dhaba 🫠 I still get nightmares of that food & kaju ki sabji sometimes 😣',
      matchRate: '95% Traumatic',
      year: '2024'
    },
    {
      id: 'v4',
      title: 'Drunk In Love & Dry Ice Aarti 😂',
      category: 'Silly',
      date: '2024',
      location: 'Restaurant',
      img: '/vault_dry_ice_aarti.jpg',
      desc: 'I think we were so drunk (in love) this day 😂… the whole restaurant was watching us laugh so loud & the bartender literally watching us doing aarti out of dry ice 😂. Terrified he was 🫠',
      matchRate: '100% Iconic',
      year: '2024'
    },
    {
      id: 'v5',
      title: 'Nusa Penida Speedrun 🏝️',
      category: 'Trips',
      date: '2025',
      location: 'Nusa Penida, Bali',
      img: '/vault_nusa_penida.jpg',
      desc: 'We slept at 2 woke up at 4, traveled all the way in ferry to Nusa Penida, just to run back to hotel in literally 30 mins.! I think I still have sunburns & am horrified that we travelled all the way just to click pictures at some famous spots 😂',
      matchRate: '99% Sunburnt',
      year: '2025',
      objectPosition: 'top'
    },
    {
      id: 'v6',
      title: 'The Ghost Room on Mountains 👻',
      category: 'Trips',
      date: '2025',
      location: 'Bali Mountains',
      img: '/vault_mountain_room.jpg',
      desc: 'The best stay we\'ve had till date — No doors, No curtains, Just fully open room on top of mountains with mountain view, dreamiest day. Until it was 2 in the night & I was seeing ghosts while you were asleep & had to wake you up 😂 Spent the whole night watching movies & waited to watch sunrise which didn\'t even happen 😂😂 Dreamiest & funniest day.!',
      matchRate: '100% Dreamy',
      year: '2025'
    },
    {
      id: 'v7',
      title: 'Cutest Day Ever 🧿',
      category: 'Dates',
      date: '2024',
      location: 'Home',
      img: '/vault_cutest_day.png',
      desc: 'Cutest day with loads of efforts. One of the best days 🧿',
      matchRate: '100% Adorable',
      year: '2024'
    },
    {
      id: 'v8',
      title: 'Stuck Like Glue 🤍',
      category: 'Dates',
      date: '2024',
      location: 'Wedding Hall',
      img: '/vault_wedding_hall.png',
      desc: 'In the hall full of hundreds of people we still find comfort in each other, still are stuck as glue with each other\'s company 🤍',
      matchRate: '99.8% Perfect',
      year: '2024'
    },
    {
      id: 'v9',
      title: 'The Great Burger Hunt 🍔',
      category: 'Silly',
      date: '2025',
      location: 'Goa',
      img: '/vault_burger_hunt.png',
      desc: 'We got all ready to not find the restaurant for an hour.! Seriously google maps need fixing 😂 & waiting for our burgers for an extra hour.! I know you don\'t even like burgers & were there just for me.! But literally waiting till 6pm for lunch.! Itne toh mujhe bhi burger nahi pasand 😂🫠🫠',
      matchRate: '100% Hangry',
      year: '2025'
    },
    {
      id: 'v10',
      title: 'Cliff Hanger Chronicles 🧗‍♀️',
      category: 'Trips',
      date: '2025',
      location: 'Bali',
      img: '/vault_cliff_slip.png',
      desc: 'I slipped THRICE this day.! Once literally off a cliff, even our guide was traumatised 😂 But I guess you were used to it by then 😂 I guess this day you learned the hard way to never leave my hand even for a moment. Literally 😂',
      matchRate: '100% Survival',
      year: '2025'
    }
  ];

  const filteredMemories = memories.filter((memory) => {
    const matchesCategory = activeFilter === 'All' || memory.category === activeFilter;
    const matchesSearch = memory.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          memory.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          memory.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section style={{ padding: '2rem 4%', minHeight: '80vh' }}>
      <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
        <h2 style={{ fontSize: '2.5rem', fontFamily: "'Cinzel', 'Georgia', serif", textTransform: 'uppercase' }}>
          Memory <span style={{ color: 'var(--netflix-red)' }}>Vault</span>
        </h2>
        <p style={{ color: 'var(--text-grey)', marginTop: '0.35rem', fontSize: '0.9rem' }}>
          Browse and filter our catalog of adventures, dates, and funny highlights.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '1.5rem',
        marginBottom: '1.25rem',
        flexWrap: 'wrap'
      }}>
        {/* Category Tabs */}
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              style={{
                backgroundColor: activeFilter === cat ? 'var(--netflix-red)' : 'rgba(255, 255, 255, 0.05)',
                border: '1px solid',
                borderColor: activeFilter === cat ? 'var(--netflix-red)' : 'rgba(255, 255, 255, 0.1)',
                color: '#fff',
                padding: '0.5rem 1.25rem',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '0.9rem',
                fontWeight: 600,
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                if (activeFilter !== cat) e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
              }}
              onMouseLeave={(e) => {
                if (activeFilter !== cat) e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div style={{ position: 'relative', width: '300px', maxWidth: '100%' }}>
          <input
            type="text"
            placeholder="Search memories..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              backgroundColor: 'rgba(0, 0, 0, 0.8)',
              border: '1px solid #444',
              borderRadius: '4px',
              padding: '0.6rem 1rem 0.6rem 2.5rem',
              color: '#fff',
              fontSize: '0.9rem',
              outline: 'none',
              transition: 'border-color 0.2s ease'
            }}
            onFocus={(e) => e.target.style.borderColor = 'var(--netflix-red)'}
            onBlur={(e) => e.target.style.borderColor = '#444'}
          />
          {/* Search Glass SVG Icon */}
          <svg 
            width="16" 
            height="16" 
            fill="currentColor" 
            viewBox="0 0 16 16"
            style={{
              position: 'absolute',
              left: '0.8rem',
              top: '50%',
              transform: 'translateY(-50%)',
              color: 'var(--text-grey)',
              pointerEvents: 'none'
            }}
          >
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
          </svg>
        </div>
      </div>

      {/* Grid Results */}
      {filteredMemories.length > 0 ? (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '1.5rem'
        }}>
          {filteredMemories.map((memory) => (
            <div
              key={memory.id}
              onClick={() => onCardClick(memory)}
              style={{
                backgroundColor: '#181818',
                borderRadius: '6px',
                overflow: 'hidden',
                cursor: 'pointer',
                transition: 'all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)',
                border: '1px solid #222',
                boxShadow: '0 4px 10px rgba(0,0,0,0.3)',
                aspectRatio: '3/4'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.04) translateY(-5px)';
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)';
                e.currentTarget.style.boxShadow = '0 10px 20px rgba(0,0,0,0.5)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1) translateY(0)';
                e.currentTarget.style.borderColor = '#222';
                e.currentTarget.style.boxShadow = '0 4px 10px rgba(0,0,0,0.3)';
              }}
            >
              <div style={{ position: 'relative', width: '100%', height: '80%' }}>
                <img 
                  src={memory.img} 
                  alt={memory.title} 
                  className="vault-card-image"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', '--object-position': memory.objectPosition || 'center' }}
                  loading="lazy"
                />
                <span style={{
                  position: 'absolute',
                  top: '0.5rem',
                  right: '0.5rem',
                  backgroundColor: 'rgba(0,0,0,0.7)',
                  padding: '0.2rem 0.6rem',
                  fontSize: '0.75rem',
                  borderRadius: '20px',
                  fontWeight: 600,
                  color: 'var(--accent-amber)',
                  border: '1px solid rgba(245, 158, 11, 0.3)'
                }}>
                  {memory.category}
                </span>
              </div>
              <div style={{ padding: '0.85rem', height: '20%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <div style={{ fontWeight: 700, fontSize: '1rem', color: '#fff', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {memory.title}
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-grey)', marginTop: '0.25rem' }}>
                  <span>{memory.date}</span>
                  <span>{memory.matchRate}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div style={{
          textAlign: 'center',
          padding: '4rem 2rem',
          color: 'var(--text-grey)',
          backgroundColor: '#111',
          borderRadius: '8px',
          border: '1px solid #222'
        }}>
          <p style={{ fontSize: '1.1rem' }}>No memories found matching your filters/search.</p>
          <button 
            onClick={() => { setActiveFilter('All'); setSearchQuery(''); }}
            style={{
              marginTop: '1rem',
              backgroundColor: 'transparent',
              border: '1px solid var(--netflix-red)',
              color: 'var(--netflix-red)',
              padding: '0.5rem 1.5rem',
              borderRadius: '4px',
              cursor: 'pointer',
              fontWeight: 600,
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--netflix-red)';
              e.currentTarget.style.color = '#fff';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.color = 'var(--netflix-red)';
            }}
          >
            Reset Filters
          </button>
        </div>
      )}
    </section>
  );
}
