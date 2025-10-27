import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { name, email, company, message } = await request.json();

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required' },
        { status: 400 }
      );
    }

    // Prepare Mailgun form data
    const formData = new URLSearchParams();
    formData.append('from', `${name} <${process.env.MAILGUN_FROM_EMAIL}>`);
    formData.append('to', process.env.MAILGUN_TO_EMAIL!);
    formData.append('subject', `New Contact Form: ${company || name}`);
    formData.append('text', `
Name: ${name}
Email: ${email}
Company: ${company || 'Not provided'}

Message:
${message}
    `);
    formData.append('h:Reply-To', email);

    // Send via Mailgun API
    const mailgunResponse = await fetch(
      `https://api.mailgun.net/v3/${process.env.MAILGUN_DOMAIN}/messages`,
      {
        method: 'POST',
        headers: {
          Authorization: `Basic ${Buffer.from(
            `api:${process.env.MAILGUN_API_KEY}`
          ).toString('base64')}`,
        },
        body: formData,
      }
    );

    if (!mailgunResponse.ok) {
      const errorText = await mailgunResponse.text();
      console.error('Mailgun error:', errorText);
      return NextResponse.json(
        { error: 'Failed to send email' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: 'Email sent successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
