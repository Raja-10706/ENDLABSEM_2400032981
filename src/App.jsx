import React, { useState, useRef, useCallback, useEffect } from 'react'
import EventButton from './components/EventButton'

export default function App() {
  const [useStableHandlers, setUseStableHandlers] = useState(false)
  const [log, setLog] = useState('')

  const events = [1, 2, 3, 4, 5]

  const book = useCallback((id) => {
    const msg = `Booked event ${id} @ ${new Date().toLocaleTimeString()}`
    console.log(msg)
    setLog(prev => msg + '\n' + prev)
  }, [])

  const handlersRef = useRef({})

  function getHandler(id) {
    if (useStableHandlers) {
      if (!handlersRef.current[id]) {
        handlersRef.current[id] = () => book(id)
        console.log(`Created stable handler for id=${id}`)
      }
      return handlersRef.current[id]
    }
    return () => book(id)
  }

  useEffect(() => {
    console.log(`--- App render (useStableHandlers=${useStableHandlers}) ---`)
  })

  return (
    <div style={{ padding: 20, fontFamily: 'system-ui, Arial' }}>
      <h1>Event Booking — useCallback demo</h1>
      <p>Open the browser console to watch render logs and handler creation.</p>

      <div style={{ marginBottom: 12 }}>
        <label style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
          <input type="checkbox" checked={useStableHandlers} onChange={e => setUseStableHandlers(e.target.checked)} />
          Use stable handlers (memoized)
        </label>
        <button style={{ marginLeft: 12 }} onClick={() => { handlersRef.current = {}; setLog(''); console.clear(); }}>
          Reset logs & handlers
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        <div style={{ border: '1px solid #ddd', padding: 12, borderRadius: 6 }}>
          <h3>Event Buttons</h3>
          <div style={{ display: 'grid', gap: 8 }}>
            {events.map(id => (
              <EventButton
                key={id}
                eventId={id}
                label={`Book Event ${id}`}
                onClick={getHandler(id)}
              />
            ))}
          </div>
        </div>

        <div style={{ border: '1px solid #ddd', padding: 12, borderRadius: 6 }}>
          <h3>Console Log</h3>
          <div style={{ fontFamily: 'monospace', whiteSpace: 'pre-wrap', background: '#fafafa', padding: 8, height: 200, overflow: 'auto' }}>{log}</div>
        </div>
      </div>
    </div>
  )
}
