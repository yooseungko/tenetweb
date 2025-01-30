import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import StreamerModel from '@/models/Streamer'

export async function PUT(
  request: NextRequest,
  context: { params: { id: string } }
) {
  try {
    await connectDB()
    const id = context.params.id
    const streamer = await request.json()
    
    const updatedStreamer = await StreamerModel.findByIdAndUpdate(
      id,
      { ...streamer, updatedAt: new Date() },
      { new: true }
    )

    if (!updatedStreamer) {
      return NextResponse.json(
        { error: '스트리머를 찾을 수 없습니다.' },
        { status: 404 }
      )
    }

    return NextResponse.json(updatedStreamer)
  } catch (error) {
    console.error('Error updating streamer:', error)
    return NextResponse.json(
      { error: '스트리머 정보 수정에 실패했습니다.' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  context: { params: { id: string } }
) {
  try {
    await connectDB()
    const id = context.params.id
    
    const deletedStreamer = await StreamerModel.findByIdAndDelete(id)
    
    if (!deletedStreamer) {
      return NextResponse.json(
        { error: '스트리머를 찾을 수 없습니다.' },
        { status: 404 }
      )
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting streamer:', error)
    return NextResponse.json(
      { error: '스트리머 삭제에 실패했습니다.' },
      { status: 500 }
    )
  }
} 