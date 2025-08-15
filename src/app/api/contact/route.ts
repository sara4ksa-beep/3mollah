import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {
  try {
    const { name, email, message } = await request.json();

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'جميع الحقول مطلوبة' },
        { status: 400 }
      );
    }

    // Create transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER, // Your Gmail address
        pass: process.env.EMAIL_PASS  // Your Gmail app password
      }
    });

    // Email content
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: 'abrajsa@gmail.com',
      subject: `رسالة جديدة من ${name}`,
      html: `
        <div dir="rtl" style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
          <div style="background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <h2 style="color: #2563eb; text-align: center; margin-bottom: 30px;">رسالة جديدة من نموذج الاتصال</h2>
            
            <div style="margin-bottom: 20px;">
              <h3 style="color: #374151; margin-bottom: 10px;">معلومات المرسل:</h3>
              <p style="margin: 5px 0;"><strong>الاسم:</strong> ${name}</p>
              <p style="margin: 5px 0;"><strong>البريد الإلكتروني:</strong> ${email}</p>
            </div>
            
            <div style="margin-bottom: 20px;">
              <h3 style="color: #374151; margin-bottom: 10px;">الرسالة:</h3>
              <div style="background-color: #f3f4f6; padding: 15px; border-radius: 5px; border-right: 4px solid #2563eb;">
                <p style="margin: 0; line-height: 1.6; white-space: pre-wrap;">${message}</p>
              </div>
            </div>
            
            <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
              <p style="color: #6b7280; font-size: 14px;">تم إرسال هذه الرسالة من نموذج الاتصال في الموقع</p>
            </div>
          </div>
        </div>
      `,
      text: `
رسالة جديدة من نموذج الاتصال

معلومات المرسل:
الاسم: ${name}
البريد الإلكتروني: ${email}

الرسالة:
${message}

---
تم إرسال هذه الرسالة من نموذج الاتصال في الموقع
      `
    };

    // Send email
    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { message: 'تم إرسال رسالتك بنجاح' },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { error: 'حدث خطأ أثناء إرسال الرسالة. يرجى المحاولة مرة أخرى.' },
      { status: 500 }
    );
  }
}
