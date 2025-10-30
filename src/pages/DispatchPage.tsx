import React, { useState, useEffect } from 'react'

interface Shipment {
  name: string
  id: string
  supply: string
  initLoc: string
  finalLoc: string
  date: string
}

export default function DispatchPage() {
  const [shipments, setShipments] = useState<Shipment[]>([])
  const [showForm, setShowForm] = useState(false)
  const [loading, setLoading] = useState(true)
  const [formData, setFormData] = useState<Shipment>({
    name: '',
    id: '',
    supply: '',
    initLoc: '',
    finalLoc: '',
    date: ''
  })

  // IMPORTANT: Change this to your backend URL
  const API_URL = 'http://localhost:5000/api'

  // Fetch shipments when component loads
  useEffect(() => {
    fetchShipments()
  }, [])

  const fetchShipments = async () => {
    try {
      console.log('Fetching shipments from:', `${API_URL}/shipments`)
      const response = await fetch(`${API_URL}/shipments`)
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const data = await response.json()
      console.log('Fetched shipments:', data)
      setShipments(data)
    } catch (error) {
      console.error('Error fetching shipments:', error)
      alert('Failed to fetch shipments. Make sure backend is running on port 5000')
    } finally {
      setLoading(false)
    }
  }

  const buttonStyle: React.CSSProperties = {
    fontFamily: 'doto, sans-serif',
    fontSize: 'clamp(12px, 1.5vw, 14px)',
    fontWeight: '600',
    padding: '8px 18px',
    border: '2px solid rgba(255,255,255,0.3)',
    borderRadius: '20px',
    backgroundColor: 'rgba(0,0,0,0.8)',
    color: '#fff',
    cursor: 'pointer',
    transition: 'all 0.3s ease'
  }

  const inputStyle: React.CSSProperties = {
    width: '100%',
    fontFamily: '"Source Code Pro", monospace',
    fontSize: 'clamp(13px, 1.6vw, 15px)',
    fontWeight: 500,
    letterSpacing: '0.02em',
    padding: '10px 16px',
    border: '2px solid rgba(255, 255, 255, 0.15)',
    borderRadius: '12px',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    color: 'rgb(255, 255, 255)',
    outline: 'none'
  }

  const handleLogout = () => {
    window.location.href = '/'
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async () => {
    console.log('🔵 Submit button clicked!')
    console.log('🔵 Form data:', formData)
    
    const { name, id, supply, initLoc, finalLoc, date } = formData
    
    // Validate all fields are filled
    if (name.trim() && id.trim() && supply.trim() && initLoc.trim() && finalLoc.trim() && date.trim()) {
      console.log('🔵 Validation passed, making API call...')
      
      try {
        const response = await fetch(`${API_URL}/shipments`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData)
        })

        console.log('🔵 Response status:', response.status)

        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.error || 'Failed to create shipment')
        }

        const newShipment = await response.json()
        console.log('✅ Shipment created:', newShipment)
        
        // Add to local state
        setShipments(prev => [...prev, newShipment])
        
        // Reset form
        setFormData({
          name: '',
          id: '',
          supply: '',
          initLoc: '',
          finalLoc: '',
          date: ''
        })
        setShowForm(false)
        alert('Shipment created successfully!')
        
      } catch (error) {
        console.error('❌ Error creating shipment:', error)
        alert(`Failed to create shipment: ${error instanceof Error ? error.message : 'Unknown error'}`)
      }
    } else {
      console.log('❌ Validation failed - missing fields')
      alert('Please fill all fields')
    }
  }

  const handleDelete = async (shipmentId: string) => {
    if (!confirm('Are you sure you want to delete this shipment?')) {
      return
    }

    try {
      const response = await fetch(`${API_URL}/shipments/${shipmentId}`, {
        method: 'DELETE'
      })

      if (!response.ok) {
        throw new Error('Failed to delete shipment')
      }

      setShipments(prev => prev.filter(s => s.id !== shipmentId))
      alert('Shipment deleted successfully!')
    } catch (error) {
      console.error('Error deleting shipment:', error)
      alert('Failed to delete shipment')
    }
  }

  return (
    <div className="min-h-screen w-full bg-[#0f0f0f] relative text-white">
      {/* Small Grid Pattern */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, #262626 1px, transparent 1px),
            linear-gradient(to bottom, #262626 1px, transparent 1px)
          `,
          backgroundSize: "20px 20px",
        }}
      />
      
      {/* Content */}
      <section className="flex items-center justify-center px-4 relative z-10" style={{ minHeight: '100vh', paddingTop: '40px', paddingBottom: '40px' }}>
        <div className="max-w-[1200px] w-full">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
            <h1 style={{ fontFamily: '"Orbitron", sans-serif', fontSize: 'clamp(1.5rem, 2.8vw, 2rem)', color: 'rgb(242,242,242)', fontWeight: 700 }}>Shipments</h1>
            <div style={{ display: 'flex', gap: '12px' }}>
              <button onClick={() => setShowForm(true)} style={buttonStyle}>Create Shipment</button>
              <button onClick={handleLogout} style={buttonStyle}>Logout</button>
            </div>
          </div>

          {/* Create Shipment Form Card */}
          {showForm && (
            <div style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.8)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 100,
              padding: '20px'
            }}>
              <div style={{
                backgroundColor: '#0f0f0f',
                border: '2.5px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '20px',
                padding: 'clamp(24px, 4vw, 40px)',
                maxWidth: '600px',
                width: '100%',
                maxHeight: '90vh',
                overflowY: 'auto'
              }}>
                <h2 style={{ 
                  fontFamily: '"Orbitron", sans-serif', 
                  fontSize: 'clamp(1.2rem, 2.2vw, 1.5rem)', 
                  color: '#fff', 
                  fontWeight: 700,
                  marginBottom: '24px',
                  textAlign: 'center'
                }}>Create New Shipment</h2>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div>
                    <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', fontFamily: '"Source Code Pro", monospace', color: 'rgba(255, 255, 255, 0.7)' }}>SHIPMENT NAME</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="e.g., Medical Supplies"
                      style={inputStyle}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', fontFamily: '"Source Code Pro", monospace', color: 'rgba(255, 255, 255, 0.7)' }}>SHIPMENT ID</label>
                    <input
                      type="text"
                      name="id"
                      value={formData.id}
                      onChange={handleInputChange}
                      placeholder="e.g., SH001"
                      style={inputStyle}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', fontFamily: '"Source Code Pro", monospace', color: 'rgba(255, 255, 255, 0.7)' }}>SUPPLY TYPE</label>
                    <input
                      type="text"
                      name="supply"
                      value={formData.supply}
                      onChange={handleInputChange}
                      placeholder="e.g., Vaccines"
                      style={inputStyle}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', fontFamily: '"Source Code Pro", monospace', color: 'rgba(255, 255, 255, 0.7)' }}>INITIAL LOCATION</label>
                    <input
                      type="text"
                      name="initLoc"
                      value={formData.initLoc}
                      onChange={handleInputChange}
                      placeholder="e.g., Mumbai"
                      style={inputStyle}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', fontFamily: '"Source Code Pro", monospace', color: 'rgba(255, 255, 255, 0.7)' }}>FINAL LOCATION</label>
                    <input
                      type="text"
                      name="finalLoc"
                      value={formData.finalLoc}
                      onChange={handleInputChange}
                      placeholder="e.g., Delhi"
                      style={inputStyle}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', fontFamily: '"Source Code Pro", monospace', color: 'rgba(255, 255, 255, 0.7)' }}>DATE</label>
                    <input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleInputChange}
                      style={inputStyle}
                    />
                  </div>

                  <div style={{ display: 'flex', gap: '12px', marginTop: '12px' }}>
                    <button onClick={handleSubmit} style={{ ...buttonStyle, flex: 1, padding: '12px' }}>Create</button>
                    <button onClick={() => setShowForm(false)} style={{ ...buttonStyle, flex: 1, padding: '12px', backgroundColor: 'rgba(255, 0, 0, 0.3)' }}>Cancel</button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Shipments Table */}
          {loading ? (
            <div style={{
              border: '2.5px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '20px',
              backgroundColor: 'rgba(0, 0, 0, 0.4)',
              padding: '60px 20px',
              textAlign: 'center'
            }}>
              <p style={{ fontFamily: '"Source Code Pro", monospace', fontSize: '16px', color: 'rgba(255, 255, 255, 0.5)' }}>
                Loading shipments...
              </p>
            </div>
          ) : shipments.length > 0 ? (
            <div style={{
              border: '2.5px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '20px',
              backgroundColor: 'rgba(0, 0, 0, 0.6)',
              padding: '12px',
              overflow: 'auto'
            }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ backgroundColor: 'rgba(255,255,255,0.04)', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                    <th style={{ textAlign: 'left', padding: '12px', fontFamily: '"Source Code Pro", monospace', fontSize: '13px', fontWeight: 600 }}>Name</th>
                    <th style={{ textAlign: 'left', padding: '12px', fontFamily: '"Source Code Pro", monospace', fontSize: '13px', fontWeight: 600 }}>ID</th>
                    <th style={{ textAlign: 'left', padding: '12px', fontFamily: '"Source Code Pro", monospace', fontSize: '13px', fontWeight: 600 }}>Supply</th>
                    <th style={{ textAlign: 'left', padding: '12px', fontFamily: '"Source Code Pro", monospace', fontSize: '13px', fontWeight: 600 }}>Ini. Loc.</th>
                    <th style={{ textAlign: 'left', padding: '12px', fontFamily: '"Source Code Pro", monospace', fontSize: '13px', fontWeight: 600 }}>Final Loc.</th>
                    <th style={{ textAlign: 'left', padding: '12px', fontFamily: '"Source Code Pro", monospace', fontSize: '13px', fontWeight: 600 }}>Date</th>
                    <th style={{ textAlign: 'center', padding: '12px', fontFamily: '"Source Code Pro", monospace', fontSize: '13px', fontWeight: 600 }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {shipments.map((s, i) => (
                    <tr key={s.id} style={{ borderBottom: i < shipments.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none' }}>
                      <td style={{ padding: '12px', fontFamily: '"Source Code Pro", monospace', fontSize: '14px' }}>{s.name}</td>
                      <td style={{ padding: '12px', fontFamily: '"Source Code Pro", monospace', fontSize: '14px' }}>{s.id}</td>
                      <td style={{ padding: '12px', fontFamily: '"Source Code Pro", monospace', fontSize: '14px' }}>{s.supply}</td>
                      <td style={{ padding: '12px', fontFamily: '"Source Code Pro", monospace', fontSize: '14px' }}>{s.initLoc}</td>
                      <td style={{ padding: '12px', fontFamily: '"Source Code Pro", monospace', fontSize: '14px' }}>{s.finalLoc}</td>
                      <td style={{ padding: '12px', fontFamily: '"Source Code Pro", monospace', fontSize: '14px' }}>{s.date}</td>
                      <td style={{ padding: '12px', textAlign: 'center' }}>
                        <button 
                          onClick={() => handleDelete(s.id)}
                          style={{
                            ...buttonStyle,
                            padding: '6px 12px',
                            fontSize: '12px',
                            backgroundColor: 'rgba(255, 0, 0, 0.3)',
                            border: '2px solid rgba(255, 0, 0, 0.5)'
                          }}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div style={{
              border: '2.5px dashed rgba(255, 255, 255, 0.2)',
              borderRadius: '20px',
              backgroundColor: 'rgba(0, 0, 0, 0.4)',
              padding: '60px 20px',
              textAlign: 'center'
            }}>
              <p style={{ fontFamily: '"Source Code Pro", monospace', fontSize: '16px', color: 'rgba(255, 255, 255, 0.5)' }}>
                No shipments yet. Click "Create Shipment" to add one.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}