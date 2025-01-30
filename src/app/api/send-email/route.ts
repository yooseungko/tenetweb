import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { name, phone, email, category, message } = await req.json();

    const { data, error } = await resend.emails.send({
      from: 'Tenet <contact@te-net.com>',
      to: ['contact@te-net.com'],
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
      console.error('이메일 전송 에러:', error);
      return NextResponse.json(
        { error: "이메일 전송에 실패했습니다." },
        { status: 500 }
      );
    }

    return NextResponse.json({ 
      message: "이메일이 성공적으로 전송되었습니다.",
      data 
    });
  } catch (error) {
    console.error('이메일 전송 에러:', error);
    return NextResponse.json(
      { error: "이메일 전송에 실패했습니다." },
      { status: 500 }
    );
  }
} 