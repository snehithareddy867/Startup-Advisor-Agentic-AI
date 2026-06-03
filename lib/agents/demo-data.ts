// Demo startup data for StudySync AI

import type { 
  StartupInput, 
  FounderAgentOutput, 
  MarketResearchOutput, 
  BusinessPlanOutput, 
  FinancialOutput, 
  InvestorMatchOutput, 
  MentorMatchOutput 
} from './types'

export const demoStartupInput: StartupInput = {
  name: 'StudySync AI',
  description: 'An AI-powered study companion that creates personalized learning paths, generates practice questions, and provides real-time tutoring for students.',
  industry: 'EdTech',
  stage: 'seed',
  targetMarket: 'High school and college students globally',
  problemStatement: 'Students struggle with personalized learning and lack affordable access to quality tutoring.',
  solution: 'AI tutor that adapts to each student learning style with 24/7 availability at a fraction of human tutor cost.',
  teamSize: 5,
  fundingNeeded: 2000000,
}

export const demoFounderOutput: FounderAgentOutput = {
  refinedIdea: 'StudySync AI is a revolutionary AI-powered educational platform that provides personalized tutoring experiences to students worldwide. By leveraging advanced language models and adaptive learning algorithms, we deliver customized study plans, instant homework help, and exam preparation that adapts to each student\'s unique learning style and pace.',
  industry: 'EdTech / AI Education',
  problemStatement: 'Traditional tutoring is expensive ($40-100/hour), scheduling is inflexible, and quality varies significantly. Students need affordable, always-available, personalized academic support that traditional education systems cannot provide.',
  targetAudience: 'High school and college students (ages 14-24) seeking academic improvement, particularly in STEM subjects and standardized test preparation. Secondary audience includes parents looking for affordable tutoring alternatives.',
  uniqueValueProposition: 'StudySync AI provides 24/7 personalized tutoring at 1/10th the cost of human tutors, with AI that remembers your learning journey and adapts in real-time to maximize knowledge retention.',
  keyFeatures: [
    'Personalized learning paths based on diagnostic assessments',
    'AI-generated practice questions with detailed explanations',
    'Real-time tutoring with voice and text support',
    'Progress tracking and analytics for students and parents',
    'Integration with school curricula and standardized test prep',
  ],
}

export const demoMarketOutput: MarketResearchOutput = {
  tam: { value: 165000000000, description: 'Global education technology market including all digital learning solutions' },
  sam: { value: 32000000000, description: 'AI-powered tutoring and personalized learning solutions in English-speaking markets' },
  som: { value: 800000000, description: 'Achievable market share in first 5 years focusing on US, UK, and Canada' },
  trends: [
    'AI adoption in education growing at 45% CAGR',
    'Remote and hybrid learning becoming permanent',
    'Parents increasingly seeking supplementary education',
    'Personalized learning shown to improve outcomes by 30%',
  ],
  competitors: [
    {
      name: 'Khan Academy',
      description: 'Free online education platform with video lessons',
      strengths: ['Free content', 'Brand recognition', 'Wide subject coverage'],
      weaknesses: ['Limited personalization', 'No real-time tutoring', 'Generic content'],
    },
    {
      name: 'Chegg',
      description: 'Homework help and textbook solutions',
      strengths: ['Large question database', 'Expert answers', 'Brand awareness'],
      weaknesses: ['Accused of enabling cheating', 'Expensive subscriptions', 'Limited AI capabilities'],
    },
    {
      name: 'Duolingo',
      description: 'Gamified language learning app',
      strengths: ['Excellent gamification', 'Mobile-first', 'Freemium model'],
      weaknesses: ['Language-only focus', 'Limited depth', 'Repetitive content'],
    },
  ],
  marketGrowthRate: 16.5,
}

export const demoBusinessPlanOutput: BusinessPlanOutput = {
  executiveSummary: 'StudySync AI is pioneering the future of education by making world-class tutoring accessible to every student. Our AI-powered platform combines advanced natural language processing with adaptive learning algorithms to deliver personalized educational experiences that match or exceed human tutoring effectiveness.\n\nWith the global EdTech market projected to reach $404B by 2028 and AI education growing at 45% CAGR, StudySync AI is positioned to capture significant market share by addressing the $165B tutoring market with a scalable, affordable solution.\n\nOur team of education experts and AI engineers has built a platform that has shown 40% improvement in test scores during our beta program with 500 students. We are seeking $2M in seed funding to scale our technology and expand to 100,000 users.',
  missionStatement: 'To democratize access to high-quality education by providing every student with a personalized AI tutor that adapts to their unique learning needs.',
  visionStatement: 'To become the world\'s most effective and accessible learning companion, helping 100 million students achieve their academic potential.',
  revenueModel: 'Freemium SaaS model with tiered subscriptions: Free tier (limited daily questions), Student Plan ($9.99/month - unlimited tutoring), Family Plan ($19.99/month - up to 4 students), School License (custom pricing - bulk institutional access).',
  pricingStrategy: 'Competitive pricing at 10-20% of human tutoring costs. Monthly and annual plans with 20% discount for yearly commitment. Special pricing for schools and districts.',
  goToMarketStrategy: 'Phase 1: Direct-to-consumer via social media marketing targeting parents and students on TikTok, Instagram, and YouTube. Phase 2: B2B sales to private schools and tutoring centers. Phase 3: District partnerships and government education programs.',
  keyMilestones: [
    { milestone: 'Public Launch', timeline: 'Q1 2025' },
    { milestone: '10,000 Active Users', timeline: 'Q2 2025' },
    { milestone: 'Series A Funding', timeline: 'Q3 2025' },
    { milestone: '100,000 Active Users', timeline: 'Q4 2025' },
    { milestone: 'International Expansion', timeline: 'Q2 2026' },
    { milestone: '1M Active Users', timeline: 'Q4 2026' },
  ],
  riskAssessment: [
    { risk: 'AI hallucinations providing incorrect information', mitigation: 'Multi-layer fact-checking system and human review for flagged content' },
    { risk: 'Competition from big tech (Google, Microsoft)', mitigation: 'Focus on education-specific features and school integrations' },
    { risk: 'Regulatory concerns about AI in education', mitigation: 'Proactive compliance with education data privacy laws (FERPA, COPPA)' },
    { risk: 'Customer acquisition costs too high', mitigation: 'Strong referral program and B2B channel development' },
  ],
  swotAnalysis: {
    strengths: [
      'Cutting-edge AI technology with proven results',
      'Experienced team with education and AI backgrounds',
      '40% improvement in beta user test scores',
      'Scalable technology with low marginal cost',
    ],
    weaknesses: [
      'Limited brand awareness',
      'Dependency on third-party AI models',
      'Small team size',
      'No existing institutional relationships',
    ],
    opportunities: [
      'Post-pandemic shift to digital learning',
      'Growing acceptance of AI in education',
      'Underserved international markets',
      'Partnership potential with schools and publishers',
    ],
    threats: [
      'Big tech entering the space',
      'Regulatory changes affecting AI use in education',
      'Economic downturn reducing education spending',
      'Negative perception of AI replacing human teachers',
    ],
  },
}

export const demoFinancialOutput: FinancialOutput = {
  revenueForecast: [
    { year: 1, conservative: 180000, expected: 420000, optimistic: 680000 },
    { year: 2, conservative: 720000, expected: 1600000, optimistic: 2800000 },
    { year: 3, conservative: 2200000, expected: 4800000, optimistic: 8400000 },
    { year: 4, conservative: 5500000, expected: 12000000, optimistic: 21000000 },
    { year: 5, conservative: 11000000, expected: 25000000, optimistic: 45000000 },
  ],
  fundingRequirements: {
    amount: 2000000,
    useOfFunds: [
      { category: 'Product Development', percentage: 40, amount: 800000 },
      { category: 'Sales & Marketing', percentage: 30, amount: 600000 },
      { category: 'Operations & Infrastructure', percentage: 15, amount: 300000 },
      { category: 'Team Expansion', percentage: 15, amount: 300000 },
    ],
    runway: 18,
  },
  unitEconomics: {
    cac: 25,
    ltv: 180,
    ltvCacRatio: 7.2,
    paybackPeriod: 3,
    grossMargin: 82,
  },
  burnRate: 111000,
  breakEvenPoint: { months: 20, revenue: 2220000 },
}

export const demoInvestorOutput: InvestorMatchOutput = {
  topInvestors: [
    {
      id: 'inv1',
      name: 'Sarah Chen',
      firm: 'Reach Capital',
      investmentFocus: ['EdTech', 'AI', 'Consumer'],
      stagePreference: ['Seed', 'Series A'],
      checkSize: { min: 500000, max: 4000000 },
      compatibilityScore: 96,
      matchReasons: ['EdTech specialist with 15+ investments', 'Portfolio includes Newsela and Outschool', 'Deep understanding of K-12 market'],
      riskAppetite: 'moderate',
    },
    {
      id: 'inv2',
      name: 'James Martinez',
      firm: 'Owl Ventures',
      investmentFocus: ['Education', 'Workforce Development', 'AI'],
      stagePreference: ['Seed', 'Series A', 'Series B'],
      checkSize: { min: 1000000, max: 10000000 },
      compatibilityScore: 93,
      matchReasons: ['Largest EdTech-focused VC globally', 'Strong connections with school districts', 'Experience scaling AI education companies'],
      riskAppetite: 'moderate',
    },
    {
      id: 'inv3',
      name: 'Emily Rodriguez',
      firm: 'GSV Ventures',
      investmentFocus: ['EdTech', 'Skills Training', 'Digital Learning'],
      stagePreference: ['Pre-seed', 'Seed', 'Series A'],
      checkSize: { min: 250000, max: 5000000 },
      compatibilityScore: 91,
      matchReasons: ['ASU+GSV Summit organizers with massive network', 'Focus on learning outcomes', 'Experience with B2C and B2B education'],
      riskAppetite: 'aggressive',
    },
    {
      id: 'inv4',
      name: 'Michael Park',
      firm: 'NewSchools Venture Fund',
      investmentFocus: ['K-12 Education', 'Learning Tools', 'Assessment'],
      stagePreference: ['Seed', 'Series A'],
      checkSize: { min: 500000, max: 3000000 },
      compatibilityScore: 88,
      matchReasons: ['Mission-aligned with educational equity', 'Strong policy connections', 'Track record with ed tech adoption'],
      riskAppetite: 'conservative',
    },
    {
      id: 'inv5',
      name: 'Lisa Thompson',
      firm: 'Andreessen Horowitz',
      investmentFocus: ['AI/ML', 'Consumer', 'Enterprise'],
      stagePreference: ['Seed', 'Series A', 'Series B'],
      checkSize: { min: 2000000, max: 25000000 },
      compatibilityScore: 82,
      matchReasons: ['Strong AI expertise and resources', 'Platform support for scaling', 'Recent interest in AI education'],
      riskAppetite: 'aggressive',
    },
  ],
  overallFundingFit: 89,
  recommendations: [
    'Lead with EdTech-focused VCs (Reach, Owl, GSV) who understand the market',
    'Prepare detailed learning outcomes data from beta program',
    'Highlight the 7.2x LTV/CAC ratio and 82% gross margin',
    'Emphasize AI differentiation and scalability',
  ],
}

export const demoMentorOutput: MentorMatchOutput = {
  topMentors: [
    {
      id: 'mentor1',
      name: 'Dr. Angela Williams',
      title: 'Former Chief Learning Officer at Coursera',
      expertise: ['Learning Science', 'Product Development', 'Content Strategy'],
      industries: ['EdTech', 'Online Learning', 'Higher Education'],
      yearsExperience: 20,
      compatibilityScore: 97,
      matchReasons: ['Pioneer in online learning at scale', 'Deep understanding of learner engagement', 'Experience with AI-powered learning'],
      availability: 'high',
    },
    {
      id: 'mentor2',
      name: 'David Kim',
      title: 'Founder & CEO of StudyBlue (Acquired)',
      expertise: ['Startup Growth', 'Fundraising', 'EdTech Strategy'],
      industries: ['EdTech', 'Consumer Tech', 'SaaS'],
      yearsExperience: 15,
      compatibilityScore: 94,
      matchReasons: ['Built and exited similar company', 'Experience with student acquisition', 'Understanding of freemium models in education'],
      availability: 'medium',
    },
    {
      id: 'mentor3',
      name: 'Sarah Johnson',
      title: 'VP of AI at Duolingo',
      expertise: ['AI/ML in Education', 'Personalization Algorithms', 'Mobile Learning'],
      industries: ['EdTech', 'AI', 'Consumer'],
      yearsExperience: 12,
      compatibilityScore: 92,
      matchReasons: ['Leading AI implementation at top EdTech', 'Expert in gamification and engagement', 'Experience scaling AI systems'],
      availability: 'low',
    },
    {
      id: 'mentor4',
      name: 'Robert Chen',
      title: 'Partner at GSV Ventures',
      expertise: ['EdTech Investing', 'Market Strategy', 'Board Governance'],
      industries: ['EdTech', 'Venture Capital', 'Education Policy'],
      yearsExperience: 18,
      compatibilityScore: 89,
      matchReasons: ['Deep EdTech investor network', 'Understanding of what investors look for', 'Experience guiding companies through Series A'],
      availability: 'medium',
    },
    {
      id: 'mentor5',
      name: 'Maria Garcia',
      title: 'Superintendent, Austin ISD',
      expertise: ['K-12 Education', 'District Partnerships', 'EdTech Adoption'],
      industries: ['K-12 Education', 'Government', 'Non-profit'],
      yearsExperience: 25,
      compatibilityScore: 85,
      matchReasons: ['Decision-maker in target customer segment', 'Understanding of procurement processes', 'Insight into teacher and parent needs'],
      availability: 'high',
    },
  ],
  overallMatch: 91,
  recommendations: [
    'Prioritize Dr. Angela Williams for product and learning science guidance',
    'Connect with David Kim for fundraising and growth strategy',
    'Schedule monthly advisory sessions with Maria Garcia for B2B insights',
    'Build relationship with Robert Chen before Series A fundraise',
  ],
}

export const demoWorkflowResults = {
  founder: demoFounderOutput,
  market: demoMarketOutput,
  plan: demoBusinessPlanOutput,
  financial: demoFinancialOutput,
  investor: demoInvestorOutput,
  mentor: demoMentorOutput,
}
