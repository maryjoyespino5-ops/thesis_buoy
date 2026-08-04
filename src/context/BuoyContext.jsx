// path: src/context/BuoyContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react'
import { getBuoy, getAllBuoys, getBuoyById } from '../lib/buoyService'

const BuoyContext = createContext(null)

export const useBuoy = () => {
  const context = useContext(BuoyContext)
  if (!context) throw new Error('useBuoy must be used within BuoyProvider')
  return context
}

export const BuoyProvider = ({ children }) => {
  const [currentBuoyId, setCurrentBuoyId] = useState(1)
  const [buoys, setBuoys] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Fetch all buoys — currently returns one buoy from sampleData.
    // Future: replace with Supabase fetch for multiple buoys.
    const data = getAllBuoys()
    setBuoys(data)
    setLoading(false)
  }, [])

  const currentBuoy = getBuoy(currentBuoyId)

  const switchBuoy = (id) => {
    setCurrentBuoyId(Number(id))
  }

  const getBuoyData = (id) => {
    return getBuoyById(id)
  }

  return (
    <BuoyContext.Provider value={{ buoys, currentBuoy, currentBuoyId, switchBuoy, getBuoyData, loading }}>
      {children}
    </BuoyContext.Provider>
  )
}
