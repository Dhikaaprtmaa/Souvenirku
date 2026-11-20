import { useState } from 'react'

type Props = {
  onLogin: (email: string, password: string) => Promise<void>
  loading: boolean
  error?: string | null
  onCancel: () => void
}

export default function AdminLogin({ onLogin, loading, error, onCancel }: Props) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  return (
    <div className="page-transition" style={{ minHeight: '100vh', padding: '80px clamp(24px, 6vw, 80px)', backgroundColor: 'var(--background)' }}>
      <div style={{ maxWidth: 520, margin: '0 auto', padding: 32, border: '1px solid var(--border)', backgroundColor: 'var(--card)', borderRadius: 16 }}>
        <p style={{ fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--accent)', fontWeight: 500 }}>Admin Login</p>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2rem, 3vw, 2.5rem)', fontWeight: 600, color: 'var(--foreground)', margin: '18px 0' }}>Masuk sebagai Admin</h1>
        <p style={{ fontSize: 14, lineHeight: 1.8, color: 'var(--muted-foreground)', marginBottom: 24 }}>Masukkan email dan password admin untuk mengelola kategori, produk, dan pesanan.</p>

        <label style={{ display: 'grid', gap: 8, marginBottom: 16 }}>
          <span style={{ fontSize: 12, color: 'var(--muted-foreground)' }}>Email admin</span>
          <input value={email} onChange={e => setEmail(e.target.value)} type="email" placeholder="admin@domain.com" style={{ padding: 14, border: '1px solid var(--border)', borderRadius: 10, background: 'var(--background)', color: 'var(--foreground)' }} />
        </label>

        <label style={{ display: 'grid', gap: 8, marginBottom: 20 }}>
          <span style={{ fontSize: 12, color: 'var(--muted-foreground)' }}>Password</span>
          <input value={password} onChange={e => setPassword(e.target.value)} type="password" placeholder="********" style={{ padding: 14, border: '1px solid var(--border)', borderRadius: 10, background: 'var(--background)', color: 'var(--foreground)' }} />
        </label>

        {error && <div style={{ marginBottom: 20, padding: 14, borderRadius: 10, backgroundColor: '#fee2e2', color: '#991b1b' }}>{error}</div>}

        <button
          onClick={() => onLogin(email, password)}
          disabled={loading || !email || !password}
          style={{ width: '100%', padding: '14px 18px', backgroundColor: 'var(--foreground)', color: '#fff', border: 'none', borderRadius: 10, cursor: loading ? 'wait' : 'pointer', fontWeight: 600, fontSize: 14 }}
        >
          {loading ? 'Memeriksa...' : 'Masuk'}
        </button>

        <button
          onClick={onCancel}
          style={{ marginTop: 12, width: '100%', padding: '14px 18px', backgroundColor: 'transparent', border: '1px solid var(--border)', color: 'var(--foreground)', borderRadius: 10, cursor: 'pointer' }}
        >
          Kembali ke Toko
        </button>
      </div>
    </div>
  )
}
