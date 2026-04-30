import React, { useState, useEffect } from 'react'
import HUD from '../components/HUD.jsx'

const CASTLE_PIECES = [
  { id: 0, emoji: '🪣', label: 'Bucket', placed: false },
  { id: 1, emoji: '⛩️', label: 'Gate', placed: false },
  { id: 2, emoji: '🏰', label: 'Tower', placed: false },
  { id: 3, emoji: '🚩', label: 'Flag', placed: false },
  { id: 4, emoji: '🌊', label: 'Moat', placed: false },
  { id: 5, emoji: '⭐', label: 'Star', placed: false },
]

export default function Level5({ lives, stars, paused, setPaused, loseLife, nextLevel, currentLevel, totalLevels }) {
  const [placed, setPlaced] = useState(new Set())
  const [message, setMessage] = useState('')
  const [showInstruction, setShowInstruction] = useState(true)
  const [castleGlowing, setCastleGlowing] = useState(false)
  const [collectedStars, setCollectedStars] = useState(new Set())

  const sandStarPositions = [
    { id: 0, x: 8, y: 30 },
    { id: 1, x: 82, y: 25 },
    { id: 2, x: 15, y: 55 },
    { id: 3, x: 75, y: 52 },
    { id: 4, x: 48, y: 18 },
  ]

  useEffect(() => {
    const t = setTimeout(() => setShowInstruction(false), 2500)
    return () => clearTimeout(t)
  }, [])

  const placePiece = (id) => {
    if (placed.has(id) || paused) return
    const newSet = new Set(placed)
    newSet.add(id)
    setPlaced(newSet)

    const msgs = ['🪣 Fill with sand!', '⛩️ Add the gate!', '🏰 Tower going up!', '🚩 Flag planted!', '🌊 Moat dug!', '⭐ Magic star!']
    setMessage(msgs[id])
    setTimeout(() => setMessage(''), 1000)

    if (newSet.size >= CASTLE_PIECES.length) {
      setCastleGlowing(true)
      setTimeout(() => {
        setMessage('🏰 SANDCASTLE COMPLETE! 🎉')
        setTimeout(() => nextLevel(collectedStars.size + newSet.size), 1500)
      }, 600)
    }
  }

  const collectStar = (id) => {
    if (collectedStars.has(id) || paused) return
    const newSet = new Set(collectedStars)
    newSet.add(id)
    setCollectedStars(newSet)
    setMessage('⭐ Star collected!')
    setTimeout(() => setMessage(''), 700)
  }

  const buildProgress = placed.size / CASTLE_PIECES.length

  return (
    <div style={{
      width: '100%', height: '100%', position: 'relative', overflow: 'hidden',
      background: 'linear-gradient(180deg, #0ea5e9 0%, #38bdf8 30%, #7dd3fc 50%, #fde68a 65%, #fbbf24 80%, #f59e0b 100%)',
    }}>
      {/* Ocean waves */}
      <div style={{ position: 'absolute', bottom: '38%', left: '-5%', right: '-5%', height: 60, zIndex: 2 }}>
        <Wave offset={0} color="rgba(14,165,233,0.7)" />
        <Wave offset={-15} color="rgba(56,189,248,0.5)" />
      </div>

      {/* Sun */}
      <div style={{
        position: 'absolute', top: '6%', right: '15%',
        width: 55, height: 55, borderRadius: '50%',
        background: 'radial-gradient(circle, #FEF08A, #FCD34D, #F59E0B)',
        boxShadow: '0 0 25px 8px rgba(252,211,77,0.5)',
        animation: 'pulse 3s ease-in-out infinite',
      }} />

      {/* Clouds */}
      <div style={{ position: 'absolute', top: '4%', left: '8%', animation: 'cloudDrift 7s ease-in-out infinite alternate' }}>
        <div style={{ background: 'rgba(255,255,255,0.85)', borderRadius: 25, width: 65, height: 25 }}>
          <div style={{ position: 'absolute', top: -10, left: 12, background: 'rgba(255,255,255,0.85)', borderRadius: '50%', width: 28, height: 28 }} />
        </div>
      </div>

      {/* Palm trees */}
      <div style={{ position: 'absolute', bottom: '33%', left: '3%', fontSize: 44, animation: 'treeSway 4s infinite', zIndex: 5 }}>🌴</div>
      <div style={{ position: 'absolute', bottom: '33%', right: '3%', fontSize: 44, animation: 'treeSway 5s infinite 1s', zIndex: 5 }}>🌴</div>

      {/* Beach seagulls */}
      <div style={{ position: 'absolute', top: '15%', left: '30%', fontSize: 18, animation: 'float 4s infinite' }}>🦅</div>
      <div style={{ position: 'absolute', top: '18%', right: '30%', fontSize: 14, animation: 'float 5s infinite 1s' }}>🦅</div>

      {/* Level label */}
      <div style={{
        position: 'absolute', top: '10%', left: '50%', transform: 'translateX(-50%)',
        color: 'white', fontSize: 16, fontWeight: 900,
        textShadow: '0 2px 8px rgba(0,0,0,0.6)',
        background: 'rgba(0,0,0,0.35)', borderRadius: 20, padding: '6px 16px',
        zIndex: 20, whiteSpace: 'nowrap',
      }}>🏖️ Build the Sandcastle!</div>

      {/* Sandy beach */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: '40%',
        background: 'linear-gradient(180deg, #fde68a 0%, #fbbf24 50%, #f59e0b 100%)',
        borderRadius: '30% 30% 0 0 / 6% 6% 0 0',
        zIndex: 3,
      }}>
        {/* Sand texture dots */}
        {[...Array(20)].map((_, i) => (
          <div key={i} style={{
            position: 'absolute',
            left: `${5 + (i * 9 % 90)}%`,
            top: `${10 + (i * 13 % 40)}%`,
            width: 4, height: 4, borderRadius: '50%',
            background: 'rgba(0,0,0,0.08)',
          }} />
        ))}

        {/* Progress bar on sand */}
        <div style={{
          position: 'absolute', top: 14, left: '10%', right: '10%',
          height: 10, background: 'rgba(0,0,0,0.15)', borderRadius: 5,
        }}>
          <div style={{
            height: '100%', width: `${buildProgress * 100}%`,
            background: 'linear-gradient(90deg, #f97316, #fcd34d)',
            borderRadius: 5, transition: 'width 0.4s ease',
            boxShadow: '0 0 6px rgba(249,115,22,0.6)',
          }} />
        </div>
        <div style={{
          position: 'absolute', top: 28, left: '50%', transform: 'translateX(-50%)',
          fontSize: 11, color: 'rgba(0,0,0,0.6)', fontWeight: 700, whiteSpace: 'nowrap',
        }}>{placed.size}/{CASTLE_PIECES.length} pieces placed</div>
      </div>

      {/* Sandcastle visual */}
      <div style={{
        position: 'absolute',
        bottom: '35%',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 10,
        filter: castleGlowing ? 'drop-shadow(0 0 20px rgba(252,211,77,1))' : 'none',
        transition: 'filter 0.5s',
        textAlign: 'center',
      }}>
        <SandcastleSVG placedCount={placed.size} total={CASTLE_PIECES.length} />
      </div>

      {/* Ila character */}
      <div style={{
        position: 'absolute',
        bottom: '34%', left: '72%',
        fontSize: 40,
        filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))',
        zIndex: 12,
        animation: castleGlowing ? 'bounce 0.5s infinite' : 'bounce 2s ease-in-out infinite',
      }}>👧</div>

      {/* Stars on beach/sky */}
      {sandStarPositions.map(sp => (
        !collectedStars.has(sp.id) && (
          <div
            key={sp.id}
            className="btn-tap"
            onClick={() => collectStar(sp.id)}
            style={{
              position: 'absolute',
              left: `${sp.x}%`, top: `${sp.y}%`,
              fontSize: 24, zIndex: 15, cursor: 'pointer',
              animation: 'sparkle 1.8s infinite',
              filter: 'drop-shadow(0 0 8px rgba(252,211,77,0.9))',
            }}
          >⭐</div>
        )
      ))}

      {/* Castle piece buttons */}
      <div style={{
        position: 'absolute', bottom: '2%', left: '50%', transform: 'translateX(-50%)',
        display: 'flex', flexWrap: 'wrap', gap: 8,
        justifyContent: 'center',
        width: '95%',
        zIndex: 20,
      }}>
        {CASTLE_PIECES.map(piece => (
          <button
            key={piece.id}
            className="btn-tap"
            onClick={() => placePiece(piece.id)}
            disabled={placed.has(piece.id)}
            style={{
              background: placed.has(piece.id)
                ? 'rgba(100,100,100,0.4)'
                : 'linear-gradient(135deg, rgba(249,115,22,0.9), rgba(220,38,38,0.9))',
              border: placed.has(piece.id) ? '2px solid rgba(255,255,255,0.2)' : '2px solid rgba(255,255,255,0.5)',
              borderRadius: 14,
              padding: '8px 14px',
              cursor: placed.has(piece.id) ? 'default' : 'pointer',
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2,
              opacity: placed.has(piece.id) ? 0.5 : 1,
              transition: 'all 0.3s',
              minWidth: 58,
            }}
          >
            <span style={{ fontSize: 22 }}>{placed.has(piece.id) ? '✅' : piece.emoji}</span>
            <span style={{ color: 'white', fontSize: 9, fontWeight: 700, textShadow: '0 1px 2px rgba(0,0,0,0.6)' }}>
              {placed.has(piece.id) ? 'Done!' : piece.label}
            </span>
          </button>
        ))}
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

      {showInstruction && (
        <div style={{
          position: 'absolute', inset: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: 'rgba(0,0,0,0.5)', zIndex: 60,
        }}>
          <div style={{
            background: 'linear-gradient(135deg, #0ea5e9, #0f766e)',
            borderRadius: 20, padding: '24px 32px',
            color: 'white', textAlign: 'center',
            boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
          }}>
            <div style={{ fontSize: 38, marginBottom: 8 }}>🏖️</div>
            <div style={{ fontSize: 20, fontWeight: 900, marginBottom: 8 }}>Level 5: Sandcastle!</div>
            <div style={{ fontSize: 15, opacity: 0.9 }}>Tap each piece to build!</div>
            <div style={{ fontSize: 15, opacity: 0.9 }}>Collect ⭐ stars too!</div>
          </div>
        </div>
      )}

      <HUD lives={lives} stars={stars} currentLevel={currentLevel} totalLevels={totalLevels} paused={paused} onPause={() => setPaused(p => !p)} />
    </div>
  )
}

function SandcastleSVG({ placedCount, total }) {
  const pct = placedCount / total
  return (
    <svg width="120" height="100" viewBox="0 0 120 100">
      {/* Base */}
      {pct >= 0.16 && <rect x="10" y="75" width="100" height="25" rx="4" fill="#f59e0b" stroke="#d97706" strokeWidth="1.5"/>}
      {/* Main tower */}
      {pct >= 0.33 && <rect x="35" y="45" width="50" height="35" rx="3" fill="#fbbf24" stroke="#d97706" strokeWidth="1.5"/>}
      {/* Tower top */}
      {pct >= 0.5 && <polygon points="35,45 85,45 75,28 45,28" fill="#f97316" stroke="#ea580c" strokeWidth="1.5"/>}
      {/* Side towers */}
      {pct >= 0.66 && <>
        <rect x="10" y="58" width="28" height="22" rx="3" fill="#fbbf24" stroke="#d97706" strokeWidth="1"/>
        <polygon points="10,58 38,58 32,46 16,46" fill="#f97316" stroke="#ea580c" strokeWidth="1"/>
        <rect x="82" y="58" width="28" height="22" rx="3" fill="#fbbf24" stroke="#d97706" strokeWidth="1"/>
        <polygon points="82,58 110,58 104,46 88,46" fill="#f97316" stroke="#ea580c" strokeWidth="1"/>
      </>}
      {/* Flag */}
      {pct >= 0.83 && <>
        <line x1="60" y1="10" x2="60" y2="30" stroke="#92400e" strokeWidth="2"/>
        <polygon points="60,10 78,17 60,24" fill="#dc2626"/>
      </>}
      {/* Windows */}
      {pct >= 0.33 && <>
        <rect x="44" y="52" width="12" height="12" rx="2" fill="#7dd3fc"/>
        <rect x="64" y="52" width="12" height="12" rx="2" fill="#7dd3fc"/>
        <rect x="50" y="68" width="20" height="12" rx="2" fill="#78350f"/>
      </>}
      {/* Glow if complete */}
      {pct >= 1 && <circle cx="60" cy="50" r="55" fill="none" stroke="rgba(252,211,77,0.6)" strokeWidth="3" opacity="0.8"/>}
    </svg>
  )
}

function Wave({ offset, color }) {
  return (
    <div style={{
      position: 'absolute', bottom: offset, left: 0, right: 0,
      height: 40, overflow: 'hidden',
    }}>
      <svg viewBox="0 0 430 40" preserveAspectRatio="none" style={{ width: '100%', height: '100%' }}>
        <path d="M0,20 C60,5 120,35 180,20 C240,5 300,35 360,20 C390,12 420,22 430,20 L430,40 L0,40 Z" fill={color} />
      </svg>
    </div>
  )
}
