import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function LoginPage() {
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const buttonStyle: React.CSSProperties = {
    fontFamily: 'doto, sans-serif',
    fontSize: 'clamp(14px, 1.8vw, 18px)',
    fontWeight: '500',
    letterSpacing: '-0.01em',
    padding: 'clamp(10px, 1.5vh, 12px) clamp(40px, 8vw, 60px)',
    border: '2.5px solid rgba(255, 255, 255, 0.3)',
    borderRadius: '32px',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    color: 'rgb(255, 255, 255)',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    textTransform: 'uppercase' as const,
    backdropFilter: 'blur(0.5px)',
    width: '100%',
    maxWidth: 'clamp(260px, 80vw, 320px)'
  }

  const handleLogin = () => {
    if (username === 'admin' && password === 'admin123') {
      sessionStorage.setItem('isLoggedIn', 'true')
      setError('')
      navigate('/dispatch')
    } else {
      setError('Invalid credentials')
    }
  }

  return (
    <section className="flex items-center justify-center px-4" style={{ minHeight: '100vh' }}>
      <div className="max-w-[480px] w-full text-center">
        <h1 className="text-light" style={{ marginBottom: 'clamp(24px, 5vh, 40px)', fontFamily: '"Orbitron", sans-serif', fontSize: 'clamp(1.5rem, 3.5vw, 2.2rem)', fontWeight: 700 }}>
          Dispatch Login
        </h1>

        <div style={{ width: '100%' }}>
          <div style={{ marginBottom: '18px' }}>
            <input
              type="text"
              placeholder="USERNAME"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
              style={{
                width: '100%',
                fontFamily: '"Source Code Pro", monospace',
                fontSize: 'clamp(14px, 1.8vw, 16px)',
                fontWeight: 600,
                letterSpacing: '0.05em',
                padding: 'clamp(12px, 1.5vh, 14px) clamp(20px, 4vw, 24px)',
                border: '2.5px solid rgba(255, 255, 255, 0.3)',
                borderRadius: '32px',
                backgroundColor: 'rgba(0, 0, 0, 0.4)',
                color: 'rgb(255, 255, 255)',
                outline: 'none',
                textTransform: 'uppercase'
              }}
            />
          </div>

          <div style={{ marginBottom: '22px' }}>
            <input
              type="password"
              placeholder="PASSWORD"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
              style={{
                width: '100%',
                fontFamily: '"Source Code Pro", monospace',
                fontSize: 'clamp(14px, 1.8vw, 16px)',
                fontWeight: 600,
                letterSpacing: '0.05em',
                padding: 'clamp(12px, 1.5vh, 14px) clamp(20px, 4vw, 24px)',
                border: '2.5px solid rgba(255, 255, 255, 0.3)',
                borderRadius: '32px',
                backgroundColor: 'rgba(0, 0, 0, 0.4)',
                color: 'rgb(255, 255, 255)',
                outline: 'none',
                textTransform: 'uppercase'
              }}
            />
          </div>

          {error && (
            <p style={{ fontFamily: '"Source Code Pro", monospace', fontSize: '14px', color: '#ff6b6b', marginBottom: '18px' }}>
              {error}
            </p>
          )}

          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
            <button onClick={handleLogin} style={buttonStyle}>Login</button>
            <button onClick={() => navigate('/')} style={{ ...buttonStyle, maxWidth: '120px' }}>Back</button>
          </div>
        </div>
      </div>
    </section>
  )
}
