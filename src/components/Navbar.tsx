import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <nav className="fixed top-5 z-50 py-4" style={{ left: 'clamp(12px, 3vw, 48px)', right: 'clamp(12px, 3vw, 48px)' }}>
      {/* Vignette overlay */}
      <div 
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '180px',
          background: 'linear-gradient(180deg, rgba(4, 4, 4, 0.95) 0%, rgba(4, 4, 4, 0.6) 45%, rgba(4, 4, 4, 0) 100%)',
          pointerEvents: 'none',
          zIndex: -1
        }}
      />
      <div className="max-w-[1600px] mx-auto flex items-center justify-between" style={{ padding: '0 clamp(8px, 2vw, 32px)' }}>
        <Link 
          to="/" 
          className="font-bold tracking-tight text-white"
          style={{ fontSize: 'clamp(16px, 4.5vw, 24px)' }}
        >
          CodeBlooded
        </Link>
        
        <button 
          className="font-medium tracking-wider text-white transition-all duration-200"
          style={{
            fontSize: 'clamp(10px, 2.8vw, 14px)',
            padding: 'clamp(10px, 2.5vw, 14px) clamp(12px, 3vw, 16px)',
            border: '1px solid white',
            borderRadius: '0.25rem',
            background: 'transparent',
            boxShadow: '0px 0px 0px 0px rgba(94, 234, 123, 0)',
            letterSpacing: '0.075rem',
            whiteSpace: 'nowrap'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(94, 234, 123, 0.05)'
            e.currentTarget.style.boxShadow = '6px 6px 0px 0px rgba(94, 234, 123, 0.7)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'transparent'
            e.currentTarget.style.boxShadow = '0px 0px 0px 0px rgba(94, 234, 123, 0)'
          }}
        >
          Zinnovatio 3.0
        </button>
      </div>
    </nav>
  )
}