import React, { useState, useRef, useEffect } from 'react';

export default function DatePlanner() {
  const [selectedMood, setSelectedMood] = useState('Cozy');
  const [isSpinning, setIsSpinning] = useState(false);
  const [result, setResult] = useState(null);
  const [offsetY, setOffsetY] = useState(0);

  const moods = ['Cozy', 'Fancy', 'Foodie', 'Adventurous'];

  const dateIdeas = {
    Cozy: [
      {
        title: 'Blanket Fort Film Festival 🎪',
        desc: 'Construct a massive, comfortable blanket fort in the living room, line it with fairy lights, and binge-watch a movie series.',
        budget: '$',
        prepTime: '20 mins',
        checklist: ['Collect all pillows and blankets', 'Hang fairy/string lights', 'Make extra buttery popcorn', 'Pick a movie trilogy']
      },
      {
        title: 'Retro Board Game & Cocoa Tournament 🎲',
        desc: 'Dust off old classics or try a new card game. The loser has to make breakfast the next morning!',
        budget: '$',
        prepTime: '5 mins',
        checklist: ['Set up 3 different games', 'Whack together hot cocoa with marshmallows', 'Set the scoreboard', 'Choose a funny grand prize']
      },
      {
        title: 'DIY Clay & Painting Night 🎨',
        desc: 'Buy some air-dry clay and mold tiny plates, trinket trays, or funny sculptures for each other, then paint them.',
        budget: '$$',
        prepTime: '10 mins',
        checklist: ['Lay down newspapers/plastic', 'Mold a customized object for the other person', 'Play acoustic lo-fi music', 'Let dry and paint details']
      }
    ],
    Fancy: [
      {
        title: 'Candlelight Dinner & Dress Up 🕯️',
        desc: 'Put on your best formal wear, dim the lights, light some candles, and set up a beautiful table. Order delivery from a top restaurant or cook a special course.',
        budget: '$$$',
        prepTime: '30 mins',
        checklist: ['Iron formal clothes/suits/dresses', 'Set table with nice dinnerware and candles', 'Create a smooth jazz playlist', 'Enjoy a multi-course dinner']
      },
      {
        title: 'Home Cocktail/Mocktail Tasting 🍸',
        desc: 'Create three mini signature cocktails or mocktails. Name them after inside jokes or favorite memories and rate each blend.',
        budget: '$$',
        prepTime: '15 mins',
        checklist: ['Prep fresh citrus and ice', 'Draft a miniature menu cards', 'Shake, pour, and garnish', 'Rate from 1 to 10']
      },
      {
        title: 'Living Room Ballroom Dancing 💃',
        desc: 'Clear out space in the living room, stream a beginner dance tutorial on TV, and learn basic waltz or salsa steps together.',
        budget: '$',
        prepTime: '5 mins',
        checklist: ['Move coffee tables/furniture', 'Queue a dance lesson or swing music', 'Hold hands and try not to step on toes', 'Laugh through the mistakes']
      }
    ],
    Foodie: [
      {
        title: 'DIY Sushi Making Contest 🍣',
        desc: 'Grab seaweed, sticky rice, and your favorite fillings (veggies, salmon, crab). Learn to roll together and host a plating contest.',
        budget: '$$',
        prepTime: '30 mins',
        checklist: ['Cook and season sushi rice', 'Prep rolling mats and plastic wrap', 'Slice ingredients', 'Roll, slice, and dip in soy sauce']
      },
      {
        title: 'Bake-Off: Surprise Cookie Challenge 🍪',
        desc: 'Bake cookies using a basic recipe, but each partner must add a secret ingredient (e.g., crushed chips, lavender, peanut butter) to their half of the batch.',
        budget: '$',
        prepTime: '15 mins',
        checklist: ['Make the base cookie dough', 'Choose secret ingredients secretly', 'Bake separate cookie sheets', 'Conduct blind taste test']
      },
      {
        title: 'Local Food Truck Safari 🚚',
        desc: 'Research local food truck hubs. Drive over and order exactly one small item or snack from three different trucks to share.',
        budget: '$$',
        prepTime: '10 mins',
        checklist: ['Locate 3 nearby food trucks', 'Order a main, side, and dessert', 'Share everything', 'Compare notes and vote for the winner']
      }
    ],
    Adventurous: [
      {
        title: 'Stargazing & Midnight Picnic 🌌',
        desc: 'Drive to a dark sky location or set up blankets on the roof/backyard. Bring a thermos of tea and count shooting stars.',
        budget: '$',
        prepTime: '10 mins',
        checklist: ['Check weather for clear skies', 'Pack heavy blankets and jackets', 'Fill a thermos with hot chai/cocoa', 'Use a star-mapping app to find constellations']
      },
      {
        title: 'Sunrise Road Trip & Picnic 🌅',
        desc: 'Wake up early, grab coffee, and drive to a scenic viewpoint to watch the sunrise together while sharing breakfast wraps.',
        budget: '$$',
        prepTime: '15 mins (at dawn)',
        checklist: ['Set early alarms', 'Prep thermos coffee and sandwiches', 'Drive to a high viewpoint', 'Watch the day break']
      },
      {
        title: 'Geocaching Treasure Hunt 🗺️',
        desc: 'Download a geocaching app and track down hidden containers hidden in plain sight in your local parks or city spots.',
        budget: '$',
        prepTime: '5 mins',
        checklist: ['Install free geocaching app', 'Choose a high-rated cache nearby', 'Walk/hike to search for clues', 'Sign the logbook and leave a small token']
      }
    ]
  };

  // Compile a flat list of items for the spinning reel
  // To make it look like a rolling list, we append duplicate items
  const getSpinItems = () => {
    const list = dateIdeas[selectedMood];
    // Duplicate multiple times so there's enough height to slide
    return [...list, ...list, ...list, ...list, ...list];
  };

  const spinItems = getSpinItems();

  const handleSpin = () => {
    if (isSpinning) return;
    
    setIsSpinning(true);
    setResult(null);
    
    const moodIdeas = dateIdeas[selectedMood];
    const randomIndex = Math.floor(Math.random() * moodIdeas.length);
    
    // Calculate final scroll position
    // We want the reel to land on: index = randomIndex in the 4th block (to ensure it spins a lot)
    const targetItemIndex = (moodIdeas.length * 3) + randomIndex;
    const itemHeight = 200; // matching .reel-item height in css
    const targetOffset = targetItemIndex * itemHeight;
    
    setOffsetY(-targetOffset);

    setTimeout(() => {
      setIsSpinning(false);
      setResult(moodIdeas[randomIndex]);
    }, 3600); // matching transition duration in css + safety margin
  };

  // Reset reel position when mood changes
  useEffect(() => {
    setOffsetY(0);
    setResult(null);
  }, [selectedMood]);

  return (
    <div className="date-planner-container">
      <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
        <h2 style={{ fontSize: '2rem', fontFamily: 'var(--font-outfit)', textTransform: 'uppercase' }}>
          Date Night <span style={{ color: 'var(--netflix-red)' }}>Planner</span>
        </h2>
        <p style={{ color: 'var(--text-grey)', marginTop: '0.25rem' }}>
          Can't decide what to do? Choose a mood and let the Date Planner recommend the perfect episode!
        </p>
      </div>

      <div className="date-moods-row">
        {moods.map((mood) => (
          <button
            key={mood}
            className={`mood-btn ${selectedMood === mood ? 'selected' : ''}`}
            onClick={() => !isSpinning && setSelectedMood(mood)}
            disabled={isSpinning}
          >
            {mood === 'Cozy' && '🛋️ Cozy'}
            {mood === 'Fancy' && '🕯️ Fancy'}
            {mood === 'Foodie' && '🍳 Foodie'}
            {mood === 'Adventurous' && '🚗 Adventurous'}
          </button>
        ))}
      </div>

      <div className="reel-spinner-container">
        {/* Frame borders & indicators */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '20px',
          background: 'linear-gradient(to bottom, #000, transparent)',
          zIndex: 5
        }}></div>
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '20px',
          background: 'linear-gradient(to top, #000, transparent)',
          zIndex: 5
        }}></div>
        {/* Horizontal indicator lines */}
        <div style={{
          position: 'absolute',
          left: 0,
          right: 0,
          height: '2px',
          backgroundColor: 'var(--netflix-red)',
          top: '99px',
          zIndex: 5,
          opacity: 0.7,
          boxShadow: '0 0 10px var(--netflix-red)'
        }}></div>
        <div style={{
          position: 'absolute',
          left: 0,
          right: 0,
          height: '2px',
          backgroundColor: 'var(--netflix-red)',
          top: '201px',
          zIndex: 5,
          opacity: 0.7,
          boxShadow: '0 0 10px var(--netflix-red)'
        }}></div>

        <div className="reel-card-slot">
          <div 
            className="reel-strip"
            style={{
              transform: `translateY(${offsetY}px)`,
              transition: isSpinning ? 'transform 3.5s cubic-bezier(0.1, 0.8, 0.1, 1)' : 'none'
            }}
          >
            {spinItems.map((item, idx) => (
              <div key={idx} className="reel-item">
                <div style={{ fontSize: '2.5rem', marginBottom: '0.25rem' }}>
                  {selectedMood === 'Cozy' && '🛋️'}
                  {selectedMood === 'Fancy' && '✨'}
                  {selectedMood === 'Foodie' && '🍕'}
                  {selectedMood === 'Adventurous' && '🌲'}
                </div>
                <div style={{ fontWeight: 800, fontSize: '1.2rem', color: '#fff' }}>
                  {item.title.split(' ').slice(0, -1).join(' ')}
                </div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-grey)', marginTop: '0.25rem' }}>
                  Budget: {item.budget} | Prep: {item.prepTime}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <button 
        className="spin-wheel-btn" 
        onClick={handleSpin}
        disabled={isSpinning}
      >
        {isSpinning ? 'Finding Your Date...' : 'Spin Date Night Reel'}
      </button>

      {/* Result Display Box */}
      {result && !isSpinning && (
        <div style={{
          maxWidth: '550px',
          margin: '2.5rem auto 0',
          backgroundColor: '#161616',
          border: '1px solid #333',
          borderRadius: '8px',
          padding: '2rem',
          textAlign: 'left',
          animation: 'scaleUp 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
            <span style={{
              color: 'var(--accent-amber)',
              fontSize: '0.75rem',
              fontWeight: 800,
              textTransform: 'uppercase',
              letterSpacing: '0.05em'
            }}>
              Date Match Recommendation
            </span>
            <div style={{ display: 'flex', gap: '8px', fontSize: '0.8rem', color: '#a3a3a3' }}>
              <span>Budget: <strong style={{ color: '#fff' }}>{result.budget}</strong></span>
              <span>•</span>
              <span>Prep: <strong style={{ color: '#fff' }}>{result.prepTime}</strong></span>
            </div>
          </div>
          
          <h3 style={{ fontSize: '1.5rem', color: '#fff', marginBottom: '0.5rem' }}>{result.title}</h3>
          <p style={{ color: 'var(--text-grey)', fontSize: '0.95rem', lineHeight: '1.4', marginBottom: '1.5rem' }}>{result.desc}</p>
          
          <h4 style={{ fontSize: '0.9rem', textTransform: 'uppercase', color: '#fff', letterSpacing: '0.05em', borderBottom: '1px solid #333', paddingBottom: '0.4rem', marginBottom: '0.75rem' }}>
            Setup Checklist
          </h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {result.checklist.map((step, idx) => (
              <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.9rem' }}>
                <span style={{
                  width: '18px',
                  height: '18px',
                  borderRadius: '3px',
                  border: '1px solid var(--netflix-red)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--netflix-red)',
                  fontSize: '0.7rem',
                  fontWeight: 900
                }}>
                  ✓
                </span>
                <span style={{ color: '#d4d4d4' }}>{step}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
