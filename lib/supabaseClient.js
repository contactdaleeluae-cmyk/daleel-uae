import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables. Please check your .env.local file.')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// ─── Business Queries ───────────────────────────────────────────────

// Get all active businesses
export async function getAllBusinesses() {
  const { data, error } = await supabase
    .from('businesses')
    .select('*')
    .eq('active', true)
    .order('created_at', { ascending: false })
  if (error) throw error
  return data
}

// Get businesses by emirate
export async function getBusinessesByEmirate(emirate) {
  const { data, error } = await supabase
    .from('businesses')
    .select('*')
    .eq('active', true)
    .ilike('emirate', emirate)
    .order('created_at', { ascending: false })
  if (error) throw error
  return data
}

// Get businesses by emirate and filters
export async function getBusinessesFiltered({ emirate, area, category }) {
  let query = supabase
    .from('businesses')
    .select('*')
    .eq('active', true)

  if (emirate) query = query.ilike('emirate', emirate)
  if (area) query = query.ilike('area', area)
  if (category) query = query.ilike('category', category)

  const { data, error } = await query.order('created_at', { ascending: false })
  if (error) throw error
  return data
}

// Get single business by slug
export async function getBusinessBySlug(slug) {
  const { data, error } = await supabase
    .from('businesses')
    .select('*')
    .eq('slug', slug)
    .eq('active', true)
    .single()
  if (error) throw error
  return data
}

// Get all business slugs (for static generation)
export async function getAllBusinessSlugs() {
  const { data, error } = await supabase
    .from('businesses')
    .select('slug')
    .eq('active', true)
  if (error) throw error
  return data
}

// Insert new business registration
export async function registerBusiness(businessData) {
  const { data, error } = await supabase
    .from('businesses')
    .insert([{ ...businessData, active: false }])
    .select()
  if (error) throw error
  return data
}

// ─── Reviews Queries ─────────────────────────────────────────────────

// Get reviews for a business
export async function getReviewsByBusinessId(businessId) {
  const { data, error } = await supabase
    .from('reviews')
    .select('*')
    .eq('business_id', businessId)
    .order('created_at', { ascending: false })
  if (error) throw error
  return data
}

// Submit a review
export async function submitReview({ business_id, reviewer_name, rating, comment }) {
  const { data, error } = await supabase
    .from('reviews')
    .insert([{ business_id, reviewer_name, rating, comment }])
    .select()
  if (error) throw error
  return data
}

// ─── Contact Queries ──────────────────────────────────────────────────

// Submit contact form
export async function submitContactForm({ name, email, message }) {
  const { data, error } = await supabase
    .from('contacts')
    .insert([{ name, email, message }])
    .select()
  if (error) throw error
  return data
}

// ─── Storage Helpers ──────────────────────────────────────────────────

// Upload a file to Supabase Storage
export async function uploadFile(bucket, path, file) {
  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(path, file, {
      cacheControl: '3600',
      upsert: false,
    })
  if (error) throw error
  return data
}

// Get public URL for a stored file
export function getPublicUrl(bucket, path) {
  const { data } = supabase.storage
    .from(bucket)
    .getPublicUrl(path)
  return data.publicUrl
}

// ─── Data Constants ───────────────────────────────────────────────────

export const EMIRATES = [
  'Dubai',
  'Abu Dhabi',
  'Sharjah',
  'Ajman',
  'Ras Al Khaimah',
  'Fujairah',
  'Umm Al Quwain',
]

export const AREAS = {
  'Dubai': ['Deira', 'Bur Dubai', 'Jumeirah', 'Marina', 'Business Bay', 'Downtown', 'Mirdif', 'Al Quoz', 'JLT', 'DIFC'],
  'Abu Dhabi': ['Corniche', 'Khalidiyah', 'Mushrif', 'Reem Island', 'Yas Island', 'Mussafah', 'Al Ain'],
  'Sharjah': ['Al Nahda', 'Al Taawun', 'Muwaileh', 'Al Qasimia', 'Industrial Area', 'Al Majaz'],
  'Ajman': ['Al Nuaimiya', 'Al Rashidiya', 'Al Jurf', 'Al Hamidiya', 'Emirates City'],
  'Ras Al Khaimah': ['Al Nakheel', 'Al Hamra', 'Dafan Al Nakheel', 'Corniche', 'Al Qurm'],
  'Fujairah': ['Fujairah City', 'Dibba', 'Khor Fakkan'],
  'Umm Al Quwain': ['UAQ City', 'Al Salamah', 'Al Raas'],
}

export const CATEGORIES = [
  'AC Repair',
  'Cleaning Services',
  'Salon and Beauty',
  'Plumbing',
  'Medical Clinic',
  'Restaurant',
  'Home Maintenance',
  'Tutoring',
  'Electrician',
  'Carpentry',
  'Painting',
  'Security Systems',
]

export const EMIRATE_SLUGS = {
  'dubai': 'Dubai',
  'abu-dhabi': 'Abu Dhabi',
  'sharjah': 'Sharjah',
  'ajman': 'Ajman',
  'ras-al-khaimah': 'Ras Al Khaimah',
  'fujairah': 'Fujairah',
  'umm-al-quwain': 'Umm Al Quwain',
}

export const EMIRATE_TO_SLUG = {
  'Dubai': 'dubai',
  'Abu Dhabi': 'abu-dhabi',
  'Sharjah': 'sharjah',
  'Ajman': 'ajman',
  'Ras Al Khaimah': 'ras-al-khaimah',
  'Fujairah': 'fujairah',
  'Umm Al Quwain': 'umm-al-quwain',
}
