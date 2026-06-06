import React, { useState, useEffect } from 'react';
import IntroScreen from './components/IntroScreen';
import Navbar from './components/Navbar';
import HeroBanner from './components/HeroBanner';
import MemoryRow from './components/MemoryRow';
import Timeline from './components/Timeline';
import DatePlanner from './components/DatePlanner';
import MemoryVault from './components/MemoryVault';
import SecretLetter from './components/SecretLetter';

import CinematicEnding from './components/CinematicEnding';
import './App.css';

// Audio Context reference variables
let audioCtx = null;
let musicTimer = null;
let currentChordIdx = 0;

export default function App() {
  const [activeProfile, setActiveProfile] = useState(null);
  const [activeTab, setActiveTab] = useState('home');
  const [selectedMemory, setSelectedMemory] = useState(null);
  const [playingVideoUrl, setPlayingVideoUrl] = useState(null);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [likedMemories, setLikedMemories] = useState({});
  const [isEditingSpotlight, setIsEditingSpotlight] = useState(false);
  const [spotlightTitle, setSpotlightTitle] = useState(() => 
    localStorage.getItem('spotlightTitle_v3') || "THE MOMENT\nTHAT CHANGED\nEVERYTHING"
  );
  const [spotlightSubtitle, setSpotlightSubtitle] = useState(() => 
    localStorage.getItem('spotlightSubtitle_v3') || "Our forever promise"
  );
  const [spotlightText, setSpotlightText] = useState(() => 
    localStorage.getItem('spotlightText_v3') || "It was a Sunday morning in Lonavala. I was getting ready to marry you when I received your letter, along with a giant bouquet of all my favorite flowers.I was genuinely nervous, but as I read your words and felt the love, excitement, and anticipation behind them, everything changed. I've never seen you express your emotions so openly, and somehow, those simple words brought tears to my eyes. It amazed me how deeply I could feel your love through a letter.From that moment on, all my nervousness turned into excitement. And honestly, I still feel that same excitement every day, knowing I get to spend the rest of my life with you. ❤️"
  );
  const [spotlightQuote, setSpotlightQuote] = useState(() => 
    localStorage.getItem('spotlightQuote_v3') || "You never know the value of a moment, until it becomes a memory that stays with you forever."
  );
  const [spotlightImage, setSpotlightImage] = useState(() => 
    localStorage.getItem('spotlightImage_v3') || "/wedding_moment.png"
  );



  useEffect(() => {
    localStorage.setItem('spotlightTitle_v3', spotlightTitle);
    localStorage.setItem('spotlightSubtitle_v3', spotlightSubtitle);
    localStorage.setItem('spotlightText_v3', spotlightText);
    localStorage.setItem('spotlightQuote_v3', spotlightQuote);
    localStorage.setItem('spotlightImage_v3', spotlightImage);
  }, [spotlightTitle, spotlightSubtitle, spotlightText, spotlightQuote, spotlightImage]);

  // Handle URL hash routing to support browser back button navigation
  useEffect(() => {
    if (!activeProfile) {
      // Clear hash if not logged in (profile selection screen)
      if (window.location.hash) {
        window.history.replaceState(null, null, ' ');
      }
      return;
    }

    const validTabs = ['home', 'timeline', 'planner', 'vault', 'letter'];

    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (validTabs.includes(hash)) {
        setActiveTab(hash);
      } else {
        setActiveTab('home');
        window.location.hash = 'home';
      }
    };

    // If there is an existing hash, apply it on login
    const initialHash = window.location.hash.replace('#', '');
    if (validTabs.includes(initialHash)) {
      setActiveTab(initialHash);
    } else {
      window.location.hash = activeTab;
    }

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [activeProfile]);

  // Sync hash when activeTab changes programatically
  useEffect(() => {
    if (activeProfile) {
      if (window.location.hash.replace('#', '') !== activeTab) {
        window.location.hash = activeTab;
      }
    }
  }, [activeTab, activeProfile]);

  const [bucketList, setBucketList] = useState([
    { id: 'b1', title: 'Cozy Kambal Night with Games & Gossip', done: false },
    { id: 'b2', title: 'Watching Movie', done: false },
    { id: 'b3', title: 'Searching new restaurants & trying new food every Tuesday', done: false },
    { id: 'b4', title: 'Creating new memories', done: false }
  ]);

  // Ambient sound generator using Web Audio API
  const startAmbientMusic = () => {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;
      if (!audioCtx) {
        audioCtx = new AudioContext();
      }
      if (audioCtx.state === 'suspended') {
        audioCtx.resume();
      }

      // Soothing chord progression in C/F major:
      // 1. Cmaj7 (C3, E3, G3, B3)
      // 2. Am7 (A2, C3, E3, G3)
      // 3. Fmaj7 (F2, A2, C3, E3)
      // 4. G6 (G2, B2, D3, E3)
      const chords = [
        [130.81, 164.81, 196.00, 246.94], // C3, E3, G3, B3
        [110.00, 130.81, 164.81, 196.00], // A2, C3, E3, G3
        [87.31, 110.00, 130.81, 164.81],  // F2, A2, C3, E3
        [98.00, 123.47, 146.83, 164.81]   // G2, B2, D3, E3
      ];

      const playChord = () => {
        if (!audioCtx || audioCtx.state !== 'running') return;
        const now = audioCtx.currentTime;
        const notes = chords[currentChordIdx];
        currentChordIdx = (currentChordIdx + 1) % chords.length;

        // Soothing low-pass filter to soften high frequencies
        const filter = audioCtx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(350, now);

        notes.forEach((freq, index) => {
          const osc = audioCtx.createOscillator();
          const gain = audioCtx.createGain();
          
          osc.type = 'sine'; // Pure warm tone
          osc.frequency.setValueAtTime(freq, now + index * 0.2); // Slightly arpeggiated entry

          // Sound envelope: slow swell and fade out
          gain.gain.setValueAtTime(0, now);
          gain.gain.linearRampToValueAtTime(0.04, now + index * 0.2 + 0.5); // Warm fade-in
          gain.gain.exponentialRampToValueAtTime(0.0001, now + 4.8); // Long decay

          osc.connect(filter);
          filter.connect(gain);
          gain.connect(audioCtx.destination);

          osc.start(now + index * 0.2);
          osc.stop(now + 5.2);
        });
      };

      playChord();
      musicTimer = setInterval(playChord, 5200);

    } catch (err) {
      console.warn("Could not play ambient background audio", err);
    }
  };

  const stopAmbientMusic = () => {
    if (musicTimer) {
      clearInterval(musicTimer);
      musicTimer = null;
    }
    if (audioCtx && audioCtx.state === 'running') {
      audioCtx.suspend();
    }
  };

  const handleToggleMusic = () => {
    if (isMusicPlaying) {
      stopAmbientMusic();
      setIsMusicPlaying(false);
    } else {
      setIsMusicPlaying(true);
      // Wait for brief user interaction confirmation block resolution
      setTimeout(() => {
        startAmbientMusic();
      }, 50);
    }
  };

  // Turn off music if profile is unmounted/switched
  const handleSwitchProfile = () => {
    stopAmbientMusic();
    setIsMusicPlaying(false);
    setActiveProfile(null);
    setActiveTab('home');
  };

  const handleReaction = (memoryId, type) => {
    setLikedMemories(prev => ({
      ...prev,
      [memoryId]: prev[memoryId] === type ? null : type
    }));

    // Trigger custom particle effect inside modal
    if (type === 'love') {
      try {
        const rect = document.querySelector('.modal-image-wrapper').getBoundingClientRect();
        const container = document.createElement('div');
        container.style.position = 'fixed';
        container.style.inset = '0';
        container.style.pointerEvents = 'none';
        container.style.zIndex = '9999';
        document.body.appendChild(container);

        for (let i = 0; i < 15; i++) {
          const heart = document.createElement('span');
          heart.innerHTML = '❤️';
          heart.style.position = 'absolute';
          heart.style.left = `${rect.left + rect.width / 2 + (Math.random() - 0.5) * 80}px`;
          heart.style.top = `${rect.top + rect.height / 2 + (Math.random() - 0.5) * 40}px`;
          heart.style.fontSize = `${Math.random() * 15 + 15}px`;
          heart.style.transition = 'all 1s ease-out';
          heart.style.opacity = '1';
          container.appendChild(heart);

          // Force reflow
          void heart.offsetHeight;

          heart.style.transform = `translate(${(Math.random() - 0.5) * 200}px, -${Math.random() * 150 + 100}px) scale(1.5)`;
          heart.style.opacity = '0';
        }

        setTimeout(() => container.remove(), 1200);
      } catch (err) {}
    }
  };

  const toggleBucketListItem = (itemId) => {
    setBucketList(prev => prev.map(item => 
      item.id === itemId ? { ...item, done: !item.done } : item
    ));
  };

  const continueWatchingItems = [
    {
      id: 'c1',
      title: '6 Months',
      img: '/top4/6months.png',
      desc: 'Our forever is only 6 months old, but it\'s already my favorite story.',
      matchRate: '99% Match',
      year: '2026',
      location: 'Home',
      date: '30 May 2026',
      tags: 'Heartfelt • Milestone • Original',
      videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-romantic-couple-standing-close-under-a-tree-42525-large.mp4',
      objectPosition: 'center'
    },
    {
      id: 'c2',
      title: 'Goa',
      img: '/top4/goa.png',
      desc: 'Even with people around us , we enjoy each other company, exploring new places & singing madly on roads while chasing sunsets',
      matchRate: '98% Match',
      year: '2026',
      location: 'Goa',
      date: '3 May 2026',
      tags: 'Adventure • Travel • Romantic',
      videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-young-couple-holding-hands-and-running-on-the-beach-29009-large.mp4',
      objectPosition: 'center'
    },
    {
      id: 'c3',
      title: 'Birthday',
      img: '/top4/birthday.png',
      desc: 'pasand hai tume malum hai, tumne bataya tha ek dafe. - every lyrics to this song , my every wish, fulfilled by my G(irish)enie',
      matchRate: '99.5% Match',
      year: '2026',
      location: 'Home',
      date: '5 April 2026',
      tags: 'Sweet • Celebration • Cozy',
      videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-lights-of-a-happy-birthday-candle-burning-43285-large.mp4',
      objectPosition: 'center calc(50% - 6px)'
    },
    {
      id: 'c4',
      title: "Valentine's",
      img: '/top4/valentines.jpeg',
      desc: 'forever crushing on my husband, Sar akho pr😌',
      matchRate: '99% Match',
      year: '2026',
      location: 'Home',
      date: '14 February 2026',
      tags: 'Cozy • Romantic • Sweet',
      videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-heart-shaped-balloons-floating-in-the-air-43292-large.mp4',
      objectPosition: 'center'
    }
  ];

  const trendingNowItems = [
    {
      id: 't1',
      title: 'Season 1 : Completed',
      img: '/slideshow/IMG_2083.JPG.jpeg',
      desc: '365 days, countless memories, endless laughter, silly moments, and the love that keeps getting better with each season',
      matchRate: '99% Match',
      year: '2024',
      location: 'Home',
      date: 'Oct 24, 2024',
      tags: 'Romantic • Sweet • Memories',
      videoUrl: '/video/video1.mp4',
      objectPosition: 'top'
    },
    {
      id: 't2',
      title: 'The Night Everything Changed ✨',
      img: '/slideshow/slide6_v2.png',
      desc: 'A birthday party that became our love story\u2019s favorite episode\u2014he got down on one knee, we danced till 6 AM, and a fairy tale to forever quietly began. ❤️🥂💍\n\n1 year to this day🤍🧿',
      matchRate: '99.5% Match',
      year: '2024',
      location: 'Birthday Party',
      date: 'April 2025',
      tags: 'Proposal • Celebration • Love',
      videoUrl: '/video/video2.mp4',
      objectPosition: 'center'
    },
    {
      id: 't3',
      title: 'The Alibaug Chapter 🤍',
      img: '/slideshow/IMG_8577.JPG.jpeg',
      desc: 'What was supposed to be a pre-wedding shoot became one of the sweetest memories of our courtship. Between the chaos, the camera, the outfit changes, and my dramatic exhaustion (Ironically, after asking you not to get tired before finishing all the looks, I was the one ready to give up first, practically sobbing and begging), there was you\u2014making every moment feel effortless, magical, and worth remembering forever. ✨❤️',
      matchRate: '99.2% Match',
      year: '2025',
      location: 'Alibaug',
      date: 'Courtship',
      tags: 'Pre-Wedding • Fun • Effortless',
      videoUrl: '/video/video3.mp4',
      objectPosition: 'top'
    },
    {
      id: 't4',
      title: 'The Night Before Our Wedding',
      img: '/wedding_moment.png',
      desc: 'The night before our wedding was everything I could have wished for. There was music, laughter, endless celebrations, and a heart full of emotions. While I was a whirlwind of excitement and nerves, you stood beside me with your calmness and that reassuring smile that somehow makes everything feel okay. That night, more than ever, I realized that no matter how chaotic my emotions get, you know exactly how to hold my hand through them, I realised that your calm heart could handle every storm in mine. And if this was how we were starting forever, I knew I was exactly where I belonged. ❤️',
      matchRate: '100% Perfect',
      year: '2026',
      location: 'Wedding Venue',
      date: 'Sangeet Night',
      tags: 'Wedding Eve • Emotional • Calm',
      videoUrl: '/video/video4.mp4',
      objectPosition: 'center'
    }
  ];

  if (!activeProfile) {
    return <IntroScreen onProfileSelect={setActiveProfile} />;
  }

  return (
    <div className="main-layout">
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        activeProfile={activeProfile}
        onSwitchProfile={handleSwitchProfile}
        isMusicPlaying={isMusicPlaying}
        onToggleMusic={handleToggleMusic}
      />

      {/* Main Tab Routing */}
      <main style={{ flex: 1, paddingTop: activeTab === 'home' ? 0 : '70px' }}>
        {activeTab !== 'home' && (
          <div className="subpage-back-wrapper" style={{ padding: '1.5rem 4% 0.5rem' }}>
            <button 
              onClick={() => {
                setActiveTab('home');
              }}
              className="subpage-back-btn"
              style={{
                background: 'rgba(255, 255, 255, 0.08)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                borderRadius: '20px',
                color: '#e5e5e5',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '0.85rem',
                fontWeight: 600,
                transition: 'all 0.2s ease',
                padding: '0.5rem 1.25rem'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#fff';
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.15)';
                e.currentTarget.style.transform = 'translateX(-3px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = '#e5e5e5';
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.08)';
                e.currentTarget.style.transform = 'translateX(0)';
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="19" y1="12" x2="5" y2="12"></line>
                <polyline points="12 19 5 12 12 5"></polyline>
              </svg>
              Back to Home
            </button>
          </div>
        )}

        {activeTab === 'home' && (
          <>
            <HeroBanner activeProfile={activeProfile} />
            
            <div className="rows-container">
              <MemoryRow 
                title="movies" 
                subtitle="Click any card to read the full episode description and view reaction details."
                items={trendingNowItems} 
                onCardClick={setSelectedMemory} 
                variant="memories"
              />
              <MemoryRow 
                title="TOP 4 HITS IN HEARTS TODAY" 
                items={continueWatchingItems} 
                onCardClick={setSelectedMemory} 
                variant="top4"
              />

              {/* Featured Documentary Spotlight Section */}
              <div className="spotlight-section">
                {/* Left Side Image Card */}
                <div className="spotlight-image-wrapper">
                  <img src={spotlightImage} className="spotlight-image" alt="Featured spotlight" />
                  <div className="spotlight-badge">
                    <span className="spotlight-badge-dot"></span>
                    FEATURED MEMORY
                  </div>
                  <button className="spotlight-edit-btn" onClick={() => setIsEditingSpotlight(true)}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                      <path d="M18.5 2.5a2.121 2.121 0 1 1 3 3L12 15l-4 1 1-4z" />
                    </svg>
                    CUSTOMIZE STORY
                  </button>
                </div>

                {/* Right Side Content */}
                <div className="spotlight-content">
                  <div className="spotlight-category-header">
                    <span style={{ color: 'var(--netflix-red)' }}>COUPLEFLIX</span> DOCUMENTARY SPOTLIGHT  |  <span>📅 EST. 2023</span>
                  </div>
                  <h2 className="spotlight-title-text">
                    {spotlightTitle.split('\n').map((line, i) => (
                      <React.Fragment key={i}>
                        {line}
                        <br />
                      </React.Fragment>
                    ))}
                  </h2>
                  <div className="spotlight-subtitle-text">{spotlightSubtitle}</div>
                  <p className="spotlight-description">"{spotlightText}"</p>
                  <div className="spotlight-quote-box">
                    <p className="spotlight-quote">
                      "{spotlightQuote}"
                    </p>
                  </div>
                </div>
              </div>



              {/* Custom Interactive Row: Our List (Ideal Date Night List) */}
              <div style={{ marginTop: '1rem' }}>
                <h2 className="memory-row-title">My List (Ideal Date Night List)</h2>
                <div style={{
                  backgroundColor: '#161616',
                  border: '1px solid #222',
                  borderRadius: '6px',
                  padding: '1.5rem',
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                  gap: '1rem'
                }}>
                  {bucketList.map((item) => (
                    <div 
                      key={item.id} 
                      onClick={() => toggleBucketListItem(item.id)}
                      style={{
                        padding: '1rem',
                        backgroundColor: item.done ? 'rgba(229, 9, 20, 0.05)' : '#222',
                        border: '1px solid',
                        borderColor: item.done ? 'var(--netflix-red)' : '#333',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: '1rem',
                        transition: 'all 0.2s ease',
                        boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'scale(1.02)';
                        e.currentTarget.style.borderColor = 'var(--netflix-red)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'scale(1)';
                        e.currentTarget.style.borderColor = item.done ? 'var(--netflix-red)' : '#333';
                      }}
                    >
                      <span style={{ 
                        fontSize: '0.9rem', 
                        color: item.done ? '#a3a3a3' : '#fff',
                        textDecoration: item.done ? 'line-through' : 'none'
                      }}>
                        {item.title}
                      </span>
                      <div style={{
                        width: '20px',
                        height: '20px',
                        borderRadius: '4px',
                        border: '2px solid',
                        borderColor: item.done ? 'var(--netflix-red)' : '#777',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: item.done ? 'var(--netflix-red)' : 'transparent',
                        color: 'white',
                        fontSize: '0.75rem',
                        fontWeight: 900
                      }}>
                        {item.done && '✓'}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Cinematic Ending Section */}
            <CinematicEnding memories={[...trendingNowItems, ...continueWatchingItems]} />
          </>
        )}

        {activeTab === 'timeline' && <Timeline />}
        {activeTab === 'planner' && <DatePlanner />}
        {activeTab === 'vault' && <MemoryVault onCardClick={setSelectedMemory} />}
        {activeTab === 'letter' && <SecretLetter />}
      </main>

      {/* Global Memory Detail Modal Lightbox */}
      {selectedMemory && (
        <div className="modal-overlay" onClick={() => setSelectedMemory(null)}>
          <div className={`modal-content detailed-memory-modal ${selectedMemory.id?.startsWith('v') ? 'vault-modal' : ''}`} onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={() => setSelectedMemory(null)}>
              <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
            
            <div className="modal-image-wrapper">
              <img 
                src={selectedMemory.img} 
                className="modal-image-blur-bg" 
                alt="" 
              />
              <img 
                src={selectedMemory.img} 
                className="modal-image" 
                alt={selectedMemory.title} 
                style={{ '--object-position': selectedMemory.objectPosition || 'center' }}
              />
              <div className="modal-gradient"></div>
              <div style={{
                position: 'absolute',
                bottom: '1.5rem',
                left: '2rem',
                zIndex: 10
              }}>
                <h2 style={{ fontSize: '2rem', textTransform: 'uppercase', marginBottom: '0.25rem', textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>
                  {selectedMemory.title}
                </h2>
                <div style={{ display: 'flex', gap: '10px', fontSize: '0.85rem', color: '#ccc', textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}>
                  <span>{selectedMemory.date}</span>
                  <span>•</span>
                  <span>{selectedMemory.location}</span>
                </div>
                {selectedMemory.videoUrl && (
                  <button 
                    className="modal-play-btn" 
                    onClick={() => {
                      setPlayingVideoUrl(selectedMemory.videoUrl);
                    }}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" style={{ marginRight: '4px' }}>
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                    Play Video
                  </button>
                )}
              </div>
            </div>

            <div className="modal-body" style={{ padding: '1.5rem 2rem' }}>
              <div className="modal-main-info" style={{ flex: 2 }}>
                <p style={{ fontSize: '1rem', lineHeight: '1.5', color: '#e5e5e5', whiteSpace: 'pre-line' }}>
                  {selectedMemory.desc}
                </p>

                {/* Micro Interaction: Reactions */}
                <div style={{ marginTop: '1.5rem', borderTop: '1px solid #333', paddingTop: '1rem' }}>
                  <span style={{ fontSize: '0.8rem', color: '#a3a3a3', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    How much do you love this memory?
                  </span>
                  <div style={{ display: 'flex', gap: '10px', marginTop: '0.5rem' }}>
                    <button
                      onClick={() => handleReaction(selectedMemory.id, 'like')}
                      style={{
                        backgroundColor: likedMemories[selectedMemory.id] === 'like' ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.05)',
                        border: likedMemories[selectedMemory.id] === 'like' ? '1px solid #fff' : '1px solid #444',
                        color: likedMemories[selectedMemory.id] === 'like' ? '#fff' : '#ccc',
                        padding: '0.4rem 1rem',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        transition: 'all 0.2s ease',
                        fontSize: '0.9rem'
                      }}
                    >
                      👍 Liked
                    </button>
                    <button
                      onClick={() => handleReaction(selectedMemory.id, 'love')}
                      style={{
                        backgroundColor: likedMemories[selectedMemory.id] === 'love' ? 'rgba(229,9,20,0.15)' : 'rgba(255,255,255,0.05)',
                        border: likedMemories[selectedMemory.id] === 'love' ? '1px solid var(--netflix-red)' : '1px solid #444',
                        color: likedMemories[selectedMemory.id] === 'love' ? 'var(--netflix-red)' : '#ccc',
                        padding: '0.4rem 1rem',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        transition: 'all 0.2s ease',
                        fontSize: '0.9rem'
                      }}
                    >
                      ❤️ Love It!
                    </button>
                    <button
                      onClick={() => handleReaction(selectedMemory.id, 'laugh')}
                      style={{
                        backgroundColor: likedMemories[selectedMemory.id] === 'laugh' ? 'rgba(245,158,11,0.15)' : 'rgba(255,255,255,0.05)',
                        border: likedMemories[selectedMemory.id] === 'laugh' ? '1px solid var(--accent-amber)' : '1px solid #444',
                        color: likedMemories[selectedMemory.id] === 'laugh' ? 'var(--accent-amber)' : '#ccc',
                        padding: '0.4rem 1rem',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        transition: 'all 0.2s ease',
                        fontSize: '0.9rem'
                      }}
                    >
                      😂 Funny
                    </button>
                  </div>
                </div>
              </div>

              <div className="modal-side-info" style={{ flex: 1, paddingLeft: '1.5rem', borderLeft: '1px solid #333' }}>
                <div>
                  <div className="info-label">Category:</div>
                  <div className="info-value">{selectedMemory.category || 'Special Memory'}</div>
                </div>
                <div style={{ marginTop: '1rem' }}>
                  <div className="info-label">Release Year:</div>
                  <div className="info-value">{selectedMemory.year}</div>
                </div>
                <div style={{ marginTop: '1rem' }}>
                  <div className="info-label">Match Score:</div>
                  <div className="info-value" style={{ color: '#4ade80', fontWeight: 'bold' }}>
                    {selectedMemory.matchRate}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Customize Spotlight Modal */}
      {isEditingSpotlight && (
        <div className="modal-overlay" onClick={() => setIsEditingSpotlight(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '500px' }}>
            <button className="modal-close-btn" onClick={() => setIsEditingSpotlight(false)}>
              <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
            <div style={{ padding: '2rem' }}>
              <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', fontFamily: 'var(--font-outfit)', textTransform: 'uppercase', color: '#fff' }}>
                Customize Featured Story
              </h2>
              
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', fontSize: '0.8rem', color: '#a3a3a3', marginBottom: '0.25rem', textTransform: 'uppercase', fontWeight: 700 }}>Title (Use Line Breaks if needed)</label>
                <textarea 
                  rows="3"
                  value={spotlightTitle} 
                  onChange={(e) => setSpotlightTitle(e.target.value)} 
                  style={{ width: '100%', padding: '0.6rem', background: '#222', border: '1px solid #444', color: '#fff', borderRadius: '4px', fontFamily: 'inherit' }}
                />
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', fontSize: '0.8rem', color: '#a3a3a3', marginBottom: '0.25rem', textTransform: 'uppercase', fontWeight: 700 }}>Red Subtitle</label>
                <input 
                  type="text" 
                  value={spotlightSubtitle} 
                  onChange={(e) => setSpotlightSubtitle(e.target.value)} 
                  style={{ width: '100%', padding: '0.6rem', background: '#222', border: '1px solid #444', color: '#fff', borderRadius: '4px' }}
                />
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', fontSize: '0.8rem', color: '#a3a3a3', marginBottom: '0.25rem', textTransform: 'uppercase', fontWeight: 700 }}>Story Description</label>
                <textarea 
                  rows="4"
                  value={spotlightText} 
                  onChange={(e) => setSpotlightText(e.target.value)} 
                  style={{ width: '100%', padding: '0.6rem', background: '#222', border: '1px solid #444', color: '#fff', borderRadius: '4px', resize: 'vertical' }}
                />
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', fontSize: '0.8rem', color: '#a3a3a3', marginBottom: '0.25rem', textTransform: 'uppercase', fontWeight: 700 }}>Bottom Quote</label>
                <input 
                  type="text" 
                  value={spotlightQuote} 
                  onChange={(e) => setSpotlightQuote(e.target.value)} 
                  style={{ width: '100%', padding: '0.6rem', background: '#222', border: '1px solid #444', color: '#fff', borderRadius: '4px' }}
                />
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', fontSize: '0.8rem', color: '#a3a3a3', marginBottom: '0.25rem', textTransform: 'uppercase', fontWeight: 700 }}>Image URL</label>
                <input 
                  type="text" 
                  value={spotlightImage} 
                  onChange={(e) => setSpotlightImage(e.target.value)} 
                  style={{ width: '100%', padding: '0.6rem', background: '#222', border: '1px solid #444', color: '#fff', borderRadius: '4px' }}
                />
              </div>

              <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                <button 
                  onClick={() => setIsEditingSpotlight(false)}
                  style={{ padding: '0.6rem 1.25rem', background: 'transparent', border: '1px solid #555', color: '#fff', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
                >
                  Cancel
                </button>
                <button 
                  onClick={() => setIsEditingSpotlight(false)}
                  style={{ padding: '0.6rem 1.25rem', background: 'var(--netflix-red)', border: 'none', color: '#fff', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer' }}
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Immersive Video Player Overlay */}
      {playingVideoUrl && (
        <div className="video-player-overlay" onClick={() => setPlayingVideoUrl(null)}>
          <button className="video-player-close-btn" onClick={() => setPlayingVideoUrl(null)}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '6px' }}>
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
            BACK TO BROWSE
          </button>
          <div className="video-container" onClick={(e) => e.stopPropagation()} style={{ width: '80%', maxAspect: '16/9', position: 'relative' }}>
            <video 
              src={playingVideoUrl} 
              controls 
              autoPlay 
              playsInline
              style={{ width: '100%', borderRadius: '8px', border: '1px solid #333', boxShadow: '0 10px 30px rgba(0,0,0,0.9)' }}
              onEnded={() => setPlayingVideoUrl(null)}
            />
          </div>
        </div>
      )}

      {/* Cinematic Footer */}
      <footer style={{
        backgroundColor: '#0c0c0c',
        borderTop: '1px solid #222',
        padding: '1.5rem 4% 1.5rem',
        color: 'var(--text-grey)',
        fontSize: '0.8rem',
        zIndex: 10
      }}>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', marginBottom: '1.5rem', listStyle: 'none' }}>
          <span>Terms of Romance</span>
          <span>Privacy & Hugs</span>
          <span>Date Policy</span>
          <span>Contact Vatsal</span>
        </div>
        <div style={{ textAlign: 'center' }}>
          <p>© 2026 CoupleFlix Inc. Crafted with ❤️ for Diksha.</p>
          <p style={{ marginTop: '0.5rem', fontSize: '0.75rem', opacity: 0.5 }}>
            All characters and memories in this series are entirely real and cherished. Any similarity to other love stories is purely coincidental.
          </p>
        </div>
      </footer>
    </div>
  );
}
