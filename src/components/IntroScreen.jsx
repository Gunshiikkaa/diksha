import React, { useState } from 'react';

export default function IntroScreen({ onProfileSelect }) {
  const [isFading, setIsFading] = useState(false);

  const profiles = [
    {
      name: "G's Birthday",
      letter: '🎂',
      gradient: 'linear-gradient(135deg, #e50914, #ff3344)', // Signature red gradient
      badgeText: '🎂 G',
      badgeColor: '#e50914',
      role: 'SPECIAL CELEBRATION 🎂',
      avatarColor: '#e50914',
      emoji: '🎂'
    }
  ];

  const playTadum = () => {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();
      const now = ctx.currentTime;
      
      // 1. Low Thud 1 (T) at 0s
      const osc1 = ctx.createOscillator();
      const gain1 = ctx.createGain();
      osc1.type = 'triangle';
      osc1.frequency.setValueAtTime(80, now);
      osc1.frequency.exponentialRampToValueAtTime(40, now + 0.15);
      gain1.gain.setValueAtTime(0.8, now);
      gain1.gain.exponentialRampToValueAtTime(0.01, now + 0.15);
      osc1.connect(gain1);
      gain1.connect(ctx.destination);
      osc1.start(now);
      osc1.stop(now + 0.15);
      
      // 2. Low Thud 2 (DUM) at 0.12s
      const osc2 = ctx.createOscillator();
      const gain2 = ctx.createGain();
      osc2.type = 'sawtooth';
      osc2.frequency.setValueAtTime(85, now + 0.12);
      osc2.frequency.exponentialRampToValueAtTime(45, now + 0.38);
      
      const lp = ctx.createBiquadFilter();
      lp.type = 'lowpass';
      lp.frequency.setValueAtTime(150, now);
      
      gain2.gain.setValueAtTime(0.9, now + 0.12);
      gain2.gain.exponentialRampToValueAtTime(0.01, now + 0.38);
      
      osc2.connect(lp);
      lp.connect(gain2);
      gain2.connect(ctx.destination);
      osc2.start(now + 0.12);
      osc2.stop(now + 0.38);
      
      // 3. String pad / Synth rise at 0.12s
      const frequencies = [65.41, 130.81, 196.00, 261.63, 311.13, 392.00, 523.25, 587.33]; 
      
      frequencies.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.value = freq;
        osc.detune.value = (idx - 3.5) * 6; 
        
        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(80, now + 0.12);
        filter.frequency.exponentialRampToValueAtTime(1000 + idx * 80, now + 1.2);
        
        gain.gain.setValueAtTime(0, now);
        gain.gain.linearRampToValueAtTime(0.18, now + 0.25);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 2.2);
        
        osc.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);
        
        osc.start(now + 0.12);
        osc.stop(now + 2.4);
      });
    } catch (err) {
      console.warn("Failed to play Web Audio sound", err);
    }
  };

  const handleSelect = (profile) => {
    playTadum();
    setIsFading(true);
    setTimeout(() => {
      onProfileSelect(profile);
    }, 1200);
  };

  return (
    <div className="profile-container" style={{
      opacity: isFading ? 0 : 1,
      transition: 'opacity 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      pointerEvents: isFading ? 'none' : 'auto',
      backgroundColor: '#000'
    }}>
      <div className="cinema-vignette"></div>
      <div className="film-grain"></div>

      <div style={{ position: 'relative', zIndex: 10, textAlign: 'center' }}>
        <h1 style={{ 
          fontFamily: "'Cinzel', 'Georgia', serif", 
          fontWeight: 600, 
          fontSize: 'clamp(2.2rem, 8vw, 3.5rem)', 
          marginBottom: '0.15rem',
          letterSpacing: '0.02em',
          color: '#fff'
        }}>
          Who's watching?
        </h1>
        
        <p style={{
          color: '#808080',
          letterSpacing: '0.15em',
          fontSize: 'clamp(0.7rem, 2.5vw, 0.8rem)',
          fontFamily: 'var(--font-outfit)',
          textTransform: 'uppercase',
          marginBottom: '2rem'
        }}>
          Choose a profile to start streaming memories
        </p>
        
        <div className="profile-list" style={{ gap: '2.5rem' }}>
          {profiles.map((profile) => (
            <div 
              key={profile.name} 
              className="profile-card"
              onClick={() => handleSelect(profile)}
              style={{ width: '150px' }}
            >
              {/* Profile Card Box */}
              <div 
                className="profile-avatar-wrapper"
                style={{ 
                  background: profile.gradient,
                  width: '130px',
                  height: '130px',
                  borderRadius: '6px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative'
                }}
              >
                {/* Large Center Character */}
                <div style={{
                  fontSize: profile.letter === '❤️' ? '3rem' : '4.5rem',
                  fontWeight: '900',
                  color: '#000000',
                  userSelect: 'none',
                  fontFamily: 'var(--font-outfit)'
                }}>
                  {profile.letter}
                </div>

                {/* Bottom Right Pill Badge */}
                <div style={{
                  position: 'absolute',
                  bottom: '8px',
                  right: '8px',
                  backgroundColor: 'rgba(0, 0, 0, 0.75)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '4px',
                  padding: '2px 6px',
                  fontSize: '0.65rem',
                  fontWeight: '800',
                  color: '#fff',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  letterSpacing: '0.05em'
                }}>
                  {profile.badgeText}
                </div>
              </div>

              {/* Profile Text Details underneath */}
              <span className="profile-name" style={{ 
                color: '#fff', 
                fontWeight: '600', 
                fontSize: '1.1rem',
                marginTop: '0.5rem',
                display: 'block'
              }}>
                {profile.name}
              </span>
              
              <span style={{
                color: '#808080',
                fontSize: '0.7rem',
                letterSpacing: '0.05em',
                fontFamily: 'var(--font-outfit)',
                marginTop: '0.2rem',
                display: 'block'
              }}>
                {profile.role}
              </span>
            </div>
          ))}
        </div>

        <button className="manage-profiles-btn" style={{
          marginTop: '2rem',
          border: '1px solid #444',
          color: '#555',
          fontSize: '0.85rem',
          letterSpacing: '0.15em',
          padding: '0.6rem 2rem',
          backgroundColor: 'transparent',
          fontFamily: 'var(--font-outfit)',
          transition: 'all 0.2s ease'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.color = '#fff';
          e.currentTarget.style.borderColor = '#fff';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.color = '#555';
          e.currentTarget.style.borderColor = '#444';
        }}
        >
          Manage Profiles
        </button>

        {/* Mobile Audio Tip / Alert */}
        <div style={{
          marginTop: '2.5rem',
          padding: '0.75rem 1.25rem',
          backgroundColor: 'rgba(255, 255, 255, 0.03)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          borderRadius: '8px',
          maxWidth: '420px',
          marginLeft: 'auto',
          marginRight: 'auto',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          textAlign: 'left'
        }}>
          <div style={{ fontSize: '1.25rem' }}>🔊</div>
          <p style={{
            margin: 0,
            fontSize: '0.75rem',
            color: '#888',
            lineHeight: '1.4',
            fontFamily: 'var(--font-outfit)'
          }}>
            <strong style={{ color: '#aaa', display: 'block', marginBottom: '2px' }}>Mobile Users Sound Tip</strong>
            If you cannot hear sound on your phone, please make sure your physical <strong>Silent/Mute Switch</strong> is turned off and your volume is turned up!
          </p>
        </div>
      </div>
    </div>
  );
}
