import type { Category, Product } from '../data/products'
import ProductCard from './ProductCard'
import type { CartItem } from '../App'

type Props = {
  categories: Category[]
  products: Product[]
  onAddToCart: (item: Omit<CartItem, 'qty'>) => void
  onViewDetail: (product: Product) => void
  activeCategory: string | null
  setActiveCategory: (cat: string | null) => void
}

export default function ShopSection({ categories, products, onAddToCart, onViewDetail, activeCategory, setActiveCategory }: Props) {
  const activeCat = categories.find(c => c.id === activeCategory)
  const filtered = activeCategory ? products.filter(p => p.category === activeCategory) : []

  return (
    <section id="shop" style={{ backgroundColor: 'var(--background)' }}>
      {/* Section Header */}
      <div
        style={{
          borderTop: '1px solid var(--border)',
          borderBottom: '1px solid var(--border)',
          padding: '28px 20px 28px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          gap: 18,
        }}
      >
        <div>
          <p style={{ fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--accent)', fontWeight: 500, marginBottom: 8 }}>
            Collection
          </p>
          <h2
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(1.8rem, 3vw, 2.4rem)',
              fontWeight: 600,
              color: 'var(--foreground)',
              letterSpacing: '-0.02em',
              lineHeight: 1.1,
            }}
          >
            {activeCategory ? activeCat?.label : 'Pilih Kategori'}
          </h2>
        </div>
        {activeCategory && (
          <button
            onClick={() => setActiveCategory(null)}
            style={{
              fontSize: 12,
              color: 'var(--muted-foreground)',
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              background: 'none',
              border: '1px solid var(--border)',
              padding: '8px 14px',
              cursor: 'pointer',
              transition: 'all 0.15s',
              whiteSpace: 'nowrap',
            }}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 5l-7 7 7 7" />
            </svg>
            Semua Kategori
          </button>
        )}
      </div>

      {/* TAMPILAN GRID 1: PILIHAN KATEGORI UTAMA */}
      {!activeCategory && (
        <div 
          style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', 
            gap: '18px', 
            padding: '28px 20px 40px',
            backgroundColor: 'var(--background)',
            maxWidth: 1120,
            margin: '0 auto'
          }} 
          className="grid-cols-1 sm:grid-cols-2 md:grid-cols-3"
        >
          {categories.map((cat, index) => (
            <button
              key={cat.id}
              onClick={() => {
                setActiveCategory(cat.id);
                document.getElementById('shop')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="category-card"
              style={{ 
                position: 'relative', 
                overflow: 'hidden', 
                aspectRatio: '4/3', 
                border: 'none', 
                cursor: 'pointer', 
                background: 'var(--muted)', 
                display: 'block', 
                padding: 0,
                borderRadius: '8px',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.04)',
                opacity: 0,
                transform: 'translateY(20px)',
                animation: 'cardPop 0.65s ease-out forwards',
                animationDelay: `${index * 0.06}s`
              }}
            >
              <img
                src={cat.image}
                alt={cat.label}
                style={{ 
                  width: '100%', 
                  height: '100%', 
                  objectFit: 'cover', 
                  transition: 'transform 0.6s cubic-bezier(0.25, 1, 0.5, 1)', 
                  filter: 'brightness(0.7)' 
                }}
                onMouseEnter={e => { 
                  e.currentTarget.style.transform = 'scale(1.05)'; 
                  e.currentTarget.style.filter = 'brightness(0.55)'; 
                }}
                onMouseLeave={e => { 
                  e.currentTarget.style.transform = 'scale(1)'; 
                  e.currentTarget.style.filter = 'brightness(0.7)' 
                }}
              />
              <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '24px', pointerEvents: 'none' }}>
                <p style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.2rem, 1.8vw, 1.6rem)', fontWeight: 600, color: '#fff', marginBottom: 4, letterSpacing: '0.02em' }}>
                  {cat.label}
                </p>
                <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.75)', fontWeight: 300 }}>{cat.count} produk →</p>
              </div>
            </button>
          ))}
        </div>
      )}

      {/* TAMPILAN GRID 2: DAFTAR PRODUK SESUAI KATEGORI */}
      {activeCategory && (
        <div>
          <div style={{ padding: '14px clamp(24px, 6vw, 80px)', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: 12, color: 'var(--muted-foreground)' }}>{filtered.length} produk ditemukan</span>
          </div>

          <div 
            style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '22px', 
              padding: '28px 20px 48px',
              maxWidth: 1120,
              margin: '0 auto'
            }} 
            className="grid-cols-1 sm:grid-cols-2 md:grid-cols-4"
          >
            {filtered.map((product) => (
              <div key={product.id}>
                <ProductCard 
                  product={product} 
                  onAddToCart={onAddToCart} 
                  onViewDetail={onViewDetail} 
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  )
}