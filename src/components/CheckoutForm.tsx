import { useEffect, useMemo, useState } from 'react'

type CartItem = {
  id: number
  name: string
  price: number
  image: string
  qty: number
}

type Props = {
  open: boolean
  items: CartItem[]
  loading: boolean
  successMessage?: string | null
  errorMessage?: string | null
  onClose: () => void
  onSubmit: (payload: {
    customer_name: string
    phone: string
    email: string
    address: string
    note: string
  }) => void
}

const fmt = (n: number) => 'Rp ' + n.toLocaleString('id-ID')

export default function CheckoutForm({ open, items, loading, successMessage, errorMessage, onClose, onSubmit }: Props) {
  const [customerName, setCustomerName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [address, setAddress] = useState('')
  const [note, setNote] = useState('')

  const total = useMemo(() => items.reduce((sum, item) => sum + item.price * item.qty, 0), [items])
  const isValid = customerName.trim() && phone.trim() && email.trim() && address.trim() && items.length > 0

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  useEffect(() => {
    if (!open) return
    setCustomerName('')
    setPhone('')
    setEmail('')
    setAddress('')
    setNote('')
  }, [open])

  return (
    <div
      style={{
        position: 'fixed', inset: 0,
        zIndex: 80,
        display: open ? 'flex' : 'none',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.45)',
        padding: 20,
      }}
    >
      <div style={{ width: '100%', maxWidth: 620, backgroundColor: 'var(--card)', border: '1px solid var(--border)', borderRadius: 20, overflow: 'hidden' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 24, borderBottom: '1px solid var(--border)' }}>
          <div>
            <p style={{ fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--accent)', fontWeight: 500 }}>Checkout</p>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 24, margin: '8px 0 0', color: 'var(--foreground)' }}>Lengkapi data pesanan</h2>
          </div>
          <button onClick={onClose} style={{ border: 'none', background: 'transparent', color: 'var(--muted-foreground)', cursor: 'pointer', fontSize: 18 }}>
            ×
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 24, padding: 24 }}>
          <div style={{ display: 'grid', gap: 18 }}>
            <div style={{ display: 'grid', gap: 10 }}>
              <label style={{ display: 'grid', gap: 8, fontSize: 13, color: 'var(--muted-foreground)' }}>
                Nama Pemesan
                <input value={customerName} onChange={e => setCustomerName(e.target.value)} placeholder="Nama lengkap" style={{ width: '100%', padding: 12, border: '1px solid var(--border)', borderRadius: 12, background: 'var(--background)', color: 'var(--foreground)' }} />
              </label>
              <label style={{ display: 'grid', gap: 8, fontSize: 13, color: 'var(--muted-foreground)' }}>
                Nomor Telepon
                <input value={phone} onChange={e => setPhone(e.target.value)} placeholder="08xx xxxx xxxx" style={{ width: '100%', padding: 12, border: '1px solid var(--border)', borderRadius: 12, background: 'var(--background)', color: 'var(--foreground)' }} />
              </label>
              <label style={{ display: 'grid', gap: 8, fontSize: 13, color: 'var(--muted-foreground)' }}>
                Email
                <input value={email} onChange={e => setEmail(e.target.value)} type="email" placeholder="contoh@mail.com" style={{ width: '100%', padding: 12, border: '1px solid var(--border)', borderRadius: 12, background: 'var(--background)', color: 'var(--foreground)' }} />
              </label>
              <label style={{ display: 'grid', gap: 8, fontSize: 13, color: 'var(--muted-foreground)' }}>
                Alamat Pengiriman
                <textarea value={address} onChange={e => setAddress(e.target.value)} placeholder="Alamat lengkap" rows={4} style={{ width: '100%', padding: 12, border: '1px solid var(--border)', borderRadius: 12, background: 'var(--background)', color: 'var(--foreground)', resize: 'vertical' }} />
              </label>
              <label style={{ display: 'grid', gap: 8, fontSize: 13, color: 'var(--muted-foreground)' }}>
                Catatan Pesanan
                <textarea value={note} onChange={e => setNote(e.target.value)} placeholder="Misal: ukuran khusus atau kemasan hadiah" rows={3} style={{ width: '100%', padding: 12, border: '1px solid var(--border)', borderRadius: 12, background: 'var(--background)', color: 'var(--foreground)', resize: 'vertical' }} />
              </label>
            </div>

            {errorMessage && <div style={{ padding: 14, borderRadius: 14, backgroundColor: '#fee2e2', color: '#991b1b' }}>{errorMessage}</div>}
            {successMessage && <div style={{ padding: 14, borderRadius: 14, backgroundColor: '#d1fae5', color: '#065f46' }}>{successMessage}</div>}

            <button
              type="button"
              disabled={!isValid || loading}
              onClick={() => onSubmit({ customer_name: customerName, phone, email, address, note })}
              style={{
                width: '100%',
                padding: '16px',
                backgroundColor: isValid ? 'var(--foreground)' : 'var(--muted)',
                color: '#fff',
                border: 'none',
                borderRadius: 12,
                cursor: isValid && !loading ? 'pointer' : 'not-allowed',
                fontWeight: 600,
                fontSize: 14,
              }}
            >
              {loading ? 'Mengirim pesanan...' : 'Kirim Pesanan'}
            </button>
          </div>

          <aside style={{ border: '1px solid var(--border)', borderRadius: 20, backgroundColor: 'var(--background)', padding: 20, display: 'grid', gap: 16 }}>
            <div>
              <p style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--muted-foreground)', marginBottom: 10 }}>Ringkasan Pesanan</p>
              <div style={{ display: 'grid', gap: 12 }}>
                {items.map(item => (
                  <div key={item.id} style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                    <div style={{ width: 48, height: 48, overflow: 'hidden', borderRadius: 14, backgroundColor: 'var(--muted)' }}>
                      <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <p style={{ fontSize: 13, color: 'var(--foreground)', marginBottom: 2 }}>{item.name}</p>
                      <p style={{ fontSize: 12, color: 'var(--muted-foreground)' }}>x{item.qty} • {fmt(item.price)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, color: 'var(--muted-foreground)' }}>
              <span>Total</span>
              <span style={{ color: 'var(--foreground)', fontWeight: 600 }}>{fmt(total)}</span>
            </div>
            <div style={{ fontSize: 12, color: 'var(--muted-foreground)' }}>Order akan dibuat tanpa login pengguna. Admin dapat melihatnya di dashboard pesanan.</div>
          </aside>
        </div>
      </div>
    </div>
  )
}
