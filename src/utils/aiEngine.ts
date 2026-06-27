export interface UserProfile {
  salary: number;
  familyMembers: number;
  location: string;
}

export interface FinancialPlan {
  totalExpenses: number;
  totalSavings: number;
  expenseBreakdown: { name: string; value: number }[];
  netWorthProjection: { name: string; value: number }[];
  recommendations: {
    title: string;
    description: string;
    impact: string;
    type: 'emergency' | 'equity' | 'realestate' | 'business';
  }[];
}

const getLocationMultiplier = (location: string) => {
  const loc = location.toLowerCase();
  if (loc.includes('new york') || loc.includes('san francisco') || loc.includes('london') || loc.includes('tokyo') || loc.includes('dubai')) {
    return 1.8;
  }
  if (loc.includes('los angeles') || loc.includes('chicago') || loc.includes('sydney') || loc.includes('toronto')) {
    return 1.5;
  }
  if (loc.includes('mumbai') || loc.includes('bangalore') || loc.includes('delhi')) {
    return 0.6;
  }
  return 1.0; // Default average city
};

export const generateAIPlan = (profile: UserProfile): FinancialPlan => {
  const { salary, familyMembers, location } = profile;
  const multiplier = getLocationMultiplier(location);
  
  // Simulated AI Logic for Cost of Living
  // Base cost per person is roughly ₹25000/mo * location multiplier (highly simplified)
  const baseCostPerPerson = 25000 * multiplier;
  const estimatedExpenses = baseCostPerPerson + (baseCostPerPerson * 0.5 * (familyMembers - 1));
  
  let totalExpenses = Math.min(estimatedExpenses, salary * 0.9); // Cap expenses at 90% of salary
  let totalSavings = salary - totalExpenses;

  // If salary is extremely high, adjust ratio
  if (salary > estimatedExpenses * 3) {
    totalExpenses = estimatedExpenses * 1.5; // Lifestyle inflation
    totalSavings = salary - totalExpenses;
  }

  const expenseBreakdown = [
    { name: 'Housing & Utilities', value: totalExpenses * 0.45 },
    { name: 'Groceries & Daily Items', value: totalExpenses * 0.25 },
    { name: 'Transportation', value: totalExpenses * 0.10 },
    { name: 'Healthcare & Education', value: totalExpenses * 0.10 },
    { name: 'Discretionary', value: totalExpenses * 0.10 },
  ];

  // Generate 12-month projection
  const netWorthProjection = [];
  let currentNetWorth = totalSavings * 2; // Arbitrary starting point
  const growthRate = 1.008; // Roughly 10% annual
  
  for (let i = 1; i <= 7; i++) {
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"];
    currentNetWorth = (currentNetWorth + totalSavings) * growthRate;
    netWorthProjection.push({
      name: monthNames[i-1],
      value: Math.round(currentNetWorth)
    });
  }

  const recommendations = [
    {
      title: 'Emergency Fund Restructuring',
      description: `Based on your family size of ${familyMembers}, your local cost of living requires a ₹${Math.round(totalExpenses * 6).toLocaleString()} emergency fund. Move existing idle cash to a high-yield Quantum Account.`,
      impact: `Security for 6 months in ${location}`,
      type: 'emergency' as const
    },
    {
      title: 'AI-Driven Equity SIP',
      description: `Allocate ₹${Math.round(totalSavings * 0.5).toLocaleString()} monthly into AI-picked tech and green-energy ETFs to outpace local inflation.`,
      impact: 'Aggressive Growth',
      type: 'equity' as const
    },
    {
      title: 'Fractional Real Estate',
      description: `Invest ₹${Math.round(totalSavings * 0.3).toLocaleString()} into commercial real estate tokenization for inflation hedging.`,
      impact: 'Passive Income',
      type: 'realestate' as const
    },
    {
      title: 'Lifestyle/Business Fund',
      description: `Use the remaining ₹${Math.round(totalSavings * 0.2).toLocaleString()} to build a side-business or upgrade family lifestyle goals.`,
      impact: 'Skill & Asset Building',
      type: 'business' as const
    }
  ];

  return {
    totalExpenses,
    totalSavings,
    expenseBreakdown,
    netWorthProjection,
    recommendations
  };
};
