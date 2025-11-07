// Beginner-level questions drawn from Document2 “Cash-Out Showdown” outline.
// FHA (HUD 4000.1), VA Pamphlet 26-7, and Fannie/Freddie Selling Guides.
window.GAME_QUESTIONS = [
  // FHA
  {
    q: "What is the minimum credit score for an FHA cash-out refinance?",
    choices: ["500", "540", "580", "620"],
    answerIndex: 2,
    expl: "580 for max financing per HUD 4000.1 (cash-out)."
  },
  {
    q: "How long must the borrower have owned and occupied the property before an FHA cash-out?",
    choices: ["6 months", "9 months", "12 months", "24 months"],
    answerIndex: 2,
    expl: "Title and occupancy seasoning of at least 12 months."
  },
  {
    q: "What is the maximum LTV for an FHA cash-out refinance?",
    choices: ["75%", "80%", "85%", "90%"],
    answerIndex: 1,
    expl: "FHA cash-out max LTV is 80%."
  },
  {
    q: "Are there restrictions if the borrower wasn’t on title for 12 months (FHA cash-out)?",
    choices: ["No restrictions", "Yes—no cash-out eligibility", "Only with DU approval", "Only if non-occupant co-borrower"],
    answerIndex: 1,
    expl: "FHA requires title seasoning; not eligible for cash-out without it."
  },
  {
    q: "Can a borrower have any late mortgage payments in the last 12 months on an FHA cash-out?",
    choices: ["One 30-day is okay", "Up to two 30-day", "No—must be on time", "Depends on LTV"],
    answerIndex: 2,
    expl: "Must have on-time mortgage payment history for prior 12 months."
  },

  // VA
  {
    q: "What is the maximum LTV for a Type I VA cash-out refinance?",
    choices: ["90%", "95%", "100%", "80%"],
    answerIndex: 2,
    expl: "Up to 100% (including funding fee) for Type I."
  },
  {
    q: "What must the borrower receive at closing on a Type II VA cash-out?",
    choices: ["Rate reduction only", "Cash out or debt payoff", "No cash allowed", "IRRRL benefit"],
    answerIndex: 1,
    expl: "Type II requires actual cash in hand or payoff of debts."
  },
  {
    q: "What is the VA seasoning requirement for cash-out refinances?",
    choices: ["90 days", "120 days", "210 days + 6 payments", "12 months"],
    answerIndex: 2,
    expl: "210 days from first payment date and 6 consecutive payments."
  },
  {
    q: "Can you use a VA cash-out to pay off a non-VA lien?",
    choices: ["No", "Yes", "Only with residual income waiver", "Only if CLTV ≤ 90%"],
    answerIndex: 1,
    expl: "Non-VA liens may be paid off via VA cash-out."
  },
  {
    q: "Does a VA cash-out refinance require a new appraisal?",
    choices: ["No", "Only if LTV > 90%", "Yes—always", "Only for Type II"],
    answerIndex: 2,
    expl: "A new appraisal is required."
  },

  // Conventional
  {
    q: "Max LTV for a 1-unit primary residence conventional cash-out?",
    choices: ["70%", "75%", "80%", "85%"],
    answerIndex: 2,
    expl: "Conventional (1-unit primary) max LTV is 80%."
  },
  {
    q: "Max LTV for a 2–4 unit investment property conventional cash-out?",
    choices: ["70%", "75%", "80%", "85%"],
    answerIndex: 1,
    expl: "Investment property cash-out typically 75% LTV."
  },
  {
    q: "Minimum ownership time to qualify for a conventional cash-out?",
    choices: ["0 months", "3 months", "6 months", "12 months"],
    answerIndex: 2,
    expl: "At least 6 months title seasoning (with exceptions)."
  },
  {
    q: "Cash-out allowed if property was inherited less than 6 months ago (conventional)?",
    choices: ["No", "Yes", "Only if DU Approve/Eligible", "Only if LTV ≤ 70%"],
    answerIndex: 1,
    expl: "Inheritance exception—6-month rule doesn’t apply."
  },
  {
    q: "Can you use a conventional cash-out to pay off a HELOC?",
    choices: ["No", "Yes (if not purchase funds)", "Only if CLTV ≤ 75%", "Only on primary residences"],
    answerIndex: 1,
    expl: "Yes, provided HELOC wasn’t used for purchase funds."
  },

  // Mixed / Scenario
  {
    q: "Which loan type allows up to 100% LTV on cash-out?",
    choices: ["FHA", "VA", "Conventional", "USDA"],
    answerIndex: 1,
    expl: "VA allows up to 100% on Type I."
  },
  {
    q: "Borrower refinanced an FHA loan 5 months ago and now wants cash out. What guideline prevents it?",
    choices: ["FHA 12-month title/occupancy", "VA seasoning", "Conventional 6-month rule", "HELOC payoff rule"],
    answerIndex: 0,
    expl: "FHA requires 12 months ownership/occupancy seasoning."
  },
  {
    q: "Which loan type requires net tangible benefit testing for all refinances?",
    choices: ["FHA", "VA", "Conventional", "USDA"],
    answerIndex: 1,
    expl: "VA requires net tangible benefit tests."
  },
  {
    q: "Which product requires occupying the home for 12 months before doing cash-out?",
    choices: ["FHA", "VA", "Conventional", "All of them"],
    answerIndex: 0,
    expl: "FHA occupancy requirement is 12 months."
  },
  {
    q: "Which guideline source defines conventional cash-out policies?",
    choices: ["HUD 4000.1", "VA Pamphlet 26-7", "Fannie Mae & Freddie Mac Selling Guides", "USDA Handbook"],
    answerIndex: 2,
    expl: "Conventional rules are in the Agencies’ Selling Guides."
  }
];

// Final Showdown
window.FINAL_QUESTION = {
  q: "Which of the three loan types allows the highest maximum LTV for cash-out refinancing?",
  choices: ["FHA", "VA", "Conventional"],
  answerIndex: 1,
  expl: "VA permits up to 100% (Type I) including funding fee."
};
