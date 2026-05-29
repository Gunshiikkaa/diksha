import React, { useRef } from 'react';

export default function MemoryRow({ title, items, onCardClick }) {
  const rowRef = useRef(null);

  const scroll = (direction) => {
    if (rowRef.current) {
      const { scrollLeft, clientWidth } = rowRef.current;
      const scrollAmount = clientWidth * 0.75;
      rowRef.current.scrollTo({
        left: direction === 'left' ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div style={{ position: 'relative', marginBottom: '2.5rem' }}>
      <h2 className="memory-row-title">{title}</h2>
      
      <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
        {/* Scroll Left Button */}
        <button 
          onClick={() => scroll('left')}
          style={{
            position: 'absolute',
            left: '-2rem',
            top: '50%',
            transform: 'translateY(-50%)',
            zIndex: 40,
            background: 'rgba(0,0,0,0.5)',
            border: 'none',
            color: 'white',
            width: '40px',
            height: '60px',
            borderRadius: '0 4px 4px 0',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.5rem',
            opacity: 0,
            transition: 'opacity 0.2s ease',
            backdropFilter: 'blur(4px)'
          }}
          onMouseEnter={(e) => e.currentTarget.style.opacity = 1}
          onMouseLeave={(e) => e.currentTarget.style.opacity = 0}
          className="row-arrow-btn"
        >
          ⟨
        </button>

        {/* Scroll Container */}
        <div 
          ref={rowRef} 
          className="memory-row-scroll"
          onMouseEnter={() => {
            const btns = document.querySelectorAll('.row-arrow-btn');
            btns.forEach(btn => btn.style.opacity = 0.7);
          }}
          onMouseLeave={() => {
            const btns = document.querySelectorAll('.row-arrow-btn');
            btns.forEach(btn => btn.style.opacity = 0);
          }}
        >
          {items.map((item, index) => (
            <div 
              key={item.id || index} 
              className="memory-card"
              onClick={() => onCardClick(item)}
            >
              <img 
                src={item.img} 
                className="memory-card-image" 
                alt={item.title} 
                loading="lazy"
              />
              
              <div className="memory-card-overlay">
                <div className="memory-card-title">{item.title}</div>
                <div className="memory-card-meta">
                  <span>{item.matchRate || '98% Match'}</span>
                  <span>{item.year || '2025'}</span>
                </div>
                
                {/* Progress bar if present */}
                {item.progress !== undefined && (
                  <div className="progress-bar-container">
                    <div 
                      className="progress-bar-fill" 
                      style={{ width: `${item.progress}%` }}
                    />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Scroll Right Button */}
        <button 
          onClick={() => scroll('right')}
          style={{
            position: 'absolute',
            right: '-2rem',
            top: '50%',
            transform: 'translateY(-50%)',
            zIndex: 40,
            background: 'rgba(0,0,0,0.5)',
            border: 'none',
            color: 'white',
            width: '40px',
            height: '60px',
            borderRadius: '4px 0 0 4px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.5rem',
            opacity: 0,
            transition: 'opacity 0.2s ease',
            backdropFilter: 'blur(4px)'
          }}
          onMouseEnter={(e) => e.currentTarget.style.opacity = 1}
          onMouseLeave={(e) => e.currentTarget.style.opacity = 0}
          className="row-arrow-btn"
        >
          ⟩
        </button>
      </div>
    </div>
  );
}
