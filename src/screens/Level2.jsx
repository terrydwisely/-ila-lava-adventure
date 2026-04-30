import React, { useState, useEffect, useRef } from 'react'
import HUD from '../components/HUD.jsx'

export default function Level2({ lives, stars, paused, setPaused, loseLife, nextLevel, currentLevel, totalLevels }) {
  const [progress, setProgress] = useState(0) // 0-100
  const [collectedStars, setCollectedStars] = useState(new Set())
  const [message, setMessage] = useState('')
  const [showInstruction, setShowInstruction] = useState(true)
  const intervalRef = useRef(null)
  const GOAL = 100
  const STAR_COUNT = 4

  const starThresholds = [20, 40, 60, 80]

  useEffect(() => {
    const t = setTimeout(() => setShowInstruction(false), 2500)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    // Check for star collection as progress increases
    starThresholds.forEach((threshold, i) => {
      if (progress >= threshold && !collectedStars.has(i)) {
        const newSet = new Set(collectedStars)
        newSet.add(i)
        setCollectedStars(newSet)
        setMessage(`⭐ Star ${i + 1}!`)
        setTimeout(() => setMessage(''), 800)
      }
    })
    // Check win condition
    if (progress >= GOAL) {
      setMessage('🎉 You reached the top!')
      setTimeout(() => nextLevel(STAR_COUNT), 1200)
    }
  }, [progress])

  const climbUp = () => {
    if (paused) return
    setProgress(p => Math.min(p + 8, GOAL))
  }

  const startHolding = (fn) => {
    fn()
    intervalRef.current = setInterval(fn, 120)
  }
  const stopHolding = () => {
    clearInterval(intervalRef.current)
  }

  // Ila's position based on progress (bottom % to top %)
  const ilaBottom = `${18 + progress * 0.62}%`

  return (
    <div style={{
      width: '100%', height: '100%', position: 'relative', overflow: 'hidden',
      background: 'linear-gradient(180deg, #1e3a5f 0%, #0ea5e9 30%, #86efac 65%, #16a34a 85%, #7f1d1d 100%)',
    }}>
      {/* Sky elements */}
      <div style={{ position: 'absolute', top: '4%', left: '12%', fontSize: 26, animation: 'sparkle 3s infinite' }}>🌟</div>
      <div style={{ position: 'absolute', top: '7%', right: '15%', fontSize: 20, animation: 'sparkle 2.5s infinite 0.5s' }}>✨</div>
      <div style={{ position: 'absolute', top: '3%', left: '40%', fontSize: 22, animation: 'sparkle 3.5s infinite 1s' }}>⭐</div>

      {/* Level label */}
      <div style={{
        position: 'absolute', top: '10%', left: '50%', transform: 'translateX(-50%)',
        color: 'white', fontSize: 18, fontWeight: 900,
        textShadow: '0 2px 8px rgba(0,0,0,0.6)',
        background: 'rgba(0,0,0,0.35)', borderRadius: 20, padding: '6px 18px',
        zIndex: 10, whiteSpace: 'nowrap',
      }}>
        🪜 Climb the Ladder!
      </div>

      {/* Progress bar */}
      <div style={{
        position: 'absolute', right: 14, top: '14%', bottom: '20%',
        width: 16, borderRadius: 8,
        background: 'rgba(0,0,0,0.4)',
        border: '2px solid rgba(255,255,255,0.4)',
        zIndex: 10,
      }}>
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0,
          height: `${progress}%`,
          background: 'linear-gradient(180deg, #fcd34d, #f97316)',
          borderRadius: 8,
          transition: 'height 0.2s ease',
          boxShadow: '0 0 8px rgba(252,211,77,0.6)',
        }} />
        <div style={{
          position: 'absolute', top: -20, left: '50%', transform: 'translateX(-50%)',
          fontSize: 10, color: 'white', fontWeight: 700, whiteSpace: 'nowrap',
        }}>{Math.round(progress)}%</div>
      </div>

      {/* Tall ladder */}
      <div style={{
        position: 'absolute',
        left: '50%', transform: 'translateX(-50%)',
        bottom: '17%', top: '14%',
        width: 60,
        zIndex: 8,
      }}>
        {/* Rails */}
        <div style={{ position: 'absolute', left: 4, top: 0, bottom: 0, width: 8, background: 'linear-gradient(180deg,#92400e,#78350f)', borderRadius: 4, boxShadow: '2px 0 4px rgba(0,0,0,0.3)' }} />
        <div style={{ position: 'absolute', right: 4, top: 0, bottom: 0, width: 8, background: 'linear-gradient(180deg,#92400e,#78350f)', borderRadius: 4, boxShadow: '-2px 0 4px rgba(0,0,0,0.3)' }} />
        {/* Rungs */}
        {Array.from({ length: 16 }, (_, i) => (
          <div key={i} style={{
            position: 'absolute',
            top: `${(i * 6.5)}%`,
            left: 8, right: 8,
            height: 8,
            background: '#b45309',
            borderRadius: 4,
            boxShadow: '0 2px 4px rgba(0,0,0,0.3)',
          }} />
        ))}
      </div>

      {/* Side jungle decorations */}
      <div style={{ position: 'absolute', bottom: '16%', left: '5%', fontSize: 45, animation: 'treeSway 5s infinite' }}>🌴</div>
      <div style={{ position: 'absolute', bottom: '16%', right: '5%', fontSize: 40, animation: 'treeSway 4s infinite 1s' }}>🌴</div>
      <div style={{ position: 'absolute', bottom: '22%', left: '8%', fontSize: 28 }}>🌺</div>
      <div style={{ position: 'absolute', bottom: '22%', right: '8%', fontSize: 24 }}>🌸</div>

      {/* Star collectibles on ladder */}
      {starThresholds.map((threshold, i) => (
        <div key={i} style={{
          position: 'absolute',
          left: collectedStars.has(i) ? '38%' : `${i % 2 === 0 ? '28%' : '62%'}`,
          bottom: `${18 + threshold * 0.62}%`,
          fontSize: 26,
          opacity: collectedStars.has(i) ? 0 : 1,
          transition: 'opacity 0.3s',
          animation: 'sparkle 1.5s infinite',
          animationDelay: `${i * 0.4}s`,
          filter: 'drop-shadow(0 0 8px rgba(252,211,77,0.9))',
          zIndex: 15,
        }}>⭐</div>
      ))}

      {/* Ila character on ladder */}
      <div style={{
        position: 'absolute',
        left: '50%',
        transform: 'translateX(-50%)',
        bottom: ilaBottom,
        fontSize: 40,
        transition: 'bottom 0.15s ease-out',
        filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.4))',
        zIndex: 20,
      }}>👧</div>

      {/* Lava bottom */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: '18%',
        background: 'linear-gradient(180deg, #f97316, #dc2626 50%, #7f1d1d)',
        boxShadow: '0 -8px 20px rgba(239,68,68,0.6)',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-around', paddingTop: 6 }}>
          {[0,1,2,3,4,5].map(i => (
            <div key={i} style={{
              width: 10, height: 10, borderRadius: '50%',
              background: 'radial-gradient(circle,#fbbf24,#f97316)',
              animation: `bubbleUp 2s ease-out infinite ${i * 0.3}s`,
            }} />
          ))}
        </div>
        <div style={{ textAlign: 'center', marginTop: 2, fontSize: 11, color: 'rgba(255,255,255,0.8)', fontWeight: 700 }}>
          🔥 DON'T FALL! 🔥
        </div>
      </div>

      {/* Goal at top */}
      {progress < GOAL && (
        <div style={{
          position: 'absolute', top: '14%', left: '50%', transform: 'translateX(-50%)',
          fontSize: 32, animation: 'bounce 1.5s infinite',
          filter: 'drop-shadow(0 0 8px rgba(252,211,77,0.9))',
          zIndex: 15,
        }}>🏆</div>
      )}

      {/* Controls */}
      <div style={{
        position: 'absolute', bottom: '20%', left: '50%', transform: 'translateX(-50%)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10,
        zIndex: 30,
      }}>
        <button
          className="btn-tap"
          onPointerDown={() => startHolding(climbUp)}
          onPointerUp={stopHolding}
          onPointerLeave={stopHolding}
          style={{
            background: 'linear-gradient(135deg, #f97316, #ea580c)',
            border: 'none', borderRadius: 50,
            width: 80, height: 80,
            fontSize: 36,
            cursor: 'pointer',
            boxShadow: '0 4px 16px rgba(249,115,22,0.6)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
        >⬆️</button>
        <div style={{ color: 'white', fontSize: 12, fontWeight: 700, textShadow: '0 1px 4px rgba(0,0,0,0.8)' }}>
          TAP OR HOLD TO CLIMB!
        </div>
      </div>

      {/* Message */}
      {message && (
        <div style={{
          position: 'absolute', top: '22%', left: '50%', transform: 'translateX(-50%)',
          background: 'rgba(0,0,0,0.75)', color: 'white',
          padding: '8px 20px', borderRadius: 20,
          fontSize: 16, fontWeight: 700,
          animation: 'fadeInUp 0.3s ease-out',
          zIndex: 50, whiteSpace: 'nowrap',
        }}>{message}</div>
      )}

      {/* Instruction */}
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
            <div style={{ fontSize: 40, marginBottom: 8 }}>🪜</div>
            <div style={{ fontSize: 20, fontWeight: 900, marginBottom: 8 }}>Level 2: Climb!</div>
            <div style={{ fontSize: 15, opacity: 0.9 }}>Tap ⬆️ to climb up!</div>
            <div style={{ fontSize: 15, opacity: 0.9 }}>Collect ⭐ stars on the way!</div>
          </div>
        </div>
      )}

      <HUD lives={lives} stars={stars} currentLevel={currentLevel} totalLevels={totalLevels} paused={paused} onPause={() => setPaused(p => !p)} />
    </div>
  )
}
