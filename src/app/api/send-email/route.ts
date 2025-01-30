import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resendApiKey = process.env.RESEND_API_KEY;
const SENDER_EMAIL = process.env.SENDER_EMAIL || 'onboarding@resend.dev';
const RECIPIENT_EMAIL = process.env.RECIPIENT_EMAIL || 'contact@te-net.com';

if (!resendApiKey) {
  throw new Error('RESEND_API_KEY is not defined in environment variables');
}

const resend = new Resend(resendApiKey);

export async function POST(req: Request) {
  try {
    const { name, phone, email, category, message } = await req.json();

    // 필수 필드 검증
    if (!name || !phone || !email || !category || !message) {
      return NextResponse.json(
        { error: "모든 필드를 입력해주세요." },
        { status: 400 }
      );
    }

    console.log('Sending email with data:', { name, phone, email, category });

    const { data, error } = await resend.emails.send({
      from: SENDER_EMAIL,
      to: [RECIPIENT_EMAIL],
      replyTo: email,
      subject: `[지원서] ${category} - ${name}`,
      html: `
        <h2>새로운 지원서가 도착했습니다</h2>
        <p><strong>이름:</strong> ${name}</p>
        <p><strong>전화번호:</strong> ${phone}</p>
        <p><strong>이메일:</strong> ${email}</p>
        <p><strong>지원 분야:</strong> ${category}</p>
        <p><strong>상세 내용:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
    });

    if (error) {
      console.error('Resend API 에러:', JSON.stringify(error, null, 2));
      return NextResponse.json(
        { error: "이메일 전송에 실패했습니다. 잠시 후 다시 시도해주세요." },
        { status: 500 }
      );
    }

    console.log('Email sent successfully:', data);

    return NextResponse.json({ 
      success: true,
      message: "지원서가 성공적으로 전송되었습니다. 검토 후 연락드리겠습니다.",
      data 
    });
  } catch (error) {
    console.error('서버 에러:', error instanceof Error ? error.message : error);
    return NextResponse.json(
      { error: "서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요." },
      { status: 500 }
    );
  }
} 