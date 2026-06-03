import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/lib/db/mongodb'
import { Startup } from '@/lib/db/models'

export async function GET(req: NextRequest) {
  try {
    await connectDB()
    
    const searchParams = req.nextUrl.searchParams
    const userId = searchParams.get('userId')
    const industry = searchParams.get('industry')
    const stage = searchParams.get('stage')
    const status = searchParams.get('status')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const skip = (page - 1) * limit

    const query: Record<string, unknown> = {}
    if (userId) query.userId = userId
    if (industry) query.industry = industry
    if (stage) query.stage = stage
    if (status) query.status = status

    const [startups, total] = await Promise.all([
      Startup.find(query)
        .populate('userId', 'name email avatar')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      Startup.countDocuments(query),
    ])

    return NextResponse.json({
      success: true,
      data: startups,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error('Error fetching startups:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch startups' },
      { status: 500 }
    )
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectDB()
    
    const body = await req.json()
    const { userId, name, description, industry, stage, ...rest } = body

    const startup = await Startup.create({
      userId,
      name,
      description,
      industry,
      stage,
      ...rest,
    })

    return NextResponse.json({
      success: true,
      data: startup,
    }, { status: 201 })
  } catch (error) {
    console.error('Error creating startup:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to create startup' },
      { status: 500 }
    )
  }
}

export async function PUT(req: NextRequest) {
  try {
    await connectDB()
    
    const body = await req.json()
    const { id, ...updates } = body

    const startup = await Startup.findByIdAndUpdate(
      id,
      { $set: updates },
      { new: true, runValidators: true }
    )

    if (!startup) {
      return NextResponse.json(
        { success: false, error: 'Startup not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      data: startup,
    })
  } catch (error) {
    console.error('Error updating startup:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to update startup' },
      { status: 500 }
    )
  }
}

export async function DELETE(req: NextRequest) {
  try {
    await connectDB()
    
    const searchParams = req.nextUrl.searchParams
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Startup ID required' },
        { status: 400 }
      )
    }

    const startup = await Startup.findByIdAndDelete(id)

    if (!startup) {
      return NextResponse.json(
        { success: false, error: 'Startup not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Startup deleted successfully',
    })
  } catch (error) {
    console.error('Error deleting startup:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to delete startup' },
      { status: 500 }
    )
  }
}
