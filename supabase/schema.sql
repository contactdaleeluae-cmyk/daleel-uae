-- ─────────────────────────────────────────────────────────────
-- DALEEL UAE — SUPABASE SCHEMA
-- Run this in Supabase SQL Editor first, before seed.sql
-- ─────────────────────────────────────────────────────────────

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ─── BUSINESSES TABLE ────────────────────────────────────────
CREATE TABLE IF NOT EXISTS businesses (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  logo_url TEXT,
  cover_url TEXT,
  emirate TEXT NOT NULL,
  area TEXT,
  category TEXT,
  key_services TEXT[] DEFAULT '{}',
  additional_services TEXT,
  year_established INTEGER,
  tl_number TEXT,
  mobile TEXT,
  whatsapp TEXT,
  email TEXT,
  tier TEXT DEFAULT 'standard' CHECK (tier IN ('standard', 'premium', 'sponsored')),
  active BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ─── REVIEWS TABLE ───────────────────────────────────────────
CREATE TABLE IF NOT EXISTS reviews (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  business_id UUID NOT NULL REFERENCES businesses(id) ON DELETE CASCADE,
  reviewer_name TEXT NOT NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ─── CONTACTS TABLE ──────────────────────────────────────────
CREATE TABLE IF NOT EXISTS contacts (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ─── INDEXES ─────────────────────────────────────────────────
CREATE INDEX IF NOT EXISTS idx_businesses_emirate ON businesses(emirate);
CREATE INDEX IF NOT EXISTS idx_businesses_category ON businesses(category);
CREATE INDEX IF NOT EXISTS idx_businesses_area ON businesses(area);
CREATE INDEX IF NOT EXISTS idx_businesses_tier ON businesses(tier);
CREATE INDEX IF NOT EXISTS idx_businesses_active ON businesses(active);
CREATE INDEX IF NOT EXISTS idx_businesses_slug ON businesses(slug);
CREATE INDEX IF NOT EXISTS idx_reviews_business_id ON reviews(business_id);

-- ─── ROW LEVEL SECURITY ──────────────────────────────────────

-- Enable RLS on all tables
ALTER TABLE businesses ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;

-- BUSINESSES: Anyone can read active businesses
CREATE POLICY "Public can view active businesses"
  ON businesses
  FOR SELECT
  USING (active = true);

-- BUSINESSES: Anyone can insert (register new business)
CREATE POLICY "Anyone can register a business"
  ON businesses
  FOR INSERT
  WITH CHECK (true);

-- REVIEWS: Anyone can read reviews
CREATE POLICY "Public can view reviews"
  ON reviews
  FOR SELECT
  USING (true);

-- REVIEWS: Anyone can submit a review
CREATE POLICY "Anyone can submit a review"
  ON reviews
  FOR INSERT
  WITH CHECK (true);

-- CONTACTS: Anyone can submit contact form
CREATE POLICY "Anyone can submit contact form"
  ON contacts
  FOR INSERT
  WITH CHECK (true);

-- ─── STORAGE BUCKET ──────────────────────────────────────────
-- Run this to create the storage bucket for business images
INSERT INTO storage.buckets (id, name, public)
VALUES ('business-images', 'business-images', true)
ON CONFLICT (id) DO NOTHING;

-- Storage policy: anyone can upload
CREATE POLICY "Anyone can upload business images"
  ON storage.objects
  FOR INSERT
  WITH CHECK (bucket_id = 'business-images');

-- Storage policy: anyone can view
CREATE POLICY "Public can view business images"
  ON storage.objects
  FOR SELECT
  USING (bucket_id = 'business-images');
