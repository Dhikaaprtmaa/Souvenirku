export type Product = {
  id: number
  name: string
  category: string
  price: number
  originalPrice?: number
  image: string
  tag?: string
  origin: string
  // Tambahan Properti untuk Detail Produk Singkat & Spesifikasi Lengkap
  description?: string
  material?: string
  packaging?: string
  size?: string
  capacity?: string
  weight?: string
}

export type Category = {
  id: string
  label: string
  image: string
  count: number
}

export const CATEGORIES = [
  {
    id: 'batik',
    label: 'Batik & Tekstil',
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600&h=400&fit=crop&auto=format',
    count: 4,
  },
  {
    id: 'keramik',
    label: 'Keramik & Gerabah',
    image: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=600&h=400&fit=crop&auto=format',
    count: 4,
  },
  {
    id: 'anyaman',
    label: 'Anyaman & Rotan',
    image: 'https://images.unsplash.com/photo-1590736704728-f4730bb30770?w=600&h=400&fit=crop&auto=format',
    count: 4,
  },
  {
    id: 'ukiran',
    label: 'Ukiran Kayu',
    image: 'https://images.unsplash.com/photo-1604594849809-dfedbc827105?w=600&h=400&fit=crop&auto=format',
    count: 4,
  },
  {
    id: 'perhiasan',
    label: 'Perhiasan Etnik',
    image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600&h=400&fit=crop&auto=format',
    count: 4,
  },
  {
    id: 'lukisan',
    label: 'Lukisan & Seni',
    image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=600&h=400&fit=crop&auto=format',
    count: 4,
  },
]

export const PRODUCTS: Product[] = [
  // Batik
  { 
    id: 1, 
    name: 'Batik Mega Mendung Cirebon', 
    category: 'batik', 
    price: 285000, 
    originalPrice: 340000, 
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=500&h=620&fit=crop&auto=format', 
    tag: 'Terlaris', 
    origin: 'Cirebon, Jawa Barat',
    description: 'Kain batik autentik motif Mega Mendung khas Cirebon, melambangkan awan pembawa hujan lambang kesuburan dan pemberi kehidupan.',
    material: 'Katun Primisima Oxfort',
    packaging: 'Box Karton Eksklusif',
    size: '220 cm x 115 cm',
    capacity: 'N/A',
    weight: '350 gr/pcs'
  },
  { 
    id: 2, 
    name: 'Kain Tenun Ikat NTT', 
    category: 'batik', 
    price: 320000, 
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&h=620&fit=crop&auto=format', 
    origin: 'Flores, NTT',
    description: 'Ditenun secara manual menggunakan benang katun alam dengan pewarna organik khas Flores NTT.',
    material: 'Benang Katun Alam',
    packaging: 'Pouch Serut Blacu',
    size: '200 cm x 100 cm',
    weight: '400 gr/pcs'
  },
  { id: 3, name: 'Batik Parang Rusak Solo', category: 'batik', price: 265000, image: 'https://images.unsplash.com/photo-1617191316154-e8c3a0742b51?w=500&h=620&fit=crop&auto=format', tag: 'Baru', origin: 'Solo, Jawa Tengah', description: 'Motif batik Parang Rusak yang sakral dari Solo.' },
  { id: 4, name: 'Sarung Tenun Bugis', category: 'batik', price: 195000, originalPrice: 240000, image: 'https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=500&h=620&fit=crop&auto=format', tag: 'Diskon', origin: 'Makassar, Sulsel', description: 'Sarung tenun sutra khas Makassar dengan corak kotak-kotak yang khas.' },

  // Keramik
  { id: 5, name: 'Gerabah Motif Lombok Premium', category: 'keramik', price: 175000, image: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=500&h=620&fit=crop&auto=format', origin: 'Lombok, NTB', description: 'Kendi tanah liat halus hasil produksi desa Banyumulek Lombok.' },
  { id: 6, name: 'Vas Keramik Motif Bali', category: 'keramik', price: 145000, image: 'https://images.unsplash.com/photo-1493106641515-5d2893565ccd?w=500&h=620&fit=crop&auto=format', tag: 'Terlaris', origin: 'Ubud, Bali', description: 'Vas bunga keramik dengan ukiran seni floral khas Ubud.' },
  { id: 7, name: 'Piring Tanah Liat Toraja', category: 'keramik', price: 115000, image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500&h=620&fit=crop&auto=format', origin: 'Toraja, Sulsel' },
  { id: 8, name: 'Set Kendi Gerabah Jawa', category: 'keramik', price: 225000, originalPrice: 275000, image: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=500&h=620&fit=crop&auto=format', tag: 'Diskon', origin: 'Yogyakarta' },

  // Anyaman
  { id: 9, name: 'Tas Anyaman Rotan Flores', category: 'anyaman', price: 220000, originalPrice: 275000, image: 'https://images.unsplash.com/photo-1590736704728-f4730bb30770?w=500&h=620&fit=crop&auto=format', tag: 'Diskon', origin: 'Flores, NTT' },
  { id: 10, name: 'Keranjang Pandan Sulawesi', category: 'anyaman', price: 98000, image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500&h=620&fit=crop&auto=format', tag: 'Baru', origin: 'Sulawesi Tengah' },
  { id: 11, name: 'Topi Anyaman Bali', category: 'anyaman', price: 75000, image: 'https://images.unsplash.com/photo-1556306535-0f09a537f0a3?w=500&h=620&fit=crop&auto=format', origin: 'Bali' },
  { id: 12, name: 'Tikar Mendong Tasikmalaya', category: 'anyaman', price: 155000, image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500&h=620&fit=crop&auto=format', origin: 'Tasikmalaya, Jabar' },

  // Ukiran
  { id: 13, name: 'Ukiran Wayang Kayu Jati', category: 'ukiran', price: 450000, image: 'https://images.unsplash.com/photo-1604594849809-dfedbc827105?w=500&h=620&fit=crop&auto=format', tag: 'Eksklusif', origin: 'Jepara, Jawa Tengah' },
  { id: 14, name: 'Miniatur Rumah Joglo', category: 'ukiran', price: 195000, originalPrice: 235000, image: 'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=500&h=620&fit=crop&auto=format', tag: 'Diskon', origin: 'Yogyakarta' },
  { id: 15, name: 'Topeng Barong Bali', category: 'ukiran', price: 380000, image: 'https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=500&h=620&fit=crop&auto=format', tag: 'Terlaris', origin: 'Gianyar, Bali' },
  { id: 16, name: 'Relief Kayu Dayak', category: 'ukiran', price: 520000, image: 'https://images.unsplash.com/photo-1609619385002-f40f1df9b7b6?w=500&h=620&fit=crop&auto=format', tag: 'Eksklusif', origin: 'Kalimantan Tengah' },

  // Perhiasan
  { id: 17, name: 'Kalung Perak Bali', category: 'perhiasan', price: 335000, image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=500&h=620&fit=crop&auto=format', tag: 'Terlaris', origin: 'Celuk, Bali' },
  { id: 18, name: 'Gelang Emas Toraja', category: 'perhiasan', price: 280000, image: 'https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=500&h=620&fit=crop&auto=format', origin: 'Toraja, Sulsel' },
  { id: 19, name: 'Anting Etnik Papua', category: 'perhiasan', price: 165000, originalPrice: 210000, image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=500&h=620&fit=crop&auto=format', tag: 'Diskon', origin: 'Papua' },
  { id: 20, name: 'Cincin Perak Lombok', category: 'perhiasan', price: 125000, image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=500&h=620&fit=crop&auto=format', tag: 'Baru', origin: 'Lombok, NTB' },

  // Lukisan
  { id: 21, name: 'Lukisan Batik Kontemporer', category: 'lukisan', price: 650000, image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=500&h=620&fit=crop&auto=format', tag: 'Eksklusif', origin: 'Yogyakarta' },
  { id: 22, name: 'Wayang Kulit Original', category: 'lukisan', price: 420000, image: 'https://images.unsplash.com/photo-1541963463532-d68292c34b19?w=500&h=620&fit=crop&auto=format', tag: 'Terlaris', origin: 'Solo, Jawa Tengah' },
  { id: 23, name: 'Kaligrafi Batik Jawa', category: 'lukisan', price: 295000, image: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=500&h=620&fit=crop&auto=format', origin: 'Pekalongan, Jateng' },
  { id: 24, name: 'Lukisan Pemandangan Bali', category: 'lukisan', price: 480000, originalPrice: 580000, image: 'https://images.unsplash.com/photo-1518998053901-5348d3961a04?w=500&h=620&fit=crop&auto=format', tag: 'Diskon', origin: 'Ubud, Bali' },
]