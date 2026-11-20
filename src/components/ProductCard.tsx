import type { Product } from '../data/products'
import type { CartItem } from '../App'

type Props = {
  product: Product
  onAddToCart: (item: Omit<CartItem, 'qty'>) => void
  onViewDetail: (product: Product) => void // 1. Tambahkan definisi tipe prop baru di sini
}

const formatRp = (n: number) => 'Rp ' + n.toLocaleString('id-ID')

export default function ProductCard({ product, onAddToCart, onViewDetail }: Props) {
  return (
    <div className="product-card" style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 16, opacity: 0, transform: 'translateY(18px)', animation: 'cardPop 0.7s ease-out forwards', animationDelay: '0.15s' }}>
      {/* Bagian Gambar - Jika di-klik akan membuka detail */}
      <div 
        onClick={() => onViewDetail(product)} // 2. Jalankan fungsi detail saat gambar di-klik
        style={{ 
          backgroundColor: 'var(--muted)', 
          width: '100%',
          minHeight: 280,
          overflow: 'hidden', 
          position: 'relative',
          cursor: 'pointer' 
        }}
      >
        {product.tag && (
          <span style={{ position: 'absolute', top: 12, left: 12, backgroundColor: product.tag === 'Eksklusif' ? 'var(--foreground)' : 'var(--accent)', color: '#fff', fontSize: 10, padding: '4px 8px', fontWeight: 500, letterSpacing: '0.04em' }}>
            {product.tag.toUpperCase()}
          </span>
        )}
        <img 
          className="product-card-image"
          src={product.image} 
          alt={product.name} 
          style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.3s ease' }}
          onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.03)')}
          onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
        />
      </div>

      {/* Info Produk */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4, flexGrow: 1 }}>
        <p style={{ fontSize: 11, color: 'var(--muted-foreground)' }}>{product.origin}</p>
        <h3 
          onClick={() => onViewDetail(product)} // 3. Jalankan fungsi detail saat nama di-klik
          style={{ 
            fontFamily: "'Playfair Display', serif", 
            fontSize: 16, 
            fontWeight: 600, 
            color: 'var(--foreground)',
            cursor: 'pointer'
          }}
          className="hover:underline"
        >
          {product.name}
        </h3>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 4 }}>
          <span style={{ fontSize: 14, fontWeight: 500 }}>{formatRp(product.price)}</span>
          {product.originalPrice && (
            <span style={{ fontSize: 12, color: 'var(--muted-foreground)', textDecoration: 'line-through' }}>
              {formatRp(product.originalPrice)}
            </span>
          )}
        </div>
      </div>

      {/* Tombol Add to Cart */}
      <button
        className="product-card-button"
        onClick={() => onAddToCart({ id: product.id, name: product.name, price: product.price, image: product.image })}
        style={{ 
          width: '100%', 
          padding: '12px', 
          backgroundColor: 'transparent', 
          color: 'var(--foreground)', 
          border: '1px solid var(--border)', 
          fontSize: 12, 
          fontWeight: 500, 
          cursor: 'pointer',
          transition: 'all 0.15s'
        }}
        onMouseEnter={e => {
          e.currentTarget.style.backgroundColor = 'var(--foreground)';
          e.currentTarget.style.color = '#fff';
        }}
        onMouseLeave={e => {
          e.currentTarget.style.backgroundColor = 'transparent';
          e.currentTarget.style.color = 'var(--foreground)';
        }}
      >
        + KERANJANG
      </button>
    </div>
  )
}