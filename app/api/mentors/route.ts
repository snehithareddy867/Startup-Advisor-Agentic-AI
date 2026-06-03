import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/lib/db/mongodb'
import { Mentor } from '@/lib/db/models'

export async function GET(req: NextRequest) {
  try {
    await connectDB()
    
    const searchParams = req.nextUrl.searchParams
    const expertise = searchParams.get('expertise')
    const availability = searchParams.get('availability')
    const status = searchParams.get('status')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const skip = (page - 1) * limit

    const query: Record<string, unknown> = {}
    if (expertise) query.expertise = { $in: [expertise] }
    if (availability) query.availability = availability
    if (status) query.status = status

    const [mentors, total] = await Promise.all([
      Mentor.find(query)
        .populate('userId', 'name email avatar')
        .sort({ rating: -1, createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      Mentor.countDocuments(query),
    ])

    return NextResponse.json({
      success: true,
      data: mentors,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error('Error fetching mentors:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch mentors' },
      { status: 500 }
    )
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectDB()
    
    const body = await req.json()
    const { userId, title, expertise, industries, yearsExperience, ...rest } = body

    // Check if mentor profile exists
    const existingMentor = await Mentor.findOne({ userId })
    if (existingMentor) {
      return NextResponse.json(
        { success: false, error: 'Mentor profile already exists' },
        { status: 400 }
      )
    }

    const mentor = await Mentor.create({
      userId,
      title,
      expertise,
      industries,
      yearsExperience,
      ...rest,
    })

    return NextResponse.json({
      success: true,
      data: mentor,
    }, { status: 201 })
  } catch (error) {
    console.error('Error creating mentor:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to create mentor profile' },
      { status: 500 }
    )
  }
}

export async function PUT(req: NextRequest) {
  try {
    await connectDB()
    
    const body = await req.json()
    const { id, ...updates } = body

    const mentor = await Mentor.findByIdAndUpdate(
      id,
      { $set: updates },
      { new: true, runValidators: true }
    ).populate('userId', 'name email avatar')

    if (!mentor) {
      return NextResponse.json(
        { success: false, error: 'Mentor not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      data: mentor,
    })
  } catch (error) {
    console.error('Error updating mentor:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to update mentor' },
      { status: 500 }
    )
  }
}
