// path: src/pages/community/CommunityAbout.jsx
import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/Card";
import {
  Users,
  Shield,
  Brain,
  Satellite,
  MapPin,
  Wind,
  Droplets,
  Fish,
  Microscope,
  Anchor,
  Sun,
  Waves,
} from "lucide-react";
import { cn } from "../../lib/utils";

const features = [
  {
    icon: Satellite,
    title: "Live Buoy Monitoring",
    description:
      "Real-time data from our network of marine buoys tracking water quality, temperature, and conditions.",
  },
  {
    icon: Brain,
    title: "AI Analysis",
    description:
      "Machine learning models analyze sensor data to provide environmental summaries, fishing recommendations, and risk assessments.",
  },
  {
    icon: MapPin,
    title: "Interactive Maps",
    description:
      "Explore marine zones, buoy locations, and monitoring stations on an interactive map with live data overlays.",
  },
  {
    icon: Fish,
    title: "Fisheries Tracking",
    description:
      "Track fish activity, density, and habitat scores to support sustainable fishing practices.",
  },
  {
    icon: Waves,
    title: "Beach Safety",
    description:
      "Monitor swimming safety conditions, water quality, and UV index for beachgoers.",
  },
  {
    icon: Microscope,
    title: "Coral Reef Monitoring",
    description:
      "Track coral health indices, temperature, pH, and pollution risks to protect reef ecosystems.",
  },
];

const sensors = [
  { name: "Temperature", icon: Sun, unit: "°C" },
  { name: "Salinity", icon: Droplets, unit: "PSU" },
  { name: "pH", icon: Droplets, unit: "pH" },
  { name: "Dissolved Oxygen", icon: Droplets, unit: "mg/L" },
  { name: "Turbidity", icon: Droplets, unit: "NTU" },
  { name: "Wind Speed", icon: Wind, unit: "km/h" },
  { name: "Humidity", icon: Droplets, unit: "%" },
  { name: "Pressure", icon: Droplets, unit: "hPa" },
];

export function CommunityAbout() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      {/* Hero */}
      <section className="relative overflow-hidden rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 p-6 lg:p-8">
        <div className="relative z-10">
          <h1 className="text-3xl lg:text-4xl font-bold text-white tracking-tight">
            About NELEUS1
          </h1>
          <p className="mt-2 text-primary-100 text-sm lg:text-base max-w-2xl">
            The Aquasense Community Portal provides open access to marine
            monitoring data, AI-powered analysis, and public advisories for
            coastal communities.
          </p>
        </div>
      </section>

      {/* Mission */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield size={18} className="text-primary-500" />
            Our Mission
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-text-secondary leading-relaxed">
            To empower coastal communities with real-time marine data, AI-driven
            insights, and actionable advisories that protect lives, livelihoods,
            and marine ecosystems.
          </p>
        </CardContent>
      </Card>

      {/* Objectives */}
      <Card>
        <CardHeader>
          <CardTitle>Objectives</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-text-secondary">
            <li className="flex items-start gap-2">
              <span className="text-primary-500 mt-0.5">•</span>
              Monitor and report marine environmental conditions in real time
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary-500 mt-0.5">•</span>
              Provide AI-powered analysis and recommendations for coastal
              activities
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary-500 mt-0.5">•</span>
              Deliver public advisories for beach safety and water quality
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary-500 mt-0.5">•</span>
              Support sustainable fisheries and marine conservation efforts
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary-500 mt-0.5">•</span>
              Foster community engagement in marine monitoring
            </li>
          </ul>
        </CardContent>
      </Card>

      {/* Features */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((f, i) => {
          const Icon = f.icon;
          return (
            <Card key={i}>
              <CardContent className="p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-primary-50 text-primary-600 flex items-center justify-center">
                    <Icon size={20} />
                  </div>
                  <h3 className="text-sm font-semibold text-text-primary">
                    {f.title}
                  </h3>
                </div>
                <p className="text-xs text-text-muted leading-relaxed">
                  {f.description}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Sensors */}
      <Card>
        <CardHeader>
          <CardTitle>Sensor Network</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {sensors.map((s, i) => {
              const Icon = s.icon;
              return (
                <div
                  key={i}
                  className="flex items-center gap-2 p-3 rounded-lg bg-surface-muted/50 border border-border/30">
                  <Icon size={16} className="text-primary-500" />
                  <div>
                    <p className="text-xs font-medium text-text-primary">
                      {s.name}
                    </p>
                    <p className="text-[10px] text-text-muted">{s.unit}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* AI */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain size={18} className="text-primary-500" />
            AI-Powered Analysis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-text-secondary text-sm leading-relaxed">
            Our AI models process live sensor data to generate environmental
            summaries, fishing recommendations, risk assessments, and beach
            safety advisories — helping communities make informed decisions
            about marine activities.
          </p>
        </CardContent>
      </Card>

      {/* Research Team */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users size={18} className="text-primary-500" />
            Research Team
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-text-secondary text-sm leading-relaxed">
            The Aquasense platform is developed by a multidisciplinary team of
            marine scientists, data engineers, and AI researchers working
            together to advance coastal monitoring and community safety.
          </p>
        </CardContent>
      </Card>
    </motion.div>
  );
}
