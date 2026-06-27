import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import type { UserProfile, FinancialPlan } from './aiEngine';

export const generatePDFReport = (profile: UserProfile, plan: FinancialPlan) => {
  const doc = new jsPDF();

  // Title
  doc.setFontSize(22);
  doc.setTextColor(0, 240, 255);
  doc.text('AI WealthFlow Nexus', 14, 22);
  
  doc.setFontSize(14);
  doc.setTextColor(138, 43, 226);
  doc.text('Strategic Financial Blueprint', 14, 30);

  // User Profile Section
  doc.setFontSize(12);
  doc.setTextColor(40, 40, 40);
  doc.text('Client Profile:', 14, 45);
  
  doc.setFontSize(10);
  doc.setTextColor(80, 80, 80);
  doc.text(`Location Engine: ${profile.location}`, 14, 52);
  doc.text(`Household Size: ${profile.familyMembers}`, 14, 58);
  doc.text(`Income Base (INR): Rs. ${profile.salary.toLocaleString()}`, 14, 64);

  // Expense Matrix Table
  doc.setFontSize(12);
  doc.setTextColor(40, 40, 40);
  doc.text('Projected Monthly Expense Matrix', 14, 75);

  const expenseData = plan.expenseBreakdown.map(item => [
    item.name,
    `Rs. ${Math.round(item.value).toLocaleString()}`
  ]);

  autoTable(doc, {
    startY: 80,
    head: [['Category', 'Allocated Amount (INR)']],
    body: [
      ...expenseData,
      ['TOTAL EXPENSES', `Rs. ${Math.round(plan.totalExpenses).toLocaleString()}`],
      ['AVAILABLE FOR INVESTMENT', `Rs. ${Math.round(plan.totalSavings).toLocaleString()}`]
    ],
    theme: 'grid',
    headStyles: { fillColor: [0, 240, 255], textColor: [0, 0, 0] },
    alternateRowStyles: { fillColor: [245, 245, 245] },
  });

  // AI Recommended Allocations
  let finalY = (doc as any).lastAutoTable.finalY || 150;
  
  if (finalY > 220) {
    doc.addPage();
    finalY = 20;
  } else {
    finalY += 15;
  }

  doc.setFontSize(12);
  doc.setTextColor(138, 43, 226);
  doc.text('AI Recommended Asset Allocations', 14, finalY);

  let currentY = finalY + 10;
  plan.recommendations.forEach(rec => {
    if (currentY > 270) {
      doc.addPage();
      currentY = 20;
    }
    doc.setFontSize(11);
    doc.setTextColor(40, 40, 40);
    doc.text(`> ${rec.title}`, 14, currentY);
    
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    const splitDesc = doc.splitTextToSize(rec.description, 180);
    doc.text(splitDesc, 14, currentY + 6);
    
    currentY += (splitDesc.length * 5) + 8;
  });

  // Footer
  doc.setFontSize(8);
  doc.setTextColor(150, 150, 150);
  doc.text('Generated autonomously by AI WealthFlow Nexus.', 14, 290);

  // Download
  doc.save('Nexus_Financial_Blueprint.pdf');
};
