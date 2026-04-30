import React, { useEffect, useState } from 'react'

export default function StartScreen({ onStart }) {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setReady(true), 100)
    return () => clearTimeout(t)
  }, [])

  return (
    <div
      onClick={onStart}
      style={{
        width: '100%',
        height: '100%',
        position: 'relative',
        overflow: 'hidden',
        cursor: 'pointer',
        background: 'linear-gradient(180deg, #1a6b9a 0%, #2d8fc9 20%, #f97316 55%, #dc2626 75%, #7f1d1d 100%)',
      }}
    >
      {/* Sky clouds */}
      <div style={{ position: 'absolute', top: '5%', left: '8%', animation: 'cloudDrift 6s ease-in-out infinite alternate' }}>
        <div style={{ background: 'rgba(255,255,255,0.8)', borderRadius: 30, width: 80, height: 30, position: 'relative' }}>
          <div style={{ position: 'absolute', top: -12, left: 15, background: 'rgba(255,255,255,0.8)', borderRadius: '50%', width: 35, height: 35 }} />
          <div style={{ position: 'absolute', top: -8, left: 35, background: 'rgba(255,255,255,0.8)', borderRadius: '50%', width: 28, height: 28 }} />
        </div>
      </div>
      <div style={{ position: 'absolute', top: '8%', right: '10%', animation: 'cloudDrift 8s ease-in-out infinite alternate-reverse' }}>
        <div style={{ background: 'rgba(255,255,255,0.7)', borderRadius: 30, width: 60, height: 22 }}>
          <div style={{ position: 'absolute', top: -10, left: 10, background: 'rgba(255,255,255,0.7)', borderRadius: '50%', width: 26, height: 26 }} />
        </div>
      </div>

      {/* Sun */}
      <div style={{
        position: 'absolute', top: '6%', right: '18%',
        width: 60, height: 60, borderRadius: '50%',
        background: 'radial-gradient(circle, #FEF08A, #FCD34D, #F59E0B)',
        boxShadow: '0 0 30px 10px rgba(252,211,77,0.6)',
        animation: 'pulse 3s ease-in-out infinite',
      }} />

      {/* Volcano */}
      <VolcanoSVG />

      {/* Jungle trees */}
      <div style={{ position: 'absolute', bottom: '28%', left: 0, fontSize: 50, animation: 'treeSway 4s ease-in-out infinite' }}>🌴</div>
      <div style={{ position: 'absolute', bottom: '25%', left: '12%', fontSize: 40, animation: 'treeSway 5s ease-in-out infinite 0.5s' }}>🌿</div>
      <div style={{ position: 'absolute', bottom: '27%', right: 0, fontSize: 50, animation: 'treeSway 4.5s ease-in-out infinite 1s' }}>🌴</div>
      <div style={{ position: 'absolute', bottom: '24%', right: '10%', fontSize: 38, animation: 'treeSway 3.5s ease-in-out infinite 0.3s' }}>🌿</div>

      {/* Flowers */}
      <div style={{ position: 'absolute', bottom: '24%', left: '25%', fontSize: 20 }}>🌺</div>
      <div style={{ position: 'absolute', bottom: '23%', right: '22%', fontSize: 18 }}>🌸</div>
      <div style={{ position: 'absolute', bottom: '22%', left: '40%', fontSize: 16 }}>🌼</div>

      {/* Treehouse */}
      <Treehouse />

      {/* Ila character */}
      <div style={{
        position: 'absolute',
        bottom: '26%',
        left: '50%',
        transform: 'translateX(-50%)',
        fontSize: 52,
        animation: 'bounce 2s ease-in-out infinite',
        filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.4))',
        zIndex: 10,
      }}>
        👧
      </div>

      {/* Ground */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '26%',
        background: 'linear-gradient(180deg, #16A34A 0%, #15803D 40%, #166534 100%)',
        borderRadius: '60% 60% 0 0 / 20% 20% 0 0',
      }} />

      {/* Lava river */}
      <div style={{
        position: 'absolute',
        bottom: '22%',
        left: '-10%',
        right: '-10%',
        height: 18,
        background: 'linear-gradient(90deg, #dc2626, #f97316, #dc2626, #f97316)',
        backgroundSize: '200% 100%',
        animation: 'lavaFlow 2s ease-in-out infinite alternate',
        borderRadius: 10,
        boxShadow: '0 0 15px rgba(239,68,68,0.8)',
        opacity: 0.9,
      }} />

      {/* LAVA Title */}
      <div style={{
        position: 'absolute',
        top: '12%',
        left: '50%',
        transform: 'translateX(-50%)',
        textAlign: 'center',
        animation: ready ? 'titlePop 0.8s ease-out forwards' : 'none',
        opacity: 0,
        zIndex: 20,
      }}>
        <div style={{
          fontSize: 80,
          fontWeight: 900,
          letterSpacing: 6,
          background: 'linear-gradient(180deg, #FEF08A 0%, #F97316 40%, #DC2626 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          textShadow: 'none',
          filter: 'drop-shadow(0 4px 12px rgba(239,68,68,0.8)) drop-shadow(0 0 20px rgba(249,115,22,0.6))',
          lineHeight: 1,
        }}>
          LAVA
        </div>
        <div style={{
          color: '#FEF08A',
          fontSize: 14,
          fontWeight: 700,
          letterSpacing: 3,
          textShadow: '0 2px 8px rgba(0,0,0,0.8)',
          marginTop: 4,
          textTransform: 'uppercase',
        }}>
          🌋 Ila's Adventure 🌋
        </div>
      </div>

      {/* Tap to Start button */}
      <div style={{
        position: 'absolute',
        bottom: '10%',
        left: '50%',
        transform: 'translateX(-50%)',
        animation: ready ? 'fadeInUp 0.6s ease-out 0.5s forwards' : 'none',
        opacity: 0,
        zIndex: 20,
        textAlign: 'center',
      }}>
        <div style={{
          background: 'linear-gradient(135deg, #F97316, #DC2626)',
          color: 'white',
          fontSize: 22,
          fontWeight: 900,
          padding: '16px 40px',
          borderRadius: 50,
          boxShadow: '0 6px 20px rgba(220,38,38,0.6), 0 0 0 3px rgba(255,255,255,0.3)',
          letterSpacing: 2,
          animation: 'pulse 1.5s ease-in-out infinite',
          textTransform: 'uppercase',
          textShadow: '0 2px 4px rgba(0,0,0,0.4)',
        }}>
          ▶ TAP TO START
        </div>
        <div style={{
          color: 'rgba(255,255,255,0.8)',
          fontSize: 13,
          marginTop: 10,
          fontWeight: 600,
          textShadow: '0 1px 4px rgba(0,0,0,0.6)',
        }}>
          Help Ila on her adventure! 🌟
        </div>
      </div>

      {/* Floating stars decoration */}
      {[
        { top: '18%', left: '8%', delay: 0 },
        { top: '22%', right: '8%', delay: 0.5 },
        { top: '32%', left: '6%', delay: 1 },
        { top: '30%', right: '6%', delay: 1.5 },
      ].map((pos, i) => (
        <div key={i} style={{
          position: 'absolute',
          ...pos,
          fontSize: 20,
          animation: `sparkle 2s ease-in-out infinite ${pos.delay}s`,
          filter: 'drop-shadow(0 0 6px rgba(252,211,77,0.9))',
        }}>⭐</div>
      ))}
    </div>
  )
}

function VolcanoSVG() {
  return (
    <svg
      style={{ position: 'absolute', top: '10%', left: '50%', transform: 'translateX(-50%)', zIndex: 1 }}
      width="200" height="220" viewBox="0 0 200 220"
    >
      {/* Volcano body */}
      <polygon points="100,10 30,180 170,180" fill="#7f1d1d" />
      <polygon points="100,10 50,180 150,180" fill="#991b1b" />
      {/* Snow/crater top */}
      <ellipse cx="100" cy="20" rx="22" ry="12" fill="#dc2626" />
      <ellipse cx="100" cy="16" rx="15" ry="8" fill="#fca5a5" />
      {/* Lava drips */}
      <path d="M88,18 Q82,50 80,80" stroke="#f97316" strokeWidth="4" fill="none" strokeLinecap="round" opacity="0.8"/>
      <path d="M112,18 Q118,50 116,75" stroke="#dc2626" strokeWidth="3" fill="none" strokeLinecap="round" opacity="0.8"/>
      {/* Lava flow at base */}
      <ellipse cx="100" cy="180" rx="75" ry="12" fill="#dc2626" opacity="0.6"/>
    </svg>
  )
}

function Treehouse() {
  return (
    <div style={{ position: 'absolute', bottom: '24%', left: '12%', zIndex: 5 }}>
      {/* Tree trunk */}
      <div style={{
        width: 24, height: 60,
        background: 'linear-gradient(90deg, #92400e, #78350f, #92400e)',
        margin: '0 auto',
        borderRadius: '4px 4px 0 0',
        position: 'relative',
        zIndex: 3,
      }} />
      {/* Tree foliage */}
      <div style={{
        width: 70, height: 55,
        background: 'radial-gradient(ellipse, #16a34a, #15803d)',
        borderRadius: '50% 50% 40% 40%',
        margin: '-20px auto 0',
        position: 'relative',
        zIndex: 4,
        boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
      }}>
        {/* Treehouse platform */}
        <div style={{
          position: 'absolute',
          bottom: 8,
          left: '50%',
          transform: 'translateX(-50%)',
          width: 50,
          height: 28,
          background: 'linear-gradient(180deg, #b45309, #92400e)',
          borderRadius: '4px 4px 0 0',
          zIndex: 5,
        }}>
          {/* Roof */}
          <div style={{
            position: 'absolute',
            top: -12,
            left: -4,
            width: 0, height: 0,
            borderLeft: '29px solid transparent',
            borderRight: '29px solid transparent',
            borderBottom: '14px solid #dc2626',
          }} />
          {/* Door */}
          <div style={{
            position: 'absolute',
            bottom: 0, left: '50%',
            transform: 'translateX(-50%)',
            width: 10, height: 14,
            background: '#78350f',
            borderRadius: '4px 4px 0 0',
          }} />
        </div>
      </div>
    </div>
  )
}
