import nodemailer from 'nodemailer'
import fs from 'fs'
import path from 'path'

let transporter

// Initialize email transporter
if (process.env.EMAIL_USER && process.env.EMAIL_PASSWORD && process.env.EMAIL_PASSWORD !== 'your-16-char-app-password') {
  transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD
    }
  })
} else {
  // Fallback: no email configured
  transporter = null
}

// Function to save message to local file
function saveMessageLocally(data) {
  try {
    const messagesDir = path.join(process.cwd(), 'messages')
    if (!fs.existsSync(messagesDir)) {
      fs.mkdirSync(messagesDir, { recursive: true })
    }

    const timestamp = new Date().toISOString()
    const filename = `message_${Date.now()}.json`
    const filepath = path.join(messagesDir, filename)

    fs.writeFileSync(filepath, JSON.stringify({
      ...data,
      receivedAt: timestamp
    }, null, 2))

    return true
  } catch (error) {
    console.error('Error saving message locally:', error)
    return false
  }
}

// Function to send email
async function sendEmails(name, email, message) {
  if (!transporter) {
    return false
  }

  try {
    // Send email to admin
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: 'abdullah987570@gmail.com',
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #6e39e7;">New Contact Form Submission</h2>

          <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Message:</strong></p>
            <p style="white-space: pre-wrap; color: #333;">${message}</p>
          </div>

          <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
          <p style="color: #999; font-size: 12px;">
            This message was sent from your Skool.Online contact form.
            <br>
            Sent at: ${new Date().toLocaleString()}
          </p>
        </div>
      `,
      replyTo: email
    })

    // Send confirmation email to user
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'We received your message - Skool.Online',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #6e39e7;">Thank You for Contacting Us!</h2>

          <p>Hi ${name},</p>

          <p>We've received your message and will get back to you as soon as possible. We typically respond within 24 hours.</p>

          <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #333;">Your Message:</h3>
            <p style="white-space: pre-wrap; color: #666;">${message}</p>
          </div>

          <p>In the meantime, check out our <a href="https://skool.online" style="color: #6e39e7;">platform</a> to get started with your first growth strategy.</p>

          <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
          <p style="color: #999; font-size: 12px;">
            Best regards,<br>
            The Skool.Online Team
          </p>
        </div>
      `
    })

    return true
  } catch (error) {
    console.error('Email sending error:', error)
    return false
  }
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  const { name, email, message } = req.body

  // Validation
  if (!name || !email || !message) {
    return res.status(400).json({ message: 'Missing required fields' })
  }

  if (name.trim().length < 2) {
    return res.status(400).json({ message: 'Name must be at least 2 characters' })
  }

  if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
    return res.status(400).json({ message: 'Invalid email address' })
  }

  if (message.trim().length < 10) {
    return res.status(400).json({ message: 'Message must be at least 10 characters' })
  }

  try {
    // Try to send email
    const emailSent = await sendEmails(name, email, message)

    // Always save message locally as backup
    saveMessageLocally({ name, email, message })

    if (emailSent) {
      return res.status(200).json({
        message: 'Message sent successfully! We will be in touch soon.',
        success: true
      })
    } else {
      // Email failed but message saved locally
      return res.status(200).json({
        message: 'Message received! We will review it shortly.',
        success: true,
        note: 'Email delivery is currently unavailable, but your message has been saved.'
      })
    }
  } catch (error) {
    console.error('Contact form error:', error)

    // Try to save locally as fallback
    saveMessageLocally({ name, email, message })

    return res.status(200).json({
      message: 'Message received! We will review it shortly.',
      success: true
    })
  }
}
