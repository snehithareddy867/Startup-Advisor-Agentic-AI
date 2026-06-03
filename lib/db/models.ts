import mongoose, { Schema, Document, Model } from 'mongoose'

// User Schema
export interface IUser extends Document {
  name: string
  email: string
  password?: string
  role: 'founder' | 'investor' | 'mentor' | 'admin'
  avatar?: string
  bio?: string
  company?: string
  title?: string
  linkedIn?: string
  twitter?: string
  website?: string
  location?: string
  skills?: string[]
  interests?: string[]
  isVerified: boolean
  isActive: boolean
  lastLogin?: Date
  createdAt: Date
  updatedAt: Date
}

const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, select: false },
    role: { type: String, enum: ['founder', 'investor', 'mentor', 'admin'], required: true },
    avatar: String,
    bio: String,
    company: String,
    title: String,
    linkedIn: String,
    twitter: String,
    website: String,
    location: String,
    skills: [String],
    interests: [String],
    isVerified: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
    lastLogin: Date,
  },
  { timestamps: true }
)

UserSchema.index({ email: 1 })
UserSchema.index({ role: 1 })
UserSchema.index({ createdAt: -1 })

// Startup Schema
export interface IStartup extends Document {
  userId: mongoose.Types.ObjectId
  name: string
  description: string
  industry: string
  stage: 'idea' | 'mvp' | 'pre-seed' | 'seed' | 'series-a' | 'growth'
  targetMarket?: string
  problemStatement?: string
  solution?: string
  uniqueValueProposition?: string
  keyFeatures?: string[]
  teamSize?: number
  fundingNeeded?: number
  fundingRaised?: number
  website?: string
  pitchDeck?: string
  logo?: string
  tags?: string[]
  validationScore?: number
  status: 'active' | 'inactive' | 'pending' | 'funded'
  createdAt: Date
  updatedAt: Date
}

const StartupSchema = new Schema<IStartup>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    industry: { type: String, required: true },
    stage: { 
      type: String, 
      enum: ['idea', 'mvp', 'pre-seed', 'seed', 'series-a', 'growth'], 
      required: true 
    },
    targetMarket: String,
    problemStatement: String,
    solution: String,
    uniqueValueProposition: String,
    keyFeatures: [String],
    teamSize: Number,
    fundingNeeded: Number,
    fundingRaised: { type: Number, default: 0 },
    website: String,
    pitchDeck: String,
    logo: String,
    tags: [String],
    validationScore: { type: Number, min: 0, max: 100 },
    status: { type: String, enum: ['active', 'inactive', 'pending', 'funded'], default: 'active' },
  },
  { timestamps: true }
)

StartupSchema.index({ userId: 1 })
StartupSchema.index({ industry: 1 })
StartupSchema.index({ stage: 1 })
StartupSchema.index({ status: 1 })
StartupSchema.index({ createdAt: -1 })

// Investor Schema
export interface IInvestor extends Document {
  userId: mongoose.Types.ObjectId
  firm: string
  title: string
  investmentFocus: string[]
  stagePreference: string[]
  checkSizeMin: number
  checkSizeMax: number
  portfolioCount?: number
  dealsCompleted?: number
  activeDeals?: number
  bio?: string
  linkedIn?: string
  website?: string
  riskAppetite: 'conservative' | 'moderate' | 'aggressive'
  isVerified: boolean
  status: 'active' | 'inactive' | 'pending'
  createdAt: Date
  updatedAt: Date
}

const InvestorSchema = new Schema<IInvestor>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    firm: { type: String, required: true },
    title: String,
    investmentFocus: [String],
    stagePreference: [String],
    checkSizeMin: Number,
    checkSizeMax: Number,
    portfolioCount: { type: Number, default: 0 },
    dealsCompleted: { type: Number, default: 0 },
    activeDeals: { type: Number, default: 0 },
    bio: String,
    linkedIn: String,
    website: String,
    riskAppetite: { type: String, enum: ['conservative', 'moderate', 'aggressive'], default: 'moderate' },
    isVerified: { type: Boolean, default: false },
    status: { type: String, enum: ['active', 'inactive', 'pending'], default: 'pending' },
  },
  { timestamps: true }
)

InvestorSchema.index({ userId: 1 })
InvestorSchema.index({ investmentFocus: 1 })
InvestorSchema.index({ status: 1 })

// Mentor Schema
export interface IMentor extends Document {
  userId: mongoose.Types.ObjectId
  title: string
  expertise: string[]
  industries: string[]
  yearsExperience: number
  bio?: string
  linkedIn?: string
  calendlyUrl?: string
  hourlyRate?: number
  availability: 'high' | 'medium' | 'low'
  sessionsCompleted?: number
  rating?: number
  reviewCount?: number
  isVerified: boolean
  status: 'active' | 'inactive' | 'pending'
  createdAt: Date
  updatedAt: Date
}

const MentorSchema = new Schema<IMentor>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    title: { type: String, required: true },
    expertise: [String],
    industries: [String],
    yearsExperience: Number,
    bio: String,
    linkedIn: String,
    calendlyUrl: String,
    hourlyRate: Number,
    availability: { type: String, enum: ['high', 'medium', 'low'], default: 'medium' },
    sessionsCompleted: { type: Number, default: 0 },
    rating: { type: Number, min: 0, max: 5 },
    reviewCount: { type: Number, default: 0 },
    isVerified: { type: Boolean, default: false },
    status: { type: String, enum: ['active', 'inactive', 'pending'], default: 'pending' },
  },
  { timestamps: true }
)

MentorSchema.index({ userId: 1 })
MentorSchema.index({ expertise: 1 })
MentorSchema.index({ availability: 1 })
MentorSchema.index({ status: 1 })

// Notification Schema
export interface INotification extends Document {
  userId: mongoose.Types.ObjectId
  type: 'investor_interested' | 'mentor_accepted' | 'startup_match' | 'business_plan_generated' | 'funding_milestone' | 'system' | 'success' | 'error'
  title: string
  message: string
  actionUrl?: string
  actionLabel?: string
  avatar?: string
  read: boolean
  createdAt: Date
  updatedAt: Date
}

const NotificationSchema = new Schema<INotification>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    type: { 
      type: String, 
      enum: ['investor_interested', 'mentor_accepted', 'startup_match', 'business_plan_generated', 'funding_milestone', 'system', 'success', 'error'],
      required: true 
    },
    title: { type: String, required: true },
    message: { type: String, required: true },
    actionUrl: String,
    actionLabel: String,
    avatar: String,
    read: { type: Boolean, default: false },
  },
  { timestamps: true }
)

NotificationSchema.index({ userId: 1, read: 1 })
NotificationSchema.index({ createdAt: -1 })

// Chat History Schema
export interface IChatMessage extends Document {
  userId: mongoose.Types.ObjectId
  sessionId: string
  role: 'user' | 'assistant'
  content: string
  createdAt: Date
}

const ChatMessageSchema = new Schema<IChatMessage>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    sessionId: { type: String, required: true },
    role: { type: String, enum: ['user', 'assistant'], required: true },
    content: { type: String, required: true },
  },
  { timestamps: true }
)

ChatMessageSchema.index({ userId: 1, sessionId: 1 })
ChatMessageSchema.index({ createdAt: -1 })

// Business Plan Schema
export interface IBusinessPlan extends Document {
  startupId: mongoose.Types.ObjectId
  userId: mongoose.Types.ObjectId
  version: number
  executiveSummary: string
  missionStatement: string
  visionStatement: string
  revenueModel: string
  pricingStrategy: string
  goToMarketStrategy: string
  keyMilestones: Array<{ milestone: string; timeline: string }>
  riskAssessment: Array<{ risk: string; mitigation: string }>
  swotAnalysis: {
    strengths: string[]
    weaknesses: string[]
    opportunities: string[]
    threats: string[]
  }
  marketAnalysis?: {
    tam: { value: number; description: string }
    sam: { value: number; description: string }
    som: { value: number; description: string }
    trends: string[]
    competitors: Array<{
      name: string
      description: string
      strengths: string[]
      weaknesses: string[]
    }>
    marketGrowthRate: number
  }
  financialProjections?: {
    revenueForecast: Array<{
      year: number
      conservative: number
      expected: number
      optimistic: number
    }>
    fundingRequirements: {
      amount: number
      useOfFunds: Array<{ category: string; percentage: number; amount: number }>
      runway: number
    }
    unitEconomics: {
      cac: number
      ltv: number
      ltvCacRatio: number
      paybackPeriod: number
      grossMargin: number
    }
    burnRate: number
    breakEvenPoint: { months: number; revenue: number }
  }
  status: 'draft' | 'complete' | 'archived'
  createdAt: Date
  updatedAt: Date
}

const BusinessPlanSchema = new Schema<IBusinessPlan>(
  {
    startupId: { type: Schema.Types.ObjectId, ref: 'Startup', required: true },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    version: { type: Number, default: 1 },
    executiveSummary: String,
    missionStatement: String,
    visionStatement: String,
    revenueModel: String,
    pricingStrategy: String,
    goToMarketStrategy: String,
    keyMilestones: [{ milestone: String, timeline: String }],
    riskAssessment: [{ risk: String, mitigation: String }],
    swotAnalysis: {
      strengths: [String],
      weaknesses: [String],
      opportunities: [String],
      threats: [String],
    },
    marketAnalysis: {
      tam: { value: Number, description: String },
      sam: { value: Number, description: String },
      som: { value: Number, description: String },
      trends: [String],
      competitors: [{
        name: String,
        description: String,
        strengths: [String],
        weaknesses: [String],
      }],
      marketGrowthRate: Number,
    },
    financialProjections: {
      revenueForecast: [{
        year: Number,
        conservative: Number,
        expected: Number,
        optimistic: Number,
      }],
      fundingRequirements: {
        amount: Number,
        useOfFunds: [{ category: String, percentage: Number, amount: Number }],
        runway: Number,
      },
      unitEconomics: {
        cac: Number,
        ltv: Number,
        ltvCacRatio: Number,
        paybackPeriod: Number,
        grossMargin: Number,
      },
      burnRate: Number,
      breakEvenPoint: { months: Number, revenue: Number },
    },
    status: { type: String, enum: ['draft', 'complete', 'archived'], default: 'draft' },
  },
  { timestamps: true }
)

BusinessPlanSchema.index({ startupId: 1 })
BusinessPlanSchema.index({ userId: 1 })
BusinessPlanSchema.index({ status: 1 })

// Pitch Deck Schema
export interface IPitchDeck extends Document {
  startupId: mongoose.Types.ObjectId
  userId: mongoose.Types.ObjectId
  version: number
  title: string
  slides: Array<{
    order: number
    type: 'title' | 'problem' | 'solution' | 'market' | 'product' | 'business-model' | 'traction' | 'team' | 'financials' | 'ask' | 'custom'
    title: string
    content: string
    notes?: string
    imageUrl?: string
  }>
  exportUrl?: string
  status: 'draft' | 'complete' | 'archived'
  createdAt: Date
  updatedAt: Date
}

const PitchDeckSchema = new Schema<IPitchDeck>(
  {
    startupId: { type: Schema.Types.ObjectId, ref: 'Startup', required: true },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    version: { type: Number, default: 1 },
    title: String,
    slides: [{
      order: Number,
      type: { 
        type: String, 
        enum: ['title', 'problem', 'solution', 'market', 'product', 'business-model', 'traction', 'team', 'financials', 'ask', 'custom'] 
      },
      title: String,
      content: String,
      notes: String,
      imageUrl: String,
    }],
    exportUrl: String,
    status: { type: String, enum: ['draft', 'complete', 'archived'], default: 'draft' },
  },
  { timestamps: true }
)

PitchDeckSchema.index({ startupId: 1 })
PitchDeckSchema.index({ userId: 1 })

// Export models
export const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>('User', UserSchema)
export const Startup: Model<IStartup> = mongoose.models.Startup || mongoose.model<IStartup>('Startup', StartupSchema)
export const Investor: Model<IInvestor> = mongoose.models.Investor || mongoose.model<IInvestor>('Investor', InvestorSchema)
export const Mentor: Model<IMentor> = mongoose.models.Mentor || mongoose.model<IMentor>('Mentor', MentorSchema)
export const Notification: Model<INotification> = mongoose.models.Notification || mongoose.model<INotification>('Notification', NotificationSchema)
export const ChatMessage: Model<IChatMessage> = mongoose.models.ChatMessage || mongoose.model<IChatMessage>('ChatMessage', ChatMessageSchema)
export const BusinessPlan: Model<IBusinessPlan> = mongoose.models.BusinessPlan || mongoose.model<IBusinessPlan>('BusinessPlan', BusinessPlanSchema)
export const PitchDeck: Model<IPitchDeck> = mongoose.models.PitchDeck || mongoose.model<IPitchDeck>('PitchDeck', PitchDeckSchema)
