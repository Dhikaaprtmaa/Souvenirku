import { createClient } from '@supabase/supabase-js'
import type { Category, Product } from '../data/products'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = supabaseUrl && supabaseAnonKey
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null

export const isSupabaseEnabled = Boolean(supabase)

export type OrderItem = {
  id: number
  name: string
  price: number
  image: string
  qty: number
}

export type Order = {
  id: number
  customer_name: string
  phone: string
  email: string
  address: string
  note: string
  items: OrderItem[]
  total: number
  status: string
  created_at: string
}

export type OrderPayload = Omit<Order, 'id' | 'created_at' | 'status'>

export async function getAdminSession() {
  if (!supabase) return null
  const { data } = await supabase.auth.getSession()
  return data.session
}

export async function signInAdmin(email: string, password: string) {
  if (!supabase) return { data: null, error: new Error('Supabase belum dikonfigurasi') }
  return supabase.auth.signInWithPassword({ email, password })
}

export async function signOutAdmin() {
  if (!supabase) return { data: null, error: new Error('Supabase belum dikonfigurasi') }
  return supabase.auth.signOut()
}

export async function loadCategoriesFromSupabase(): Promise<{ data: Category[] | null; error: any }> {
  if (!supabase) return { data: null, error: null }
  const response = await supabase.from('categories').select('*')
  return { data: response.data as Category[] | null, error: response.error }
}

export async function loadProductsFromSupabase(): Promise<{ data: Product[] | null; error: any }> {
  if (!supabase) return { data: null, error: null }
  const response = await supabase.from('products').select('*')
  return { data: response.data as Product[] | null, error: response.error }
}

export async function fetchOrders(): Promise<{ data: Order[] | null; error: any }> {
  if (!supabase) return { data: null, error: null }
  const response = await supabase.from('orders').select('*').order('created_at', { ascending: false })
  return { data: response.data as Order[] | null, error: response.error }
}

export async function createOrder(order: OrderPayload): Promise<{ data: Order | null; error: any }> {
  if (!supabase) return { data: null, error: new Error('Supabase belum dikonfigurasi') }
  const response = await supabase.from('orders').insert({ ...order, status: 'new' }).select().single()
  return { data: response.data as Order | null, error: response.error }
}

export async function addCategory(category: Omit<Category, 'count'>) {
  if (!supabase) return { data: null, error: new Error('Supabase belum dikonfigurasi') }
  const response = await supabase.from('categories').insert(category).select().single()
  return { data: response.data as Omit<Category, 'count'> | null, error: response.error }
}

export async function updateCategory(category: Omit<Category, 'count'>) {
  if (!supabase) return { data: null, error: new Error('Supabase belum dikonfigurasi') }
  const response = await supabase.from('categories').upsert(category, { onConflict: 'id' }).select().single()
  return { data: response.data as Omit<Category, 'count'> | null, error: response.error }
}

export async function deleteCategory(id: string) {
  if (!supabase) return { data: null, error: new Error('Supabase belum dikonfigurasi') }
  const response = await supabase.from('categories').delete().eq('id', id)
  return { data: response.data as Omit<Category, 'count'>[] | null, error: response.error }
}

export async function addProduct(product: Product) {
  if (!supabase) return { data: null, error: new Error('Supabase belum dikonfigurasi') }
  const response = await supabase.from('products').insert(product).select().single()
  return { data: response.data as Product | null, error: response.error }
}

export async function updateProduct(product: Product) {
  if (!supabase) return { data: null, error: new Error('Supabase belum dikonfigurasi') }
  const response = await supabase.from('products').upsert(product, { onConflict: 'id' }).select().single()
  return { data: response.data as Product | null, error: response.error }
}

export async function deleteProduct(id: number) {
  if (!supabase) return { data: null, error: new Error('Supabase belum dikonfigurasi') }
  const response = await supabase.from('products').delete().eq('id', id)
  return { data: response.data as Product[] | null, error: response.error }
}

export async function updateOrderStatus(id: number, status: string) {
  if (!supabase) return { data: null, error: new Error('Supabase belum dikonfigurasi') }
  const response = await supabase.from('orders').update({ status }).eq('id', id).select().single()
  return { data: response.data as Order | null, error: response.error }
}
