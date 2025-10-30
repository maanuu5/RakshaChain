import React, { useState, useRef, useEffect } from 'react'
import { Camera, X, CheckCircle } from 'lucide-react'
import jsQR from 'jsqr'

export default function CheckpointPage() {
  const [scanning, setScanning] = useState(false)
  const [scannedData, setScannedData] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const scanningRef = useRef(false)

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

  const handleLogout = () => {
    stopCamera()
    window.location.href = '/'
  }

  const startCamera = async () => {
    try {
      setError(null)
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { 
          facingMode: 'environment',
          width: { ideal: 1280 },
          height: { ideal: 720 }
        }
      })
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        streamRef.current = stream
        scanningRef.current = true
        setScanning(true)
        
        // Wait for video to be ready
        videoRef.current.onloadedmetadata = () => {
          videoRef.current?.play()
          scanQRCode()
        }
      }
    } catch (err) {
      setError('Failed to access camera. Please grant camera permissions.')
      console.error('Camera error:', err)
    }
  }

  const stopCamera = () => {
    scanningRef.current = false
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop())
      streamRef.current = null
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null
    }
    setScanning(false)
  }

  const scanQRCode = () => {
    if (!scanningRef.current || !videoRef.current || !canvasRef.current) return

    const video = videoRef.current
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')

    if (!ctx || video.readyState !== video.HAVE_ENOUGH_DATA) {
      requestAnimationFrame(scanQRCode)
      return
    }

    canvas.width = video.videoWidth
    canvas.height = video.videoHeight
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height)

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
    
    try {
      const code = jsQR(imageData.data, imageData.width, imageData.height, {
        inversionAttempts: "dontInvert",
      })
      
      if (code && code.data) {
        console.log('QR Code detected:', code.data)
        setScannedData(code.data)
        stopCamera()
        return
      }
      
      requestAnimationFrame(scanQRCode)
    } catch (err) {
      console.error('QR scan error:', err)
      requestAnimationFrame(scanQRCode)
    }
  }

  useEffect(() => {
    return () => {
      stopCamera()
    }
  }, [])

  const handleNewScan = () => {
    setScannedData(null)
    startCamera()
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
        <div className="max-w-[900px] w-full">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
            <h1 style={{ fontFamily: '"Orbitron", sans-serif', fontSize: 'clamp(1.5rem, 2.8vw, 2rem)', color: 'rgb(242,242,242)', fontWeight: 700 }}>Checkpoint Scanner</h1>
            <div style={{ display: 'flex', gap: '12px' }}>
              <button onClick={handleLogout} style={buttonStyle}>Logout</button>
            </div>
          </div>

          {/* Scanner Card */}
          <div style={{
            border: '2.5px solid rgba(255, 255, 255, 0.2)',
            borderRadius: '20px',
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
            padding: 'clamp(24px, 4vw, 40px)',
            textAlign: 'center'
          }}>
            {!scanning && !scannedData && (
              <div>
                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '80px',
                  height: '80px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  marginBottom: '24px'
                }}>
                  <Camera size={40} color="rgba(255, 255, 255, 0.7)" />
                </div>
                
                <h2 style={{ 
                  fontFamily: '"Orbitron", sans-serif', 
                  fontSize: 'clamp(1.2rem, 2.2vw, 1.5rem)', 
                  color: '#fff', 
                  fontWeight: 700,
                  marginBottom: '12px'
                }}>Scan QR Code</h2>
                
                <p style={{
                  fontFamily: '"Source Code Pro", monospace',
                  fontSize: '14px',
                  color: 'rgba(255, 255, 255, 0.6)',
                  marginBottom: '32px'
                }}>
                  Click the button below to start scanning
                </p>

                {error && (
                  <div style={{
                    backgroundColor: 'rgba(255, 0, 0, 0.2)',
                    border: '1px solid rgba(255, 0, 0, 0.4)',
                    borderRadius: '12px',
                    padding: '12px',
                    marginBottom: '24px',
                    fontFamily: '"Source Code Pro", monospace',
                    fontSize: '13px',
                    color: 'rgba(255, 100, 100, 1)'
                  }}>
                    {error}
                  </div>
                )}

                <button 
                  onClick={startCamera}
                  style={{
                    ...buttonStyle,
                    padding: '14px 32px',
                    fontSize: '16px',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}
                >
                  <Camera size={20} />
                  Start Scanning
                </button>
              </div>
            )}

            {scanning && (
              <div>
                <div style={{
                  position: 'relative',
                  maxWidth: '600px',
                  margin: '0 auto',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  backgroundColor: '#000'
                }}>
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    style={{
                      width: '100%',
                      height: 'auto',
                      display: 'block'
                    }}
                  />
                  
                  {/* Scanning overlay */}
                  <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '250px',
                    height: '250px',
                    border: '3px solid rgba(0, 255, 0, 0.6)',
                    borderRadius: '16px',
                    boxShadow: '0 0 0 9999px rgba(0, 0, 0, 0.5)'
                  }}>
                    <div style={{
                      position: 'absolute',
                      top: '-3px',
                      left: '-3px',
                      width: '30px',
                      height: '30px',
                      borderTop: '4px solid #00ff00',
                      borderLeft: '4px solid #00ff00'
                    }} />
                    <div style={{
                      position: 'absolute',
                      top: '-3px',
                      right: '-3px',
                      width: '30px',
                      height: '30px',
                      borderTop: '4px solid #00ff00',
                      borderRight: '4px solid #00ff00'
                    }} />
                    <div style={{
                      position: 'absolute',
                      bottom: '-3px',
                      left: '-3px',
                      width: '30px',
                      height: '30px',
                      borderBottom: '4px solid #00ff00',
                      borderLeft: '4px solid #00ff00'
                    }} />
                    <div style={{
                      position: 'absolute',
                      bottom: '-3px',
                      right: '-3px',
                      width: '30px',
                      height: '30px',
                      borderBottom: '4px solid #00ff00',
                      borderRight: '4px solid #00ff00'
                    }} />
                  </div>
                </div>

                <p style={{
                  fontFamily: '"Source Code Pro", monospace',
                  fontSize: '14px',
                  color: 'rgba(255, 255, 255, 0.6)',
                  marginTop: '20px',
                  marginBottom: '20px'
                }}>
                  Position the QR code within the frame
                </p>

                <button 
                  onClick={stopCamera}
                  style={{
                    ...buttonStyle,
                    backgroundColor: 'rgba(255, 0, 0, 0.3)',
                    border: '2px solid rgba(255, 0, 0, 0.5)',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}
                >
                  <X size={18} />
                  Cancel
                </button>
              </div>
            )}

            {scannedData && (
              <div>
                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '80px',
                  height: '80px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(0, 255, 0, 0.2)',
                  marginBottom: '24px'
                }}>
                  <CheckCircle size={40} color="rgba(0, 255, 0, 1)" />
                </div>
                
                <h2 style={{ 
                  fontFamily: '"Orbitron", sans-serif', 
                  fontSize: 'clamp(1.2rem, 2.2vw, 1.5rem)', 
                  color: '#fff', 
                  fontWeight: 700,
                  marginBottom: '12px'
                }}>QR Code Scanned!</h2>
                
                <div style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  borderRadius: '12px',
                  padding: '16px',
                  marginTop: '24px',
                  marginBottom: '24px',
                  wordBreak: 'break-all'
                }}>
                  <p style={{
                    fontFamily: '"Source Code Pro", monospace',
                    fontSize: '11px',
                    color: 'rgba(255, 255, 255, 0.5)',
                    marginBottom: '8px',
                    textTransform: 'uppercase',
                    letterSpacing: '1px'
                  }}>
                    Scanned Data
                  </p>
                  <p style={{
                    fontFamily: '"Source Code Pro", monospace',
                    fontSize: '14px',
                    color: '#fff'
                  }}>
                    {scannedData}
                  </p>
                </div>

                <button 
                  onClick={handleNewScan}
                  style={{
                    ...buttonStyle,
                    padding: '14px 32px',
                    fontSize: '16px',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}
                >
                  <Camera size={20} />
                  Scan Another
                </button>
              </div>
            )}
          </div>

          <canvas ref={canvasRef} style={{ display: 'none' }} />

          {/* Info Card */}
          <div style={{
            marginTop: '24px',
            border: '2px dashed rgba(255, 255, 255, 0.15)',
            borderRadius: '16px',
            backgroundColor: 'rgba(0, 0, 0, 0.3)',
            padding: '20px',
            textAlign: 'center'
          }}>
            <p style={{
              fontFamily: '"Source Code Pro", monospace',
              fontSize: '13px',
              color: 'rgba(255, 255, 255, 0.5)',
              lineHeight: '1.6'
            }}>
              Fully functional QR scanner powered by <code style={{ color: 'rgba(0, 255, 0, 0.7)' }}>jsQR</code> library
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}