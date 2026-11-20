import { CATEGORIES as initialCategories, PRODUCTS as initialProducts, type Category, type Product } from './products'

const CATEGORIES_KEY = 'ns_categories'
const PRODUCTS_KEY = 'ns_products'

function safeParse<T>(value: string | null, fallback: T): T {
  if (!value) return fallback
  try {
    return JSON.parse(value) as T
  } catch {
    return fallback
  }
}

export function loadCategories(): Category[] {
  if (typeof window === 'undefined') return initialCategories
  return safeParse<Category[]>(localStorage.getItem(CATEGORIES_KEY), initialCategories)
}

export function loadProducts(): Product[] {
  if (typeof window === 'undefined') return initialProducts
  return safeParse<Product[]>(localStorage.getItem(PRODUCTS_KEY), initialProducts)
}

export function saveCategories(categories: Category[]) {
  if (typeof window === 'undefined') return
  localStorage.setItem(CATEGORIES_KEY, JSON.stringify(categories))
}

export function saveProducts(products: Product[]) {
  if (typeof window === 'undefined') return
  localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products))
}
