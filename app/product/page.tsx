"use client";


export default function Home() {
  // আপনার ওয়েবসাইটের ডোমেইন ইউআরএল (লোকালহোস্টের জন্য এটি)

const products = [
  {
    "id": "1",
    "name": "মিনিকেট চাল (৫ কেজি)",
    "price": 350,
    "image": "https://via.placeholder.com/150",
    "category": "Rice"
  },
  {
    "id": "2",
    "name": "সয়াবিন তেল (২ লিটার)",
    "price": 380,
    "image": "https://via.placeholder.com/150",
    "category": "Oil"
  }
]
  return (
    <main className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-10 text-green-700">আমাদের মুদি বাজার</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product.id} className="bg-white p-6 rounded-2xl shadow-md border flex flex-col items-center">
            <img src={product.image} alt={product.name} className="w-32 h-32 object-cover mb-4 rounded" />
            <h2 className="text-xl font-semibold">{product.name}</h2>
            <p className="text-gray-600 mb-4">মূল্য: ৳{product.price}</p>
            
            <div className="bg-gray-100 p-3 rounded-lg mb-2">
              {/* QR Code generator */}
       
            </div>
            <p className="text-xs text-gray-400">অর্ডার করতে স্ক্যান করুন</p>
          </div>
        ))}
      </div>
    </main>
  );
}