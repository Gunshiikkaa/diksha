import React, { useState, useEffect } from 'react';

export default function SecretLetter() {
  const [passcode, setPasscode] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [hearts, setHearts] = useState([]);

  const correctPIN = '0000'; // Default passcode

  const handleKeyPress = (num) => {
    if (passcode.length < 4) {
      setPasscode(prev => prev + num);
      setErrorMsg('');
    }
  };

  const handleBackspace = () => {
    setPasscode(prev => prev.slice(0, -1));
  };

  const handleClear = () => {
    setPasscode('');
    setErrorMsg('');
  };

  const spawnHearts = () => {
    const list = [];
    // Spawn 30 hearts with random positions, delays, and scales
    for (let i = 0; i < 30; i++) {
      const id = Math.random().toString(36).substr(2, 9);
      const left = Math.random() * 100; // 0-100% width
      const size = Math.random() * 20 + 15; // 15-35px
      const delay = Math.random() * 3; // 0-3s delay
      const duration = Math.random() * 3 + 3; // 3-6s duration
      list.push({ id, left, size, delay, duration });
    }
    setHearts(list);

    // Clean up hearts after they finish animating
    setTimeout(() => {
      setHearts([]);
    }, 6000);
  };

  useEffect(() => {
    if (passcode.length === 4) {
      if (passcode === correctPIN) {
        setIsUnlocked(true);
        setErrorMsg('');
        spawnHearts();
      } else {
        setErrorMsg('Incorrect Passcode. Try again!');
        setPasscode('');
        // Shake feedback
        try {
          const display = document.querySelector('.passcode-display');
          if (display) {
            display.style.animation = 'none';
            // Trigger reflow
            void display.offsetWidth;
            display.style.animation = 'shake 0.4s ease';
          }
        } catch (e) {}
      }
    }
  }, [passcode]);

  return (
    <div style={{ padding: '2rem 4%', minHeight: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      
      {/* Floating Hearts Animation */}
      {hearts.length > 0 && (
        <div className="hearts-container">
          {hearts.map((heart) => (
            <svg
              key={heart.id}
              className="floating-heart"
              style={{
                left: `${heart.left}%`,
                width: `${heart.size}px`,
                height: `${heart.size}px`,
                animationDelay: `${heart.delay}s`,
                animationDuration: `${heart.duration}s`
              }}
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          ))}
        </div>
      )}

      {!isUnlocked ? (
        <div className="lockbox-container">
          <div style={{ fontSize: '2.5rem', marginBottom: '0.25rem' }}>🔒</div>
          <h2 style={{ fontSize: '1.6rem', fontFamily: "'Cinzel', 'Georgia', serif", textTransform: 'uppercase', marginBottom: '0.15rem' }}>
            Secret Lockbox
          </h2>
          <p style={{ color: 'var(--text-grey)', fontSize: '0.85rem', marginBottom: '1rem' }}>
            Please enter our secret passcode (0000) to unlock a private message.
          </p>

          {/* Keypad display */}
          <div className="passcode-display" style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '15px'
          }}>
            {[0, 1, 2, 3].map((idx) => (
              <div
                key={idx}
                style={{
                  width: '20px',
                  height: '20px',
                  borderRadius: '50%',
                  backgroundColor: passcode.length > idx ? 'var(--netflix-red)' : 'transparent',
                  border: '2px solid rgba(255, 255, 255, 0.4)',
                  boxShadow: passcode.length > idx ? '0 0 10px var(--netflix-red)' : 'none',
                  transition: 'all 0.15s ease'
                }}
              />
            ))}
          </div>

          {errorMsg && (
            <div style={{ color: 'var(--netflix-red)', fontSize: '0.85rem', fontWeight: 600, marginBottom: '1rem', minHeight: '1.2rem' }}>
              {errorMsg}
            </div>
          )}

          {/* Lockbox Numeric Keypad */}
          <div className="lockbox-keypad">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
              <button
                key={num}
                className="keypad-btn"
                onClick={() => handleKeyPress(num)}
              >
                {num}
              </button>
            ))}
            <button className="keypad-btn" onClick={handleClear} style={{ fontSize: '0.8rem', textTransform: 'uppercase', color: 'var(--text-grey)' }}>
              Clear
            </button>
            <button className="keypad-btn" onClick={() => handleKeyPress(0)}>
              0
            </button>
            <button className="keypad-btn" onClick={handleBackspace} style={{ color: 'var(--text-grey)' }}>
              ⌫
            </button>
          </div>
          <div style={{ fontSize: '0.75rem', color: '#555', marginTop: '0.5rem' }}>
            Hint: Four zeros.
          </div>
        </div>
      ) : (
        <div style={{ width: '100%', textAlign: 'center', animation: 'fadeIn 0.8s ease-out' }}>
          <h2 style={{ fontSize: '2.5rem', fontFamily: "'Cinzel', 'Georgia', serif", textTransform: 'uppercase', marginBottom: '1rem' }}>
            A Message <span style={{ color: 'var(--netflix-red)' }}>For You</span>
          </h2>
          
          <div className="love-letter-paper">
            <div className="love-letter-content">
              <h3 className="love-letter-heading">My Dearest G,</h3>
              <p style={{ textIndent: '2rem', marginBottom: '1.5rem' }}>
                Sometimes I sit quietly and wonder how a person who was once a stranger became my safest place in the entire world.
              </p>
              <p style={{ textIndent: '2rem', marginBottom: '1.5rem' }}>
                A year ago, if someone had told me that the boy I was nervously stalking on Instagram, the one who made me run to the washroom in panic when I first saw him walking into the restaurant, would become the love of my life, I probably would have laughed. Yet here we are.
              </p>
              <p style={{ textIndent: '2rem', marginBottom: '1.5rem' }}>
                What started with nervous conversations and stolen glances slowly turned into late-night calls that stretched till sunrise, endless laughter, countless memories, and a love so deep that I now struggle to remember what life felt like before you.
              </p>
              <p style={{ textIndent: '2rem', marginBottom: '1.5rem' }}>
                I still remember our journey towards the wedding—the endless preparations, the discussions, the excitement, and the anticipation. Somewhere between all those months, my heart quietly chose you over and over again.
              </p>
              <p style={{ textIndent: '2rem', marginBottom: '1.5rem' }}>
                And then came our wedding day. The bouquet of my favorite flowers. The letter that made me cry. The way your words wrapped around my heart and made every fear disappear. As I walked towards you, I wasn't just walking down an aisle—I was walking towards the life I had always dreamed of without even knowing it.
              </p>
              <p style={{ textIndent: '2rem', marginBottom: '1.5rem' }}>
                Everyone says marriage changes everything. For me, marriage simply confirmed what I already knew: <strong>You were home.</strong>
              </p>
              <p style={{ textIndent: '2rem', marginBottom: '1.5rem' }}>
                I left one home behind, yet somehow I never felt lost. Not because I was brave, but because every step of the way, you made sure I never walked alone. You listened to every worry, every fear, every silly thought that crossed my mind. And somehow, every time, you made everything feel lighter.
              </p>
              <p style={{ textIndent: '2rem', marginBottom: '1.5rem' }}>
                But if I had to choose one moment that truly changed me, it would be that night in March. I was unwell. Yet that night, I saw what love truly looks like. I saw it in you. The man who can't sleep without the AC stayed awake the entire night just to make sure I was okay. You checked on me every few minutes. You held me close. You comforted me. You sat beside me while the world slept.
              </p>
              <p style={{ textIndent: '2rem', marginBottom: '1.5rem' }}>
                You didn't do it because anyone asked you to. You did it because my pain mattered to you. And that night, I fell in love with you in a way I never had before.
              </p>
              <p style={{ textIndent: '2rem', marginBottom: '1.5rem' }}>
                Not because of grand gestures. Not because of gifts. Not because of romantic words. But because I realized that if life ever became difficult, if I ever found myself scared, lost, broken, confused, or exhausted—you would be right there beside me. And that is the rarest kind of love in this world.
              </p>
              <p style={{ textIndent: '2rem', marginBottom: '1.5rem' }}>
                You have taught me that love is not found in extraordinary moments alone. It is found in the everyday things. In the way you check if I've eaten. In the way you remember tiny details. In the way you protect my peace. In the way you make me laugh when I want to cry. In the way you love me even on days when I don't feel lovable.
              </p>
              <p style={{ textIndent: '2rem', marginBottom: '1.5rem' }}>
                You have given me something every person secretly hopes to find:
              </p>
              <p style={{ textAlign: 'center', marginBottom: '1.5rem', fontStyle: 'italic', color: 'var(--netflix-red-hover)' }}>
                A love that feels safe.<br />
                A love that feels effortless.<br />
                A love that feels like coming home.
              </p>
              <p style={{ textIndent: '2rem', marginBottom: '1.5rem' }}>
                When I look at you today, I don't just see my husband. I see my best friend. My comfort person. My biggest blessing. My favorite chapter. My greatest adventure. And the love story I will choose in every lifetime.
              </p>
              <p style={{ textIndent: '2rem', marginBottom: '1.5rem' }}>
                If I could go back to that nervous girl hiding before our first meeting, I would hold her hand and tell her: <em>"Don't be scared. The man you're about to meet is going to love you more beautifully than you can imagine."</em>
              </p>
              <p style={{ textIndent: '2rem', marginBottom: '1.5rem' }}>
                Thank you for every laugh, every memory, every sacrifice, every hug, every late-night conversation, every forehead kiss, every act of care, and every moment that has made our story what it is today.
              </p>
              <p style={{ textAlign: 'center', marginBottom: '1.5rem', fontStyle: 'italic' }}>
                I loved you then.<br />
                I love you now.<br />
                And after every sunrise, every season, every year, and every lifetime—<br />
                <strong>I will still choose you.</strong>
              </p>
              <div className="love-letter-footer">
                <p>Forever yours,</p>
                <p style={{ color: 'var(--netflix-red-hover)', fontSize: '2.4rem', marginTop: '0.5rem' }}>Diksha ❤️</p>
              </div>
            </div>
          </div>

          <button
            onClick={() => {
              setIsUnlocked(false);
              setPasscode('');
            }}
            style={{
              marginTop: '2rem',
              background: 'transparent',
              border: '1px solid #444',
              color: 'var(--text-grey)',
              padding: '0.6rem 2rem',
              borderRadius: '4px',
              cursor: 'pointer',
              fontWeight: 600,
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'var(--text-white)';
              e.currentTarget.style.color = 'var(--text-white)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = '#444';
              e.currentTarget.style.color = 'var(--text-grey)';
            }}
          >
            🔒 Lock Secret Message
          </button>
        </div>
      )}

      {/* Embedded Passcode Keypad Shake Animation Keyframes */}
      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20%, 60% { transform: translateX(-10px); }
          40%, 80% { transform: translateX(10px); }
        }
      `}</style>
    </div>
  );
}
