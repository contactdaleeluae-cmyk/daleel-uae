import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'contact.daleeluae@gmail.com'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { type, business } = req.body

  if (!type || !business) {
    return res.status(400).json({ error: 'Missing required fields' })
  }

  try {
    if (type === 'new_registration') {
      // Email 1 — Send to admin (you)
      await resend.emails.send({
        from: 'Daleel UAE <onboarding@resend.dev>',
        to: ADMIN_EMAIL,
        subject: 'New Business Registration — ' + business.name,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background: #0F172A; padding: 30px; text-align: center;">
              <h1 style="color: #0D9488; margin: 0; font-size: 24px;">Daleel UAE</h1>
              <p style="color: #94a3b8; margin: 8px 0 0 0; font-size: 14px;">New Business Registration</p>
            </div>
            <div style="padding: 30px; background: #f8fafc;">
              <div style="background: white; border-radius: 16px; padding: 24px; margin-bottom: 20px;">
                <h2 style="color: #0F172A; margin: 0 0 20px 0; font-size: 18px;">New Registration Details</h2>
                <table style="width: 100%; border-collapse: collapse;">
                  <tr style="border-bottom: 1px solid #f1f5f9;">
                    <td style="padding: 10px 0; color: #64748b; font-size: 14px; width: 40%;">Business Name</td>
                    <td style="padding: 10px 0; color: #0F172A; font-size: 14px; font-weight: bold;">${business.name}</td>
                  </tr>
                  <tr style="border-bottom: 1px solid #f1f5f9;">
                    <td style="padding: 10px 0; color: #64748b; font-size: 14px;">Plan</td>
                    <td style="padding: 10px 0; color: #0D9488; font-size: 14px; font-weight: bold; text-transform: capitalize;">${business.tier}</td>
                  </tr>
                  <tr style="border-bottom: 1px solid #f1f5f9;">
                    <td style="padding: 10px 0; color: #64748b; font-size: 14px;">Category</td>
                    <td style="padding: 10px 0; color: #0F172A; font-size: 14px;">${business.category}</td>
                  </tr>
                  <tr style="border-bottom: 1px solid #f1f5f9;">
                    <td style="padding: 10px 0; color: #64748b; font-size: 14px;">Location</td>
                    <td style="padding: 10px 0; color: #0F172A; font-size: 14px;">${business.area}, ${business.emirate}</td>
                  </tr>
                  <tr style="border-bottom: 1px solid #f1f5f9;">
                    <td style="padding: 10px 0; color: #64748b; font-size: 14px;">Mobile</td>
                    <td style="padding: 10px 0; color: #0F172A; font-size: 14px;">${business.mobile}</td>
                  </tr>
                  <tr style="border-bottom: 1px solid #f1f5f9;">
                    <td style="padding: 10px 0; color: #64748b; font-size: 14px;">WhatsApp</td>
                    <td style="padding: 10px 0; color: #0F172A; font-size: 14px;">${business.whatsapp}</td>
                  </tr>
                  <tr>
                    <td style="padding: 10px 0; color: #64748b; font-size: 14px;">Email</td>
                    <td style="padding: 10px 0; color: #0F172A; font-size: 14px;">${business.email}</td>
                  </tr>
                </table>
              </div>
              <div style="text-align: center;">
                <a href="https://daleeluae.net/admin/daleel-secure-dashboard-x7k9" style="display: inline-block; background: #0D9488; color: white; padding: 14px 28px; border-radius: 50px; text-decoration: none; font-weight: bold; font-size: 14px;">
                  Review in Admin Panel
                </a>
              </div>
            </div>
            <div style="padding: 20px; text-align: center; background: #0F172A;">
              <p style="color: #64748b; font-size: 12px; margin: 0;">Daleel UAE Admin Notification</p>
            </div>
          </div>
        `,
      })

      // Email 2 — Send to business owner
      if (business.email) {
        await resend.emails.send({
          from: 'Daleel UAE <onboarding@resend.dev>',
          to: business.email,
          subject: 'Your Daleel UAE Registration is Received — ' + business.name,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <div style="background: #0F172A; padding: 30px; text-align: center;">
                <h1 style="color: #0D9488; margin: 0; font-size: 24px;">Daleel UAE</h1>
                <p style="color: #94a3b8; margin: 8px 0 0 0; font-size: 14px;">UAE's Most Trusted Business Directory</p>
              </div>
              <div style="padding: 30px; background: #f8fafc;">
                <div style="background: white; border-radius: 16px; padding: 24px; margin-bottom: 20px;">
                  <h2 style="color: #0F172A; margin: 0 0 12px 0; font-size: 20px;">Thank you for registering!</h2>
                  <p style="color: #64748b; font-size: 14px; line-height: 1.6; margin: 0 0 20px 0;">
                    Hi there, we have received your registration for <strong style="color: #0F172A;">${business.name}</strong> on Daleel UAE. 
                    Our team will review your listing and activate it within 2 hours of payment confirmation.
                  </p>
                  <div style="background: #f8fafc; border-radius: 12px; padding: 16px; margin-bottom: 20px;">
                    <h3 style="color: #0F172A; margin: 0 0 12px 0; font-size: 14px; font-weight: bold;">Your Registration Summary</h3>
                    <table style="width: 100%; border-collapse: collapse;">
                      <tr style="border-bottom: 1px solid #e2e8f0;">
                        <td style="padding: 8px 0; color: #64748b; font-size: 13px; width: 40%;">Business Name</td>
                        <td style="padding: 8px 0; color: #0F172A; font-size: 13px; font-weight: bold;">${business.name}</td>
                      </tr>
                      <tr style="border-bottom: 1px solid #e2e8f0;">
                        <td style="padding: 8px 0; color: #64748b; font-size: 13px;">Plan</td>
                        <td style="padding: 8px 0; color: #0D9488; font-size: 13px; font-weight: bold; text-transform: capitalize;">${business.tier}</td>
                      </tr>
                      <tr style="border-bottom: 1px solid #e2e8f0;">
                        <td style="padding: 8px 0; color: #64748b; font-size: 13px;">Location</td>
                        <td style="padding: 8px 0; color: #0F172A; font-size: 13px;">${business.area}, ${business.emirate}</td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 0; color: #64748b; font-size: 13px;">Category</td>
                        <td style="padding: 8px 0; color: #0F172A; font-size: 13px;">${business.category}</td>
                      </tr>
                    </table>
                  </div>
                  <h3 style="color: #0F172A; margin: 0 0 12px 0; font-size: 14px; font-weight: bold;">Next Steps</h3>
                  <div style="space-y: 8px;">
                    <div style="display: flex; align-items: flex-start; margin-bottom: 10px;">
                      <span style="background: #0D9488; color: white; border-radius: 50%; width: 22px; height: 22px; display: inline-flex; align-items: center; justify-content: center; font-size: 11px; font-weight: bold; margin-right: 10px; flex-shrink: 0;">1</span>
                      <p style="color: #64748b; font-size: 13px; margin: 2px 0 0 0;">Complete your payment via WhatsApp or bank transfer</p>
                    </div>
                    <div style="display: flex; align-items: flex-start; margin-bottom: 10px;">
                      <span style="background: #0D9488; color: white; border-radius: 50%; width: 22px; height: 22px; display: inline-flex; align-items: center; justify-content: center; font-size: 11px; font-weight: bold; margin-right: 10px; flex-shrink: 0;">2</span>
                      <p style="color: #64748b; font-size: 13px; margin: 2px 0 0 0;">Send us your payment confirmation on WhatsApp</p>
                    </div>
                    <div style="display: flex; align-items: flex-start;">
                      <span style="background: #0D9488; color: white; border-radius: 50%; width: 22px; height: 22px; display: inline-flex; align-items: center; justify-content: center; font-size: 11px; font-weight: bold; margin-right: 10px; flex-shrink: 0;">3</span>
                      <p style="color: #64748b; font-size: 13px; margin: 2px 0 0 0;">Your listing goes live within 2 hours</p>
                    </div>
                  </div>
                </div>
                <div style="text-align: center; margin-bottom: 20px;">
                  <a href="https://daleeluae.net" style="display: inline-block; background: #0D9488; color: white; padding: 14px 28px; border-radius: 50px; text-decoration: none; font-weight: bold; font-size: 14px;">
                    Visit Daleel UAE
                  </a>
                </div>
                <p style="color: #94a3b8; font-size: 12px; text-align: center; margin: 0;">
                  Questions? Contact us at contact.daleeluae@gmail.com
                </p>
              </div>
              <div style="padding: 20px; text-align: center; background: #0F172A;">
                <p style="color: #64748b; font-size: 12px; margin: 0;">© 2025 Daleel UAE. All rights reserved.</p>
              </div>
            </div>
          `,
        })
      }

      return res.status(200).json({ success: true, message: 'Emails sent successfully' })
    }

    if (type === 'listing_approved') {
      await resend.emails.send({
        from: 'Daleel UAE <onboarding@resend.dev>',
        to: business.email,
        subject: 'Your Listing is Live on Daleel UAE! — ' + business.name,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background: #0F172A; padding: 30px; text-align: center;">
              <h1 style="color: #0D9488; margin: 0; font-size: 24px;">Daleel UAE</h1>
              <p style="color: #94a3b8; margin: 8px 0 0 0; font-size: 14px;">Your listing is now live!</p>
            </div>
            <div style="padding: 30px; background: #f8fafc;">
              <div style="background: white; border-radius: 16px; padding: 24px; text-align: center; margin-bottom: 20px;">
                <div style="width: 64px; height: 64px; background: rgba(13,148,136,0.1); border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; margin-bottom: 16px;">
                  <span style="font-size: 28px;">🎉</span>
                </div>
                <h2 style="color: #0F172A; margin: 0 0 8px 0; font-size: 20px;">Your Business is Live!</h2>
                <p style="color: #64748b; font-size: 14px; line-height: 1.6; margin: 0 0 24px 0;">
                  Congratulations! <strong style="color: #0F172A;">${business.name}</strong> is now live on Daleel UAE and visible to thousands of UAE customers searching for your services.
                </p>
                <a href="https://daleeluae.net/business/${business.slug}" style="display: inline-block; background: #0D9488; color: white; padding: 14px 28px; border-radius: 50px; text-decoration: none; font-weight: bold; font-size: 14px;">
                  View Your Live Listing
                </a>
              </div>
              <div style="background: white; border-radius: 16px; padding: 24px;">
                <h3 style="color: #0F172A; margin: 0 0 12px 0; font-size: 14px;">Share your listing to get more customers:</h3>
                <p style="color: #64748b; font-size: 13px; margin: 0;">
                  Share this link with your customers and on your social media:<br/>
                  <a href="https://daleeluae.net/business/${business.slug}" style="color: #0D9488;">https://daleeluae.net/business/${business.slug}</a>
                </p>
              </div>
            </div>
            <div style="padding: 20px; text-align: center; background: #0F172A;">
              <p style="color: #64748b; font-size: 12px; margin: 0;">© 2025 Daleel UAE. All rights reserved.</p>
            </div>
          </div>
        `,
      })
      return res.status(200).json({ success: true, message: 'Approval email sent' })
    }

    return res.status(400).json({ error: 'Unknown email type' })

  } catch (error) {
    console.error('Email error:', error)
    return res.status(500).json({ error: 'Failed to send email: ' + error.message })
  }
}
