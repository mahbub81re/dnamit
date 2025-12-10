"use client"
import { useQRCode } from 'next-qrcode';
import { useState } from 'react';

function App() {
  const { Canvas } = useQRCode();
 const [name , useName] = useState("")


  return (
    <>
    <Canvas
      text={`https://vercel.dnamit.com/profile/${name}`}
      options={{
        errorCorrectionLevel: 'M',
        margin: 3,
        scale: 4,
        width: 200,
        color: {
          dark: '#010599FF',
          light: '#FFBF60FF',
        },
      }}
    />
     <input type="text" value={name} onChange={(e) => useName(e.target.value)} />
   </>
  );
}

export default App;