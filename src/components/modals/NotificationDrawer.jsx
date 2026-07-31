// path: src/components/modals/NotificationDrawer.jsx
import React from 'react'

export function NotificationDrawer({ onClose }) {
  return (
    <div className="modal-overlay open" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <button className="close" onClick={onClose}>&times;</button>
        <h3>AI Notifications</h3>
        <div className="flex flex-col gap-2 mt-4">
          <div className="bg-[#f1f7fd] p-3 rounded-xl">
            <strong>🔋 AI Alert:</strong> Buoy 04 battery low · 2 min ago
          </div>
          <div className="bg-[#f1f7fd] p-3 rounded-xl">
            <strong>⚠️ AI Alert:</strong> DO decreasing at Buoy 02 · 15 min ago
          </div>
          <div className="bg-[#f1f7fd] p-3 rounded-xl">
            <strong>🔄 AI Update:</strong> Firmware available for Buoy 03 · 1h ago
          </div>
        </div>
      </div>
    </div>
  )
}
