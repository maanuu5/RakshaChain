import React, { useState } from 'react';
import { Camera, X, CheckCircle } from 'lucide-react';
import BarcodeScannerComponent from 'react-qr-barcode-scanner';

export default function CheckpointPage() {
  const [scanning, setScanning] = useState(false);
  const [scannedData, setScannedData] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

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
    transition: 'all 0.3s ease',
  };

  function isProbablyUrlOrDomain(code: string) {
    const urlPattern = /^(https?:\/\/)[^\s"']+$/i;
    const domainPattern = /^[\w.-]+\.[a-z]{2,}(\/.*)?$/i;
    if (urlPattern.test(code)) return code;
    if (domainPattern.test(code)) return 'https://' + code.replace(/^https?:\/\//, '');
    return null;
  }

  const handleNewScan = () => {
    setScannedData(null);
    setError(null);
    setScanning(true);
  };

  const handleLogout = () => {
    setScanning(false);
    window.location.href = '/';
  };

  return (
    <div className="min-h-screen w-full bg-[#0f0f0f] relative text-white">
      <div className="absolute inset-0 z-0"
        style={{
          backgroundImage: `linear-gradient(to right, #262626 1px, transparent 1px),linear-gradient(to bottom, #262626 1px, transparent 1px)`,
          backgroundSize: "20px 20px",
        }}
      />
      <section className="flex items-center justify-center px-4 relative z-10" style={{ minHeight: '100vh', paddingTop: '40px', paddingBottom: '40px' }}>
        <div className="max-w-[900px] w-full">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
            <h1 style={{ fontFamily: 'Orbitron, sans-serif', fontSize: 'clamp(1.5rem, 2.8vw, 2rem)', color: 'rgb(242,242,242)', fontWeight: 700 }}>Checkpoint Scanner</h1>
            <div style={{ display: 'flex', gap: '12px' }}>
              <button onClick={handleLogout} style={buttonStyle}>Logout</button>
            </div>
          </div>
          <div style={{ border: '2.5px solid rgba(255, 255, 255, 0.2)', borderRadius: '20px', backgroundColor: 'rgba(0, 0, 0, 0.6)', padding: 'clamp(24px, 4vw, 40px)', textAlign: 'center', minHeight: '420px' }}>
            {!scanning && !scannedData && (
              <div>
                <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '80px', height: '80px', borderRadius: '50%', backgroundColor: 'rgba(255, 255, 255, 0.1)', marginBottom: '24px' }}>
                  <Camera size={40} color="rgba(255, 255, 255, 0.7)" />
                </div>
                <h2 style={{ fontFamily: 'Orbitron, sans-serif', fontSize: 'clamp(1.2rem, 2.2vw, 1.5rem)', color: '#fff', fontWeight: 700, marginBottom: '12px' }}>Scan QR Code</h2>
                <p style={{ fontFamily: 'Source Code Pro, monospace', fontSize: '14px', color: 'rgba(255, 255, 255, 0.6)', marginBottom: '32px' }}>Click below to start live QR scanner</p>
                {error && (<div style={{ backgroundColor: 'rgba(255, 0, 0, 0.2)', border: '1px solid rgba(255, 0, 0, 0.4)', borderRadius: '12px', padding: '12px', marginBottom: '24px', fontFamily: 'Source Code Pro, monospace', fontSize: '13px', color: 'rgba(255, 100, 100, 1)' }}>{error}</div>)}
                <button onClick={()=>setScanning(true)} style={{ ...buttonStyle, padding: '14px 32px', fontSize: '16px', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                  <Camera size={20}/> Start Scanning
                </button>
              </div>
            )}
            {scanning && (
              <div>
                <div style={{ position: 'relative', maxWidth: '480px', margin: '0 auto', borderRadius: '16px', overflow: 'hidden', backgroundColor: '#000' }}>
                  <BarcodeScannerComponent
                    width={480}
                    height={320}
                    onUpdate={(err, result) => {
                      let qrText = null;
                      if (result && typeof result === 'object' && 'getText' in result && typeof result.getText === 'function') {
                        qrText = result.getText();
                      }
                      if (qrText) {
                        setScannedData(qrText);
                        const to = isProbablyUrlOrDomain(qrText);
                        if (to) window.location.href = to;
                      }
                      if (err) setError(typeof err === 'object' && err !== null && 'message' in err ? String((err as { message?: unknown }).message) : String(err));
                    }}
                  />
                </div>
                <button onClick={()=>setScanning(false)} style={{ ...buttonStyle, margin:'18px auto 0', backgroundColor: 'rgba(255, 0, 0, 0.3)', border: '2px solid rgba(255, 0, 0, 0.5)', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                  <X size={18} /> Cancel
                </button>
              </div>
            )}
            {scannedData && (
              <div>
                <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '80px', height: '80px', borderRadius: '50%', backgroundColor: 'rgba(0, 255, 0, 0.2)', marginBottom: '24px' }}>
                  <CheckCircle size={40} color="rgba(0, 255, 0, 1)" />
                </div>
                <h2 style={{ fontFamily: 'Orbitron, sans-serif', fontSize: 'clamp(1.2rem, 2.2vw, 1.5rem)', color: '#fff', fontWeight: 700, marginBottom: '12px' }}>QR Code Scanned!</h2>
                <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.15)', borderRadius: '12px', padding: '16px', marginTop: '24px', marginBottom: '24px', wordBreak: 'break-all' }}>
                  <p style={{ fontFamily: 'Source Code Pro, monospace', fontSize: '11px', color: 'rgba(255, 255, 255, 0.5)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '1px' }}>Scanned Data</p>
                  <p style={{ fontFamily: 'Source Code Pro, monospace', fontSize: '15px', color: '#fff' }}>{scannedData}</p>
                </div>
                <button onClick={handleNewScan} style={{ ...buttonStyle, padding: '14px 32px', fontSize: '16px', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                  <Camera size={20}/> Scan Another
                </button>
              </div>
            )}
          </div>
          <div style={{ marginTop: '24px', border: '2px dashed rgba(255, 255, 255, 0.15)', borderRadius: '16px', backgroundColor: 'rgba(0, 0, 0, 0.3)', padding: '20px', textAlign: 'center' }}>
            <p style={{ fontFamily: 'Source Code Pro, monospace', fontSize: '13px', color: 'rgba(255, 255, 255, 0.5)', lineHeight: '1.6' }}>
              Powered by <code style={{ color: '#69c' }}>react-qr-barcode-scanner</code> for bulletproof QR code detection and preview.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}