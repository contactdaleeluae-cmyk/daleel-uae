import Razorpay from 'razorpay'

const TIER_AMOUNTS = {
  standard: 49900,
  premium: 99900,
  sponsored: 149900,
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  // Check environment variables
  if (!process.env.RAZORPAY_KEY_ID) {
    console.error('Missing RAZORPAY_KEY_ID')
    return res.status(500).json({ error: 'Razorpay Key ID not configured' })
  }

  if (!process.env.RAZORPAY_KEY_SECRET) {
    console.error('Missing RAZORPAY_KEY_SECRET')
    return res.status(500).json({ error: 'Razorpay Key Secret not configured' })
  }

  try {
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    })

    const { tier, businessName, businessId } = req.body

    if (!tier || !TIER_AMOUNTS[tier]) {
      return res.status(400).json({ error: 'Invalid tier: ' + tier })
    }

    const amount = TIER_AMOUNTS[tier]

    const order = await razorpay.orders.create({
      amount,
      currency: 'INR',
      receipt: 'daleel_' + (businessId || 'test') + '_' + Date.now(),
      notes: {
        businessName: businessName || 'Unknown',
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
    console.error('Razorpay error:', error)
    return res.status(500).json({
      error: 'Razorpay error: ' + (error.message || 'Unknown error'),
      details: error.error || null,
    })
  }
}
