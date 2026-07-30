// path: src/components/modals/BuoyDetailsModal.jsx
import React from 'react'

export function BuoyDetailsModal({ buoy, onClose }) {
  if (!buoy) return null
  return (
    <div className="modal-overlay open" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <button className="close" onClick={onClose}>&times;</button>
        <h3>{buoy.name} Details</h3>
        <p><strong>AI Status:</strong> {buoy.status === 'green' ? 'Stable' : buoy.status === 'yellow' ? 'Monitor closely' : 'Immediate attention needed'}</p>
        <p><strong>Temp:</strong> {buoy.temp} · <strong>Sal:</strong> {buoy.salinity} · <strong>pH:</strong> {buoy.ph}</p>
        <p><strong>DO:</strong> {buoy.do} · <strong>Turb:</strong> {buoy.turb}</p>
        <p><strong>AI Recommendation:</strong> {buoy.status === 'green' ? 'Continue routine monitoring' : buoy.status === 'yellow' ? 'Inspect within 48h' : 'Immediate inspection required'}</p>
        <button className="btn btn-primary mt-4" onClick={() => { alert('AI analysis complete'); onClose() }}>AI Analysis</button>
      </div>
    </div>
  )
}
