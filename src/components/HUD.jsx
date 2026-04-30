import React from 'react'

export default function HUD({ lives, stars, currentLevel, totalLevels, paused, onPause }) {
  return (
    <div style={{
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 100,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '10px 14px',
      background: 'rgba(0,0,0,0.35)',
      backdropFilter: 'blur(4px)',
    }}>
      {/* Lives */}
      <div style={{ display: 'flex', gap: 4 }}>
        {[1,2,3].map(i => (
          <span key={i} style={{
            fontSize: 22,
            opacity: i <= lives ? 1 : 0.25,
            animation: i <= lives ? 'heartbeat 2s infinite' : 'none',
            animationDelay: `${i * 0.3}s`,
            filter: i <= lives ? 'drop-shadow(0 0 4px rgba(255,50,50,0.8))' : 'none',
          }}>❤️</span>
        ))}
      </div>

      {/* Level indicator */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 3,
      }}>
        <div style={{
          color: '#FCD34D',
          fontSize: 11,
          fontWeight: 900,
          letterSpacing: 1,
          textShadow: '0 1px 3px rgba(0,0,0,0.8)',
          textTransform: 'uppercase',
        }}>Level</div>
        <div style={{ display: 'flex', gap: 4 }}>
          {Array.from({ length: totalLevels }, (_, i) => (
            <div key={i} style={{
              width: i + 1 === currentLevel ? 14 : 8,
              height: 8,
              borderRadius: 4,
              background: i + 1 < currentLevel
                ? '#FCD34D'
                : i + 1 === currentLevel
                  ? '#F97316'
                  : 'rgba(255,255,255,0.3)',
              transition: 'all 0.3s',
              boxShadow: i + 1 === currentLevel ? '0 0 6px rgba(249,115,22,0.9)' : 'none',
            }} />
          ))}
        </div>
        <div style={{
          color: 'white',
          fontSize: 12,
          fontWeight: 700,
          textShadow: '0 1px 3px rgba(0,0,0,0.8)',
        }}>{currentLevel}/{totalLevels}</div>
      </div>

      {/* Stars + Pause */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 4,
          background: 'rgba(252,211,77,0.2)',
          borderRadius: 20,
          padding: '4px 10px',
          border: '1.5px solid rgba(252,211,77,0.6)',
        }}>
          <span style={{ fontSize: 16, animation: 'sparkle 2s infinite' }}>⭐</span>
          <span style={{
            color: '#FCD34D',
            fontSize: 16,
            fontWeight: 900,
            textShadow: '0 1px 3px rgba(0,0,0,0.8)',
          }}>{stars}</span>
        </div>
        <button
          className="btn-tap"
          onClick={onPause}
          style={{
            background: 'rgba(255,255,255,0.2)',
            border: '1.5px solid rgba(255,255,255,0.5)',
            borderRadius: 8,
            padding: '4px 8px',
            cursor: 'pointer',
            fontSize: 16,
          }}
        >
          {paused ? '▶️' : '⏸️'}
        </button>
      </div>
    </div>
  )
}
