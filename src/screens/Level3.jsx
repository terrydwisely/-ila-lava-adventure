import React, { useState, useEffect } from 'react'
import HUD from '../components/HUD.jsx'

const OBSTACLES = [
  { id: 0, x: 20, y: 40, emoji: '🪨', label: 'Rock' },
  { id: 1, x: 55, y: 35, emoji: '🌵', label: 'Cactus' },
  { id: 2, x: 30, y: 55, emoji: '🌊', label: 'Water' },
  { id: 3, x: 65, y: 55, emoji: '🍄', label: 'Mushroom' },
  { id: 4, x: 45, y: 30, emoji: '🕸️', label: 'Web' },
]

export default function Level3({ lives, stars, paused, setPaused, loseLife, nextLevel, currentLevel, totalLevels }) {
  const [clearedObstacles, setClearedObstacles] = useState(new Set())
  const [ilaX, setIlaX] = useState(10)
  const [ilaY, setIlaY] = useState(70)
  const [message, setMessage] = useState('')
  const [swinging, setSwinging] = useState(false)
  const [showInstruction, setShowInstruction] = useState(true)
  const [collectedStars, setCollectedStars] = useState(new Set())

  const starPositions = [
    { id: 0, x: 80, y: 25 },
    { id: 1, x: 15, y: 45 },
    { id: 2, x: 70, y: 65 },
  ]

  useEffect(() => {
    const t = setTimeout(() => setShowInstruction(false), 2500)
    return () => clearTimeout(t)
  }, [])

  const clearObstacle = (id) => {
    if (clearedObstacles.has(id) || paused) return
    const newSet = new Set(clearedObstacles)
    newSet.add(id)
    setClearedObstacles(newSet)
    setMessage(`💥 Obstacle cleared!`)
    setTimeout(() => setMessage(''), 900)

    if (newSet.size >= OBSTACLES.length) {
      setTimeout(() => {
        setMessage('🎉 All obstacles cleared!')
        setTimeout(() => nextLevel(collectedStars.size + newSet.size), 1200)
      }, 400)
    }
  }

  const collectStar = (id) => {
    if (collectedStars.has(id) || paused) return
    const newSet = new Set(collectedStars)
    newSet.add(id)
    setCollectedStars(newSet)
    setMessage('⭐ Got a star!')
    setTimeout(() => setMessage(''), 800)
  }

  const swing = () => {
    if (paused) return
    setSwinging(true)
    setIlaX(x => Math.min(x + 20, 75))
    setIlaY(y => Math.max(y - 10, 30))
    setTimeout(() => {
      setSwinging(false)
      setIlaY(y => Math.min(y + 5, 70))
    }, 500)
    setMessage('🎪 Swing!')
    setTimeout(() => setMessage(''), 600)
  }

  const jump = () => {
    if (paused) return
    setIlaY(y => {
      const newY = Math.max(y - 15, 20)
      setTimeout(() => setIlaY(prev => Math.min(prev + 15, 75)), 400)
      return newY
    })
    setMessage('🦘 Jump!')
    setTimeout(() => setMessage(''), 600)
  }

  return (
    <div style={{
      width: '100%', height: '100%', position: 'relative', overflow: 'hidden',
      background: 'linear-gradient(180deg, #1a3a1a 0%, #16a34a 35%, #15803d 65%, #dc2626 85%, #7f1d1d 100%)',
    }}>
      {/* Jungle canopy */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '25%', background: 'linear-gradient(180deg, rgba(22,163,74,0.9), transparent)' }} />

      {/* Hanging vines */}
      {[8, 25, 45, 65, 82].map((x, i) => (
        <div key={i} style={{
          position: 'absolute',
          left: `${x}%`, top: 0,
          width: 4, height: `${30 + i * 5}%`,
          background: 'linear-gradient(180deg, #15803d, #16a34a)',
          borderRadius: 2,
          animation: `swing ${2 + i * 0.3}s ease-in-out infinite`,
          transformOrigin: 'top center',
          zIndex: 5,
        }} />
      ))}

      {/* Rope swing */}
      <div style={{
        position: 'absolute', top: '5%', left: '40%',
        width: 3, height: '28%',
        background: '#92400e',
        transformOrigin: 'top center',
        animation: swinging ? 'swing 0.5s ease-in-out' : 'swing 3s ease-in-out infinite',
        zIndex: 6,
      }}>
        <div style={{
          position: 'absolute', bottom: -12, left: -15,
          width: 32, height: 12,
          background: '#78350f', borderRadius: 4,
        }} />
      </div>

      {/* Platform */}
      <div style={{
        position: 'absolute', bottom: '17%', left: 0, right: 0,
        height: 14,
        background: 'linear-gradient(180deg,#92400e,#78350f)',
        borderRadius: 8,
        zIndex: 4,
        boxShadow: '0 4px 12px rgba(0,0,0,0.4)',
      }} />

      {/* Mid platform */}
      <div style={{
        position: 'absolute', bottom: '40%', left: '15%', width: '30%',
        height: 10, background: '#b45309', borderRadius: 6, zIndex: 4,
        boxShadow: '0 4px 8px rgba(0,0,0,0.3)',
      }} />
      <div style={{
        position: 'absolute', bottom: '50%', right: '15%', width: '28%',
        height: 10, background: '#b45309', borderRadius: 6, zIndex: 4,
        boxShadow: '0 4px 8px rgba(0,0,0,0.3)',
      }} />

      {/* Level label */}
      <div style={{
        position: 'absolute', top: '10%', left: '50%', transform: 'translateX(-50%)',
        color: 'white', fontSize: 16, fontWeight: 900,
        textShadow: '0 2px 8px rgba(0,0,0,0.8)',
        background: 'rgba(0,0,0,0.4)', borderRadius: 20, padding: '6px 16px',
        zIndex: 20, whiteSpace: 'nowrap',
      }}>🌿 Jungle Obstacle Course!</div>

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

      {/* Obstacles */}
      {OBSTACLES.map(obs => (
        <div
          key={obs.id}
          className="btn-tap"
          onClick={() => clearObstacle(obs.id)}
          style={{
            position: 'absolute',
            left: `${obs.x}%`, top: `${obs.y}%`,
            fontSize: clearedObstacles.has(obs.id) ? 16 : 32,
            opacity: clearedObstacles.has(obs.id) ? 0.3 : 1,
            transition: 'all 0.3s',
            cursor: clearedObstacles.has(obs.id) ? 'default' : 'pointer',
            zIndex: 12,
            filter: clearedObstacles.has(obs.id) ? 'grayscale(1)' : 'none',
          }}
          title={obs.label}
        >
          {clearedObstacles.has(obs.id) ? '💨' : obs.emoji}
        </div>
      ))}

      {/* Obstacle counter */}
      <div style={{
        position: 'absolute', top: '16%', right: 14,
        background: 'rgba(0,0,0,0.5)', borderRadius: 12,
        padding: '6px 12px', color: 'white', fontSize: 13, fontWeight: 700,
        zIndex: 20, textAlign: 'center',
      }}>
        <div>💥</div>
        <div>{clearedObstacles.size}/{OBSTACLES.length}</div>
      </div>

      {/* Ila character */}
      <div style={{
        position: 'absolute',
        left: `${ilaX}%`,
        top: `${ilaY}%`,
        fontSize: 38,
        transition: swinging ? 'left 0.4s ease-out, top 0.4s ease-out' : 'left 0.3s, top 0.3s',
        filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.4))',
        zIndex: 20,
        animation: swinging ? 'none' : 'bounce 2s ease-in-out infinite',
      }}>👧</div>

      {/* Lava bottom */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: '17%',
        background: 'linear-gradient(180deg, #f97316, #dc2626, #7f1d1d)',
        boxShadow: '0 -8px 20px rgba(239,68,68,0.7)',
      }}>
        <div style={{ textAlign: 'center', paddingTop: 8, fontSize: 11, color: 'rgba(255,255,255,0.8)', fontWeight: 700 }}>
          🔥 DANGER LAVA ZONE 🔥
        </div>
      </div>

      {/* Controls */}
      <div style={{
        position: 'absolute', bottom: '19%', left: '50%', transform: 'translateX(-50%)',
        display: 'flex', gap: 14, zIndex: 30,
      }}>
        <CtrlBtn emoji="🎪" label="Swing" onClick={swing} color="#16a34a" />
        <CtrlBtn emoji="🦘" label="Jump" onClick={jump} color="#0ea5e9" />
        <CtrlBtn emoji="💥" label="Clear!" onClick={() => {
          // Try to clear nearest obstacle
          const unclearedIds = OBSTACLES.filter(o => !clearedObstacles.has(o.id)).map(o => o.id)
          if (unclearedIds.length > 0) clearObstacle(unclearedIds[0])
        }} color="#f97316" />
      </div>

      {/* Message */}
      {message && (
        <div style={{
          position: 'absolute', top: '22%', left: '50%', transform: 'translateX(-50%)',
          background: 'rgba(0,0,0,0.75)', color: 'white',
          padding: '8px 20px', borderRadius: 20,
          fontSize: 15, fontWeight: 700, animation: 'fadeInUp 0.3s ease-out',
          zIndex: 50, whiteSpace: 'nowrap',
        }}>{message}</div>
      )}

      {/* Instructions */}
      {showInstruction && (
        <div style={{
          position: 'absolute', inset: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: 'rgba(0,0,0,0.55)', zIndex: 60,
        }}>
          <div style={{
            background: 'linear-gradient(135deg, #16a34a, #0f766e)',
            borderRadius: 20, padding: '24px 32px',
            color: 'white', textAlign: 'center',
            boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
          }}>
            <div style={{ fontSize: 38, marginBottom: 8 }}>🌿</div>
            <div style={{ fontSize: 20, fontWeight: 900, marginBottom: 8 }}>Level 3: Obstacle Course!</div>
            <div style={{ fontSize: 15, opacity: 0.9 }}>Tap obstacles to clear them! 💥</div>
            <div style={{ fontSize: 15, opacity: 0.9 }}>Swing & jump to move!</div>
          </div>
        </div>
      )}

      <HUD lives={lives} stars={stars} currentLevel={currentLevel} totalLevels={totalLevels} paused={paused} onPause={() => setPaused(p => !p)} />
    </div>
  )
}

function CtrlBtn({ emoji, label, onClick, color }) {
  return (
    <button
      className="btn-tap"
      onClick={onClick}
      style={{
        background: `linear-gradient(135deg, ${color}, ${color}cc)`,
        border: 'none', borderRadius: 16,
        padding: '10px 18px',
        cursor: 'pointer',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3,
        boxShadow: `0 4px 12px ${color}88`,
        minWidth: 64,
      }}
    >
      <span style={{ fontSize: 26 }}>{emoji}</span>
      <span style={{ color: 'white', fontSize: 10, fontWeight: 700 }}>{label}</span>
    </button>
  )
}
