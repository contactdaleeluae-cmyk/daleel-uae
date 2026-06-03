import crypto from 'crypto'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      businessId,
    } = req.body

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({ error: 'Missing payment details' })
    }

    // Verify signature
    const body = razorpay_order_id + '|' + razorpay_payment_id
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest('hex')

    const isAuthentic = expectedSignature === razorpay_signature

    if (!isAuthentic) {
      return res.status(400).json({ error: 'Payment verification failed' })
    }

    // Activate the business listing
    if (businessId) {
      const { error: updateError } = await supabase
        .from('businesses')
        .update({
          active: true,
          payment_id: razorpay_payment_id,
          order_id: razorpay_order_id,
        })
        .eq('id', businessId)

      if (updateError) {
        console.error('Supabase update error:', updateError)
      }
    }

    return res.status(200).json({
      success: true,
      message: 'Payment verified and listing activated',
      paymentId: razorpay_payment_id,
    })
  } catch (error) {
    console.error('Payment verification error:', error)
    return res.status(500).json({ error: 'Payment verification failed' })
  }
}
