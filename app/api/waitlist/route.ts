import { Resend } from 'resend'
import { NextResponse } from 'next/server'

const resend = new Resend(process.env.RESEND_API_KEY)

// HTML email template with modern styling
const getEmailTemplate = (recipientEmail: string) => {
  // Create a simple hash of the email for unsubscribe verification
  const emailHash = Buffer.from(recipientEmail).toString('base64')
  const unsubscribeUrl = `${process.env.NEXT_PUBLIC_APP_URL}/unsubscribe?email=${encodeURIComponent(recipientEmail)}&hash=${emailHash}`

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Welcome to MuayTry!</title>
        <style>
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            margin: 0;
            padding: 0;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
          }
          .content {
            background: #ffffff;
            padding: 30px;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          }
          .story {
            margin: 20px 0;
            font-size: 16px;
          }
          .signature {
            margin-top: 30px;
            font-style: italic;
          }
          .footer {
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid #eee;
            font-size: 12px;
            color: #666;
            text-align: center;
          }
          .unsubscribe {
            color: #666;
            text-decoration: underline;
          }
          h1 {
            color: #0ea5e9; /* sky-500 */
            margin-bottom: 24px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="content">
            <h1>Welcome to Our Community! 🥊</h1>
            
            <div class="story">
              <p>We're Ingrid, a Muay Thai fighter, Mauro, a web developer, and our daughter Trinidad. A few months ago, we were living in Chile but couldn't find the Muay Thai community we dreamed of. So we took a leap, researched the cheapest cities in Thailand, and booked a one-way flight. It was scary — but it changed our lives.</p>

              <p>Now, after amazing training experiences, we're building MuayTry: a platform powered by AI and love, to help others find the best Muay Thai gyms and experiences in Thailand.</p>

              <p>Thank you for joining our journey. You'll receive emails with updates and resources.</p>
            </div>

            <div class="signature">
              With gratitude,<br>
              Ingrid, Mauro & Trinidad<br>
              The MuayTry Team
            </div>
          </div>
          
          <div class="footer">
            <p>You're receiving this email because you joined the MuayTry waitlist.</p>
            <p>
              <a href="${unsubscribeUrl}" class="unsubscribe">
                Click here to unsubscribe
              </a>
            </p>
          </div>
        </div>
      </body>
    </html>
  `
}

export async function POST(request: Request) {
  try {
    const { email } = await request.json()

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      )
    }

    // Send welcome email to the user
    await resend.emails.send({
      from: 'Muay Try Team <team@transactional.muaytry.com>',
      to: email,
      subject: 'Welcome to the MuayTry Community! 🥊',
      html: getEmailTemplate(email)
    })

    // Send notification to admin
    await resend.emails.send({
      from: 'Muay Try Team <team@transactional.muaytry.com>',
      to: process.env.ADMIN_EMAIL || '',
      subject: 'New Waitlist Signup',
      html: `
        <p>New signup for MuayTry waitlist:</p>
        <p>Email: ${email}</p>
      `
    })

    return NextResponse.json(
      { message: 'Successfully joined waitlist' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Waitlist error:', error)
    return NextResponse.json(
      { error: 'Failed to join waitlist' },
      { status: 500 }
    )
  }
} 