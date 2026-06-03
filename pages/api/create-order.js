import Razorpay from 'razorpay'

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
})

const TIER_AMOUNTS = {
  standard: 49900,  // AED 499 in paise (Razorpay uses smallest currency unit)
  premium: 99900,   // AED 999
  sponsored: 149900, // AED 1499
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { tier, businessName, businessId } = req.body

    if (!tier || !TIER_AMOUNTS[tier]) {
      return res.status(400).json({ error: 'Invalid tier selected' })
    }

    const amount = TIER_AMOUNTS[tier]

    const order = await razorpay.orders.create({
      amount,
      currency: 'INR',
      receipt: 'daleel_' + businessId + '_' + Date.now(),
      notes: {
        businessName: businessName || 'Unknown Business',
        businessId: businessId || '',
        tier: tier,
        platform: 'Daleel UAE',
      },
    })

    return res.status(200).json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      keyId: process.env.RAZORPAY_KEY_ID,
    })
  } catch (error) {
    console.error('Razorpay order creation error:', error)
    return res.status(500).json({ error: 'Failed to create payment order' })
  }
}
