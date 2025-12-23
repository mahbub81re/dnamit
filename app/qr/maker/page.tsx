"use client"
import { useQRCode } from 'next-qrcode';
import { useState } from 'react';

function App() {
  const { Canvas } = useQRCode();
 const [names , useName] = useState([
  {
    id: "694a40bc596f5b4548de0a8e",
    name: "Md Mahbub Mollah",
    phone: "01301607901sdf",
  }

 ])


  return (
    <div className='flex flex-row flex-wrap gap-4 justify-center items-center p-4'>
{names.map((n) => (
  <div key={n.id} style={{ marginBottom: '20px' }}>
    <h3>{n.name}</h3>
    <p>{n.id+n.name.split(" ").join("_")}</p>
    <Canvas
      text={`https://vercel.dnamit.com/profile/${n.id}`}
      options={{
        errorCorrectionLevel: 'M',
        margin: 3,
        scale: 4,
        width: 200,
        color: {
          dark: '#000000ff',
          light: '#ffffffff',
        },
      }}
    />
  </div>
))}

   </div>
  );
}

export default App;