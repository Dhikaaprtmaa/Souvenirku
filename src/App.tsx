import { useMemo, useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import ShopSection from './components/ShopSection'
import ProductDetail from './components/ProductDetail'
import CartDrawer from './components/CartDrawer'
import CheckoutForm from './components/CheckoutForm'
import AdminPanel from './components/AdminPanel'
import { loadCategories, loadProducts } from './data/localDatabase'
import type { Category, Product } from './data/products'
import { createOrder } from './lib/supabase'

export type CartItem = {
  id: number
  name: string
  price: number
  image: string
  qty: number
}

export default function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [cartOpen, setCartOpen] = useState(false)
  const [checkoutOpen, setCheckoutOpen] = useState(false)
  const [checkoutLoading, setCheckoutLoading] = useState(false)
  const [checkoutSuccess, setCheckoutSuccess] = useState<string | null>(null)
  const [checkoutError, setCheckoutError] = useState<string | null>(null)
  
  // State Navigasi Halaman
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [selectedCatLabel, setSelectedCatLabel] = useState<string>('')
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const [categories, setCategories] = useState<Category[]>(() => loadCategories())
  const [products, setProducts] = useState<Product[]>(() => loadProducts())
  const [activeView, setActiveView] = useState<'home' | 'help' | 'collection' | 'admin'>('home')

  const categoriesWithCount = useMemo(
    () => categories.map(category => ({
      ...category,
      count: products.filter(product => product.category === category.id).length,
    })),
    [categories, products]
  )

  const addToCart = (item: Omit<CartItem, 'qty'>) => {
    setCartItems(prev => {
      const existing = prev.find(i => i.id === item.id)
      if (existing) return prev.map(i => i.id === item.id ? { ...i, qty: i.qty + 1 } : i)
      return [...prev, { ...item, qty: 1 }]
    })
    setCartOpen(true)
  }


  const handleProceedToCheckout = () => {
    setCheckoutOpen(true)
    setCartOpen(false)
  }

  const handleSubmitOrder = async (payload: {
    customer_name: string
    phone: string
    email: string
    address: string
    note: string
  }) => {
    if (cartItems.length === 0) {
      setCheckoutError('Keranjang kosong. Tambahkan produk terlebih dahulu.')
      return
    }

    setCheckoutLoading(true)
    setCheckoutError(null)
    setCheckoutSuccess(null)

    const total = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0)
    const orderItems = cartItems.map(item => ({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      qty: item.qty,
    }))

const { data, error } = await createOrder({ ...payload, items: orderItems, total })

    setCheckoutLoading(false)

    if (error) {
      setCheckoutError(error.message || 'Gagal mengirim pesanan. Silakan coba lagi.')
      setCheckoutOpen(true)
      return
    }

    if (data) {
      setCheckoutSuccess('Pesanan berhasil dikirim. Terima kasih!')
      setCartItems([])
      setCheckoutOpen(false)
      setCartOpen(false)
      setTimeout(() => setCheckoutSuccess(null), 7000)
    }
  }

  const removeFromCart = (id: number) => setCartItems(prev => prev.filter(i => i.id !== id))

  const updateQty = (id: number, qty: number) => {
    if (qty <= 0) return removeFromCart(id)
    setCartItems(prev => prev.map(i => i.id === id ? { ...i, qty } : i))
  }

  const handleViewDetail = (product: Product) => {
    const catLabel = categoriesWithCount.find(cat => cat.id === product.category)?.label ?? ''
    setSelectedProduct(product)
    setSelectedCatLabel(catLabel)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const totalCount = cartItems.reduce((s, i) => s + i.qty, 0)
  const isProductDetail = Boolean(selectedProduct)
  const isDashboard = activeView === 'home' && !isProductDetail && !activeCategory

  const goHome = (resetCategory = true) => {
    setActiveView('home')
    setSelectedProduct(null)
    if (resetCategory) {
      setActiveCategory(null)
    }
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const goToHelpPage = () => {
    setActiveView('help')
    setSelectedProduct(null)
    setActiveCategory(null)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const goToCollectionPage = () => {
    setActiveView('collection')
    setSelectedProduct(null)
    setActiveCategory(null)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const goToAdminPage = () => {
    setActiveView('admin')
    setSelectedProduct(null)
    setActiveCategory(null)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--background)' }}>
      <Navbar 
        cartCount={totalCount} 
        onCartOpen={() => setCartOpen(true)} 
        onGoHome={() => goHome(true)}
        onGoToShop={() => {
          goToCollectionPage()
          setTimeout(() => {
            document.getElementById('shop')?.scrollIntoView({ behavior: 'smooth' })
          }, 100)
        }}
        onGoHelp={goToHelpPage}
        onGoAdmin={goToAdminPage}
      />
      
      {activeView === 'admin' ? (
        <AdminPanel
          categories={categoriesWithCount}
          products={products}
          onSaveCategories={setCategories}
          onSaveProducts={setProducts}
          onBack={() => goHome(false)}
        />
      ) : activeView === 'help' ? (
        <div className="page-transition" style={{ padding: '80px clamp(24px, 6vw, 80px)', minHeight: 'calc(100vh - 60px)', backgroundColor: 'var(--background)' }}>
          <div style={{ maxWidth: 920, margin: '0 auto' }}>
            <button
              onClick={() => goHome(false)}
              style={{ marginBottom: 24, padding: '12px 18px', backgroundColor: 'transparent', border: '1px solid var(--border)', color: 'var(--foreground)', cursor: 'pointer' }}
            >
              ← Kembali ke Dashboard
            </button>
            <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2rem, 3vw, 2.8rem)', fontWeight: 600, color: 'var(--foreground)', marginBottom: 18 }}>
              Cara Pesan
            </h1>
            <div style={{ display: 'grid', gap: 24 }}>
              <div>
                <h2 style={{ fontSize: 18, fontWeight: 600, color: 'var(--foreground)', marginBottom: 10 }}>1. Pilih Kategori</h2>
                <p style={{ fontSize: 14, lineHeight: 1.8, color: 'var(--muted-foreground)' }}>
                  Mulai dengan memilih kategori produk yang Anda suka lalu klik tombol kategori tersebut untuk melihat collection yang tersedia.
                </p>
              </div>
              <div>
                <h2 style={{ fontSize: 18, fontWeight: 600, color: 'var(--foreground)', marginBottom: 10 }}>2. Pilih Produk</h2>
                <p style={{ fontSize: 14, lineHeight: 1.8, color: 'var(--muted-foreground)' }}>
                  Klik produk untuk membuka detail lengkapnya. Anda dapat membaca deskripsi, spesifikasi, dan harga sebelum menambahkannya ke keranjang.
                </p>
              </div>
              <div>
                <h2 style={{ fontSize: 18, fontWeight: 600, color: 'var(--foreground)', marginBottom: 10 }}>3. Tambahkan ke Keranjang</h2>
                <p style={{ fontSize: 14, lineHeight: 1.8, color: 'var(--muted-foreground)' }}>
                  Tekan tombol “Tambah ke Keranjang” pada halaman detail produk. Produk akan otomatis ditambahkan dan keranjang akan terbuka jika Anda ingin meninjau pesanan.
                </p>
              </div>
              <div>
                <h2 style={{ fontSize: 18, fontWeight: 600, color: 'var(--foreground)', marginBottom: 10 }}>4. Checkout dan Hubungi Kami</h2>
                <p style={{ fontSize: 14, lineHeight: 1.8, color: 'var(--muted-foreground)' }}>
                  Lanjutkan proses checkout dari keranjang, atau hubungi kami langsung melalui WhatsApp jika Anda membutuhkan bantuan khusus.
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="page-transition" style={{ overflow: 'hidden' }}>
          {activeView === 'home' && !isProductDetail && (
            <Hero onShop={() => document.getElementById('shop')?.scrollIntoView({ behavior: 'smooth' })} />
          )}

          {/* Konten Utama Dinamis */}
          {selectedProduct ? (
            <ProductDetail 
              product={selectedProduct}
              categoryLabel={selectedCatLabel}
              onAddToCart={addToCart}
              onBack={() => {
                setSelectedProduct(null)
                setTimeout(() => {
                  document.getElementById('shop')?.scrollIntoView({ behavior: 'smooth' })
                }, 50)
              }}
            />
          ) : (
            <ShopSection 
              categories={categoriesWithCount}
              products={products}
              onAddToCart={addToCart} 
              onViewDetail={handleViewDetail}
              activeCategory={activeCategory}
              setActiveCategory={setActiveCategory}
            />
          )}
        </div>
      )}

      {/* =========================================================================
          KISAH KAMI (Hanya muncul di halaman dashboard utama, hilang di halaman kategori dan produk)
          ========================================================================= */}
        {isDashboard && (
          <div id="about" className="about-section flex flex-col md:grid" style={{ borderTop: '1px solid var(--border)' }}>
          <div className="about-left" style={{ padding: 'clamp(20px, 3.2vw, 44px)', borderRight: '1px solid var(--border)', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 12 }}>
            <p style={{ fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--accent)', fontWeight: 500 }}>Kisah Kami</p>
            <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.5rem, 2.5vw, 2rem)', fontWeight: 600, color: 'var(--foreground)', lineHeight: 1.2 }}>
              Menjaga Warisan,<br />Merangkul Masa Depan
            </h3>
            <p style={{ fontSize: 14, lineHeight: 1.75, color: 'var(--muted-foreground)', fontWeight: 300, maxWidth: 420 }}>
              Sejak 2019, kami berjalan bersama ratusan pengrajin lokal dari Sabang sampai Merauke — menghadirkan karya autentik ke tangan Anda dengan harga yang adil.
            </p>
          </div>
            <div className="about-image" style={{ overflow: 'hidden', backgroundColor: 'var(--muted)' }}>
              <img src="https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=800&h=500&fit=crop" alt="Pengrajin batik" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
        </div>
      )}

      {/* Footer Global */}
      <footer id="contact" style={{ borderTop: '1px solid var(--border)', backgroundColor: 'var(--foreground)', padding: '40px clamp(24px, 6vw, 80px)', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: 32 }}>
        <div>
          <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 600, color: '#FBF9F4', marginBottom: 10 }}>Nusantara<span style={{ color: 'var(--accent)' }}>.</span></div>
          <p style={{ fontSize: 13, color: 'rgba(251,249,244,0.5)', maxWidth: 280 }}>Kerajinan autentik Indonesia dari pengrajin lokal terpilih.</p>
        </div>
        
        <div style={{ display: 'flex', gap: 36, flexWrap: 'wrap', minWidth: 280 }}>
          <div>
            <p style={{ fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 16, fontWeight: 500 }}>
              Contact
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <a
                href="https://wa.me/6281234567890"
                target="_blank"
                rel="noreferrer"
                style={{ display: 'inline-flex', alignItems: 'center', gap: 10, fontSize: 13, color: 'rgba(251,249,244,0.85)', fontWeight: 300, textDecoration: 'none', transition: 'color 0.15s' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(251,249,244,0.85)')}
              >
                <span style={{ width: 20, height: 20, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 15a2 2 0 0 1-2 2h-1l-2 2-2-2H8a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v10z" />
                    <path d="M8 11h8M8 15h5" strokeLinecap="round" />
                  </svg>
                </span>
                WhatsApp
              </a>
              <a
                href="https://instagram.com/nusantara_souvenir"
                target="_blank"
                rel="noreferrer"
                style={{ display: 'inline-flex', alignItems: 'center', gap: 10, fontSize: 13, color: 'rgba(251,249,244,0.85)', fontWeight: 300, textDecoration: 'none', transition: 'color 0.15s' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(251,249,244,0.85)')}
              >
                <span style={{ width: 20, height: 20, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="3" width="18" height="18" rx="5" />
                    <path d="M16.5 7.5h.01" />
                    <path d="M12 8.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7Z" />
                  </svg>
                </span>
                Instagram
              </a>
              <a
                href="https://www.tiktok.com/@nusantara_souvenir"
                target="_blank"
                rel="noreferrer"
                style={{ display: 'inline-flex', alignItems: 'center', gap: 10, fontSize: 13, color: 'rgba(251,249,244,0.85)', fontWeight: 300, textDecoration: 'none', transition: 'color 0.15s' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(251,249,244,0.85)')}
              >
                <span style={{ width: 20, height: 20, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M16.5 8.5a4 4 0 0 0 2.5 1.2v3.1a5.5 5.5 0 1 1-5.5-5.5h1" />
                  </svg>
                </span>
                TikTok
              </a>
            </div>
          </div>
        </div>

        <div style={{ borderTop: '1px solid rgba(251,249,244,0.1)', width: '100%', paddingTop: 24 }}>
          <p style={{ fontSize: 11, color: 'rgba(251,249,244,0.3)' }}>© 2026 Nusantara Souvenir. Semua hak dilindungi.</p>
        </div>
      </footer>
      <CartDrawer
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cartItems}
        onRemove={removeFromCart}
        onUpdateQty={updateQty}
        onCheckout={handleProceedToCheckout}
      />
      <CheckoutForm
        open={checkoutOpen}
        items={cartItems}
        loading={checkoutLoading}
        successMessage={checkoutSuccess}
        errorMessage={checkoutError}
        onClose={() => setCheckoutOpen(false)}
        onSubmit={handleSubmitOrder}
      />
    </div>
  )
}