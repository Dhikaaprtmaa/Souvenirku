import { useEffect } from 'react'
import type { CartItem } from '../App'

type Props = {
  open: boolean
  onClose: () => void
  items: CartItem[]
  onRemove: (id: number) => void
  onUpdateQty: (id: number, qty: number) => void
  onCheckout: () => void
}

const fmt = (n: number) => 'Rp ' + n.toLocaleString('id-ID')

export default function CartDrawer({ open, onClose, items, onRemove, onUpdateQty, onCheckout }: Props) {
  const total = items.reduce((s, i) => s + i.price * i.qty, 0)
  const freeShipping = total >= 350000

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <>
      <div
        onClick={onClose}
        style={{
          position: 'fixed', inset: 0, zIndex: 50,
          backgroundColor: 'rgba(0,0,0,0.35)',
          backdropFilter: 'blur(2px)',
          opacity: open ? 1 : 0,
          pointerEvents: open ? 'auto' : 'none',
          transition: 'opacity 0.25s',
        }}
      />
      <aside
        style={{
          position: 'fixed', top: 0, right: 0, height: '100%', zIndex: 51,
          width: '100%', maxWidth: 400,
          backgroundColor: 'var(--card)',
          borderLeft: '1px solid var(--border)',
          display: 'flex', flexDirection: 'column',
          transform: open ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      >
        {/* Header */}
        <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 18, fontWeight: 600, color: 'var(--foreground)' }}>
              Keranjang
            </h2>
            <p style={{ fontSize: 11, color: 'var(--muted-foreground)', marginTop: 2 }}>{items.length} item</p>
          </div>
          <button
            onClick={onClose}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--muted-foreground)', transition: 'color 0.15s' }}
            onMouseEnter={e => (e.currentTarget.style.color = 'var(--foreground)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'var(--muted-foreground)')}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Items */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '16px 24px', display: 'flex', flexDirection: 'column', gap: 20 }}>
          {items.length === 0 ? (
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16, paddingTop: 60, textAlign: 'center' }}>
              <div style={{ width: 56, height: 56, backgroundColor: 'var(--muted)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--muted-foreground)" strokeWidth="1.5">
                  <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <path d="M16 10a4 4 0 01-8 0" />
                </svg>
              </div>
              <div>
                <p style={{ fontFamily: "'Playfair Display', serif", fontSize: 15, color: 'var(--foreground)', marginBottom: 6 }}>Keranjang masih kosong</p>
                <p style={{ fontSize: 12, color: 'var(--muted-foreground)', fontWeight: 300 }}>Mulai tambahkan produk dari collection kami</p>
              </div>
              <button
                onClick={onClose}
                style={{ marginTop: 8, padding: '10px 24px', backgroundColor: 'var(--foreground)', color: '#fff', fontSize: 12, fontWeight: 500, border: 'none', cursor: 'pointer' }}
              >
                Belanja Sekarang
              </button>
            </div>
          ) : (
            items.map(item => (
              <div key={item.id} style={{ display: 'flex', gap: 12 }}>
                <div style={{ flexShrink: 0, width: 72, height: 88, overflow: 'hidden', backgroundColor: 'var(--muted)' }}>
                  <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <p style={{ fontFamily: "'Playfair Display', serif", fontSize: 13, lineHeight: 1.35, color: 'var(--foreground)', marginBottom: 4 }}>
                      {item.name}
                    </p>
                    <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--foreground)' }}>{fmt(item.price)}</p>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <button
                        onClick={() => onUpdateQty(item.id, item.qty - 1)}
                        style={{ width: 26, height: 26, border: '1px solid var(--border)', background: 'none', cursor: 'pointer', fontSize: 14, color: 'var(--foreground)', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'border-color 0.15s' }}
                        onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--foreground)')}
                        onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--border)')}
                      >
                        −
                      </button>
                      <span style={{ fontSize: 13, fontWeight: 500, minWidth: 16, textAlign: 'center', color: 'var(--foreground)' }}>
                        {item.qty}
                      </span>
                      <button
                        onClick={() => onUpdateQty(item.id, item.qty + 1)}
                        style={{ width: 26, height: 26, border: '1px solid var(--border)', background: 'none', cursor: 'pointer', fontSize: 14, color: 'var(--foreground)', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'border-color 0.15s' }}
                        onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--foreground)')}
                        onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--border)')}
                      >
                        +
                      </button>
                    </div>
                    <button
                      onClick={() => onRemove(item.id)}
                      style={{ fontSize: 11, color: 'var(--muted-foreground)', background: 'none', border: 'none', cursor: 'pointer', transition: 'color 0.15s' }}
                      onMouseEnter={e => (e.currentTarget.style.color = 'var(--foreground)')}
                      onMouseLeave={e => (e.currentTarget.style.color = 'var(--muted-foreground)')}
                    >
                      Hapus
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div style={{ borderTop: '1px solid var(--border)', padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: 14 }}>
            {/* Free shipping progress */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                <span style={{ fontSize: 11, color: 'var(--muted-foreground)' }}>
                  {freeShipping ? '✓ Gratis ongkir!' : `Tambah ${fmt(350000 - total)} lagi untuk gratis ongkir`}
                </span>
              </div>
              <div style={{ height: 2, backgroundColor: 'var(--muted)', borderRadius: 2, overflow: 'hidden' }}>
                <div
                  style={{
                    height: '100%',
                    width: `${Math.min((total / 350000) * 100, 100)}%`,
                    backgroundColor: freeShipping ? '#22c55e' : 'var(--accent)',
                    transition: 'width 0.4s ease',
                    borderRadius: 2,
                  }}
                />
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
              <span style={{ fontSize: 13, color: 'var(--muted-foreground)' }}>Subtotal</span>
              <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 18, fontWeight: 600, color: 'var(--foreground)' }}>
                {fmt(total)}
              </span>
            </div>

            <button
              type="button"
              onClick={onCheckout}
              style={{
                width: '100%',
                padding: '14px',
                backgroundColor: 'var(--foreground)',
                color: '#fff',
                fontSize: 13,
                fontWeight: 500,
                letterSpacing: '0.04em',
                border: 'none',
                cursor: 'pointer',
                transition: 'opacity 0.15s',
              }}
              onMouseEnter={e => (e.currentTarget.style.opacity = '0.82')}
              onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
            >
              Lanjut ke Pembayaran
            </button>

            <button
              onClick={onClose}
              style={{ fontSize: 12, color: 'var(--muted-foreground)', background: 'none', border: 'none', cursor: 'pointer', padding: '4px 0', transition: 'color 0.15s' }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--foreground)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'var(--muted-foreground)')}
            >
              Lanjut Belanja
            </button>
          </div>
        )}
      </aside>
    </>
  )
}
