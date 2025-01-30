import { NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import StreamerModel from '@/models/Streamer'

export async function GET() {
  try {
    await connectDB()
    const streamers = await StreamerModel.find({}).sort({ followers: -1 })
    return NextResponse.json(streamers)
  } catch (error) {
    console.error('Error fetching streamers:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    await connectDB()
    const data = await request.json()
    const streamer = await StreamerModel.create(data)
    return NextResponse.json(streamer)
  } catch (error) {
    console.error('Error creating streamer:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  try {
    await connectDB()
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    
    if (!id) {
      return NextResponse.json(
        { error: 'Streamer ID is required' },
        { status: 400 }
      )
    }
    
    const deletedStreamer = await StreamerModel.findByIdAndDelete(id)
    
    if (!deletedStreamer) {
      return NextResponse.json(
        { error: 'Streamer not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting streamer:', error)
    return NextResponse.json(
      { error: 'Failed to delete streamer' },
      { status: 500 }
    )
  }
} 