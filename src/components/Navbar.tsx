import { useState } from 'react'

type Props = {
  cartCount: number
  onCartOpen: () => void
  onGoHome: () => void     // Menerima aksi klik logo perusahaan
  onGoToShop: () => void   // Menerima aksi klik menu koleksi
  onGoHelp: () => void    // Menerima aksi klik menu help
  onGoAdmin: () => void   // Menerima aksi klik menu admin
}

export default function Navbar({ cartCount, onCartOpen, onGoHome, onGoToShop, onGoHelp, onGoAdmin }: Props) {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        backgroundColor: 'rgba(251, 249, 244, 0.92)', // Mengikuti nuansa klasik krem hangat
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid var(--border)',
      }}
    >
      <div
        className="max-w-7xl mx-auto px-6 md:px-10 flex items-center justify-between"
        style={{ height: 60 }}
      >
        {/* LOGO PERUSAHAAN INTERAKTIF: Jika diklik akan reset halaman & kembali ke atas */}
        <button
          onClick={(e) => {
            e.preventDefault()
            onGoHome()
          }}
          style={{
            background: 'none',
            border: 'none',
            fontFamily: "'Playfair Display', serif",
            fontSize: 22,
            fontWeight: 600,
            color: 'var(--foreground)',
            letterSpacing: '-0.02em',
            cursor: 'pointer',
          }}
        >
          Nusantara<span style={{ color: 'var(--accent)' }}>.</span>
        </button>

        {/* LINK NAVIGASI */}
        <nav className="hidden md:flex items-center gap-8">
          <button
            onClick={(e) => {
              e.preventDefault()
              onGoToShop()
            }}
            style={{
              background: 'none',
              border: 'none',
              fontSize: 13,
              color: 'var(--muted-foreground)',
              fontWeight: 400,
              cursor: 'pointer',
              transition: 'color 0.15s',
            }}
            onMouseEnter={e => (e.currentTarget.style.color = 'var(--foreground)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'var(--muted-foreground)')}
          >
            Collection
          </button>
          
          <button
            onClick={(e) => {
              e.preventDefault()
              onGoHelp()
            }}
            style={{
              background: 'none',
              border: 'none',
              fontSize: 13,
              color: 'var(--muted-foreground)',
              fontWeight: 400,
              cursor: 'pointer',
              transition: 'color 0.15s',
            }}
            onMouseEnter={e => (e.currentTarget.style.color = 'var(--foreground)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'var(--muted-foreground)')}
          >
            How to Order
          </button>
          
          <button
            onClick={(e) => {
              e.preventDefault()
              onGoAdmin()
            }}
            style={{
              background: 'none',
              border: 'none',
              fontSize: 13,
              color: 'var(--muted-foreground)',
              fontWeight: 400,
              cursor: 'pointer',
              transition: 'color 0.15s',
            }}
            onMouseEnter={e => (e.currentTarget.style.color = 'var(--foreground)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'var(--muted-foreground)')}
          >
            Admin
          </button>
          
          <a
            href="#contact"
            style={{
              fontSize: 13,
              color: 'var(--muted-foreground)',
              fontWeight: 400,
              transition: 'color 0.15s',
              textDecoration: 'none'
            }}
            onMouseEnter={e => (e.currentTarget.style.color = 'var(--foreground)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'var(--muted-foreground)')}
          >
            Contact
          </a>
        </nav>

        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <button
            className="md:hidden"
            onClick={() => setMenuOpen(prev => !prev)}
            aria-label={menuOpen ? 'Tutup menu' : 'Buka menu'}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: 'var(--foreground)',
              padding: 8,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              {menuOpen ? (
                <path d="M18 6L6 18M6 6l12 12" />
              ) : (
                <>
                  <path d="M3 12h18" />
                  <path d="M3 6h18" />
                  <path d="M3 18h18" />
                </>
              )}
            </svg>
          </button>

          <button
            onClick={() => {
              setMenuOpen(false)
              onCartOpen()
            }}
            style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer', background: 'none', border: 'none' }}
          >
            <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="var(--foreground)" strokeWidth="1.6">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 01-8 0" />
            </svg>
            {cartCount > 0 && (
              <span
                style={{
                  position: 'absolute',
                  top: -6,
                  right: -6,
                  width: 17,
                  height: 17,
                  borderRadius: '50%',
                  backgroundColor: 'var(--accent)',
                  color: '#fff',
                  fontSize: 10,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 600
                }}
              >
                {cartCount}
              </span>
            )}
          </button>
        </div>

        <div
          className="mobile-menu"
          style={{
            display: menuOpen ? 'flex' : 'none',
            position: 'absolute',
            top: 60,
            left: 0,
            right: 0,
            backgroundColor: 'rgba(251, 249, 244, 0.98)',
            flexDirection: 'column',
            gap: 10,
            padding: '16px 20px 20px',
            borderBottom: '1px solid var(--border)',
            zIndex: 49,
          }}
        >
          <button
            onClick={() => { setMenuOpen(false); onGoToShop() }}
            style={{
              background: 'none',
              border: 'none',
              textAlign: 'left',
              fontSize: 14,
              color: 'var(--foreground)',
              padding: '12px 14px',
              cursor: 'pointer',
              width: '100%',
            }}
          >
            Collection
          </button>
          <button
            onClick={() => { setMenuOpen(false); onGoHelp() }}
            style={{
              background: 'none',
              border: 'none',
              textAlign: 'left',
              fontSize: 14,
              color: 'var(--foreground)',
              padding: '12px 14px',
              cursor: 'pointer',
              width: '100%',
            }}
          >
            How to Order
          </button>
          <button
            onClick={() => { setMenuOpen(false); onGoAdmin() }}
            style={{
              background: 'none',
              border: 'none',
              textAlign: 'left',
              fontSize: 14,
              color: 'var(--foreground)',
              padding: '12px 14px',
              cursor: 'pointer',
              width: '100%',
            }}
          >
            Admin
          </button>
          <a
            href="#contact"
            onClick={() => setMenuOpen(false)}
            style={{
              display: 'block',
              fontSize: 14,
              color: 'var(--foreground)',
              textDecoration: 'none',
              padding: '12px 14px',
            }}
          >
            Contact
          </a>
        </div>
      </div>
    </header>
  )
}