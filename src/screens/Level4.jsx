import React, { useState, useEffect } from 'react'
import HUD from '../components/HUD.jsx'

const PLAYGROUND_ITEMS = [
  { id: 0, emoji: '🛝', label: 'Slide', x: 12, y: 35, color: '#f97316' },
  { id: 1, emoji: '🔔', label: 'Bell', x: 42, y: 28, color: '#fcd34d' },
  { id: 2, emoji: '🎠', label: 'Spinner', x: 68, y: 40, color: '#ec4899' },
  { id: 3, emoji: '🪜', label: 'Ladder', x: 28, y: 52, color: '#16a34a' },
  { id: 4, emoji: '🌈', label: 'Rainbow', x: 58, y: 25, color: '#818cf8' },
  { id: 5, emoji: '⚽', label: 'Ball', x: 78, y: 55, color: '#0ea5e9' },
]

export default function Level4({ lives, stars, paused, setPaused, loseLife, nextLevel, currentLevel, totalLevels }) {
  const [activated, setActivated] = useState(new Set())
  const [message, setMessage] = useState('')
  const [showInstruction, setShowInstruction] = useState(true)
  const [ilaPos, setIlaPos] = useState({ x: 45, y: 65 })
  const [collectedStars, setCollectedStars] = useState(new Set())
  const [celebratingItem, setCelebratingItem] = useState(null)

  const starPositions = [
    { id: 0, x: 20, y: 20 },
    { id: 1, x: 85, y: 18 },
    { id: 2, x: 50, y: 60 },
    { id: 3, x: 35, y: 70 },
  ]

  useEffect(() => {
    const t = setTimeout(() => setShowInstruction(false), 2500)
    return () => clearTimeout(t)
  }, [])

  const activateItem = (item) => {
    if (activated.has(item.id) || paused) return
    const newSet = new Set(activated)
    newSet.add(item.id)
    setActivated(newSet)
    setCelebratingItem(item.id)
    setTimeout(() => setCelebratingItem(null), 800)

    const messages = ['🎡 Wheee!', '🔔 Ding ding!', '🌟 So fun!', '🎉 Yahoo!', '🌈 Colorful!', '⚽ Goal!']
    setMessage(messages[item.id] || '🎉 Fun!')
    setTimeout(() => setMessage(''), 900)

    setIlaPos({ x: item.x, y: item.y + 15 })

    if (newSet.size >= PLAYGROUND_ITEMS.length) {
      setTimeout(() => {
        setMessage('🎉 Jungle Gym complete!')
        setTimeout(() => nextLevel(collectedStars.size + newSet.size), 1200)
      }, 500)
    }
  }

  const collectStar = (id) => {
    if (collectedStars.has(id) || paused) return
    const newSet = new Set(collectedStars)
    newSet.add(id)
    setCollectedStars(newSet)
    setMessage('⭐ Got it!')
    setTimeout(() => setMessage(''), 700)
  }

  return (
    <div style={{
      width: '100%', height: '100%', position: 'relative', overflow: 'hidden',
      background: 'linear-gradient(180deg, #fbbf24 0%, #f97316 20%, #16a34a 55%, #15803d 80%, #166534 100%)',
    }}>
      {/* Sky */}
      <div style={{ position: 'absolute', top: '3%', left: '15%', fontSize: 24, animation: 'sparkle 3s infinite' }}>☀️</div>
      <div style={{ position: 'absolute', top: '5%', right: '20%', fontSize: 18, animation: 'sparkle 2.5s infinite 0.5s' }}>🌤️</div>

      {/* Jungle gym frame */}
      <JungleGymFrame />

      {/* Level label */}
      <div style={{
        position: 'absolute', top: '10%', left: '50%', transform: 'translateX(-50%)',
        color: 'white', fontSize: 16, fontWeight: 900,
        textShadow: '0 2px 8px rgba(0,0,0,0.7)',
        background: 'rgba(0,0,0,0.4)', borderRadius: 20, padding: '6px 16px',
        zIndex: 20, whiteSpace: 'nowrap',
      }}>🎡 Jungle Gym & Slide!</div>

      {/* Progress indicator */}
      <div style={{
        position: 'absolute', top: '16%', right: 14,
        background: 'rgba(0,0,0,0.5)', borderRadius: 12,
        padding: '6px 12px', zIndex: 20, textAlign: 'center',
      }}>
        <div style={{ fontSize: 16 }}>🎠</div>
        <div style={{ color: '#fcd34d', fontSize: 13, fontWeight: 700 }}>{activated.size}/{PLAYGROUND_ITEMS.length}</div>
      </div>

      {/* Stars */}
      {starPositions.map(sp => (
        !collectedStars.has(sp.id) && (
          <div
            key={sp.id}
            className="btn-tap"
            onClick={() => collectStar(sp.id)}
            style={{
              position: 'absolute',
              left: `${sp.x}%`, top: `${sp.y}%`,
              fontSize: 26,
              animation: 'sparkle 1.8s infinite',
              filter: 'drop-shadow(0 0 8px rgba(252,211,77,0.9))',
              zIndex: 15, cursor: 'pointer',
            }}
          >⭐</div>
        )
      ))}

      {/* Playground items */}
      {PLAYGROUND_ITEMS.map(item => (
        <div
          key={item.id}
          className="btn-tap"
          onClick={() => activateItem(item)}
          style={{
            position: 'absolute',
            left: `${item.x}%`, top: `${item.y}%`,
            fontSize: activated.has(item.id) ? 20 : 36,
            opacity: activated.has(item.id) ? 0.5 : 1,
            transition: 'all 0.35s',
            cursor: activated.has(item.id) ? 'default' : 'pointer',
            zIndex: 12,
            filter: celebratingItem === item.id ? `drop-shadow(0 0 12px ${item.color})` : 'none',
            animation: celebratingItem === item.id ? 'pulse 0.3s infinite' : activated.has(item.id) ? 'none' : `bounce 2s ease-in-out infinite ${item.id * 0.2}s`,
          }}
        >
          {activated.has(item.id) ? '✅' : item.emoji}
        </div>
      ))}

      {/* Ila */}
      <div style={{
        position: 'absolute',
        left: `${ilaPos.x}%`, top: `${ilaPos.y}%`,
        fontSize: 38,
        transition: 'left 0.5s ease-out, top 0.5s ease-out',
        filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.4))',
        zIndex: 20,
        animation: 'bounce 2s ease-in-out infinite',
      }}>👧</div>

      {/* Ground */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: '22%',
        background: 'linear-gradient(180deg, #15803d, #166534)',
        borderRadius: '40% 40% 0 0 / 8% 8% 0 0',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-around', paddingTop: 8, fontSize: 16 }}>
          🌺🌿🌸🌼🌿🌺
        </div>
      </div>

      {/* Tap instruction hint */}
      {!showInstruction && activated.size === 0 && (
        <div style={{
          position: 'absolute', bottom: '25%', left: '50%', transform: 'translateX(-50%)',
          color: 'white', fontSize: 13, fontWeight: 700,
          textShadow: '0 1px 4px rgba(0,0,0,0.8)',
          animation: 'pulse 1.5s infinite',
          zIndex: 15, whiteSpace: 'nowrap',
          background: 'rgba(0,0,0,0.4)', borderRadius: 16, padding: '6px 14px',
        }}>👆 Tap the fun things!</div>
      )}

      {/* Message */}
      {message && (
        <div style={{
          position: 'absolute', top: '22%', left: '50%', transform: 'translateX(-50%)',
          background: 'rgba(0,0,0,0.75)', color: 'white',
          padding: '8px 20px', borderRadius: 20,
          fontSize: 16, fontWeight: 700, animation: 'fadeInUp 0.3s ease-out',
          zIndex: 50, whiteSpace: 'nowrap',
        }}>{message}</div>
      )}

      {showInstruction && (
        <div style={{
          position: 'absolute', inset: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: 'rgba(0,0,0,0.55)', zIndex: 60,
        }}>
          <div style={{
            background: 'linear-gradient(135deg, #f97316, #fcd34d)',
            borderRadius: 20, padding: '24px 32px',
            color: 'white', textAlign: 'center',
            boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
          }}>
            <div style={{ fontSize: 38, marginBottom: 8 }}>🎡</div>
            <div style={{ fontSize: 20, fontWeight: 900, marginBottom: 8 }}>Level 4: Jungle Gym!</div>
            <div style={{ fontSize: 15, opacity: 0.95 }}>Tap all the fun things!</div>
            <div style={{ fontSize: 15, opacity: 0.95 }}>Collect ⭐ stars too!</div>
          </div>
        </div>
      )}

      <HUD lives={lives} stars={stars} currentLevel={currentLevel} totalLevels={totalLevels} paused={paused} onPause={() => setPaused(p => !p)} />
    </div>
  )
}

function JungleGymFrame() {
  return (
    <svg style={{ position: 'absolute', top: '18%', left: 0, right: 0, width: '100%', height: '55%', zIndex: 3 }} viewBox="0 0 430 300" preserveAspectRatio="none">
      {/* Main frame */}
      <rect x="20" y="20" width="8" height="250" fill="#b45309" rx="4"/>
      <rect x="200" y="10" width="8" height="260" fill="#b45309" rx="4"/>
      <rect x="400" y="20" width="8" height="250" fill="#b45309" rx="4"/>
      {/* Horizontal bars */}
      <rect x="20" y="25" width="388" height="8" fill="#f97316" rx="4"/>
      <rect x="20" y="100" width="180" height="7" fill="#16a34a" rx="4"/>
      <rect x="208" y="120" width="200" height="7" fill="#0ea5e9" rx="4"/>
      <rect x="20" y="190" width="388" height="7" fill="#f97316" rx="4"/>
      {/* Slide */}
      <line x1="20" y1="195" x2="100" y2="280" stroke="#fcd34d" strokeWidth="14" strokeLinecap="round"/>
      {/* Monkey bars */}
      {[110, 140, 170, 200, 230].map((x, i) => (
        <rect key={i} x={x} y="26" width="6" height="74" fill="#78350f" rx="3"/>
      ))}
    </svg>
  )
}
