// path: src/components/modals/RiskDetailsModal.jsx
import React from 'react'

export function RiskDetailsModal({ risk, onClose }) {
  if (!risk) return null
  return (
    <div className="modal-overlay open" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <button className="close" onClick={onClose}>&times;</button>
        <h3>{risk.label}</h3>
        <p><strong>Risk Level:</strong> {risk.level}</p>
        <p><strong>AI Confidence:</strong> {risk.confidence}</p>
        <p><strong>Trend:</strong> {risk.trend}</p>
        <p><strong>Explanation:</strong> {risk.desc}</p>
        <p><strong>Recommendation:</strong> Continue monitoring.</p>
        <button className="btn btn-primary mt-4" onClick={() => { alert('AI risk report generated'); onClose() }}>Generate Report</button>
      </div>
    </div>
  )
}
