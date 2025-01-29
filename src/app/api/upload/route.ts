import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import mongoose from 'mongoose';
import { Streamer } from '@/models/Streamer';

export const config = {
  api: {
    bodyParser: false,
  },
};

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

export async function POST(request: Request) {
  try {
    console.log('이미지 업로드 요청 시작');
    
    // MongoDB 연결
    await connectDB();
    console.log('MongoDB 연결 성공');
    
    const formData = await request.formData();
    const file = formData.get('image');
    const streamerId = formData.get('streamerId');
    
    console.log('받은 데이터:', { 
      hasFile: !!file, 
      fileType: file instanceof File ? file.type : 'not a file',
      streamerId 
    });

    if (!file || !streamerId) {
      return NextResponse.json(
        { error: '이미지와 스트리머 ID가 필요합니다.' }, 
        { status: 400 }
      );
    }

    if (!(file instanceof File)) {
      return NextResponse.json(
        { error: '올바른 파일 형식이 아닙니다.' },
        { status: 400 }
      );
    }

    // 파일 크기 체크
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: '이미지 크기는 5MB를 초과할 수 없습니다.' },
        { status: 400 }
      );
    }

    // 파일 타입 체크
    if (!file.type.startsWith('image/')) {
      return NextResponse.json(
        { error: '이미지 파일만 업로드할 수 있습니다.' },
        { status: 400 }
      );
    }

    // ObjectId 유효성 검사
    if (!mongoose.Types.ObjectId.isValid(streamerId.toString())) {
      return NextResponse.json(
        { error: '잘못된 스트리머 ID 형식입니다.' },
        { status: 400 }
      );
    }

    try {
      // 이미지 데이터를 Base64로 변환
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const base64Image = `data:${file.type};base64,${buffer.toString('base64')}`;
      console.log('이미지 변환 완료');

      // 이미지 URL 업데이트
      const result = await Streamer.findByIdAndUpdate(
        streamerId,
        { $set: { imageUrl: base64Image } },
        { new: true, runValidators: true }
      );
      
      if (!result) {
        return NextResponse.json(
          { error: '스트리머를 찾을 수 없습니다.' },
          { status: 404 }
        );
      }
      
      console.log('이미지 업로드 성공');
      
      return NextResponse.json(
        { success: true, message: '이미지가 성공적으로 업로드되었습니다.' },
        { status: 200 }
      );
    } catch (dbError) {
      console.error('데이터베이스 오류 상세:', dbError);
      return NextResponse.json(
        { 
          error: '데이터베이스 오류가 발생했습니다.',
          details: dbError instanceof Error ? dbError.message : '알 수 없는 오류'
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('이미지 업로드 중 오류 상세:', error);
    return NextResponse.json(
      { 
        error: '이미지 업로드 중 오류가 발생했습니다.',
        details: error instanceof Error ? error.message : '알 수 없는 오류'
      },
      { status: 500 }
    );
  }
} 
