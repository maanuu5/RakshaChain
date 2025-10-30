import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function DispatchPage() {
  const navigate = useNavigate()

  useEffect(() => {
    const logged = sessionStorage.getItem('isLoggedIn') === 'true'
    if (!logged) navigate('/login')
  }, [navigate])

  const shipments = [
    { id: 'SH001', name: 'Medical Supplies', supply: 'Vaccines', initLoc: 'Mumbai', finalLoc: 'Delhi', date: '2025-10-30' },
    { id: 'SH002', name: 'Equipment', supply: 'Ventilators', initLoc: 'Bangalore', finalLoc: 'Chennai', date: '2025-10-29' },
    { id: 'SH003', name: 'Emergency Kit', supply: 'First Aid', initLoc: 'Kolkata', finalLoc: 'Hyderabad', date: '2025-10-28' },
  ]

  const buttonStyle: React.CSSProperties = {
    fontFamily: 'doto, sans-serif',
    fontSize: 'clamp(12px, 1.5vw, 14px)',
    fontWeight: '600',
    padding: '8px 18px',
    border: '2px solid rgba(255,255,255,0.3)',
    borderRadius: '20px',
    backgroundColor: 'rgba(0,0,0,0.45)',
    color: '#fff',
    cursor: 'pointer'
  }

  const handleLogout = () => {
    sessionStorage.removeItem('isLoggedIn')
    navigate('/')
  }

  return (
    <section className="flex items-center justify-center px-4" style={{ minHeight: '100vh', paddingTop: '40px', paddingBottom: '40px' }}>
      <div className="max-w-[1200px] w-full">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
          <h1 style={{ fontFamily: '"Orbitron", sans-serif', fontSize: 'clamp(1.5rem, 2.8vw, 2rem)', color: 'rgb(242,242,242)', fontWeight: 700 }}>Shipments</h1>
          <button onClick={handleLogout} style={buttonStyle}>Logout</button>
        </div>

        <div style={{
          border: '2.5px solid rgba(255, 255, 255, 0.3)',
          borderRadius: '20px',
          backgroundColor: 'rgba(0, 0, 0, 0.4)',
          padding: '12px',
          overflow: 'hidden'
        }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ backgroundColor: 'rgba(255,255,255,0.04)', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                <th style={{ textAlign: 'left', padding: '12px' }}>Name</th>
                <th style={{ textAlign: 'left', padding: '12px' }}>ID</th>
                <th style={{ textAlign: 'left', padding: '12px' }}>Supply</th>
                <th style={{ textAlign: 'left', padding: '12px' }}>Ini. Loc.</th>
                <th style={{ textAlign: 'left', padding: '12px' }}>Final Loc.</th>
                <th style={{ textAlign: 'left', padding: '12px' }}>Date</th>
              </tr>
            </thead>
            <tbody>
              {shipments.map((s, i) => (
                <tr key={s.id} style={{ borderBottom: i < shipments.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none' }}>
                  <td style={{ padding: '12px' }}>{s.name}</td>
                  <td style={{ padding: '12px' }}>{s.id}</td>
                  <td style={{ padding: '12px' }}>{s.supply}</td>
                  <td style={{ padding: '12px' }}>{s.initLoc}</td>
                  <td style={{ padding: '12px' }}>{s.finalLoc}</td>
                  <td style={{ padding: '12px' }}>{s.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}
