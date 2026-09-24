import React, { useState } from 'react';
import { Cpu, Zap, Wind, Shield, Activity, Sparkles } from 'lucide-react';

const hotspots = [
  {
    id: 'front-wing',
    name: 'Front Wing & Nose Cone',
    icon: Wind,
    top: '38%',
    left: '12%',
    telemetry: {
      function: 'Primary Airflow Distribution & Downforce Generation',
      spec: 'Multi-element carbon-fiber flaps with adjustable Gurney flaps',
      liftToDrag: '3.8 : 1 ratio',
      pressure: 'High-pressure leading edge'
    }
  },
  {
    id: 'chassis',
    name: 'Monocoque & Halo Structure',
    icon: Shield,
    top: '42%',
    left: '38%',
    telemetry: {
      function: 'Driver Safety Cell & Chassis Rigidity',
      spec: 'Titanium-reinforced honeycomb carbon-fiber sandwich',
      crashLoad: '125 kN static load resistance',
      weight: '798 kg min regulated weight'
    }
  },
  {
    id: 'engine',
    name: '1.6L V6 Turbo Hybrid Power Unit',
    icon: Cpu,
    top: '45%',
    left: '60%',
    telemetry: {
      function: 'Thermal & Kinetic Energy Recovery (MGU-K / MGU-H)',
      spec: 'Direct-injection 90° V6 ICE with 15,000 RPM ceiling',
      horsePower: '1,020+ BHP (Combined ICE + E-Motor)',
      thermalEfficiency: '52% Thermal Energy Conversion'
    }
  },
  {
    id: 'rear-wing',
    name: 'DRS Rear Wing & Underbody Diffuser',
    icon: Zap,
    top: '32%',
    left: '84%',
    telemetry: {
      function: 'Drag Reduction System & Ground-Effect Venturi Tunnels',
      spec: 'Hydraulically actuated top flap with 85mm gap clearance',
      drsBoost: '+22 km/h straight-line speed delta',
      downforce: 'Up to 2,400 kg downforce at 250 km/h'
    }
  }
];

const InteractiveCarViewer = ({ car }) => {
  const [activeZone, setActiveZone] = useState(hotspots[0]);

  return (
    <div className="glass-panel" style={{ padding: '2rem', margin: '2rem 0' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', borderBottom: '1px solid var(--bg-card-border)', paddingBottom: '1rem' }}>
        <div>
          <span className="badge badge-red" style={{ marginBottom: '0.4rem' }}>Interactive Telemetry</span>
          <h3 style={{ fontSize: '1.6rem', color: '#FFF' }}>{car?.car_name || 'Apex AR-24 Technical Inspector'}</h3>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--telemetry-cyan)', fontSize: '0.85rem', fontWeight: 700 }}>
          <Sparkles size={16} /> Click hotspots to inspect component telemetry
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', alignItems: 'center' }}>
        {/* Car Diagram Stage */}
        <div style={{
          position: 'relative',
          background: 'linear-gradient(180deg, #07090D 0%, #101420 100%)',
          borderRadius: 'var(--radius-md)',
          padding: '3rem 1.5rem',
          border: '1px solid var(--bg-card-border)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '320px',
          overflow: 'hidden'
        }}>
          {/* Blueprint Grid Lines Background */}
          <div style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: 'radial-gradient(rgba(0, 229, 255, 0.15) 1px, transparent 1px)',
            backgroundSize: '24px 24px',
            opacity: 0.4
          }} />

          {/* Stylized Car Blueprint Silhouette graphic */}
          <div style={{
            width: '90%',
            height: '140px',
            borderRadius: '70px 140px 30px 40px',
            background: 'linear-gradient(90deg, var(--racing-red) 0%, rgba(225, 6, 0, 0.4) 50%, var(--telemetry-cyan) 100%)',
            boxShadow: '0 0 35px var(--racing-red-glow)',
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '2px solid rgba(255,255,255,0.2)'
          }}>
            <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.8rem', fontWeight: 900, color: '#FFF', letterSpacing: '0.2em', textShadow: '0 0 10px rgba(0,0,0,0.8)' }}>
              F1 POWER UNIT • 2026 AERO
            </div>
          </div>

          {/* Hotspot Buttons */}
          {hotspots.map((spot) => {
            const isSelected = activeZone.id === spot.id;
            return (
              <button
                key={spot.id}
                onClick={() => setActiveZone(spot)}
                style={{
                  position: 'absolute',
                  top: spot.top,
                  left: spot.left,
                  width: '38px',
                  height: '38px',
                  borderRadius: '50%',
                  background: isSelected ? 'var(--racing-red)' : 'rgba(11, 14, 20, 0.9)',
                  border: `2px solid ${isSelected ? '#FFF' : 'var(--telemetry-cyan)'}`,
                  color: '#FFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: isSelected ? '0 0 20px var(--racing-red)' : '0 0 10px rgba(0,229,255,0.5)',
                  transform: isSelected ? 'scale(1.15)' : 'scale(1)',
                  transition: 'var(--transition)',
                  cursor: 'pointer',
                  zIndex: 10
                }}
                title={spot.name}
              >
                <spot.icon size={18} />
              </button>
            );
          })}
        </div>

        {/* Telemetry Detail Box */}
        <div style={{
          background: 'rgba(11, 14, 20, 0.8)',
          border: '1px solid var(--telemetry-cyan)',
          borderRadius: 'var(--radius-md)',
          padding: '1.5rem',
          boxShadow: '0 0 20px rgba(0, 229, 255, 0.15)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--telemetry-cyan)', marginBottom: '0.5rem' }}>
            <Activity size={18} className="glow-animation" />
            <span style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              Live Telemetry Module
            </span>
          </div>
          <h4 style={{ fontSize: '1.3rem', color: '#FFF', marginBottom: '1rem' }}>
            {activeZone.name}
          </h4>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', fontSize: '0.9rem' }}>
            <div style={{ background: 'rgba(255,255,255,0.03)', padding: '0.75rem', borderRadius: 'var(--radius-sm)' }}>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-dim)', textTransform: 'uppercase' }}>Primary Function</div>
              <strong style={{ color: 'var(--text-main)' }}>{activeZone.telemetry.function}</strong>
            </div>

            <div style={{ background: 'rgba(255,255,255,0.03)', padding: '0.75rem', borderRadius: 'var(--radius-sm)' }}>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-dim)', textTransform: 'uppercase' }}>Technical Specification</div>
              <strong style={{ color: 'var(--text-main)' }}>{activeZone.telemetry.spec}</strong>
            </div>

            {Object.entries(activeZone.telemetry).slice(2).map(([key, value]) => (
              <div key={key} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.4rem 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <span style={{ color: 'var(--text-muted)', textTransform: 'capitalize' }}>{key.replace(/([A-Z])/g, ' $1')}:</span>
                <strong style={{ color: 'var(--telemetry-cyan)' }}>{value}</strong>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InteractiveCarViewer;
