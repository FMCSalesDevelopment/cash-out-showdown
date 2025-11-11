// Beginner-level questions — refreshed set based on Document2.
// FHA (HUD 4000.1), VA Pamphlet 26-7, and Agency Selling Guides (Fannie/Freddie).
window.GAME_QUESTIONS = [
  // FHA
  {
    q: "For an FHA cash-out, the property must be the borrower’s:",
    choices: ["Primary residence", "Second home", "Investment property", "Any of the above"],
    answerIndex: 0,
    expl: "FHA cash-out is for owner-occupied primary residences only."
  },
  {
    q: "FHA cash-out requires the borrower to have been on title and occupying for at least:",
    choices: ["3 months", "6 months", "12 months", "18 months"],
    answerIndex: 2,
    expl: "Both title and occupancy seasoning must be at least 12 months."
  },
  {
    q: "What is the maximum FHA cash-out LTV?",
    choices: ["75%", "80%", "85%", "90%"],
    answerIndex: 1,
    expl: "Current FHA cash-out maximum is 80% LTV."
  },
  {
    q: "Are non-occupant co-borrowers allowed on FHA cash-out?",
    choices: ["Yes", "No", "Only with AUS Approve/Eligible", "Only for 2–4 unit homes"],
    answerIndex: 1,
    expl: "Non-occupant co-borrowers are not permitted for FHA cash-out."
  },
  {
    q: "Mortgage payment history for the prior 12 months on FHA cash-out must be:",
    choices: ["No more than one 30-day late", "All on time", "Up to two 30-day lates", "One 60-day late allowed"],
    answerIndex: 1,
    expl: "Borrower must have on-time housing payments for the last 12 months."
  },

  // VA
  {
    q: "Which VA cash-out type may provide funds to the borrower at closing?",
    choices: ["Type I only", "Type II only", "Both Type I and Type II", "Neither"],
    answerIndex: 1,
    expl: "Type II permits equity cash-out; Type I pays off the existing lien without equity out."
  },
  {
    q: "Seasoning for any VA cash-out requires at least:",
    choices: ["90 days & 3 payments", "120 days & 4 payments", "210 days & 6 on-time payments", "12 months & 12 payments"],
    answerIndex: 2,
    expl: "VA requires 210 days from the first payment date and six consecutive on-time payments."
  },
  {
    q: "Type I VA cash-out must meet fee recoupment of:",
    choices: ["18 months", "24 months", "36 months", "48 months"],
    answerIndex: 2,
    expl: "The cost of the transaction must be recouped within 36 months on Type I."
  },
  {
    q: "Maximum effective LTV for a VA cash-out (including funding fee) is generally:",
    choices: ["90%", "95%", "100%", "105%"],
    answerIndex: 2,
    expl: "VA allows up to 100% LTV in many cases (Type I); lender overlays may apply."
  },
  {
    q: "Does a VA cash-out refinance require a new appraisal?",
    choices: ["No", "Only for Type II", "Yes—full appraisal required", "Only if LTV > 90%"],
    answerIndex: 2,
    expl: "A new VA appraisal is required for cash-out transactions."
  },

  // Conventional
  {
    q: "Conventional cash-out maximum LTV for a 1-unit primary residence is:",
    choices: ["70%", "75%", "80%", "85%"],
    answerIndex: 2,
    expl: "For a 1-unit primary residence, agencies cap cash-out at 80% LTV."
  },
  {
    q: "Conventional cash-out maximum LTV for a 2–4 unit investment property is typically:",
    choices: ["70%", "75%", "80%", "85%"],
    answerIndex: 1,
    expl: "Investment property cash-out commonly caps at 75% LTV."
  },
  {
    q: "Minimum time on title for most conventional cash-out refinances is:",
    choices: ["0 months", "3 months", "6 months", "12 months"],
    answerIndex: 2,
    expl: "Standard agency requirement is 6 months, with a few exceptions."
  },
  {
    q: "Is there a conventional exception to the 6-month rule for inherited property?",
    choices: ["No—never", "Yes—inheritance exception applies", "Only with LTV ≤ 70%", "Only with manual underwrite"],
    answerIndex: 1,
    expl: "Inheritance is a common exception—cash-out can be eligible without 6-month seasoning."
  },
  {
    q: "Can a HELOC be paid off with a conventional cash-out refinance?",
    choices: ["No", "Yes—if not used for purchase funds", "Only on primary residences", "Only with CLTV ≤ 75%"],
    answerIndex: 1,
    expl: "HELOCs may be paid off as long as they weren’t used for purchase money."
  },

  // Mixed / Scenario
  {
    q: "Which program limits cash-out to owner-occupied primary residences only?",
    choices: ["FHA", "VA", "Conventional", "All of them"],
    answerIndex: 0,
    expl: "FHA cash-out is primary-residence only."
  },
  {
    q: "Which program requires a Net Tangible Benefit test on cash-out transactions?",
    choices: ["FHA", "VA", "Conventional", "None of them"],
    answerIndex: 1,
    expl: "VA requires NTB testing; Type I also has fee recoupment rules."
  },
  {
    q: "Borrower wants cash-out 5 months after purchasing with FHA financing. What blocks the deal?",
    choices: ["FHA 12-month title/occupancy requirement", "VA seasoning", "Conventional 6-month rule", "HELOC payoff limitation"],
    answerIndex: 0,
    expl: "FHA needs 12 months on title and occupancy before cash-out."
  },
  {
    q: "Which program’s cash-out policies are found in the Agency Selling Guides?",
    choices: ["FHA (HUD 4000.1)", "VA Pamphlet 26-7", "Fannie Mae & Freddie Mac", "USDA Handbook"],
    answerIndex: 2,
    expl: "Conventional rules are published in the Fannie/Freddie Selling Guides."
  },
  {
    q: "Which program potentially allows the highest LTV for cash-out?",
    choices: ["FHA", "VA", "Conventional", "None—same for all"],
    answerIndex: 1,
    expl: "VA can allow up to 100% (Type I) including the funding fee."
  }
];

// Final Showdown
window.FINAL_QUESTION = {
  q: "A borrower wants the highest possible LTV on a beginner-level cash-out scenario. Which program most often allows it?",
  choices: ["FHA", "VA", "Conventional"],
  answerIndex: 1,
  expl: "VA typically permits up to 100% LTV (Type I), subject to VA rules and lender overlays."
};
