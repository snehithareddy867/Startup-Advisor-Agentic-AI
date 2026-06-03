import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/lib/db/mongodb'
import { Investor, User } from '@/lib/db/models'

export async function GET(req: NextRequest) {
  try {
    await connectDB()
    
    const searchParams = req.nextUrl.searchParams
    const focus = searchParams.get('focus')
    const status = searchParams.get('status')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const skip = (page - 1) * limit

    const query: Record<string, unknown> = {}
    if (focus) query.investmentFocus = { $in: [focus] }
    if (status) query.status = status

    const [investors, total] = await Promise.all([
      Investor.find(query)
        .populate('userId', 'name email avatar')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      Investor.countDocuments(query),
    ])

    return NextResponse.json({
      success: true,
      data: investors,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error('Error fetching investors:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch investors' },
      { status: 500 }
    )
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectDB()
    
    const body = await req.json()
    const { userId, firm, ...rest } = body

    // Check if investor profile exists
    const existingInvestor = await Investor.findOne({ userId })
    if (existingInvestor) {
      return NextResponse.json(
        { success: false, error: 'Investor profile already exists' },
        { status: 400 }
      )
    }

    const investor = await Investor.create({
      userId,
      firm,
      ...rest,
    })

    return NextResponse.json({
      success: true,
      data: investor,
    }, { status: 201 })
  } catch (error) {
    console.error('Error creating investor:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to create investor profile' },
      { status: 500 }
    )
  }
}

export async function PUT(req: NextRequest) {
  try {
    await connectDB()
    
    const body = await req.json()
    const { id, ...updates } = body

    const investor = await Investor.findByIdAndUpdate(
      id,
      { $set: updates },
      { new: true, runValidators: true }
    ).populate('userId', 'name email avatar')

    if (!investor) {
      return NextResponse.json(
        { success: false, error: 'Investor not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      data: investor,
    })
  } catch (error) {
    console.error('Error updating investor:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to update investor' },
      { status: 500 }
    )
  }
}
