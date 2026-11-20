import { useMemo } from 'react'
import type { Category, Product } from '../data/products'
import type { Order } from '../lib/supabase'

const formatRp = (n: number) => 'Rp ' + n.toLocaleString('id-ID')

type Props = {
  categories: Category[]
  products: Product[]
  orders: Order[]
  onSignOut: () => void
  onCategoryEdit: (categoryId: string) => void
  onProductEdit: (productId: number) => void
  onCategoryDelete: (categoryId: string) => void
  onProductDelete: (productId: number) => void
  onOrderUpdate: (orderId: number, status: string) => void
}

export default function AdminDashboard({ categories, products, orders, onSignOut, onCategoryEdit, onProductEdit, onCategoryDelete, onProductDelete, onOrderUpdate }: Props) {
  const totalOrders = orders.length
  const totalProducts = products.length
  const totalCategories = categories.length
  const latestOrders = useMemo(() => orders.slice(0, 5), [orders])

  return (
    <div className="page-transition" style={{ minHeight: '100vh', padding: '80px clamp(24px, 6vw, 80px)', backgroundColor: 'var(--background)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', gap: 16, flexWrap: 'wrap', marginBottom: 36 }}>
        <div>
          <p style={{ fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--accent)', fontWeight: 500 }}>Admin Dashboard</p>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2rem, 3vw, 2.8rem)', fontWeight: 600, color: 'var(--foreground)' }}>Selamat datang, Admin</h1>
          <p style={{ fontSize: 14, lineHeight: 1.8, color: 'var(--muted-foreground)', maxWidth: 720, marginTop: 10 }}>Kelola produk, kategori, dan pesanan di sini. Perubahan akan tercermin di halaman utama toko secara langsung.</p>
        </div>
        <button onClick={onSignOut} style={{ padding: '14px 22px', border: '1px solid var(--border)', background: 'transparent', color: 'var(--foreground)', cursor: 'pointer' }}>Logout</button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16, marginBottom: 40 }}>
        <div style={{ padding: 24, border: '1px solid var(--border)', backgroundColor: 'var(--card)' }}>
          <p style={{ fontSize: 11, color: 'var(--muted-foreground)', marginBottom: 10 }}>Kategori</p>
          <p style={{ fontSize: 32, fontWeight: 700, color: 'var(--foreground)' }}>{totalCategories}</p>
        </div>
        <div style={{ padding: 24, border: '1px solid var(--border)', backgroundColor: 'var(--card)' }}>
          <p style={{ fontSize: 11, color: 'var(--muted-foreground)', marginBottom: 10 }}>Produk</p>
          <p style={{ fontSize: 32, fontWeight: 700, color: 'var(--foreground)' }}>{totalProducts}</p>
        </div>
        <div style={{ padding: 24, border: '1px solid var(--border)', backgroundColor: 'var(--card)' }}>
          <p style={{ fontSize: 11, color: 'var(--muted-foreground)', marginBottom: 10 }}>Pesanan Baru</p>
          <p style={{ fontSize: 32, fontWeight: 700, color: 'var(--foreground)' }}>{totalOrders}</p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 40 }}>
        <div style={{ border: '1px solid var(--border)', backgroundColor: 'var(--card)', padding: 24, borderRadius: 16 }}>
          <h2 style={{ fontSize: 18, fontWeight: 600, color: 'var(--foreground)', marginBottom: 20 }}>Daftar Kategori</h2>
          <div style={{ display: 'grid', gap: 12 }}>
            {categories.map(category => (
              <div key={category.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 16, backgroundColor: '#fff', borderRadius: 14, border: '1px solid var(--border)' }}>
                <div>
                  <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--foreground)' }}>{category.label}</p>
                  <p style={{ fontSize: 12, color: 'var(--muted-foreground)' }}>ID: {category.id}</p>
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                  <button onClick={() => onCategoryEdit(category.id)} style={{ padding: '8px 14px', border: '1px solid var(--border)', background: 'transparent', cursor: 'pointer' }}>Edit</button>
                  <button onClick={() => onCategoryDelete(category.id)} style={{ padding: '8px 14px', border: '1px solid #ef4444', background: '#fee2e2', color: '#b91c1c', cursor: 'pointer' }}>Hapus</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ border: '1px solid var(--border)', backgroundColor: 'var(--card)', padding: 24, borderRadius: 16 }}>
          <h2 style={{ fontSize: 18, fontWeight: 600, color: 'var(--foreground)', marginBottom: 20 }}>Pesanan Terbaru</h2>
          {latestOrders.length === 0 ? (
            <p style={{ fontSize: 14, color: 'var(--muted-foreground)' }}>Belum ada pesanan.</p>
          ) : (
            <div style={{ display: 'grid', gap: 12 }}>
              {latestOrders.map(order => (
                <div key={order.id} style={{ padding: 16, backgroundColor: '#fff', borderRadius: 14, border: '1px solid var(--border)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, marginBottom: 10 }}>
                    <div>
                      <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--foreground)' }}>{order.customer_name}</p>
                      <p style={{ fontSize: 12, color: 'var(--muted-foreground)' }}>{order.phone} · {order.email}</p>
                    </div>
                    <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--accent)' }}>{order.status}</span>
                  </div>
                  <p style={{ fontSize: 13, color: 'var(--muted-foreground)', marginBottom: 10 }}>{order.address}</p>
                  <p style={{ fontSize: 13, color: 'var(--muted-foreground)', marginBottom: 10 }}>{order.note || 'Tanpa catatan'}</p>
                  <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--foreground)' }}>Total: {formatRp(order.total)}</p>
                  <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 12 }}>
                    {['new', 'processing', 'completed'].map(status => (
                      <button key={status} onClick={() => onOrderUpdate(order.id, status)} style={{ padding: '8px 14px', border: '1px solid var(--border)', background: 'transparent', cursor: 'pointer' }}>{status}</button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div style={{ border: '1px solid var(--border)', backgroundColor: 'var(--card)', padding: 24, borderRadius: 16 }}>
        <h2 style={{ fontSize: 18, fontWeight: 600, color: 'var(--foreground)', marginBottom: 20 }}>Daftar Produk</h2>
        <div style={{ display: 'grid', gap: 12 }}>
          {products.map(product => (
            <div key={product.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 16, backgroundColor: '#fff', borderRadius: 14, border: '1px solid var(--border)' }}>
              <div>
                <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--foreground)' }}>{product.name}</p>
                <p style={{ fontSize: 12, color: 'var(--muted-foreground)' }}>{product.origin} • {formatRp(product.price)}</p>
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                <button onClick={() => onProductEdit(product.id)} style={{ padding: '8px 14px', border: '1px solid var(--border)', background: 'transparent', cursor: 'pointer' }}>Edit</button>
                <button onClick={() => onProductDelete(product.id)} style={{ padding: '8px 14px', border: '1px solid #ef4444', background: '#fee2e2', color: '#b91c1c', cursor: 'pointer' }}>Hapus</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
