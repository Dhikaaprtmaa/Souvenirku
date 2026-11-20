import type { Product } from '../data/products'
import type { CartItem } from '../App'

type Props = {
  product: Product
  categoryLabel: string
  onAddToCart: (item: Omit<CartItem, 'qty'>) => void
  onBack: () => void
}

const formatRp = (n: number) => 'Rp ' + n.toLocaleString('id-ID')

export default function ProductDetail({ product, categoryLabel, onAddToCart, onBack }: Props) {
  return (
    <div className="page-transition" style={{ borderTop: '1px solid var(--border)', padding: '40px clamp(24px, 6vw, 80px)' }}>
      {/* Breadcrumb Navigation */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, color: 'var(--muted-foreground)', marginBottom: 32 }}>
        <span style={{ cursor: 'pointer' }} onClick={onBack}>Collection</span>
        <span>/</span>
        <span style={{ cursor: 'pointer' }} onClick={onBack}>{categoryLabel}</span>
        <span>/</span>
        <span style={{ color: 'var(--foreground)', fontWeight: 500 }}>{product.name}</span>
      </div>

      {/* Main Grid Content */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 32 }} className="flex flex-col md:grid">
        
        {/* Left Side: Product Image Display */}
        <div style={{ backgroundColor: 'var(--muted)', width: '100%', minHeight: 320, overflow: 'hidden', border: '1px solid var(--border)' }}>
          <img 
            src={product.image} 
            alt={product.name} 
            style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
          />
        </div>

        {/* Right Side: Product Technical Table Specifications */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
          <div>
            <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', fontWeight: 600, color: 'var(--foreground)', marginBottom: 8 }}>
              {product.name}
            </h1>
            <p style={{ fontSize: 20, fontWeight: 600, color: 'var(--accent)' }}>
              {formatRp(product.price)}
            </p>
          </div>

          {/* Technical Spec Box Table Style */}
          <div style={{ border: '1px solid var(--border)', backgroundColor: '#fff', borderRadius: 0, padding: 24 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px 24px', fontSize: 13, lineHeight: 1.6 }}>
              <div>
                <span style={{ color: 'var(--muted-foreground)', display: 'block', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.04em' }}>Material</span>
                <strong style={{ color: 'var(--foreground)', fontWeight: 500 }}>{product.material || 'Premium Material'}</strong>
              </div>
              <div>
                <span style={{ color: 'var(--muted-foreground)', display: 'block', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.04em' }}>Packaging</span>
                <strong style={{ color: 'var(--foreground)', fontWeight: 500 }}>{product.packaging || 'Standard Box / Pcs'}</strong>
              </div>
              <div>
                <span style={{ color: 'var(--muted-foreground)', display: 'block', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.04em' }}>Size</span>
                <strong style={{ color: 'var(--foreground)', fontWeight: 500 }}>{product.size || 'Custom Size'}</strong>
              </div>
              <div>
                <span style={{ color: 'var(--muted-foreground)', display: 'block', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.04em' }}>Capacity</span>
                <strong style={{ color: 'var(--foreground)', fontWeight: 500 }}>{product.capacity || '-'}</strong>
              </div>
              <div>
                <span style={{ color: 'var(--muted-foreground)', display: 'block', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.04em' }}>Variant / Origin</span>
                <strong style={{ color: 'var(--foreground)', fontWeight: 500 }}>{product.origin}</strong>
              </div>
              <div>
                <span style={{ color: 'var(--muted-foreground)', display: 'block', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.04em' }}>Weight</span>
                <strong style={{ color: 'var(--foreground)', fontWeight: 500 }}>{product.weight || '-'}</strong>
              </div>
            </div>
          </div>

          {/* Text Paragraph Description Section */}
          <div>
            <h4 style={{ fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--foreground)', marginBottom: 8 }}>
              Description:
            </h4>
            <p style={{ fontSize: 14, color: 'var(--muted-foreground)', lineHeight: 1.6, fontWeight: 300 }}>
              {product.description || 'Tidak ada deskripsi tambahan untuk produk ini. Karya seni dikerjakan secara eksklusif dan autentik langsung oleh pengrajin lokal Nusantara.'}
            </p>
          </div>

          {/* Action Call to Buttons */}
          <div style={{ display: 'flex', gap: 16, marginTop: 12 }}>
            <button
              onClick={() => onAddToCart({ id: product.id, name: product.name, price: product.price, image: product.image })}
              style={{ flex: 1, padding: '16px', backgroundColor: 'var(--foreground)', color: '#fff', border: 'none', fontWeight: 500, fontSize: 13, letterSpacing: '0.04em', cursor: 'pointer', transition: 'opacity 0.15s' }}
              onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
              onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
            >
              + TAMBAH KE KERANJANG
            </button>
            <button
              onClick={onBack}
              style={{ padding: '16px 28px', backgroundColor: 'transparent', color: 'var(--foreground)', border: '1px solid var(--border)', fontWeight: 500, fontSize: 13, cursor: 'pointer', transition: 'all 0.15s' }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--foreground)')}
              onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--border)')}
            >
              KEMBALI
            </button>
          </div>
        </div>

      </div>
    </div>
  )
}