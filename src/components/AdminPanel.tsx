import { useMemo, useState } from 'react'
import type { Category, Product } from '../data/products'

type Props = {
  categories: Category[]
  products: Product[]
  onSaveCategories: (categories: Category[]) => void
  onSaveProducts: (products: Product[]) => void
  onBack: () => void
}

type ProductForm = Omit<Product, 'id'> & { id?: number }

const formatRp = (n: number) => 'Rp ' + n.toLocaleString('id-ID')

export default function AdminPanel({ categories, products, onSaveCategories, onSaveProducts, onBack }: Props) {
  const [selectedTab, setSelectedTab] = useState<'categories' | 'products'>('categories')
  const [categoryLabel, setCategoryLabel] = useState('')
  const [categoryId, setCategoryId] = useState('')
  const [selectedProduct, setSelectedProduct] = useState<ProductForm | null>(null)
  const [productForm, setProductForm] = useState<ProductForm>({
    name: '',
    category: categories[0]?.id || '',
    price: 0,
    originalPrice: undefined,
    image: '',
    origin: '',
    description: '',
    material: '',
    packaging: '',
    size: '',
    capacity: '',
    weight: '',
    tag: '',
  })

  const nextProductId = useMemo(
    () => Math.max(0, ...products.map(p => p.id)) + 1,
    [products]
  )

  const handleCategorySave = () => {
    if (!categoryId.trim() || !categoryLabel.trim()) return
    const exists = categories.find(cat => cat.id === categoryId)
    if (exists) {
      onSaveCategories(categories.map(cat => cat.id === categoryId ? { ...cat, label: categoryLabel } : cat))
    } else {
      onSaveCategories([...categories, { id: categoryId, label: categoryLabel, image: '', count: 0 }])
    }
    setCategoryId('')
    setCategoryLabel('')
  }

  const handleCategoryDelete = (id: string) => {
    onSaveCategories(categories.filter(cat => cat.id !== id))
    onSaveProducts(products.filter(product => product.category !== id))
  }

  const handleProductSave = () => {
    if (!productForm.name.trim() || !productForm.category.trim()) return
    const data: Product = {
      id: selectedProduct?.id ?? nextProductId,
      name: productForm.name,
      category: productForm.category,
      price: Number(productForm.price),
      originalPrice: productForm.originalPrice ? Number(productForm.originalPrice) : undefined,
      image: productForm.image,
      origin: productForm.origin,
      tag: productForm.tag || undefined,
      description: productForm.description,
      material: productForm.material,
      packaging: productForm.packaging,
      size: productForm.size,
      capacity: productForm.capacity,
      weight: productForm.weight,
    }

    if (selectedProduct && selectedProduct.id) {
      onSaveProducts(products.map(product => product.id === selectedProduct.id ? data : product))
    } else {
      onSaveProducts([...products, data])
    }

    setSelectedProduct(null)
    setProductForm({
      name: '',
      category: categories[0]?.id || '',
      price: 0,
      originalPrice: undefined,
      image: '',
      origin: '',
      description: '',
      material: '',
      packaging: '',
      size: '',
      capacity: '',
      weight: '',
      tag: '',
    })
  }

  const handleProductEdit = (product: Product) => {
    setSelectedProduct(product)
    setProductForm(product)
    setSelectedTab('products')
  }

  const handleProductDelete = (id: number) => {
    onSaveProducts(products.filter(product => product.id !== id))
  }

  return (
    <div className="page-transition" style={{ minHeight: '100vh', padding: '80px clamp(24px, 6vw, 80px)', backgroundColor: 'var(--background)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16, marginBottom: 32 }}>
        <div>
          <p style={{ fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--accent)', fontWeight: 500 }}>Admin Panel</p>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2rem, 3vw, 2.8rem)', fontWeight: 600, color: 'var(--foreground)' }}>Kelola Kategori & Produk</h1>
          <p style={{ fontSize: 14, lineHeight: 1.8, color: 'var(--muted-foreground)', maxWidth: 680, marginTop: 10 }}>Gunakan admin panel ini untuk menambah, mengubah, dan menghapus kategori serta produk. Data disimpan di localStorage untuk simulasi database.</p>
        </div>
        <button
          onClick={onBack}
          style={{ padding: '14px 22px', border: '1px solid var(--border)', background: 'transparent', color: 'var(--foreground)', cursor: 'pointer' }}
        >
          Kembali ke Toko
        </button>
      </div>

      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginBottom: 40 }}>
        {(['categories', 'products'] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setSelectedTab(tab)}
            style={{ padding: '12px 18px', border: '1px solid var(--border)', backgroundColor: selectedTab === tab ? 'var(--foreground)' : 'transparent', color: selectedTab === tab ? '#fff' : 'var(--foreground)', cursor: 'pointer' }}
          >
            {tab === 'categories' ? 'Kategori' : 'Produk'}
          </button>
        ))}
      </div>

      {selectedTab === 'categories' ? (
        <div style={{ display: 'grid', gap: 40 }}>
          <div style={{ display: 'grid', gap: 16, maxWidth: 760 }}>
            <h2 style={{ fontSize: 18, fontWeight: 600, color: 'var(--foreground)' }}>Tambah / Ubah Kategori</h2>
            <div style={{ display: 'grid', gap: 12 }}>
              <label style={{ display: 'grid', gap: 6 }}>
                <span style={{ fontSize: 12, color: 'var(--muted-foreground)' }}>ID Kategori</span>
                <input value={categoryId} onChange={e => setCategoryId(e.target.value)} style={{ padding: 12, border: '1px solid var(--border)', background: 'var(--card)', color: 'var(--foreground)' }} placeholder="misal: batik" />
              </label>
              <label style={{ display: 'grid', gap: 6 }}>
                <span style={{ fontSize: 12, color: 'var(--muted-foreground)' }}>Label Kategori</span>
                <input value={categoryLabel} onChange={e => setCategoryLabel(e.target.value)} style={{ padding: 12, border: '1px solid var(--border)', background: 'var(--card)', color: 'var(--foreground)' }} placeholder="misal: Batik & Tekstil" />
              </label>
              <button onClick={handleCategorySave} style={{ width: 'fit-content', padding: '12px 18px', backgroundColor: 'var(--foreground)', color: '#fff', border: 'none', cursor: 'pointer' }}>Simpan Kategori</button>
            </div>
          </div>

          <div style={{ display: 'grid', gap: 16 }}>
            <h2 style={{ fontSize: 18, fontWeight: 600, color: 'var(--foreground)' }}>Daftar Kategori</h2>
            <div style={{ display: 'grid', gap: 12, maxWidth: 900 }}>
              {categories.map(category => (
                <div key={category.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', border: '1px solid var(--border)', padding: 14, backgroundColor: 'var(--card)' }}>
                  <div>
                    <div style={{ fontSize: 15, fontWeight: 600, color: 'var(--foreground)' }}>{category.label}</div>
                    <div style={{ fontSize: 12, color: 'var(--muted-foreground)' }}>ID: {category.id} • {products.filter(product => product.category === category.id).length} produk</div>
                  </div>
                  <div style={{ display: 'flex', gap: 10 }}>
                    <button onClick={() => { setCategoryId(category.id); setCategoryLabel(category.label) }} style={{ padding: '8px 14px', border: '1px solid var(--border)', background: 'transparent', cursor: 'pointer' }}>Edit</button>
                    <button onClick={() => handleCategoryDelete(category.id)} style={{ padding: '8px 14px', border: '1px solid #ef4444', background: '#fee2e2', color: '#b91c1c', cursor: 'pointer' }}>Hapus</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div style={{ display: 'grid', gap: 40 }}>
          <div style={{ display: 'grid', gap: 16, maxWidth: 960 }}>
            <h2 style={{ fontSize: 18, fontWeight: 600, color: 'var(--foreground)' }}>{selectedProduct ? 'Edit Produk' : 'Tambah Produk Baru'}</h2>
            <div style={{ display: 'grid', gap: 16 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <label style={{ display: 'grid', gap: 6 }}>
                  <span style={{ fontSize: 12, color: 'var(--muted-foreground)' }}>Nama Produk</span>
                  <input value={productForm.name} onChange={e => setProductForm(prev => ({ ...prev, name: e.target.value }))} style={{ padding: 12, border: '1px solid var(--border)', background: 'var(--card)', color: 'var(--foreground)' }} />
                </label>
                <label style={{ display: 'grid', gap: 6 }}>
                  <span style={{ fontSize: 12, color: 'var(--muted-foreground)' }}>Kategori</span>
                  <select value={productForm.category} onChange={e => setProductForm(prev => ({ ...prev, category: e.target.value }))} style={{ padding: 12, border: '1px solid var(--border)', background: 'var(--card)', color: 'var(--foreground)' }}>
                    {categories.map(category => (
                      <option key={category.id} value={category.id}>{category.label}</option>
                    ))}
                  </select>
                </label>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <label style={{ display: 'grid', gap: 6 }}>
                  <span style={{ fontSize: 12, color: 'var(--muted-foreground)' }}>Harga</span>
                  <input type="number" value={productForm.price} onChange={e => setProductForm(prev => ({ ...prev, price: Number(e.target.value) }))} style={{ padding: 12, border: '1px solid var(--border)', background: 'var(--card)', color: 'var(--foreground)' }} />
                </label>
                <label style={{ display: 'grid', gap: 6 }}>
                  <span style={{ fontSize: 12, color: 'var(--muted-foreground)' }}>Harga Asli / Diskon</span>
                  <input type="number" value={productForm.originalPrice ?? ''} onChange={e => setProductForm(prev => ({ ...prev, originalPrice: e.target.value ? Number(e.target.value) : undefined }))} style={{ padding: 12, border: '1px solid var(--border)', background: 'var(--card)', color: 'var(--foreground)' }} placeholder="Kosongkan bila tidak ada diskon" />
                </label>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <label style={{ display: 'grid', gap: 6 }}>
                  <span style={{ fontSize: 12, color: 'var(--muted-foreground)' }}>Sumber Gambar</span>
                  <input value={productForm.image} onChange={e => setProductForm(prev => ({ ...prev, image: e.target.value }))} style={{ padding: 12, border: '1px solid var(--border)', background: 'var(--card)', color: 'var(--foreground)' }} placeholder="URL gambar" />
                </label>
                <label style={{ display: 'grid', gap: 6 }}>
                  <span style={{ fontSize: 12, color: 'var(--muted-foreground)' }}>Tag Produk</span>
                  <input value={productForm.tag ?? ''} onChange={e => setProductForm(prev => ({ ...prev, tag: e.target.value }))} style={{ padding: 12, border: '1px solid var(--border)', background: 'var(--card)', color: 'var(--foreground)' }} placeholder="misal: Diskon, Baru" />
                </label>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <label style={{ display: 'grid', gap: 6 }}>
                  <span style={{ fontSize: 12, color: 'var(--muted-foreground)' }}>Asal / Origin</span>
                  <input value={productForm.origin} onChange={e => setProductForm(prev => ({ ...prev, origin: e.target.value }))} style={{ padding: 12, border: '1px solid var(--border)', background: 'var(--card)', color: 'var(--foreground)' }} />
                </label>
                <label style={{ display: 'grid', gap: 6 }}>
                  <span style={{ fontSize: 12, color: 'var(--muted-foreground)' }}>Material</span>
                  <input value={productForm.material} onChange={e => setProductForm(prev => ({ ...prev, material: e.target.value }))} style={{ padding: 12, border: '1px solid var(--border)', background: 'var(--card)', color: 'var(--foreground)' }} />
                </label>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <label style={{ display: 'grid', gap: 6 }}>
                  <span style={{ fontSize: 12, color: 'var(--muted-foreground)' }}>Packaging</span>
                  <input value={productForm.packaging} onChange={e => setProductForm(prev => ({ ...prev, packaging: e.target.value }))} style={{ padding: 12, border: '1px solid var(--border)', background: 'var(--card)', color: 'var(--foreground)' }} />
                </label>
                <label style={{ display: 'grid', gap: 6 }}>
                  <span style={{ fontSize: 12, color: 'var(--muted-foreground)' }}>Size / Capacity</span>
                  <input value={productForm.size} onChange={e => setProductForm(prev => ({ ...prev, size: e.target.value }))} style={{ padding: 12, border: '1px solid var(--border)', background: 'var(--card)', color: 'var(--foreground)' }} placeholder="misal: 200 cm x 100 cm" />
                </label>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <label style={{ display: 'grid', gap: 6 }}>
                  <span style={{ fontSize: 12, color: 'var(--muted-foreground)' }}>Capacity</span>
                  <input value={productForm.capacity} onChange={e => setProductForm(prev => ({ ...prev, capacity: e.target.value }))} style={{ padding: 12, border: '1px solid var(--border)', background: 'var(--card)', color: 'var(--foreground)' }} />
                </label>
                <label style={{ display: 'grid', gap: 6 }}>
                  <span style={{ fontSize: 12, color: 'var(--muted-foreground)' }}>Weight</span>
                  <input value={productForm.weight} onChange={e => setProductForm(prev => ({ ...prev, weight: e.target.value }))} style={{ padding: 12, border: '1px solid var(--border)', background: 'var(--card)', color: 'var(--foreground)' }} />
                </label>
              </div>
              <label style={{ display: 'grid', gap: 6 }}>
                <span style={{ fontSize: 12, color: 'var(--muted-foreground)' }}>Deskripsi Produk</span>
                <textarea value={productForm.description} onChange={e => setProductForm(prev => ({ ...prev, description: e.target.value }))} rows={4} style={{ padding: 12, border: '1px solid var(--border)', background: 'var(--card)', color: 'var(--foreground)', resize: 'vertical' }} />
              </label>
              <button onClick={handleProductSave} style={{ width: 'fit-content', padding: '12px 18px', backgroundColor: 'var(--foreground)', color: '#fff', border: 'none', cursor: 'pointer' }}>{selectedProduct ? 'Perbarui Produk' : 'Simpan Produk'}</button>
            </div>
          </div>

          <div style={{ display: 'grid', gap: 16 }}>
            <h2 style={{ fontSize: 18, fontWeight: 600, color: 'var(--foreground)' }}>Daftar Produk</h2>
            <div style={{ display: 'grid', gap: 12 }}>
              {products.map(product => (
                <div key={product.id} style={{ border: '1px solid var(--border)', padding: 16, backgroundColor: 'var(--card)', display: 'grid', gridTemplateColumns: '1fr auto', gap: 16, alignItems: 'center' }}>
                  <div>
                    <div style={{ fontSize: 15, fontWeight: 600, color: 'var(--foreground)' }}>{product.name} {product.tag && `• ${product.tag}`}</div>
                    <div style={{ fontSize: 12, color: 'var(--muted-foreground)' }}>{categories.find(cat => cat.id === product.category)?.label ?? product.category} • {formatRp(product.price)}{product.originalPrice ? ` • Asli ${formatRp(product.originalPrice)}` : ''}</div>
                  </div>
                  <div style={{ display: 'flex', gap: 10 }}>
                    <button onClick={() => handleProductEdit(product)} style={{ padding: '8px 14px', border: '1px solid var(--border)', background: 'transparent', cursor: 'pointer' }}>Edit</button>
                    <button onClick={() => handleProductDelete(product.id)} style={{ padding: '8px 14px', border: '1px solid #ef4444', background: '#fee2e2', color: '#b91c1c', cursor: 'pointer' }}>Hapus</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
