import React, { useState, useEffect, createContext, useContext } from 'react'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts'

const AppContext = createContext()
const useApp = () => useContext(AppContext)

const mockProducts = [
  { id: 'site-001', title: 'Enterprise SaaS Website', price: 25000, industry: 'SaaS', features: ['Multi-page','CMS','Billing Integration'], thumbnail: 'https://images.unsplash.com/photo-1526378724952-0b6d3f1d1b8f', premium: true },
  { id: 'site-002', title: 'Luxury Brand Portfolio', price: 12000, industry: 'Fashion', features: ['Animations','Filters','Gallery'], thumbnail: 'https://images.unsplash.com/photo-1506765515384-028b60a970df', premium: true },
  { id: 'site-003', title: 'Small Business Starter', price: 3500, industry: 'Retail', features: ['1-5 pages','Contact Form','SEO Basics'], thumbnail: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c', premium: false }
]

const currency = v => `$${Number(v).toLocaleString()}`

function Header(){ const { cart, setView } = useApp(); return (
  <header className="w-full border-b bg-gradient-to-r from-black via-gray-900 to-gray-800 text-white">
    <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="text-2xl font-extrabold tracking-tight">LuxSiteMarket</div>
        <nav className="hidden md:flex gap-4 text-sm opacity-90">
          <button onClick={()=>setView('home')} className="hover:underline">Home</button>
          <button onClick={()=>setView('products')} className="hover:underline">Products</button>
          <button onClick={()=>setView('about')} className="hover:underline">About</button>
          <button onClick={()=>setView('contact')} className="hover:underline">Contact</button>
        </nav>
      </div>

      <div className="flex items-center gap-4">
        <button onClick={()=>setView('dashboard')} className="hidden md:inline-block bg-white text-black px-4 py-2 rounded-2xl font-medium">Seller Dashboard</button>
        <button onClick={()=>setView('cart')} className="relative"><div className="bg-white/10 hover:bg-white/20 px-3 py-2 rounded-lg">Cart ({cart.length})</div></button>
      </div>
    </div>
  </header>
)}

function Footer(){ return (
  <footer className="w-full border-t mt-12 bg-white">
    <div className="max-w-7xl mx-auto px-6 py-8 text-gray-700">
      <div className="flex flex-col md:flex-row justify-between">
        <div><div className="font-bold">LuxSiteMarket</div><div className="text-sm mt-2">Premium websites for visionary businesses.</div></div>
        <div className="mt-6 md:mt-0 text-sm"><div>Contact: hello@luxsitemarket.com</div><div>Phone: +1 (555) 123-4567</div></div>
      </div>
      <div className="mt-6 text-xs text-gray-500">© {new Date().getFullYear()} LuxSiteMarket — All rights reserved.</div>
    </div>
  </footer>
)}

function Hero(){ const { setView } = useApp(); return (
  <section className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
    <div className="max-w-7xl mx-auto px-6 py-20 flex flex-col md:flex-row items-center gap-8">
      <div className="md:w-1/2">
        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">Luxury websites, enterprise results.</h1>
        <p className="mt-4 text-lg opacity-90">Buy ready-to-launch, high-converting websites built for growth — fully transferable, audited, and supported.</p>
        <div className="mt-8 flex gap-3">
          <button onClick={()=>setView('products')} style={{ backgroundColor: '#D4AF37', color: '#000' }} className="inline-block rounded-2xl px-6 py-3 font-semibold">Browse Premium Sites</button>
          <button onClick={()=>setView('contact')} className="rounded-2xl px-6 py-3 border border-white/20">Contact Sales</button>
        </div>
        <div className="mt-6 text-sm opacity-80">Trusted by brands worldwide. Secure payments: PayPal • Stripe • Crypto</div>
      </div>
      <div className="md:w-1/2"><div className="rounded-2xl overflow-hidden shadow-2xl border border-white/5"><img src={mockProducts[0].thumbnail} alt="showcase" className="w-full h-64 object-cover" /></div></div>
    </div>
    <div className="absolute right-6 bottom-6 text-xs opacity-40">Luxury package starting at $3,500</div>
  </section>
)}

function ProductCard({p}){ const { addToCart, openProduct } = useApp(); return (
  <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
    <img src={p.thumbnail} alt={p.title} className="w-full h-44 object-cover" />
    <div className="p-4">
      <div className="flex items-center justify-between"><h3 className="font-semibold">{p.title}</h3><div className="text-sm opacity-80">{currency(p.price)}</div></div>
      <div className="mt-2 text-sm opacity-80">{p.industry} • {p.features.slice(0,2).join(' • ')}</div>
      <div className="mt-4 flex gap-2"><button onClick={()=>openProduct(p)} className="px-3 py-2 border rounded-lg text-sm">Preview</button><button onClick={()=>addToCart(p)} className="ml-auto bg-black text-white px-3 py-2 rounded-lg text-sm">Buy Now</button></div>
    </div>
  </div>
)}

function ProductsView(){ const { products, query, setQuery, filterPremium } = useApp(); const results = products.filter(p => { if(filterPremium.get() && !p.premium) return false; if(!query) return true; const q = query.toLowerCase(); return (p.title + p.industry + p.features.join(' ')).toLowerCase().includes(q); }); return (
  <div className="max-w-7xl mx-auto px-6 py-12">
    <div className="flex items-center justify-between">
      <h2 className="text-2xl font-bold">Products</h2>
      <div className="flex items-center gap-3">
        <input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Smart search..." className="px-4 py-2 rounded-lg border" />
        <label className="flex items-center gap-2 text-sm"><input type="checkbox" onChange={e=>filterPremium.set(e.target.checked)} /> Premium Only</label>
      </div>
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">{results.map(p=> <ProductCard key={p.id} p={p} />)}</div>
  </div>
)}

function ProductModal({product,onClose}){ const { addToCart } = useApp(); if(!product) return null; return (
  <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-6">
    <div className="bg-white rounded-2xl w-full max-w-3xl overflow-hidden">
      <div className="p-6">
        <div className="flex items-start gap-6">
          <img src={product.thumbnail} className="w-48 h-32 object-cover rounded-lg" />
          <div>
            <h3 className="text-xl font-bold">{product.title}</h3>
            <div className="text-sm opacity-80 mt-2">{product.features.join(' • ')}</div>
            <div className="mt-4 text-2xl font-semibold">{currency(product.price)}</div>
            <div className="mt-6 flex gap-3">
              <button onClick={()=>{ addToCart(product); onClose(); }} className="bg-black text-white px-4 py-2 rounded-lg">Buy Now</button>
              <button onClick={onClose} className="px-4 py-2 border rounded-lg">Close</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
)}

function CartView(){ const { cart, removeFromCart, setView } = useApp(); const subtotal = cart.reduce((s,i)=>s+i.price,0); return (
  <div className="max-w-4xl mx-auto px-6 py-12">
    <h2 className="text-2xl font-bold">Cart</h2>
    {cart.length===0 ? <div className="mt-6">Your cart is empty. Browse products to add premium websites.</div> : (
      <div className="mt-6 space-y-4">
        {cart.map((c,idx)=>(<div key={idx} className="flex items-center gap-4 border rounded-lg p-4"><img src={c.thumbnail} className="w-24 h-16 object-cover rounded" /><div className="flex-1"><div className="font-semibold">{c.title}</div><div className="text-sm opacity-80">{c.industry}</div></div><div className="text-right"><div className="font-semibold">{currency(c.price)}</div><button onClick={()=>removeFromCart(c.id)} className="text-sm text-red-600 mt-2">Remove</button></div></div>))}
        <div className="flex items-center justify-between mt-4"><div className="font-semibold">Subtotal</div><div className="font-bold">{currency(subtotal)}</div></div>
        <div className="mt-6 flex gap-3"><button onClick={()=>setView('checkout')} className="bg-black text-white px-6 py-3 rounded-2xl">Proceed to Checkout</button><button onClick={()=>setView('products')} className="px-6 py-3 rounded-2xl border">Continue Shopping</button></div>
      </div>
    )}
  </div>
)}

function CheckoutView(){ const { cart, clearCart } = useApp(); const subtotal = cart.reduce((s,i)=>s+i.price,0);
  const handleStripe = async ()=> alert('Stripe checkout placeholder — implement server-side session creation.');
  const handlePayPal = async ()=> alert('PayPal checkout placeholder — implement server-side order creation.');
  const handleCrypto = async ()=> alert('Crypto payment placeholder — integrate provider.');
  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <h2 className="text-2xl font-bold">Checkout</h2>
      <div className="mt-6 bg-white rounded-2xl shadow p-6">
        <div className="space-y-3">
          <div className="flex justify-between"><div>Items</div><div>{cart.length} items</div></div>
          <div className="flex justify-between"><div>Subtotal</div><div>{currency(subtotal)}</div></div>
          <div className="flex justify-between border-t pt-3"><div className="font-semibold">Total</div><div className="font-bold">{currency(subtotal)}</div></div>
        </div>
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
          <button onClick={handleStripe} className="col-span-1 sm:col-span-3 bg-indigo-600 text-white px-4 py-3 rounded-lg">Pay with Card (Stripe)</button>
          <button onClick={handlePayPal} className="col-span-1 sm:col-span-3 border px-4 py-3 rounded-lg">Pay with PayPal</button>
          <button onClick={handleCrypto} className="col-span-1 sm:col-span-3 border px-4 py-3 rounded-lg">Pay with Crypto</button>
        </div>
        <div className="mt-6 text-sm opacity-70">Payments are secured with TLS/SSL. For production, complete server-side integration for Stripe, PayPal, and a crypto gateway.</div>
        <div className="mt-6 flex gap-3"><button onClick={()=>{ clearCart(); alert('Order created (demo) — integrate webhooks for real orders.') }} className="px-4 py-2 bg-green-600 text-white rounded-lg">Simulate Order (Demo)</button></div>
      </div>
    </div>
  )
}

function AboutView(){ return (
  <div className="max-w-6xl mx-auto px-6 py-12">
    <h2 className="text-2xl font-bold">About Us</h2>
    <p className="mt-4 text-lg opacity-80">We build and curate premium websites for entrepreneurs and enterprises. Transferable ownership, clean code, and white-glove support.</p>
    <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-white rounded-2xl p-6 shadow"><h3 className="font-semibold">Our Mission</h3><p className="mt-2 text-sm opacity-80">Deliver enterprise-grade websites that accelerate growth.</p></div>
      <div className="bg-white rounded-2xl p-6 shadow"><h3 className="font-semibold">The Team</h3><p className="mt-2 text-sm opacity-80">Designers, engineers, and growth strategists focused on conversion.</p></div>
      <div className="bg-white rounded-2xl p-6 shadow"><h3 className="font-semibold">Support</h3><p className="mt-2 text-sm opacity-80">Priority support, migration, and optional managed hosting.</p></div>
    </div>
  </div>
)}

function ContactView(){ return (
  <div className="max-w-4xl mx-auto px-6 py-12">
    <h2 className="text-2xl font-bold">Contact</h2>
    <form className="mt-6 grid grid-cols-1 gap-4">
      <input placeholder="Your name" className="px-4 py-3 rounded-lg border" />
      <input placeholder="Email" className="px-4 py-3 rounded-lg border" />
      <input placeholder="Phone (optional)" className="px-4 py-3 rounded-lg border" />
      <textarea placeholder="Message" className="px-4 py-3 rounded-lg border" rows={6} />
      <div className="flex gap-3"><button className="bg-black text-white px-6 py-3 rounded-2xl">Send Message</button><button className="px-6 py-3 rounded-2xl border">Request Demo</button></div>
    </form>
    <div className="mt-8 text-sm opacity-80">Office: 123 Luxury Ave, Suite 100 • Email: hello@luxsitemarket.com</div>
  </div>
)}

function AdminDashboard(){ const salesData = [{date:'2025-05-01', revenue:12000},{date:'2025-06-01', revenue:18000},{date:'2025-07-01', revenue:14000},{date:'2025-08-01', revenue:28000},{date:'2025-09-01', revenue:32000}]; const topProducts=[{name:'Enterprise SaaS Website', sold:3},{name:'Luxury Brand Portfolio', sold:5},{name:'Small Business Starter', sold:12}]; return (
  <div className="max-w-6xl mx-auto px-6 py-12">
    <h2 className="text-2xl font-bold">Admin Dashboard</h2>
    <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="bg-white rounded-2xl p-6 shadow"><div className="text-sm opacity-70">Total Revenue (YTD)</div><div className="mt-2 text-2xl font-bold">$98,000</div></div>
      <div className="bg-white rounded-2xl p-6 shadow"><div className="text-sm opacity-70">Orders</div><div className="mt-2 text-2xl font-bold">23</div></div>
      <div className="bg-white rounded-2xl p-6 shadow"><div className="text-sm opacity-70">Conversion Rate</div><div className="mt-2 text-2xl font-bold">2.7%</div></div>
    </div>

    <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="bg-white rounded-2xl p-6 shadow">
        <h3 className="font-semibold">Revenue (Monthly)</h3>
        <div style={{ width: '100%', height: 250 }}>
          <ResponsiveContainer><LineChart data={salesData}><XAxis dataKey="date"/><YAxis/><Tooltip/><Line type="monotone" dataKey="revenue" stroke="#8884d8" strokeWidth={3}/></LineChart></ResponsiveContainer>
        </div>
      </div>
      <div className="bg-white rounded-2xl p-6 shadow">
        <h3 className="font-semibold">Top Selling Products</h3>
        <div style={{ width: '100%', height: 250 }}>
          <ResponsiveContainer><BarChart data={topProducts} layout="vertical"><XAxis type="number"/><YAxis dataKey="name" type="category" width={150}/><Tooltip/><Bar dataKey="sold" barSize={18}/></BarChart></ResponsiveContainer>
        </div>
      </div>
    </div>

    <div className="mt-8 bg-white rounded-2xl p-6 shadow">
      <h3 className="font-semibold">Recent Orders</h3>
      <table className="w-full mt-4 text-sm"><thead className="text-left text-xs text-gray-500"><tr><th className="pb-2">Order ID</th><th className="pb-2">Product</th><th className="pb-2">Amount</th><th className="pb-2">Payment</th></tr></thead><tbody><tr className="border-t"><td className="py-3">#1001</td><td>Luxury Brand Portfolio</td><td>$12,000</td><td>Stripe</td></tr><tr className="border-t"><td className="py-3">#1002</td><td>Small Business Starter</td><td>$3,500</td><td>PayPal</td></tr><tr className="border-t"><td className="py-3">#1003</td><td>Enterprise SaaS Website</td><td>$25,000</td><td>Crypto (ETH)</td></tr></tbody></table>
    </div>
  </div>
)}

function CustomerDashboard(){ const purchases=[{id:'1002', title:'Small Business Starter', date:'2025-07-12', download:'#'}]; return (
  <div className="max-w-6xl mx-auto px-6 py-12">
    <h2 className="text-2xl font-bold">My Account</h2>
    <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-white rounded-2xl p-6 shadow"><div className="font-semibold">My Purchases</div><div className="mt-2 text-sm opacity-80">{purchases.length} items</div></div>
      <div className="bg-white rounded-2xl p-6 shadow"><div className="font-semibold">Earnings</div><div className="mt-2 text-sm opacity-80">If you're a seller, see admin dashboard for payouts.</div></div>
      <div className="bg-white rounded-2xl p-6 shadow"><div className="font-semibold">Support</div><div className="mt-2 text-sm opacity-80">Open tickets and responses.</div></div>
    </div>
    <div className="mt-8 bg-white rounded-2xl p-6 shadow"><h3 className="font-semibold">Purchases</h3><ul className="mt-4">{purchases.map(p=>(<li key={p.id} className="flex items-center justify-between border-t py-3"><div><div className="font-semibold">{p.title}</div><div className="text-sm opacity-80">Purchased {p.date}</div></div><div><a className="px-4 py-2 border rounded-lg">Download</a></div></li>))}</ul></div>
  </div>
)}

export default function App(){ const [products] = useState(mockProducts); const [cart, setCart] = useState([]); const [view, setView] = useState('home'); const [query, setQuery] = useState(''); const [filterPremiumFlag, setFilterPremiumFlag] = useState(false); const [productModal, setProductModal] = useState(null);

  useEffect(()=>{},[])
  const addToCart = p => setCart(prev=>[...prev,p])
  const removeFromCart = id => setCart(prev=>prev.filter(i=>i.id!==id))
  const clearCart = () => setCart([])
  const openProduct = p => setProductModal(p)

  const contextValue = { products, cart, addToCart, removeFromCart, clearCart, view, setView, query, setQuery, filterPremium: { get: () => filterPremiumFlag, set: (v) => setFilterPremiumFlag(v) }, openProduct }

  return (
    <AppContext.Provider value={contextValue}>
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white text-gray-900">
        <Header />
        <main>
          {view==='home' && <><Hero /><section className="max-w-7xl mx-auto px-6 py-12"><h2 className="text-2xl font-bold">Featured Sites</h2><div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">{products.map(p=><ProductCard key={p.id} p={p} />)}</div></section></>}
          {view==='products' && <ProductsView/>}
          {view==='about' && <AboutView/>}
          {view==='contact' && <ContactView/>}
          {view==='cart' && <CartView/>}
          {view==='checkout' && <CheckoutView/>}
          {view==='dashboard' && <AdminDashboard/>}
          {view==='account' && <CustomerDashboard/>}
        </main>
        <Footer />
        {productModal && <ProductModal product={productModal} onClose={() => setProductModal(null)} />}
      </div>
    </AppContext.Provider>
  )
}
