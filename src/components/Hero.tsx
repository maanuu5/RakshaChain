import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Hero() {
  const navigate = useNavigate();
  const textStyle: React.CSSProperties = {
    fontSize: 'clamp(1.2rem, 8vw, 3.5rem)',
    fontFamily: '"Orbitron", sans-serif',
    lineHeight: '1.1',
    fontWeight: '700',
    letterSpacing: '-0.02em',
    color: 'rgb(242, 242, 242)',
    marginBottom: '0'
  };

  const buttonStyle: React.CSSProperties = {
    fontFamily: 'doto, sans-serif',
    fontSize: 'clamp(12px, 3.5vw, 18px)',
    fontWeight: '500',
    letterSpacing: '-0.01em',
    padding: 'clamp(10px, 2.5vh, 12px) clamp(30px, 10vw, 60px)',
    border: '2.5px solid rgba(255, 255, 255, 0.3)',
    borderRadius: '32px',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    color: 'rgb(255, 255, 255)',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    textTransform: 'uppercase' as const,
    backdropFilter: 'blur(0.5px)',
    width: '100%',
    maxWidth: 'min(320px, 85vw)'
  };

  return (
    <section 
      className="flex items-center justify-center px-4"
      style={{ 
        minHeight: '100vh',
        height: '100vh',
        maxHeight: '100vh',
        overflow: 'hidden',
        paddingTop: 'clamp(80px, 15vh, 120px)',
        paddingBottom: 'clamp(40px, 8vh, 80px)'
      }}
    >
      <div 
        className="max-w-[1200px] w-full text-center flex flex-col justify-center" 
        style={{ 
          height: 'auto',
          maxHeight: 'calc(100vh - clamp(120px, 23vh, 200px))'
        }}
      >
        <h1 className="text-light" style={{ marginBottom: 'clamp(25px, 5vh, 60px)' }}>
          <span className="block" style={textStyle}>R A K S H A - C H A I N</span>
        </h1>
        
        <p 
          style={{
            marginTop: '0',
            fontFamily: '"Source Code Pro", monospace',
            fontSize: 'clamp(13px, 3.5vw, 22px)',
            fontWeight: 600,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: 'rgb(242, 242, 242)',
            marginBottom: 'clamp(12px, 3vh, 20px)'
          }}
        >
          Select Role
        </p>
        
        <div 
          className="flex flex-col justify-center items-center"
          style={{ 
            gap: 'clamp(10px, 2vh, 16px)',
            marginTop: '0'
          }}
        >
          <button 
            onClick={() => navigate('/login')}
            style={buttonStyle}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.5)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.4)';
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.3)';
            }}
          >
            Dispatch Officer
          </button>
          
          <button 
            onClick={() => {
              console.log('Navigating to checkpoint login');
              navigate('/checkpoint/login');
            }}
            style={buttonStyle}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.5)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.4)';
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.3)';
            }}
          >
            Checkpoint Officer
          </button>
          
          <button 
            style={buttonStyle}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.5)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.4)';
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.3)';
            }}
          >
            Receiving Officer
          </button>
        </div>
      </div>
    </section>
  );
}