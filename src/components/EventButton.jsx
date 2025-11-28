import React, { useRef } from 'react'

const EventButton = React.memo(function EventButton({ eventId, onClick, label }) {
  const renders = useRef(0)
  renders.current += 1
  console.log(`EventButton render: ${label} (id=${eventId}) renderCount=${renders.current}`)
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <button onClick={onClick}>{label}</button>
      <span style={{ color: '#666' }}>renders: {renders.current}</span>
    </div>
  )
})

export default EventButton
