import React, { useState, useEffect } from 'react'
import HUD from '../components/HUD.jsx'

const STARS_TO_COLLECT = 5

export default function Level1({ lives, stars, paused, setPaused, loseLife, nextLevel, currentLevel, totalLevels }) {
  const [ilaPos, setIlaPos] = useState(0) // 0=ground, 1=mid ladder, 2=treehouse
  const [collectedStars, setCollectedStars] = useState(new Set())
  const [showInstruction, setShowInstruction] = useState(true)
  const [message, setMessage] = useState('')

  const starPositions = [
    { x: '70%', y: '72%' },
    { x: '20%', y: '60%' },
    { x: '80%', y: '50%' },
    { x: '30%', y: '40%' },
    { x: '60%', y: '30%' },
  ]

  useEffect(() => {
    const t = setTimeout(() => setShowInstruction(false), 3000)
    return () => clearTimeout(t)
  }, [])

  const handleStarCollect = (i) => {
    if (collectedStars.has(i)) return
    const newSet = new Set(collectedStars)
    newSet.add(i)
    setCollectedStars(newSet)
    setMessage('⭐ Star collected!')
    setTimeout(() => setMessage(''), 1000)
    if (newSet.size >= STARS_TO_COLLECT) {
      setTimeout(() => {
        setMessage('🎉 Amazing! Level complete!')
        setTimeout(() => nextLevel(newSet.size), 1200)
      }, 500)
    }
  }

  const climbUp = () => {
    if (paused) return
    setIlaPos(p => Math.min(p + 1, 2))
    setMessage('Climbing up! 🐒')
    setTimeout(() => setMessage(''), 800)
  }

  const climbDown = () => {
    if (paused) return
    setIlaPos(p => Math.max(p - 1, 0))
    setMessage('Sliding down! 🎢')
    setTimeout(() => setMessage(''), 800)
  }

  const ilaBottom = ilaPos === 0 ? '22%' : ilaPos === 1 ? '38%' : '56%'

  return (
    <div style={{
      width: '100%', height: '100%', position: 'relative', overflow: 'hidden',
      background: 'linear-gradient(180deg, #0ea5e9 0%, #38bdf8 25%, #86efac 60%, #16a34a 80%, #15803d 100%)',
    }}>
      {/* Background jungle */}
      <div style={{ position: 'absolute', top: '15%', left: '5%', fontSize: 55, animation: 'treeSway 5s ease-in-out infinite', opacity: 0.8 }}>🌴</div>
      <div style={{ position: 'absolute', top: '20%', right: '5%', fontSize: 48, animation: 'treeSway 4s ease-in-out infinite 1s', opacity: 0.8 }}>🌴</div>
      <div style={{ position: 'absolute', top: '35%', left: '2%', fontSize: 36, animation: 'treeSway 6s ease-in-out infinite 0.5s' }}>🌿</div>
      <div style={{ position: 'absolute', top: '30%', right: '2%', fontSize: 36, animation: 'treeSway 4.5s ease-in-out infinite 1.5s' }}>🌿</div>

      {/* Clouds */}
      <Cloud x="10%" y="5%" size={70} delay={0} />
      <Cloud x="55%" y="8%" size={55} delay={3} />

      {/* Level title */}
      <div style={{
        position: 'absolute', top: '10%', left: '50%', transform: 'translateX(-50%)',
        color: 'white', fontSize: 18, fontWeight: 900,
        textShadow: '0 2px 8px rgba(0,0,0,0.6)',
        background: 'rgba(0,0,0,0.3)', borderRadius: 20, padding: '6px 18px',
        zIndex: 10,
      }}>
        🏡 The Treehouse
      </div>

      {/* Treehouse structure */}
      <TreehouseFull />

      {/* Ladder rungs */}
      <LadderGraphic />

      {/* Lava at bottom */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: '20%',
        background: 'linear-gradient(180deg, #f97316 0%, #dc2626 50%, #7f1d1d 100%)',
        animation: 'lavalamp 4s ease-in-out infinite',
        boxShadow: '0 -8px 20px rgba(239,68,68,0.6)',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-around', paddingTop: 8 }}>
          {[0,1,2,3,4].map(i => (
            <LavaBubble key={i} delay={i * 0.4} />
          ))}
        </div>
        <div style={{ textAlign: 'center', marginTop: 4, fontSize: 11, color: 'rgba(255,255,255,0.8)', fontWeight: 700 }}>
          🔥 HOT LAVA! 🔥
        </div>
      </div>

      {/* Collectible stars */}
      {starPositions.map((pos, i) => (
        !collectedStars.has(i) && (
          <div
            key={i}
            className="btn-tap"
            onClick={() => handleStarCollect(i)}
            style={{
              position: 'absolute',
              left: pos.x,
              top: pos.y,
              fontSize: 28,
              animation: 'sparkle 1.5s ease-in-out infinite',
              animationDelay: `${i * 0.3}s`,
              cursor: 'pointer',
              filter: 'drop-shadow(0 0 8px rgba(252,211,77,0.9))',
              zIndex: 15,
            }}
          >⭐</div>
        )
      ))}

      {/* Ila character */}
      <div style={{
        position: 'absolute',
        left: '44%',
        bottom: ilaBottom,
        fontSize: 44,
        transition: 'bottom 0.4s ease-out',
        filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.4))',
        zIndex: 20,
        animation: 'bounce 1.5s ease-in-out infinite',
      }}>👧</div>

      {/* Controls */}
      <div style={{
        position: 'absolute',
        bottom: '22%',
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        gap: 16,
        zIndex: 30,
      }}>
        <ControlBtn label="⬆️" sublabel="Climb Up" onClick={climbUp} />
        <ControlBtn label="⬇️" sublabel="Climb Down" onClick={climbDown} />
      </div>

      {/* Message toast */}
      {message && (
        <div style={{
          position: 'absolute', top: '20%', left: '50%', transform: 'translateX(-50%)',
          background: 'rgba(0,0,0,0.75)', color: 'white',
          padding: '8px 20px', borderRadius: 20,
          fontSize: 16, fontWeight: 700,
          animation: 'fadeInUp 0.3s ease-out',
          zIndex: 50, whiteSpace: 'nowrap',
          textShadow: '0 1px 3px rgba(0,0,0,0.5)',
        }}>
          {message}
        </div>
      )}

      {/* Instruction overlay */}
      {showInstruction && (
        <div style={{
          position: 'absolute', inset: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: 'rgba(0,0,0,0.5)',
          zIndex: 60,
          flexDirection: 'column', gap: 12,
        }}>
          <div style={{
            background: 'linear-gradient(135deg, #f97316, #dc2626)',
            borderRadius: 20, padding: '24px 32px',
            color: 'white', textAlign: 'center',
            boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
          }}>
            <div style={{ fontSize: 36, marginBottom: 8 }}>🏡</div>
            <div style={{ fontSize: 20, fontWeight: 900, marginBottom: 8 }}>Level 1: Treehouse!</div>
            <div style={{ fontSize: 15, opacity: 0.9 }}>Tap ⬆️ to climb up!</div>
            <div style={{ fontSize: 15, opacity: 0.9 }}>Collect all 5 ⭐ stars!</div>
            <div style={{ fontSize: 13, opacity: 0.7, marginTop: 8 }}>Don't fall in the lava! 🔥</div>
          </div>
        </div>
      )}

      <HUD
        lives={lives} stars={stars}
        currentLevel={currentLevel} totalLevels={totalLevels}
        paused={paused} onPause={() => setPaused(p => !p)}
      />
    </div>
  )
}

function Cloud({ x, y, size, delay }) {
  return (
    <div style={{
      position: 'absolute', left: x, top: y,
      animation: `cloudDrift ${6 + delay}s ease-in-out infinite alternate`,
    }}>
      <div style={{
        background: 'rgba(255,255,255,0.85)', borderRadius: 30,
        width: size, height: size * 0.38,
        position: 'relative',
      }}>
        <div style={{ position: 'absolute', top: -(size * 0.24), left: size * 0.15, background: 'rgba(255,255,255,0.85)', borderRadius: '50%', width: size * 0.38, height: size * 0.38 }} />
        <div style={{ position: 'absolute', top: -(size * 0.18), left: size * 0.42, background: 'rgba(255,255,255,0.85)', borderRadius: '50%', width: size * 0.3, height: size * 0.3 }} />
      </div>
    </div>
  )
}

function LadderGraphic() {
  return (
    <div style={{
      position: 'absolute',
      left: '46%',
      bottom: '20%',
      width: 28,
      height: '42%',
      zIndex: 8,
    }}>
      {/* Rails */}
      <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 5, background: '#92400e', borderRadius: 3 }} />
      <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: 5, background: '#78350f', borderRadius: 3 }} />
      {/* Rungs */}
      {[10, 22, 34, 46, 58, 70, 82].map((pct, i) => (
        <div key={i} style={{
          position: 'absolute',
          top: `${pct}%`,
          left: 0, right: 0,
          height: 5,
          background: '#b45309',
          borderRadius: 3,
        }} />
      ))}
    </div>
  )
}

function TreehouseFull() {
  return (
    <div style={{ position: 'absolute', right: '8%', bottom: '19%', zIndex: 5 }}>
      {/* Tree */}
      <div style={{ width: 22, height: 80, background: 'linear-gradient(90deg,#92400e,#78350f)', margin: '0 auto', borderRadius: '3px 3px 0 0' }} />
      <div style={{
        width: 90, height: 70,
        background: 'radial-gradient(ellipse,#16a34a,#15803d)',
        borderRadius: '50% 50% 40% 40%',
        margin: '-25px auto 0',
        position: 'relative',
      }}>
        {/* House on tree */}
        <div style={{
          position: 'absolute', bottom: 10, left: '50%', transform: 'translateX(-50%)',
          width: 60, height: 38,
          background: 'linear-gradient(180deg,#b45309,#92400e)',
          borderRadius: '4px 4px 0 0',
        }}>
          {/* Roof */}
          <div style={{
            position: 'absolute', top: -16, left: -6,
            width: 0, height: 0,
            borderLeft: '36px solid transparent',
            borderRight: '36px solid transparent',
            borderBottom: '18px solid #dc2626',
          }} />
          {/* Window */}
          <div style={{
            position: 'absolute', top: 5, left: 8,
            width: 14, height: 14,
            background: '#fef08a', borderRadius: 3,
            boxShadow: '0 0 6px rgba(254,240,138,0.8)',
          }} />
          {/* Door */}
          <div style={{
            position: 'absolute', bottom: 0, right: 8,
            width: 12, height: 18,
            background: '#78350f', borderRadius: '4px 4px 0 0',
          }} />
        </div>
      </div>
    </div>
  )
}

function LavaBubble({ delay }) {
  return (
    <div style={{
      width: 12, height: 12, borderRadius: '50%',
      background: 'radial-gradient(circle,#fbbf24,#f97316)',
      animation: `bubbleUp 2s ease-out infinite ${delay}s`,
      opacity: 0.9,
    }} />
  )
}

function ControlBtn({ label, sublabel, onClick }) {
  return (
    <button
      className="btn-tap"
      onClick={onClick}
      style={{
        background: 'linear-gradient(135deg, rgba(0,0,0,0.6), rgba(0,0,0,0.4))',
        border: '2px solid rgba(255,255,255,0.4)',
        borderRadius: 16,
        padding: '12px 20px',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 4,
        minWidth: 70,
      }}
    >
      <span style={{ fontSize: 28 }}>{label}</span>
      <span style={{ color: 'white', fontSize: 10, fontWeight: 700, textShadow: '0 1px 3px rgba(0,0,0,0.8)' }}>{sublabel}</span>
    </button>
  )
}
