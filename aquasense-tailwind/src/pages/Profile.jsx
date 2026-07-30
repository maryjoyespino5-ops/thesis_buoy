// path: src/pages/Profile.jsx
import React from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent } from '../components/ui/Card'
import { Badge } from '../components/ui/Badge'
import { User, Mail, Phone, MapPin, Shield, Clock } from 'lucide-react'

export default function Profile() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }} className="space-y-6 max-w-lg">
      <div>
        <h1 className="text-2xl font-bold text-text-primary tracking-tight flex items-center gap-2">
          <User size={24} className="text-ocean-500" />
          Profile
        </h1>
        <p className="text-text-muted text-sm mt-1">Your account information</p>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-ocean-500 to-ocean-600 rounded-2xl flex items-center justify-center text-white font-bold text-2xl shadow-lg">
              JD
            </div>
            <div className="text-center sm:text-left">
              <h2 className="text-xl font-bold text-text-primary">John Dela Cruz</h2>
              <Badge variant="primary" className="mt-1">Administrator</Badge>
              <p className="text-text-muted text-sm mt-1">Coastal Monitoring · LGU Liaison</p>
            </div>
          </div>

          <hr className="border-border my-4" />

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Mail size={16} className="text-text-muted" />
              <div>
                <div className="text-xs text-text-muted">Email</div>
                <div className="text-sm text-text-primary">john.d@aquasense.ph</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Phone size={16} className="text-text-muted" />
              <div>
                <div className="text-xs text-text-muted">Phone</div>
                <div className="text-sm text-text-primary">+63 912 345 6789</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <MapPin size={16} className="text-text-muted" />
              <div>
                <div className="text-xs text-text-muted">Location</div>
                <div className="text-sm text-text-primary">Manila Bay, Philippines</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Shield size={16} className="text-text-muted" />
              <div>
                <div className="text-xs text-text-muted">Role</div>
                <div className="text-sm text-text-primary">Administrator</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Clock size={16} className="text-text-muted" />
              <div>
                <div className="text-xs text-text-muted">Last login</div>
                <div className="text-sm text-text-primary">Today 14:20</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}