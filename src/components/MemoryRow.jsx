import React, { useRef } from 'react';

export default function MemoryRow({ title, subtitle, items, onCardClick, variant }) {
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
    <div style={{ position: 'relative', marginBottom: '0.75rem' }}>
      {variant === 'memories' ? (
        <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '0.75rem' }}>
          <h2 className="memory-row-title" style={{ marginBottom: '0.15rem' }}>
            {title}
          </h2>
          {subtitle && (
            <span style={{ fontSize: '0.82rem', color: '#808080', marginTop: '0.1rem', textAlign: 'left' }}>
              {subtitle}
            </span>
          )}
        </div>
      ) : (
        <h2 className="memory-row-title">{title}</h2>
      )}
      
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
          className={variant === 'top4' ? "top4-row-scroll" : "memory-row-scroll"}
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
            variant === 'top4' ? (
              <div key={item.id || index} className="top4-card-wrapper">
                <div className="top4-rank-number">{index + 1}</div>
                <div 
                  className="top4-card"
                  onClick={() => onCardClick(item)}
                >
                  <div className="top4-card-image-container">
                    <img src={item.img} className="top4-card-image" alt={item.title} style={{ '--object-position': item.objectPosition || 'center' }} />
                    <div className="top4-card-gradient"></div>
                    <div className="top4-card-title">{item.title}</div>
                  </div>
                  <div className="top4-card-bottom-bar">
                    RECENTLY ADDED
                  </div>
                </div>
              </div>
            ) : variant === 'memories' ? (
              <div 
                key={item.id || index} 
                className="memories-card"
                onClick={() => onCardClick(item)}
              >
                <div className="memories-card-image-wrapper">
                  <img 
                    src={item.img} 
                    className="memories-card-image" 
                    alt={item.title} 
                    loading="lazy"
                    style={{ '--object-position': item.objectPosition || 'center' }}
                  />
                </div>
                
                <div className="memories-card-text">
                  <div className="memories-card-meta">
                    <span style={{ color: '#4ade80', fontWeight: '700' }}>{item.matchRate || '98% Match'}</span>
                    <span>•</span>
                    <span className="memories-card-badge">US</span>
                    <span>•</span>
                    <span>{item.year || '2024'}</span>
                    <span>•</span>
                    <span>HD</span>
                  </div>
                  
                  <h3 className="memories-card-title">{item.title}</h3>
                  <p className="memories-card-desc">{item.desc}</p>
                  
                  <div className="memories-card-tags">
                    {item.tags || 'Romantic • Heartfelt • Original'}
                  </div>
                </div>
              </div>
            ) : (
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
                  style={{ '--object-position': item.objectPosition || 'center' }}
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
            )
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
