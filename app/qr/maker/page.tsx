"use client"
import { useQRCode } from 'next-qrcode';
import { useState } from 'react';

function App() {
  const { Canvas } = useQRCode();
 const [names , useName] = useState([
  {
    id: 1,
    name: "Md Mahbub Mollah",
    phone: "01301607901",
  },
    {
    id: 2,
    name: "Md Abdul Kadir Nahid",
    phone: "01301607901",
  }
  ,
    {
    id: 3,
    name: "Md Abdul Kadir Nahid",
    phone: "01301607901",
  }
  ,
    {
    id: 4,
    name: "Md Abdul Kadir Nahid",
    phone: "01301607901",
  }
  ,
    {
    id: 5,
    name: "Md Abdul Kadir Nahid",
    phone: "01301607901",
  }
  ,
    {
    id: 6,
    name: "Md Abdul Kadir Nahid",
    phone: "01301607901",
  }
 ])


  return (
    <div className='flex flex-row flex-wrap gap-4 justify-center items-center p-4'>
{names.map((n) => (
  <div key={n.id} style={{ marginBottom: '20px' }}>
    <h3>{n.name}</h3>
    <p>{n.id+n.name.split(" ").join("_")}</p>
    <Canvas
      text={`https://vercel.dnamit.com/profile/${n.id+n.name.split(" ").join("_")}`}
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