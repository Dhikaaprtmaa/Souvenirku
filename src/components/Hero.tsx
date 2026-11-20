type Props = { onShop: () => void }

export default function Hero({ onShop }: Props) {
  return (
    <section
      style={{
        paddingTop: 60,
        minHeight: 'calc(100vh - 60px)',
        backgroundColor: 'var(--background)',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* 1. Bagian Atas: Header Gambar Full Vertikal Kesamping */}
      <div 
        style={{ 
          position: 'relative', 
          overflow: 'hidden', 
          width: '100%',
          height: '45vh',
          minHeight: 260,
          borderBottom: '1px solid var(--border)'
        }}
      >
        <img
          src="https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=1600&h=900&fit=crop&auto=format"
          alt="Collection souvenir nusantara"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </div>

      {/* 2. Bagian Bawah: Konten Teks (Hanya Headline & Deskripsi) */}
      <div
        style={{
          padding: '32px 20px 52px',
          display: 'flex',
          flexDirection: 'column',
          gap: 24,
          maxWidth: 860,
          margin: '0 auto'
        }}
      >
        {/* Bagian Judul / Headline */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <span
            className="hero-subtitle"
            style={{
              fontSize: 11,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: 'var(--accent)',
              fontWeight: 500,
            }}
          >
            Collection 2025
          </span>
          <h1
            className="hero-title"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(2.5rem, 4.5vw, 3.8rem)',
              fontWeight: 600,
              lineHeight: 1.15,
              color: 'var(--foreground)',
              letterSpacing: '-0.02em',
            }}
          >
            Souvenir <em style={{ color: 'var(--accent)', fontStyle: 'italic' }}>Autentik</em> Indonesia
          </h1>
        </div>

        {/* Bagian Deskripsi Perusahaan (Membentang Penuh tanpa tombol & stats) */}
        <p
          className="hero-copy"
          style={{
            fontSize: 15,
            lineHeight: 1.7,
            color: 'var(--muted-foreground)',
            fontWeight: 300,
            maxWidth: '1000px', // Membatasi lebar agar tetap nyaman dibaca di layar lebar
          }}
        >
          Nusantara adalah inisiatif kurasi kerajinan tangan terbaik dari pengrajin lokal berbakat di seluruh Indonesia. Misi kami adalah menjaga keberlanjutan budaya dan ekonomi kreatif pengrajin sambil menyajikan karya seni autentik yang membawa cerita unik dan jiwa budaya nusantara ke hadapan Anda.
        </p>

        <button
          onClick={onShop}
          style={{
            width: 'fit-content',
            padding: '14px 24px',
            backgroundColor: 'var(--foreground)',
            color: '#fff',
            border: 'none',
            cursor: 'pointer',
            fontSize: 13,
            fontWeight: 500,
            letterSpacing: '0.04em',
          }}
        >
          Jelajahi Collection
        </button>
      </div>
    </section>
  )
}