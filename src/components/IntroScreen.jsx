import React, { useState } from 'react';

export default function IntroScreen({ onProfileSelect }) {
  const [isFading, setIsFading] = useState(false);

  const profiles = [
    {
      name: 'Sachin',
      avatarColor: '#1e40af', // Deep blue
      emoji: '👔',
      avatarImg: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80'
    },
    {
      name: 'Gunshika',
      avatarColor: '#be185d', // Deep pink
      emoji: '👑',
      avatarImg: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80'
    },
    {
      name: 'Both ❤️',
      avatarColor: '#b45309', // Amber
      emoji: '💖',
      avatarImg: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=150&q=80'
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
      
      // Lowpass filter to make the thud sound deep and warm
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
      // C minor / C major hybrid cinematic chord: C2, G2, C3, D#3/E3, G3, C4, D4
      const frequencies = [65.41, 130.81, 196.00, 261.63, 311.13, 392.00, 523.25, 587.33]; 
      
      frequencies.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.value = freq;
        
        // Detune oscillators to create a thick chorus effect
        osc.detune.value = (idx - 3.5) * 6; 
        
        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(80, now + 0.12);
        filter.frequency.exponentialRampToValueAtTime(1000 + idx * 80, now + 1.2);
        
        gain.gain.setValueAtTime(0, now);
        gain.gain.linearRampToValueAtTime(0.18, now + 0.25); // Rise
        gain.gain.exponentialRampToValueAtTime(0.001, now + 2.2); // Decay
        
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
    // Allow animation and audio chime to play out slightly before transition
    setTimeout(() => {
      onProfileSelect(profile);
    }, 1200);
  };

  return (
    <div className="profile-container" style={{
      opacity: isFading ? 0 : 1,
      transition: 'opacity 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      pointerEvents: isFading ? 'none' : 'auto'
    }}>
      <div className="cinema-vignette"></div>
      <div className="film-grain"></div>

      <div style={{ position: 'relative', zIndex: 10, textAlign: 'center' }}>
        <h1 className="profile-title" style={{ fontFamily: 'var(--font-outfit)', fontWeight: 500 }}>
          Who's watching?
        </h1>
        
        <div className="profile-list">
          {profiles.map((profile) => (
            <div 
              key={profile.name} 
              className="profile-card"
              onClick={() => handleSelect(profile)}
            >
              <div 
                className="profile-avatar-wrapper"
                style={{ backgroundColor: profile.avatarColor }}
              >
                <div style={{
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '3.2rem',
                  userSelect: 'none',
                  backgroundColor: 'rgba(0,0,0,0.1)'
                }}>
                  {profile.emoji}
                </div>
              </div>
              <span className="profile-name">{profile.name}</span>
            </div>
          ))}
        </div>

        <button className="manage-profiles-btn">
          Manage Profiles
        </button>
      </div>
    </div>
  );
}
