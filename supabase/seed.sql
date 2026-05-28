-- ─────────────────────────────────────────────────────────────
-- DALEEL UAE — SEED DATA
-- Run this in Supabase SQL Editor AFTER schema.sql
-- ─────────────────────────────────────────────────────────────

INSERT INTO businesses (name, slug, description, emirate, area, category, key_services, additional_services, year_established, mobile, whatsapp, email, tier, active) VALUES

-- ─── AC REPAIR ───────────────────────────────────────────────
(
  'Arctic Cool AC Services',
  'arctic-cool-ac-services',
  'Arctic Cool has been providing premium AC repair, installation and maintenance services across Dubai since 2010. Our certified technicians handle all major brands including Daikin, LG, Samsung and Carrier. We offer same-day service with transparent pricing and no hidden charges.',
  'Dubai',
  'Deira',
  'AC Repair',
  ARRAY['AC Installation', 'AC Repair', 'Duct Cleaning'],
  'AC Gas Refilling
Annual Maintenance Contracts
Emergency AC Repair
Split AC Service
Central AC Maintenance',
  2010,
  '0501234101',
  '971501234101',
  'arcticcool@gmail.com',
  'standard',
  true
),
(
  'Cool Breeze Technical Services',
  'cool-breeze-technical-services',
  'Cool Breeze is a leading AC service provider in Abu Dhabi with over 15 years of experience. We specialize in residential and commercial AC systems, offering fast response times and guaranteed workmanship. Trusted by thousands of families and businesses across Abu Dhabi.',
  'Abu Dhabi',
  'Khalidiyah',
  'AC Repair',
  ARRAY['AC Servicing', 'AC Installation', 'Gas Top Up'],
  'Preventive Maintenance
Chiller Maintenance
VRF System Service
Thermostat Replacement
Air Quality Testing',
  2008,
  '0501234102',
  '971501234102',
  'coolbreeze.abudhabi@gmail.com',
  'premium',
  true
),
(
  'Gulf Air Conditioning LLC',
  'gulf-air-conditioning-llc',
  'Gulf Air Conditioning is Sharjah''s most trusted AC company. We provide comprehensive air conditioning solutions for homes, offices and industrial spaces. Our team of expert technicians is available 7 days a week including public holidays.',
  'Sharjah',
  'Al Nahda',
  'AC Repair',
  ARRAY['AC Repair', 'AC Maintenance', 'New AC Installation'],
  'Window AC Service
Cassette AC Maintenance
Industrial AC Solutions
Spare Parts Supply
Annual Service Contracts',
  2012,
  '0501234103',
  '971501234103',
  'gulfaircon.sharjah@gmail.com',
  'standard',
  true
),

-- ─── CLEANING SERVICES ───────────────────────────────────────
(
  'Sparkle Home Cleaning Dubai',
  'sparkle-home-cleaning-dubai',
  'Sparkle is Dubai''s top-rated home cleaning service. We use eco-friendly products and trained professional staff to deliver spotless results every time. Whether you need a one-time deep clean or regular weekly service, we have flexible packages to suit every home.',
  'Dubai',
  'Jumeirah',
  'Cleaning Services',
  ARRAY['Home Cleaning', 'Deep Cleaning', 'Move-in Cleaning'],
  'Office Cleaning
Post-Construction Cleaning
Sofa and Carpet Cleaning
Kitchen Deep Clean
Bathroom Sanitization',
  2015,
  '0501234201',
  '971501234201',
  'sparkle.cleaning.dubai@gmail.com',
  'sponsored',
  true
),
(
  'Shine Masters Cleaning',
  'shine-masters-cleaning',
  'Shine Masters offers professional cleaning services across Ajman and Sharjah. Our vetted and trained cleaners deliver consistent quality with every visit. We are fully insured and use hospital-grade disinfectants for a truly clean and safe home.',
  'Ajman',
  'Al Nuaimiya',
  'Cleaning Services',
  ARRAY['Villa Cleaning', 'Apartment Cleaning', 'Office Cleaning'],
  'Steam Cleaning
Mattress Cleaning
Curtain Cleaning
End of Tenancy Cleaning
Regular Maid Service',
  2017,
  '0501234202',
  '971501234202',
  'shinemasters.ajman@gmail.com',
  'standard',
  true
),
(
  'Pro Clean RAK',
  'pro-clean-rak',
  'Pro Clean is Ras Al Khaimah''s premier cleaning company. We serve residential and commercial clients with a team of experienced, background-checked cleaners. Our satisfaction guarantee means we come back free of charge if you are not completely happy.',
  'Ras Al Khaimah',
  'Al Nakheel',
  'Cleaning Services',
  ARRAY['Home Cleaning', 'Villa Cleaning', 'Commercial Cleaning'],
  'Window Cleaning
Pressure Washing
Post-Renovation Cleaning
Swimming Pool Area Cleaning
Upholstery Cleaning',
  2019,
  '0501234203',
  '971501234203',
  'proclean.rak@gmail.com',
  'standard',
  true
),

-- ─── SALON AND BEAUTY ────────────────────────────────────────
(
  'Glamour Studio Dubai',
  'glamour-studio-dubai',
  'Glamour Studio is a luxury beauty salon in the heart of Dubai Marina. Our expert stylists and beauty therapists offer a full range of hair, nail and skin services using premium international brands. Walk in or book your appointment online.',
  'Dubai',
  'Marina',
  'Salon and Beauty',
  ARRAY['Haircut & Styling', 'Nail Art', 'Facial Treatments'],
  'Hair Coloring
Keratin Treatment
Bridal Packages
Eyebrow Threading
Waxing Services',
  2016,
  '0501234301',
  '971501234301',
  'glamourstudio.marina@gmail.com',
  'premium',
  true
),
(
  'Bella Beauty Lounge',
  'bella-beauty-lounge',
  'Bella Beauty Lounge is a popular ladies salon in Abu Dhabi offering affordable luxury beauty treatments. From blowouts to gel nails, our friendly team makes every client feel special. We use only the highest quality products for outstanding results.',
  'Abu Dhabi',
  'Corniche',
  'Salon and Beauty',
  ARRAY['Hair Treatment', 'Manicure & Pedicure', 'Makeup'],
  'Eyelash Extensions
Henna Application
Bridal Makeup
Massage Therapy
Body Scrubs',
  2014,
  '0501234302',
  '971501234302',
  'bellalounge.abudhabi@gmail.com',
  'standard',
  true
),
(
  'Glow Beauty Center Sharjah',
  'glow-beauty-center-sharjah',
  'Glow Beauty Center is Sharjah''s favourite destination for all beauty needs. Our skilled team of beauticians and hair stylists deliver exceptional results at great value prices. We cater to both ladies and children in a clean, welcoming environment.',
  'Sharjah',
  'Al Taawun',
  'Salon and Beauty',
  ARRAY['Haircut', 'Hair Coloring', 'Skin Care'],
  'Threading and Waxing
Nail Extensions
Hair Straightening
Facial Cleanup
Kids Haircut',
  2018,
  '0501234303',
  '971501234303',
  'glowbeauty.sharjah@gmail.com',
  'standard',
  true
),

-- ─── PLUMBING ────────────────────────────────────────────────
(
  'Al Madina Plumbing Services',
  'al-madina-plumbing-services',
  'Al Madina Plumbing is Dubai''s most reliable plumbing service. Available 24 hours a day, 7 days a week, we fix leaks, blockages, and all plumbing emergencies fast. Our licensed plumbers carry full insurance and guarantee their work for 90 days.',
  'Dubai',
  'Bur Dubai',
  'Plumbing',
  ARRAY['Emergency Plumbing', 'Leak Repair', 'Pipe Installation'],
  'Drain Unblocking
Water Heater Repair
Toilet Repair
Bathroom Fitting
Water Tank Cleaning',
  2011,
  '0501234401',
  '971501234401',
  'almadina.plumbing@gmail.com',
  'standard',
  true
),
(
  'Quick Fix Plumbing Fujairah',
  'quick-fix-plumbing-fujairah',
  'Quick Fix is Fujairah''s go-to plumbing service for homes and businesses. We respond within 60 minutes to all emergency calls. Our experienced team handles everything from simple tap repairs to full bathroom renovations at honest, upfront prices.',
  'Fujairah',
  'Fujairah City',
  'Plumbing',
  ARRAY['Leak Detection', 'Pipe Repair', 'Bathroom Installation'],
  'Water Pump Repair
Sewage Line Cleaning
Water Softener Installation
Kitchen Plumbing
Swimming Pool Plumbing',
  2013,
  '0501234402',
  '971501234402',
  'quickfix.plumbing.fujairah@gmail.com',
  'standard',
  true
),
(
  'Emirates Plumbing Solutions',
  'emirates-plumbing-solutions',
  'Emirates Plumbing Solutions serves Umm Al Quwain and surrounding areas with professional plumbing services. We are known for our punctuality, clean workmanship and fair pricing. No job is too big or too small for our experienced team.',
  'Umm Al Quwain',
  'UAQ City',
  'Plumbing',
  ARRAY['General Plumbing', 'Water Heater Service', 'Drain Cleaning'],
  'Pipe Relining
Water Leak Detection
Roof Leak Repair
Faucet Replacement
Pressure Testing',
  2016,
  '0501234403',
  '971501234403',
  'emirates.plumbing.uaq@gmail.com',
  'standard',
  true
),

-- ─── MEDICAL CLINIC ──────────────────────────────────────────
(
  'HealthFirst Medical Center',
  'healthfirst-medical-center',
  'HealthFirst Medical Center is a fully licensed, DHA-approved clinic in Business Bay offering comprehensive healthcare services. Our team of qualified doctors covers general medicine, pediatrics and women''s health. We accept all major insurance plans.',
  'Dubai',
  'Business Bay',
  'Medical Clinic',
  ARRAY['General Medicine', 'Pediatrics', 'Health Checkups'],
  'Womens Health
Vaccination Services
Blood Tests
ECG
Minor Surgical Procedures',
  2013,
  '0501234501',
  '971501234501',
  'healthfirst.businessbay@gmail.com',
  'premium',
  true
),
(
  'City Care Clinic Abu Dhabi',
  'city-care-clinic-abu-dhabi',
  'City Care Clinic is a trusted family medical center in Abu Dhabi. Our friendly and experienced medical team provides quality healthcare for all ages. We offer flexible appointment times including evenings and weekends for your convenience.',
  'Abu Dhabi',
  'Mushrif',
  'Medical Clinic',
  ARRAY['Family Medicine', 'Chronic Disease Management', 'Vaccinations'],
  'Physiotherapy
Dental Services
Eye Check
Diabetes Management
Blood Pressure Monitoring',
  2009,
  '0501234502',
  '971501234502',
  'citycare.clinic.abudhabi@gmail.com',
  'standard',
  true
),
(
  'Al Shifa Medical Clinic Ajman',
  'al-shifa-medical-clinic-ajman',
  'Al Shifa Medical Clinic provides affordable, high quality healthcare to residents of Ajman. Our multilingual staff ensures every patient feels comfortable and understood. We are open 7 days a week and accept walk-in patients.',
  'Ajman',
  'Al Rashidiya',
  'Medical Clinic',
  ARRAY['General Practice', 'Pediatric Care', 'Laboratory Tests'],
  'Dermatology
Dental Consultations
Physiotherapy
IV Drip Therapy
Health Certificates',
  2011,
  '0501234503',
  '971501234503',
  'alshifa.clinic.ajman@gmail.com',
  'standard',
  true
),

-- ─── RESTAURANT ──────────────────────────────────────────────
(
  'Zafran Indian Kitchen Dubai',
  'zafran-indian-kitchen-dubai',
  'Zafran Indian Kitchen brings authentic North Indian cuisine to Downtown Dubai. Our chefs use traditional recipes and freshly ground spices to create unforgettable flavors. From creamy butter chicken to sizzling tandoori platters, every dish is made with passion.',
  'Dubai',
  'Downtown',
  'Restaurant',
  ARRAY['Dine In', 'Takeaway', 'Delivery'],
  'Catering Services
Private Dining
Lunch Buffet
Corporate Orders
Birthday Party Packages',
  2014,
  '0501234601',
  '971501234601',
  'zafran.kitchen.dubai@gmail.com',
  'standard',
  true
),
(
  'Levant Grill Abu Dhabi',
  'levant-grill-abu-dhabi',
  'Levant Grill is a beloved Lebanese restaurant on the Abu Dhabi Corniche. We serve fresh, authentic mezze, grills and seafood in a stunning waterfront setting. Perfect for family gatherings, business lunches and romantic dinners.',
  'Abu Dhabi',
  'Corniche',
  'Restaurant',
  ARRAY['Lebanese Cuisine', 'Seafood', 'Mezze'],
  'Outdoor Terrace Dining
Shisha Available
Group Bookings
Iftar Packages
Catering and Events',
  2010,
  '0501234602',
  '971501234602',
  'levantgrill.abudhabi@gmail.com',
  'premium',
  true
),
(
  'Dragon Palace Chinese Restaurant',
  'dragon-palace-chinese-restaurant',
  'Dragon Palace has been serving authentic Chinese cuisine in Sharjah for over a decade. Our extensive menu features dim sum, Cantonese seafood, Sichuan dishes and much more. A favourite for family dining with generous portions and great value.',
  'Sharjah',
  'Al Majaz',
  'Restaurant',
  ARRAY['Chinese Cuisine', 'Dim Sum', 'Seafood'],
  'Private Dining Rooms
Takeaway and Delivery
Catering Services
Birthday Packages
Business Lunch Sets',
  2012,
  '0501234603',
  '971501234603',
  'dragonpalace.sharjah@gmail.com',
  'standard',
  true
),

-- ─── HOME MAINTENANCE ────────────────────────────────────────
(
  'Handyman Hub Dubai',
  'handyman-hub-dubai',
  'Handyman Hub is Dubai''s most trusted home maintenance service. We handle all types of repairs and installations quickly and professionally. Our app-based booking system means you can have a qualified handyman at your door within 2 hours.',
  'Dubai',
  'Mirdif',
  'Home Maintenance',
  ARRAY['General Repairs', 'Furniture Assembly', 'Painting'],
  'Door and Lock Repair
Tile and Grout Repair
Curtain Rod Installation
TV Wall Mounting
Pressure Washing',
  2017,
  '0501234701',
  '971501234701',
  'handymanhub.dubai@gmail.com',
  'sponsored',
  true
),
(
  'Fix It Fast RAK',
  'fix-it-fast-rak',
  'Fix It Fast provides comprehensive home maintenance services across Ras Al Khaimah. Our skilled team handles everything from minor repairs to full apartment renovations. We pride ourselves on arriving on time and completing work to the highest standard.',
  'Ras Al Khaimah',
  'Al Hamra',
  'Home Maintenance',
  ARRAY['Home Repairs', 'Electrical Work', 'Plumbing'],
  'Flooring Installation
False Ceiling Work
Kitchen Renovation
Bathroom Remodeling
Waterproofing',
  2015,
  '0501234702',
  '971501234702',
  'fixitfast.rak@gmail.com',
  'standard',
  true
),
(
  'Total Care Maintenance Fujairah',
  'total-care-maintenance-fujairah',
  'Total Care offers reliable home and office maintenance services in Fujairah. Our team is professionally trained and fully equipped to handle all maintenance needs. We offer affordable annual maintenance contracts for complete peace of mind.',
  'Fujairah',
  'Dibba',
  'Home Maintenance',
  ARRAY['Annual Contracts', 'General Maintenance', 'Renovation'],
  'Carpentry Work
Masonry Repairs
Glass and Glazing
Swimming Pool Maintenance
Garden Maintenance',
  2014,
  '0501234703',
  '971501234703',
  'totalcare.fujairah@gmail.com',
  'standard',
  true
),

-- ─── TUTORING ────────────────────────────────────────────────
(
  'Bright Minds Tutoring Dubai',
  'bright-minds-tutoring-dubai',
  'Bright Minds is Dubai''s leading private tutoring service. Our qualified teachers provide personalized one-on-one and small group sessions for students from Grade 1 to Grade 12. We cover all curricula including British, American, IB and UAE national.',
  'Dubai',
  'DIFC',
  'Tutoring',
  ARRAY['Maths Tutoring', 'Science Tutoring', 'English Tutoring'],
  'Arabic Language
IELTS Preparation
SAT Preparation
Online Tutoring
Exam Revision Workshops',
  2016,
  '0501234801',
  '971501234801',
  'brightminds.tutoring@gmail.com',
  'premium',
  true
),
(
  'Excel Academy Abu Dhabi',
  'excel-academy-abu-dhabi',
  'Excel Academy is a premier tutoring center in Abu Dhabi helping students achieve their academic goals. Our experienced tutors use proven teaching methods to boost confidence and results. We offer flexible scheduling including evenings and weekends.',
  'Abu Dhabi',
  'Reem Island',
  'Tutoring',
  ARRAY['Primary School Support', 'Secondary Tutoring', 'University Prep'],
  'Physics and Chemistry
Business Studies
Economics
Computer Science
Homework Help',
  2013,
  '0501234802',
  '971501234802',
  'excelacademy.abudhabi@gmail.com',
  'standard',
  true
),
(
  'Smart Steps Learning Center',
  'smart-steps-learning-center',
  'Smart Steps Learning Center provides quality tutoring services in Sharjah. We specialize in helping struggling students catch up and strong students excel. Our caring tutors build strong academic foundations that last a lifetime.',
  'Sharjah',
  'Muwaileh',
  'Tutoring',
  ARRAY['All Subjects', 'Exam Preparation', 'Arabic Tutoring'],
  'French Language
Islamic Studies
Art and Craft
Speed Reading
Study Skills Coaching',
  2018,
  '0501234803',
  '971501234803',
  'smartsteps.sharjah@gmail.com',
  'standard',
  true
);

-- ─── SAMPLE REVIEWS ──────────────────────────────────────────
INSERT INTO reviews (business_id, reviewer_name, rating, comment)
SELECT id, 'Ahmed Al Mansoori', 5, 'Excellent service! Very professional and came on time. Highly recommended.'
FROM businesses WHERE slug = 'arctic-cool-ac-services';

INSERT INTO reviews (business_id, reviewer_name, rating, comment)
SELECT id, 'Sara Khalid', 5, 'Best salon in Dubai Marina. My hair looks amazing. Will definitely come back!'
FROM businesses WHERE slug = 'glamour-studio-dubai';

INSERT INTO reviews (business_id, reviewer_name, rating, comment)
SELECT id, 'Mohammed Al Zaabi', 4, 'Good service, arrived quickly and fixed the leak professionally. Fair price.'
FROM businesses WHERE slug = 'al-madina-plumbing-services';

INSERT INTO reviews (business_id, reviewer_name, rating, comment)
SELECT id, 'Fatima Hassan', 5, 'Amazing food! The butter chicken is the best I have had in Dubai. Will order again.'
FROM businesses WHERE slug = 'zafran-indian-kitchen-dubai';

INSERT INTO reviews (business_id, reviewer_name, rating, comment)
SELECT id, 'Rania Al Maktoum', 5, 'My son''s grades improved so much after joining Bright Minds. Wonderful teachers!'
FROM businesses WHERE slug = 'bright-minds-tutoring-dubai';

INSERT INTO reviews (business_id, reviewer_name, rating, comment)
SELECT id, 'Omar Butti', 4, 'Very thorough deep clean. The team was polite and efficient. Happy with the results.'
FROM businesses WHERE slug = 'sparkle-home-cleaning-dubai';

INSERT INTO reviews (business_id, reviewer_name, rating, comment)
SELECT id, 'Layla Nasser', 5, 'Doctor was very kind and thorough. Short waiting time and clean clinic. Recommended.'
FROM businesses WHERE slug = 'healthfirst-medical-center';

INSERT INTO reviews (business_id, reviewer_name, rating, comment)
SELECT id, 'Khalid Ibrahim', 5, 'Handyman Hub assembled all my IKEA furniture perfectly. Super fast and tidy!'
FROM businesses WHERE slug = 'handyman-hub-dubai';
