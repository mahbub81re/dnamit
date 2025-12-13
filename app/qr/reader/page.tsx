"use client"
// components/QrScanner.js
import React, { useState } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import the Scanner component with ssr: false
const Scanner = dynamic(
  () => import('@yudiel/react-qr-scanner').then((mod) => mod.Scanner),
  {
    ssr: false, // This is CRITICAL for camera-based components in Next.js
  }
);

function QrScannerComponent() {
  const [scannedResult, setScannedResult] = useState('No result scanned yet');
  const [isScanning, setIsScanning] = useState(true);

  const handleScan = (result: string | any[]) => {
    if (result && result.length > 0) {
      // The result is an array of detected codes. We take the text from the first one.
      const decodedText = result[0].rawValue;
      setScannedResult(decodedText);
      setIsScanning(false); // Optionally stop scanning after a successful read
    }
  };

  // const handleError = (error: { message: any; }) => {
  //   console.error('QR Scanner Error:', error);
  //   // You can set a user-friendly error message here
  //   setScannedResult(`Error: ${error.message || 'Camera access failed.'}`);
  // };

  return (
    <div style={{ maxWidth: '500px', margin: 'auto', padding: '20px' }}>
      <h2>QR Code Scanner</h2>

      {isScanning && (
        <div style={{ border: '2px solid #333', borderRadius: '8px', overflow: 'hidden' }}>
          {/* The Scanner component is rendered here (client-side only) */}
          <Scanner
            onScan={handleScan}
 
            constraints={{ facingMode: 'environment' }} // Use rear camera
            allowMultiple={false} // Only scan one code at a time
          />
        </div>
      )}

      <p style={{ marginTop: '20px', fontSize: '1.1em', fontWeight: 'bold' }}>
        Scanned Result: <span style={{ color: scannedResult.startsWith('No') ? '#888' : 'green' }}>{scannedResult}</span>
      </p>

      {!isScanning && (
        <button 
          onClick={() => {
            setScannedResult('Scanning...');
            setIsScanning(true);
          }}
          style={{ padding: '10px 20px', backgroundColor: '#0070f3', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
        >
          Scan Another QR Code
        </button>
      )}
    </div>
  );
}

export default QrScannerComponent;