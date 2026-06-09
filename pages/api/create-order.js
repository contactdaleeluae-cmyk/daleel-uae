export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const keyId = process.env.RAZORPAY_KEY_ID
  const keySecret = process.env.RAZORPAY_KEY_SECRET

  if (!keyId || !keySecret) {
    return res.status(500).json({ error: 'Missing Razorpay credentials' })
  }

  try {
    const Razorpay = require('razorpay')

    const razorpay = new Razorpay({
      key_id: keyId,
      key_secret: keySecret,
    })

    const { tier, businessName, businessId } = req.body

    const TIER_AMOUNTS = {
      standard: 49900,
      premium: 99900,
      sponsored: 149900,
    }

    if (!tier || !TIER_AMOUNTS[tier]) {
      return res.status(400).json({ error: 'Invalid tier: ' + tier })
    }

    // Keep receipt under 40 characters
    const shortId = businessId ? businessId.substring(0, 8) : 'new'
    const receipt = 'dleel_' + shortId + '_' + Date.now().toString().slice(-6)

    const order = await razorpay.orders.create({
      amount: TIER_AMOUNTS[tier],
      currency: 'INR',
      receipt: receipt,
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
      keyId: keyId,
    })

  } catch (error) {
    console.error('Razorpay error:', JSON.stringify(error, null, 2))
    return res.status(500).json({
      error: error.message || 'Unknown error',
      details: error.error || null,
    })
  }
}
