window.LIFE_LAYERS_DATA = {
  title: "LIFE LAYERS",
  statLimits: {
    happiness: { min: 0, max: 10 },
    health: { min: 0, max: 10 },
    experience: { min: 0, max: 10 },
    education: { min: 0, max: 10 }
  },
  baseStats: {
    happiness: 6,
    health: 6,
    time: 6,
    money: 8,
    experience: 1,
    education: 1
  },
  generations: {
    boomer: {
      label: "Baby Boomers",
      short: "Boomers",
      accent: "#d8893f"
    },
    genx: {
      label: "Gen X",
      short: "Gen X",
      accent: "#3f7ca8"
    },
    millennial: {
      label: "Millennials",
      short: "Millennials",
      accent: "#6b57b9"
    },
    genz: {
      label: "Gen Z",
      short: "Gen Z",
      accent: "#1ea486"
    }
  },
  occupations: {
    unemployed: {
      label: "Unemployed",
      income: 0,
      timeDelta: 1,
      expDelta: 0,
      tags: ["Transition"]
    },
    office: {
      label: "Office Role",
      income: 3,
      timeDelta: -1,
      expDelta: 1,
      tags: ["Stable"]
    },
    skilledTrade: {
      label: "Skilled Trade",
      income: 4,
      timeDelta: -1,
      expDelta: 1,
      tags: ["Hands-on"]
    },
    gig: {
      label: "Gig Portfolio",
      income: 2,
      timeDelta: 0,
      expDelta: 2,
      tags: ["Flexible", "Volatile"]
    },
    startup: {
      label: "Startup Grind",
      income: 5,
      timeDelta: -2,
      expDelta: 2,
      tags: ["High Risk"]
    }
  },
  board: {
    startNode: "1",
    finishNode: "30",
    nodeOrder: [
      "1",
      "2",
      "3",
      "4",
      "5",
      "6A",
      "6B",
      "6C",
      "9",
      "10",
      "11",
      "12",
      "13",
      "14",
      "15R",
      "15B",
      "15S",
      "18",
      "19",
      "20",
      "21",
      "22P",
      "22N",
      "24",
      "25K",
      "25NK",
      "25C",
      "28",
      "30"
    ],
    spaceMeta: {
      "1": {
        title: "Starting Line",
        description: "You enter adulthood with baseline resources and open possibilities."
      },
      "2": {
        title: "Era Shift",
        description: "Macro events shape your options. Draw an Era card to see the context."
      },
      "3": {
        title: "Family Pulse",
        description: "Personal life pressures and support systems surface. Draw a Life card."
      },
      "4": {
        title: "Skill Sprint",
        description: "You sharpen practical ability and build early confidence."
      },
      "5": {
        title: "Education Gate",
        description: "Pick your learning path. Costs and pressure differ by generation."
      },
      "6A": {
        title: "Degree Route",
        description: "Formal qualification path with stronger credentials and longer investment."
      },
      "6B": {
        title: "Certification Route",
        description: "Targeted training gives faster employability and hands-on momentum."
      },
      "6C": {
        title: "Work-Now Route",
        description: "Immediate income and experience, with possible long-term credential strain."
      },
      "9": {
        title: "Work Hub",
        description: "Career options consolidate before your next major decision."
      },
      "10": {
        title: "Work Gate",
        description: "Choose how you earn: stability, trade mastery, or flexible portfolio."
      },
      "11": {
        title: "Pressure Checkpoint",
        description: "Decide between recovery and pushing harder. You must choose."
      },
      "12": {
        title: "Home Conversation",
        description: "Life-at-home dynamics affect your priorities. Draw a Life card."
      },
      "13": {
        title: "Save or Spend",
        description: "Trade short-term joy against long-term security."
      },
      "14": {
        title: "Housing Gate",
        description: "Rent, buy, or share. Ongoing costs are highly generation-sensitive."
      },
      "15R": {
        title: "Rental Track",
        description: "Flexible commitment with recurring payment pressure."
      },
      "15B": {
        title: "Ownership Track",
        description: "High barrier to entry with potential long-run stability."
      },
      "15S": {
        title: "Shared Home Track",
        description: "Lower cost through compromise and coordination."
      },
      "18": {
        title: "Home Hub",
        description: "Housing choice settles and your life cycle continues."
      },
      "19": {
        title: "Family Event",
        description: "Unexpected family dynamics surface. Draw a Life card."
      },
      "20": {
        title: "Reset Point",
        description: "Rebalance around wellbeing or career acceleration."
      },
      "21": {
        title: "Relationship Gate",
        description: "Choose partnered or solo path and absorb the tradeoffs."
      },
      "22P": {
        title: "Partnered Route",
        description: "Shared emotional support with shared commitments."
      },
      "22N": {
        title: "Solo Route",
        description: "Autonomy and flexibility with different social pressures."
      },
      "24": {
        title: "Family Gate",
        description: "Decide kids, no kids, or caregiving under generation-specific pressures."
      },
      "25K": {
        title: "Kids Route",
        description: "Meaning and joy rise, while money and time demands increase."
      },
      "25NK": {
        title: "No-Kids Route",
        description: "Resource burden decreases but social pressure may intensify."
      },
      "25C": {
        title: "Caregiving Route",
        description: "Supporting others builds resilience with substantial time costs."
      },
      "28": {
        title: "Later-Life Hub",
        description: "Long-term outcomes consolidate before the final stretch."
      },
      "30": {
        title: "Finish",
        description: "You close the life-course loop and compare outcomes with the group."
      }
    },
    nodes: {
      "1": {
        id: "1",
        label: "START",
        type: "start",
        next: "2"
      },
      "2": {
        id: "2",
        label: "ERA",
        type: "draw",
        deck: "era",
        next: "3"
      },
      "3": {
        id: "3",
        label: "FAMILY",
        type: "draw",
        deck: "life",
        next: "4"
      },
      "4": {
        id: "4",
        label: "SKILL",
        type: "effect",
        next: "5",
        effects: [
          {
            type: "adjustStat",
            stat: "experience",
            amount: 1,
            note: "Built practical skill"
          }
        ]
      },
      "5": {
        id: "5",
        label: "EDU_GATE",
        type: "gate",
        gateLabel: "Education Gate",
        stopText: "STOP: Decision Point",
        options: [
          {
            id: "DEGREE",
            label: "6A Degree",
            preview:
              "Higher credential upside with steep cost in money and time.",
            next: "6A",
            effects: [
              { type: "adjustStat", stat: "money", amount: -4 },
              { type: "adjustStat", stat: "time", amount: -2 },
              { type: "adjustStat", stat: "education", amount: 3 },
              { type: "adjustStat", stat: "experience", amount: 1 }
            ],
            generationEffects: {
              boomer: [
                { type: "adjustStat", stat: "money", amount: -2 },
                { type: "adjustStat", stat: "time", amount: -1 }
              ],
              genx: [{ type: "adjustStat", stat: "money", amount: -1 }],
              millennial: [
                { type: "adjustStat", stat: "money", amount: -1 },
                { type: "adjustStat", stat: "happiness", amount: -1 }
              ],
              genz: [
                { type: "adjustStat", stat: "money", amount: -1 },
                { type: "adjustStat", stat: "happiness", amount: -1 }
              ]
            }
          },
          {
            id: "SKILL",
            label: "6B Skill Cert",
            preview: "Moderate cost, practical gain, faster entry to work.",
            next: "6B",
            effects: [
              { type: "adjustStat", stat: "money", amount: -2 },
              { type: "adjustStat", stat: "time", amount: -1 },
              { type: "adjustStat", stat: "education", amount: 2 },
              { type: "adjustStat", stat: "experience", amount: 2 }
            ],
            generationEffects: {
              boomer: [{ type: "adjustStat", stat: "money", amount: -1 }],
              genx: [],
              millennial: [],
              genz: []
            }
          },
          {
            id: "WORK_NOW",
            label: "6C Work Now",
            preview:
              "Earn immediately but lower credentials can create pressure later.",
            next: "6C",
            effects: [
              { type: "adjustStat", stat: "money", amount: 3 },
              { type: "adjustStat", stat: "experience", amount: 1 },
              { type: "adjustStat", stat: "education", amount: -1 }
            ],
            generationEffects: {
              boomer: [
                { type: "adjustStat", stat: "health", amount: -1 },
                { type: "adjustStat", stat: "happiness", amount: -1 }
              ],
              genx: [
                { type: "adjustStat", stat: "health", amount: -1 },
                { type: "adjustStat", stat: "happiness", amount: -1 }
              ],
              millennial: [
                { type: "adjustStat", stat: "health", amount: -2 },
                { type: "adjustStat", stat: "happiness", amount: -2 }
              ],
              genz: [
                { type: "adjustStat", stat: "health", amount: -2 },
                { type: "adjustStat", stat: "happiness", amount: -2 }
              ]
            }
          }
        ]
      },
      "6A": {
        id: "6A",
        label: "DEGREE",
        type: "effect",
        next: "9",
        effects: [{ type: "log", message: "Credential path selected." }]
      },
      "6B": {
        id: "6B",
        label: "SKILL",
        type: "effect",
        next: "9",
        effects: [{ type: "log", message: "Skill path selected." }]
      },
      "6C": {
        id: "6C",
        label: "WORK_NOW",
        type: "effect",
        next: "9",
        effects: [{ type: "log", message: "Early work path selected." }]
      },
      "9": {
        id: "9",
        label: "WORK_HUB",
        type: "hub",
        next: "10"
      },
      "10": {
        id: "10",
        label: "WORK_GATE",
        type: "gate",
        gateLabel: "Work Gate",
        stopText: "STOP: Decision Point",
        options: [
          {
            id: "OFFICE",
            label: "Office Route",
            preview: "Stable salary, less time flexibility.",
            next: "11",
            effects: [{ type: "setOccupation", occupation: "office" }]
          },
          {
            id: "TRADE",
            label: "Skilled Trade",
            preview: "Good pay for practical effort.",
            next: "11",
            effects: [{ type: "setOccupation", occupation: "skilledTrade" }]
          },
          {
            id: "GIG",
            label: "Gig Portfolio",
            preview: "Flexible and growth oriented, but volatile.",
            next: "11",
            effects: [{ type: "setOccupation", occupation: "gig" }]
          }
        ]
      },
      "11": {
        id: "11",
        label: "CHECK",
        type: "checkpoint",
        gateLabel: "Checkpoint",
        stopText: "STOP: Decision Point",
        options: [
          {
            id: "BALANCE",
            label: "Protect Balance",
            preview: "Recover a bit of health and happiness.",
            next: "12",
            effects: [
              { type: "adjustStat", stat: "health", amount: 1 },
              { type: "adjustStat", stat: "happiness", amount: 1 },
              { type: "adjustStat", stat: "money", amount: -1 }
            ]
          },
          {
            id: "PUSH",
            label: "Push Hard",
            preview: "Earn and level faster, with strain.",
            next: "12",
            effects: [
              { type: "adjustStat", stat: "money", amount: 2 },
              { type: "adjustStat", stat: "experience", amount: 1 },
              { type: "adjustStat", stat: "health", amount: -1 }
            ]
          }
        ]
      },
      "12": {
        id: "12",
        label: "HOME_TALK",
        type: "draw",
        deck: "life",
        next: "13"
      },
      "13": {
        id: "13",
        label: "SAVE/SPEND",
        type: "choice",
        next: "14",
        choice: {
          prompt: "Do you save or spend this season?",
          options: [
            {
              id: "SAVE",
              label: "Save",
              preview: "Less fun now, better buffer later.",
              effects: [
                { type: "adjustStat", stat: "money", amount: 3 },
                { type: "adjustStat", stat: "happiness", amount: -1 }
              ]
            },
            {
              id: "SPEND",
              label: "Spend",
              preview: "Immediate joy with weaker reserves.",
              effects: [
                { type: "adjustStat", stat: "money", amount: -2 },
                { type: "adjustStat", stat: "happiness", amount: 2 }
              ]
            }
          ]
        }
      },
      "14": {
        id: "14",
        label: "HOME_GATE",
        type: "gate",
        gateLabel: "Housing Gate",
        stopText: "STOP: Decision Point",
        options: [
          {
            id: "RENT",
            label: "15R Rent",
            preview: "Low commitment now, recurring monthly drain.",
            next: "15R",
            effects: [
              {
                type: "setHousing",
                housingStatus: "rent",
                payment: 2,
                mortgageActive: false
              },
              { type: "adjustStat", stat: "money", amount: -1 }
            ],
            generationEffects: {
              boomer: [{ type: "setHousing", payment: 1 }],
              genx: [{ type: "setHousing", payment: 2 }],
              millennial: [
                { type: "setHousing", payment: 3 },
                { type: "adjustStat", stat: "happiness", amount: -1 }
              ],
              genz: [
                { type: "setHousing", payment: 4 },
                { type: "adjustStat", stat: "happiness", amount: -1 }
              ]
            }
          },
          {
            id: "BUY",
            label: "15B Buy",
            preview: "High upfront cost, lower long-term drag.",
            next: "15B",
            effects: [
              {
                type: "setHousing",
                housingStatus: "buy",
                payment: 2,
                mortgageActive: true
              },
              { type: "adjustStat", stat: "money", amount: -8 },
              { type: "adjustStat", stat: "happiness", amount: 1 }
            ],
            generationEffects: {
              boomer: [{ type: "adjustStat", stat: "money", amount: 4 }],
              genx: [{ type: "adjustStat", stat: "money", amount: 2 }],
              millennial: [
                { type: "adjustStat", stat: "money", amount: -3 },
                { type: "adjustStat", stat: "time", amount: -1 }
              ],
              genz: [
                { type: "adjustStat", stat: "money", amount: -4 },
                { type: "adjustStat", stat: "time", amount: -1 }
              ]
            }
          },
          {
            id: "SHARED",
            label: "15S Shared",
            preview: "Lower cost, less privacy and autonomy.",
            next: "15S",
            effects: [
              {
                type: "setHousing",
                housingStatus: "shared",
                payment: 1,
                mortgageActive: false
              },
              { type: "adjustStat", stat: "happiness", amount: -1 },
              { type: "adjustStat", stat: "money", amount: 1 }
            ],
            generationEffects: {
              boomer: [{ type: "adjustStat", stat: "happiness", amount: -1 }],
              genx: [],
              millennial: [{ type: "adjustStat", stat: "happiness", amount: 1 }],
              genz: [{ type: "adjustStat", stat: "happiness", amount: 1 }]
            }
          }
        ]
      },
      "15R": {
        id: "15R",
        label: "RENT",
        type: "effect",
        next: "18",
        effects: [{ type: "log", message: "Rental life selected." }]
      },
      "15B": {
        id: "15B",
        label: "BUY",
        type: "effect",
        next: "18",
        effects: [{ type: "log", message: "Homeownership selected." }]
      },
      "15S": {
        id: "15S",
        label: "SHARED",
        type: "effect",
        next: "18",
        effects: [{ type: "log", message: "Shared housing selected." }]
      },
      "18": {
        id: "18",
        label: "HOME_HUB",
        type: "hub",
        next: "19"
      },
      "19": {
        id: "19",
        label: "FAMILY_EVENT",
        type: "draw",
        deck: "life",
        next: "20"
      },
      "20": {
        id: "20",
        label: "RESET",
        type: "choice",
        next: "21",
        choice: {
          prompt: "Rebalance your priorities",
          options: [
            {
              id: "HEALTH_RESET",
              label: "Health Reset",
              preview: "Recharge body and mind, slower career momentum.",
              effects: [
                { type: "adjustStat", stat: "health", amount: 2 },
                { type: "adjustStat", stat: "happiness", amount: 1 },
                { type: "adjustStat", stat: "experience", amount: -1 }
              ]
            },
            {
              id: "CAREER_RESET",
              label: "Career Reset",
              preview: "Sprint professionally at personal cost.",
              effects: [
                { type: "adjustStat", stat: "experience", amount: 2 },
                { type: "adjustStat", stat: "money", amount: 2 },
                { type: "adjustStat", stat: "health", amount: -1 }
              ]
            }
          ]
        }
      },
      "21": {
        id: "21",
        label: "REL_GATE",
        type: "gate",
        gateLabel: "Relationship Gate",
        stopText: "STOP: Decision Point",
        options: [
          {
            id: "PARTNER",
            label: "22P Partner",
            preview: "Emotional support with shared obligations.",
            next: "22P",
            effects: [
              { type: "setFamilyStatus", familyStatus: "dating" },
              { type: "adjustStat", stat: "happiness", amount: 1 },
              { type: "adjustStat", stat: "time", amount: -1 }
            ]
          },
          {
            id: "SOLO",
            label: "22N Solo",
            preview: "More autonomy with occasional social friction.",
            next: "22N",
            effects: [
              { type: "setFamilyStatus", familyStatus: "solo" },
              { type: "adjustStat", stat: "money", amount: 1 }
            ]
          }
        ]
      },
      "22P": {
        id: "22P",
        label: "PARTNER",
        type: "effect",
        next: "24",
        effects: [{ type: "log", message: "Committed relationship path." }]
      },
      "22N": {
        id: "22N",
        label: "SOLO",
        type: "effect",
        next: "24",
        effects: [{ type: "log", message: "Independent living path." }]
      },
      "24": {
        id: "24",
        label: "FAMILY_GATE",
        type: "gate",
        gateLabel: "Family Gate",
        stopText: "STOP: Decision Point",
        options: [
          {
            id: "KIDS",
            label: "25K Kids",
            preview: "Meaningful but costly commitment.",
            next: "25K",
            effects: [
              { type: "setFamilyStatus", familyStatus: "kids" },
              { type: "adjustStat", stat: "happiness", amount: 1 },
              { type: "adjustStat", stat: "money", amount: -3 },
              { type: "adjustStat", stat: "time", amount: -2 }
            ],
            generationEffects: {
              boomer: [],
              genx: [{ type: "adjustStat", stat: "money", amount: -1 }],
              millennial: [
                { type: "adjustStat", stat: "money", amount: -2 },
                { type: "adjustStat", stat: "time", amount: -1 }
              ],
              genz: [
                { type: "adjustStat", stat: "money", amount: -3 },
                { type: "adjustStat", stat: "time", amount: -1 }
              ]
            }
          },
          {
            id: "NO_KIDS",
            label: "25NK No Kids",
            preview: "Lower direct burden, but social pressure can vary.",
            next: "25NK",
            effects: [
              { type: "setFamilyStatus", familyStatus: "solo" },
              { type: "adjustStat", stat: "money", amount: 2 }
            ],
            generationEffects: {
              boomer: [
                { type: "adjustStat", stat: "happiness", amount: -2 },
                { type: "adjustStat", stat: "health", amount: -1 }
              ],
              genx: [{ type: "adjustStat", stat: "happiness", amount: -2 }],
              millennial: [{ type: "adjustStat", stat: "happiness", amount: 1 }],
              genz: [{ type: "adjustStat", stat: "happiness", amount: 1 }]
            }
          },
          {
            id: "CARE",
            label: "25C Caregiving",
            preview: "Support elders/relatives with high time demand.",
            next: "25C",
            effects: [
              { type: "setFamilyStatus", familyStatus: "caregiving" },
              { type: "adjustStat", stat: "experience", amount: 2 },
              { type: "adjustStat", stat: "time", amount: -2 },
              { type: "adjustStat", stat: "money", amount: -2 }
            ],
            generationEffects: {
              boomer: [{ type: "adjustStat", stat: "happiness", amount: 1 }],
              genx: [{ type: "adjustStat", stat: "happiness", amount: 1 }],
              millennial: [],
              genz: []
            }
          }
        ]
      },
      "25K": {
        id: "25K",
        label: "KIDS",
        type: "effect",
        next: "28",
        effects: [{ type: "log", message: "Family with kids path." }]
      },
      "25NK": {
        id: "25NK",
        label: "NO_KIDS",
        type: "effect",
        next: "28",
        effects: [{ type: "log", message: "No-kids path." }]
      },
      "25C": {
        id: "25C",
        label: "CARE",
        type: "effect",
        next: "28",
        effects: [{ type: "log", message: "Caregiving path." }]
      },
      "28": {
        id: "28",
        label: "LATER_HUB",
        type: "hub",
        next: "30"
      },
      "30": {
        id: "30",
        label: "FINISH",
        type: "finish"
      }
    }
  },
  decks: {
    era: [
      {
        id: "era_1",
        title: "Economic Boom",
        text: "Opportunities surge across sectors.",
        effects: [
          { type: "adjustStat", stat: "money", amount: 3 },
          { type: "adjustStat", stat: "experience", amount: 1 }
        ]
      },
      {
        id: "era_2",
        title: "Inflation Spike",
        text: "Daily costs climb faster than wages.",
        effects: [
          { type: "adjustStat", stat: "money", amount: -2 },
          { type: "adjustStat", stat: "happiness", amount: -1 }
        ]
      },
      {
        id: "era_3",
        title: "Tech Leap",
        text: "Digital skills become highly rewarded.",
        effects: [
          { type: "adjustStat", stat: "education", amount: 1 },
          { type: "adjustStat", stat: "experience", amount: 1 }
        ]
      },
      {
        id: "era_4",
        title: "Hiring Freeze",
        text: "Teams shrink and promotions slow.",
        effects: [
          { type: "adjustStat", stat: "money", amount: -1 },
          { type: "adjustStat", stat: "time", amount: 1 }
        ]
      },
      {
        id: "era_5",
        title: "Healthcare Innovation",
        text: "Better care access improves wellbeing.",
        effects: [
          { type: "adjustStat", stat: "health", amount: 2 }
        ]
      },
      {
        id: "era_6",
        title: "Credential Arms Race",
        text: "Formal credentials dominate screening.",
        effects: [
          {
            type: "choice",
            prompt: "How do you respond?",
            options: [
              {
                id: "retrain",
                label: "Retrain",
                preview: "Invest now for long-term edge.",
                effects: [
                  { type: "adjustStat", stat: "money", amount: -2 },
                  { type: "adjustStat", stat: "education", amount: 2 }
                ]
              },
              {
                id: "push_through",
                label: "Push Through",
                preview: "Save money but feel the pressure.",
                effects: [
                  { type: "adjustStat", stat: "happiness", amount: -1 },
                  { type: "adjustStat", stat: "health", amount: -1 }
                ]
              }
            ]
          }
        ]
      },
      {
        id: "era_7",
        title: "Remote Shift",
        text: "Work location changes your daily rhythm.",
        effects: [
          { type: "adjustStat", stat: "time", amount: 1 },
          { type: "adjustStat", stat: "happiness", amount: 1 }
        ]
      },
      {
        id: "era_8",
        title: "Policy Surprise",
        text: "A sudden policy reform reshapes your plans.",
        effects: [
          { type: "moveBackSteps", steps: 1 },
          { type: "adjustStat", stat: "experience", amount: 1 }
        ]
      }
    ],
    life: [
      {
        id: "life_1",
        title: "Family Support",
        text: "Relatives step in to help this season.",
        effects: [
          { type: "adjustStat", stat: "money", amount: 2 },
          { type: "adjustStat", stat: "time", amount: 1 }
        ]
      },
      {
        id: "life_2",
        title: "Unexpected Expense",
        text: "A repair bill lands at the worst time.",
        effects: [
          { type: "adjustStat", stat: "money", amount: -3 }
        ]
      },
      {
        id: "life_3",
        title: "Community Network",
        text: "Connections open a better opportunity.",
        effects: [
          { type: "adjustStat", stat: "experience", amount: 1 },
          { type: "adjustStat", stat: "happiness", amount: 1 }
        ]
      },
      {
        id: "life_4",
        title: "Burnout Warning",
        text: "Your pace is unsustainable.",
        effects: [
          { type: "adjustStat", stat: "health", amount: -2 },
          { type: "adjustStat", stat: "time", amount: -1 }
        ]
      },
      {
        id: "life_5",
        title: "Chance Windfall",
        text: "A bonus, gift, or lucky break arrives.",
        effects: [
          { type: "adjustStat", stat: "money", amount: 4 }
        ]
      },
      {
        id: "life_6",
        title: "Mentor Moment",
        text: "Someone experienced gives practical guidance.",
        effects: [
          { type: "adjustStat", stat: "education", amount: 1 },
          { type: "adjustStat", stat: "experience", amount: 1 }
        ]
      },
      {
        id: "life_7",
        title: "Geographic Move",
        text: "Relocation changes your near-term trajectory.",
        effects: [
          { type: "moveToNode", nodeId: "18" },
          { type: "adjustStat", stat: "happiness", amount: -1 }
        ]
      },
      {
        id: "life_8",
        title: "Reunion & Reflection",
        text: "You reconnect with people and rethink priorities.",
        effects: [
          {
            type: "choice",
            prompt: "What do you prioritize after reflecting?",
            options: [
              {
                id: "relationships",
                label: "Relationships",
                preview: "Nurture people around you.",
                effects: [
                  { type: "adjustStat", stat: "happiness", amount: 2 },
                  { type: "adjustStat", stat: "time", amount: -1 }
                ]
              },
              {
                id: "career",
                label: "Career",
                preview: "Double down on momentum.",
                effects: [
                  { type: "adjustStat", stat: "money", amount: 2 },
                  { type: "adjustStat", stat: "health", amount: -1 }
                ]
              }
            ]
          }
        ]
      }
    ]
  }
};
