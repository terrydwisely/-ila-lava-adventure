import React, { useEffect, useState } from 'react'

const CONFETTI_COLORS = ['#f97316','#fcd34d','#16a34a','#0ea5e9','#ec4899','#a855f7','#ef4444','#84cc16']
const CONFETTI_COUNT = 40

function generateConfetti() {
  return Array.from({ length: CONFETTI_COUNT }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    delay: Math.random() * 3,
    duration: 2.5 + Math.random() * 2,
    size: 8 + Math.random() * 12,
    color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
    shape: Math.random() > 0.5 ? 'circle' : 'square',
  }))
}

export default function WinScreen({ stars, onReplay }) {
  const [show, setShow] = useState(false)
  const [confetti] = useState(generateConfetti)

  useEffect(() => {
    const t = setTimeout(() => setShow(true), 100)
    return () => clearTimeout(t)
  }, [])

  return (
    <div style={{
      width: '100%', height: '100%', position: 'relative', overflow: 'hidden',
      background: 'linear-gradient(135deg, #1e3a5f 0%, #0f766e 40%, #16a34a 70%, #15803d 100%)',
    }}>
      {/* Confetti */}
      {confetti.map(c => (
        <div key={c.id} style={{
          position: 'absolute',
          left: `${c.x}%`,
          top: -20,
          width: c.size,
          height: c.size,
          borderRadius: c.shape === 'circle' ? '50%' : '3px',
          background: c.color,
          animation: `confettiFall ${c.duration}s ease-in ${c.delay}s infinite`,
          opacity: 0.9,
          zIndex: 5,
        }} />
      ))}

      {/* Background tropical */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '35%', background: 'linear-gradient(180deg,#fbbf24,#f59e0b)', zIndex: 1 }} />
      <div style={{ position: 'absolute', bottom: '33%', left: 0, fontSize: 52, animation: 'treeSway 4s infinite', zIndex: 2 }}>🌴</div>
      <div style={{ position: 'absolute', bottom: '33%', right: 0, fontSize: 48, animation: 'treeSway 5s infinite 1s', zIndex: 2 }}>🌴</div>
      <div style={{ position: 'absolute', bottom: '32%', left: '20%', fontSize: 26, zIndex: 2 }}>🌺</div>
      <div style={{ position: 'absolute', bottom: '32%', right: '20%', fontSize: 22, zIndex: 2 }}>🌸</div>

      {/* Ila celebrating */}
      <div style={{
        position: 'absolute', bottom: '31%', left: '50%', transform: 'translateX(-50%)',
        fontSize: 60,
        animation: 'bounce 0.8s ease-in-out infinite',
        filter: 'drop-shadow(0 6px 12px rgba(0,0,0,0.4))',
        zIndex: 10,
      }}>👧</div>

      {/* Main win content */}
      <div style={{
        position: 'absolute', top: '8%', left: '50%', transform: 'translateX(-50%)',
        width: '88%',
        textAlign: 'center',
        animation: show ? 'titlePop 0.8s ease-out forwards' : 'none',
        opacity: 0,
        zIndex: 20,
      }}>
        {/* Trophy */}
        <div style={{ fontSize: 64, animation: 'glow 2s ease-in-out infinite', marginBottom: 8 }}>🏆</div>

        {/* You did it text */}
        <div style={{
          fontSize: 32,
          fontWeight: 900,
          background: 'linear-gradient(180deg, #FEF08A, #FCD34D, #F97316)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          filter: 'drop-shadow(0 3px 8px rgba(249,115,22,0.7))',
          lineHeight: 1.1,
          marginBottom: 4,
        }}>
          You did it Ila! 🎉
        </div>
        <div style={{ color: 'rgba(255,255,255,0.9)', fontSize: 16, marginBottom: 20, fontWeight: 600 }}>
          What an amazing adventure!
        </div>

        {/* Stars collected */}
        <div style={{
          background: 'rgba(0,0,0,0.4)',
          borderRadius: 20,
          padding: '16px 24px',
          marginBottom: 20,
          border: '2px solid rgba(252,211,77,0.5)',
          backdropFilter: 'blur(4px)',
        }}>
          <div style={{ color: 'rgba(255,255,255,0.8)', fontSize: 13, marginBottom: 6, fontWeight: 600, letterSpacing: 1 }}>
            TOTAL STARS COLLECTED
          </div>
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
          }}>
            <span style={{ fontSize: 36, animation: 'sparkle 1.5s infinite' }}>⭐</span>
            <span style={{
              fontSize: 48, fontWeight: 900, color: '#FCD34D',
              textShadow: '0 0 20px rgba(252,211,77,0.8)',
            }}>{stars}</span>
            <span style={{ fontSize: 36, animation: 'sparkle 1.5s infinite 0.5s' }}>⭐</span>
          </div>
        </div>

        {/* Level badges */}
        <div style={{
          display: 'flex', justifyContent: 'center', gap: 10, marginBottom: 24,
          flexWrap: 'wrap',
        }}>
          {['🏡','🪜','🌿','🎡','🏖️'].map((emoji, i) => (
            <div key={i} style={{
              background: 'linear-gradient(135deg, #f97316, #dc2626)',
              borderRadius: 12, padding: '6px 10px',
              color: 'white', fontSize: 22,
              boxShadow: '0 3px 8px rgba(0,0,0,0.4)',
              animation: `bounce 1.5s ease-in-out infinite ${i * 0.2}s`,
            }}>{emoji}</div>
          ))}
        </div>
      </div>

      {/* Play Again button */}
      <div style={{
        position: 'absolute', bottom: '6%', left: '50%', transform: 'translateX(-50%)',
        animation: show ? 'fadeInUp 0.6s ease-out 0.8s forwards' : 'none',
        opacity: 0,
        zIndex: 20,
        textAlign: 'center',
      }}>
        <button
          className="btn-tap"
          onClick={onReplay}
          style={{
            background: 'linear-gradient(135deg, #16a34a, #15803d)',
            color: 'white',
            fontSize: 22,
            fontWeight: 900,
            padding: '18px 48px',
            borderRadius: 50,
            border: 'none',
            cursor: 'pointer',
            boxShadow: '0 6px 20px rgba(22,163,74,0.6), 0 0 0 3px rgba(255,255,255,0.3)',
            letterSpacing: 1,
            textTransform: 'uppercase',
            textShadow: '0 2px 4px rgba(0,0,0,0.3)',
            animation: 'pulse 2s ease-in-out infinite',
          }}
        >
          🌋 Play Again!
        </button>
        <div style={{
          color: 'rgba(255,255,255,0.7)', fontSize: 13, marginTop: 10,
          fontWeight: 600, textShadow: '0 1px 4px rgba(0,0,0,0.6)',
        }}>
          Can you beat your score? 🌟
        </div>
      </div>

      {/* Floating emojis */}
      {['🌺','🌸','🌼','🎊','✨','🎈','🎉','🌟'].map((e, i) => (
        <div key={i} style={{
          position: 'absolute',
          left: `${10 + i * 11}%`,
          top: `${75 + (i % 3) * 6}%`,
          fontSize: 20 + (i % 3) * 4,
          animation: `float ${3 + i * 0.4}s ease-in-out infinite ${i * 0.3}s`,
          zIndex: 3,
        }}>{e}</div>
      ))}
    </div>
  )
}
