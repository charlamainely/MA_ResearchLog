window.LIFE_LAYERS_DATA = {
  "title": "LIFE LAYERS",
  "statLimits": {
    "happiness": {
      "min": 0,
      "max": 10
    },
    "health": {
      "min": 0,
      "max": 10
    },
    "experience": {
      "min": 0,
      "max": 10
    },
    "education": {
      "min": 0,
      "max": 10
    }
  },
  "baseStats": {
    "happiness": 6,
    "health": 6,
    "time": 6,
    "money": 8,
    "experience": 1,
    "education": 1
  },
  "generations": {
    "boomer": {
      "label": "Baby Boomers",
      "short": "Boomers",
      "accent": "#4abeee"
    },
    "genx": {
      "label": "Gen X",
      "short": "Gen X",
      "accent": "#e987b7"
    },
    "millennial": {
      "label": "Millennials",
      "short": "Millennials",
      "accent": "#fee74b"
    },
    "genz": {
      "label": "Gen Z",
      "short": "Gen Z",
      "accent": "#f36e3e"
    }
  },
  "occupations": {
    "unemployed": {
      "label": "Unemployed",
      "income": 0,
      "timeDelta": 0,
      "expDelta": 0,
      "healthDelta": 0,
      "happinessDelta": 0,
      "tags": [
        "Transition"
      ]
    },
    "office_worker": {
      "label": "Office Worker",
      "income": 3,
      "timeDelta": -2,
      "expDelta": 0,
      "healthDelta": 0,
      "happinessDelta": 0,
      "tags": [
        "Stable"
      ]
    },
    "repairman": {
      "label": "Repairman",
      "income": 2,
      "timeDelta": -3,
      "expDelta": 0,
      "healthDelta": 0,
      "happinessDelta": 0,
      "tags": [
        "Hands-on"
      ]
    },
    "freelancer": {
      "label": "Freelancer",
      "income": 1,
      "timeDelta": -3,
      "expDelta": 0,
      "healthDelta": 0,
      "happinessDelta": 1,
      "tags": [
        "Flexible"
      ]
    },
    "educator": {
      "label": "Educator",
      "income": 3,
      "timeDelta": -1,
      "expDelta": 0,
      "healthDelta": 0,
      "happinessDelta": 0,
      "tags": [
        "Purpose"
      ]
    },
    "healthcare_worker": {
      "label": "Healthcare Worker",
      "income": 5,
      "timeDelta": -3,
      "expDelta": 0,
      "healthDelta": -1,
      "happinessDelta": 0,
      "tags": [
        "High Demand"
      ]
    },
    "software_developer": {
      "label": "Software Developer",
      "income": 3,
      "timeDelta": -2,
      "expDelta": 0,
      "healthDelta": 0,
      "happinessDelta": 0,
      "tags": [
        "Technical"
      ]
    },
    "service_worker": {
      "label": "Service Worker",
      "income": 1,
      "timeDelta": -1,
      "expDelta": 0,
      "healthDelta": 0,
      "happinessDelta": 0,
      "tags": [
        "Entry"
      ]
    },
    "corporate_manager": {
      "label": "Corporate Manager",
      "income": 8,
      "timeDelta": -3,
      "expDelta": 0,
      "healthDelta": 0,
      "happinessDelta": 0,
      "tags": [
        "Leadership"
      ]
    },
    "retired": {
      "label": "Retired",
      "income": 0,
      "timeDelta": 2,
      "expDelta": 0,
      "healthDelta": 0,
      "happinessDelta": 0,
      "tags": [
        "Retired"
      ]
    }
  },
  "board": {
    "startNode": "1",
    "finishNode": "77",
    "nodeOrder": [
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "10",
      "11",
      "12",
      "13",
      "14",
      "15",
      "16",
      "17",
      "18",
      "19",
      "20",
      "21",
      "22",
      "23",
      "24",
      "25",
      "26",
      "27",
      "28",
      "29",
      "30",
      "31",
      "32",
      "33",
      "34",
      "35",
      "36",
      "37",
      "38",
      "39",
      "40",
      "41",
      "42",
      "43",
      "44",
      "45",
      "46",
      "47",
      "48",
      "49",
      "50",
      "51",
      "52",
      "53",
      "54",
      "55",
      "56",
      "57",
      "58",
      "59",
      "60",
      "61",
      "62",
      "63",
      "64",
      "65",
      "66",
      "67",
      "68",
      "69",
      "70",
      "71",
      "72",
      "73",
      "74",
      "75",
      "76",
      "77"
    ],
    "spaceMeta": {
      "1": {
        "title": "START",
        "description": "Your life begins now!"
      },
      "2": {
        "title": "This Is The World We Live In",
        "description": "Get to know what kind of world we live in by drawing an Era card"
      },
      "3": {
        "title": "Get To Know Your Generation!",
        "description": "Each generation enters the game with a distinct social and economic backdrop.",
        "generationDescriptions": {
          "boomer": "Typically defined as people born 1946-1964. They came of age during post-war expansion and major social shifts, often associated with a work/earn/build orientation.",
          "genx": "Typically defined as people born 1965-1980. Often described as independent and pragmatic, shaped by economic shifts and early personal computing/media growth.",
          "millennial": "Typically defined as people born 1981-1996. Often characterized as digitally fluent and purpose-minded, coming of age alongside internet-era disruption.",
          "genz": "Commonly defined as people born 1997-2012. Often seen as smartphone/social-media-native, with mobile-first communication and culture."
        }
      },
      "4": {
        "title": "First Life Event!",
        "description": "Your life must be full of excitement. Draw a life event now!"
      },
      "5": {
        "title": "Choose Your Education Route",
        "description": "Pick your route. Costs and outcomes differ by generation.",
        "generationDescriptions": {
          "boomer": "This path reflects stronger social expectations and earlier-life tradeoffs for Baby Boomers.",
          "genx": "This path balances independence and stability pressures common to Gen X life trajectories.",
          "millennial": "This path reflects high credential pressure and affordability strain common for Millennials.",
          "genz": "This path reflects high cost-of-living pressure and fast-changing opportunities common for Gen Z."
        }
      },
      "6": {
        "title": "Invest in Getting a Degree (Degree Path)",
        "description": "You\u2019ve been admitted to university! Time to get busy studying!"
      },
      "7": {
        "title": "Spend Time to Study & Grind (Degree Path)",
        "description": "Final exams are coming, better hit the books and study to make sure you pass!"
      },
      "8": {
        "title": "Try For An Internship (Degree Path)",
        "description": "You want to get a head start in life by trying to get an internship. Let\u2019s see what the job market has in store for you."
      },
      "9": {
        "title": "Graduate! Gain Knowledge! (Degree Path)",
        "description": "Congratulations! You graduated with Honours! All that hard work finally paid off!"
      },
      "10": {
        "title": "Apply for Jobs (Degree Path)",
        "description": "Time to look for a serious job!"
      },
      "11": {
        "title": "Learn a Practical Trade (Trade Path)",
        "description": "You signed up for trade school. Let\u2019s hope you\u2019re resilient because it\u2019s tough work!"
      },
      "12": {
        "title": "Spend Time Learning The Trade (Trade Path)",
        "description": "Practice makes perfect! Spend more time at the studio to refine your craft!"
      },
      "13": {
        "title": "Family Concern About Career (Trade Path)",
        "description": "Your family is worried about your career prospect since your trade is considered hard labour with low pay and limited career opportunities."
      },
      "14": {
        "title": "First Paid Job! Earn Income! (Trade Path)",
        "description": "You took a freelance gig and did a good job! Your client is happy will recommend you to other people."
      },
      "15": {
        "title": "Apply For Jobs (Trade Path)",
        "description": "You\u2019re done with school! Time to get a serious job."
      },
      "16": {
        "title": "Skip School And Go To Work Now (Work Path)",
        "description": "School takes too much time! You need income NOW. You found a job that doesn\u2019t require a degree or experience."
      },
      "17": {
        "title": "Gain Income Now (Work Path)",
        "description": "You got your first bonus!"
      },
      "18": {
        "title": "Limited Opportunity! (Work Path)",
        "description": "You feel trapped at your job, and without a degree or qualifications, you find it hard to look for a new career. Let\u2019s see if your luck is good today!"
      },
      "19": {
        "title": "Work Harder To Prove Yourself! (Work Path)",
        "description": "You feel the stress of these new interns and their shiny degrees threatening to overtake you at work, so you work harder to prove your position, but at the cost of your health."
      },
      "20": {
        "title": "Family Concern About Career (Work Path)",
        "description": "Your family is worried about your career prospect since without a degree or qualification, it\u2019s hard for you to climb the career ladder."
      },
      "21": {
        "title": "Work Exhaustion! (Work Path)",
        "description": "You pulled multiple overnights at work to finish a project. Your body is on the verge of collapsing, and yet the project is unfinished."
      },
      "22": {
        "title": "Gain Extra Experience Points (Work Path)",
        "description": "Your boss recognised your potential and sent you to the company regional training event."
      },
      "23": {
        "title": "Choose Your Occupation",
        "description": "Time to choose your job (show all jobs, but if player is not qualified for specific jobs then disable them) - hard-locked by requirements"
      },
      "24": {
        "title": "Chance to pursue higher studies",
        "description": "You\u2019re passionate about learning more and expanding your knowledge horizons."
      },
      "25": {
        "title": "Face an early life crisis",
        "description": "All your friends are doing so well, and you don\u2019t feel like you\u2019re catching up with them. You stress out about how you\u2019re doing in life, and decide to go to therapy."
      },
      "26": {
        "title": "Work or Personal Life?",
        "description": "A big promotion is coming up at work and your boss wants you to pull more overtime to prove yourself, but you already planned a weekend getaway with your best friends."
      },
      "27": {
        "title": "First Bonus! Save or Spend?",
        "description": "You got your first bonus! But what would you do with all this money?"
      },
      "28": {
        "title": "Choose Your Housing Route",
        "description": "Choose where and how you live. Housing pressure is generation-sensitive.",
        "generationDescriptions": {
          "boomer": "This path reflects stronger social expectations and earlier-life tradeoffs for Baby Boomers.",
          "genx": "This path balances independence and stability pressures common to Gen X life trajectories.",
          "millennial": "This path reflects high credential pressure and affordability strain common for Millennials.",
          "genz": "This path reflects high cost-of-living pressure and fast-changing opportunities common for Gen Z."
        }
      },
      "29": {
        "title": "Find a place to rent (Rent path)",
        "description": "You need time to inspect potential places to rent, and find potential housemates to move in with you."
      },
      "30": {
        "title": "Pay Deposite and File Paperwork (Rent path)",
        "description": "Now that you found a good enough place to call home, time to do the boring and painful duties of tenancy."
      },
      "31": {
        "title": "Rental Market Shakedown! (Rent path)",
        "description": "Uh oh! Why is all the prices going up?? Is my landlord scheming something?"
      },
      "32": {
        "title": "Stress from Housemates & Landlord (Rent path)",
        "description": "Your landlord won\u2019t fix issues and your housemates keep blasting music at 2AM."
      },
      "33": {
        "title": "Rent Raised! (Rent path)",
        "description": "Your lease is up and your landlord decides to raise the rent. Do you stay or try to find another place?"
      },
      "34": {
        "title": "Pay BIG! (Buy path)",
        "description": "After looking at endless options, you finally found a place to call home. But it comes at a BIG initial price."
      },
      "35": {
        "title": "Spend Money on Rennovation (Buy path)",
        "description": "You have to make your house feel like a home, so that means tearing it all down and building it back up in your dream vision, right?"
      },
      "36": {
        "title": "Unexpected Expenses (Buy path)",
        "description": "Your home is full of surprises, like hidden damage and repairs."
      },
      "37": {
        "title": "Heavy Mortgage (Buy path)",
        "description": "You feel immense stress from the mortgage draining your pay every month."
      },
      "38": {
        "title": "Job Security Threatened! (Buy path)",
        "description": "Your company is doing layoffs. You fear how to pay mortgage if let go."
      },
      "39": {
        "title": "Pay off home! (Buy path)",
        "description": "Pay off the home debt and become debt free."
      },
      "40": {
        "title": "Move In With Your Family (Move in path)",
        "description": "The most efficient and inexpensive housing method is moving back in with family."
      },
      "41": {
        "title": "Family Tension Arise! (Move in path)",
        "description": "Conflicts can occur when living together. How do you resolve it?"
      },
      "42": {
        "title": "Saving Payoff! (Move in path)",
        "description": "You can save a lot when you don\u2019t have housing payments."
      },
      "43": {
        "title": "Lack of Freedom (Move in path)",
        "description": "Living in a space that is not fully yours can feel restrictive."
      },
      "44": {
        "title": "Change to Rent or Buy? (Move in path)",
        "description": "Reflect on your housing situation and decide whether to reconsider."
      },
      "45": {
        "title": "No Financial Pressure! (Move in path)",
        "description": "Not having rent or mortgage pressure can feel relieving."
      },
      "46": {
        "title": "Extra Time! Learn a New Skill (Move in path)",
        "description": "Use extra time to build valuable skills and knowledge."
      },
      "47": {
        "title": "Home Security Mental Check",
        "description": "Check how your housing situation affects mental wellbeing."
      },
      "48": {
        "title": "A Sudden Event Occur in The World!",
        "description": "Life is full of surprises, let\u2019s see what it is this time."
      },
      "49": {
        "title": "Potential Career Change!",
        "description": "You feel like it\u2019s time for a career change."
      },
      "50": {
        "title": "Pick One Life Value To Prioritise",
        "description": "Choose one stat to prioritize right now."
      },
      "51": {
        "title": "A Big Purchase Opportunity?",
        "description": "Treat yourself now or save for later."
      },
      "52": {
        "title": "Mid-life Crisis!",
        "description": "You\u2019re halfway through life. Draw a Life card."
      },
      "53": {
        "title": "Choose Relationship Status",
        "description": "Choose whether to stay single or be in a relationship.",
        "generationDescriptions": {
          "boomer": "This path reflects stronger social expectations and earlier-life tradeoffs for Baby Boomers.",
          "genx": "This path balances independence and stability pressures common to Gen X life trajectories.",
          "millennial": "This path reflects high credential pressure and affordability strain common for Millennials.",
          "genz": "This path reflects high cost-of-living pressure and fast-changing opportunities common for Gen Z."
        }
      },
      "54": {
        "title": "Single But Won\u2019t Mingle (Single path)",
        "description": "Who said you need a relationship to feel fulfilled? You\u2019re doing fine by yourself."
      },
      "55": {
        "title": "Personal Focus (Single path)",
        "description": "Invest in yourself with new skill or deeper study."
      },
      "56": {
        "title": "Going Through It Alone (Single path)",
        "description": "Being single means handling difficult moments by yourself."
      },
      "57": {
        "title": "Family Concerns About Future (Single path)",
        "description": "Your family still worries about your future despite your reassurance."
      },
      "58": {
        "title": "Planning For the Future (Single path)",
        "description": "Plan ahead and draw insight from world conditions."
      },
      "59": {
        "title": "Spend On Myself (Single path)",
        "description": "With fewer obligations, disposable income can grow."
      },
      "60": {
        "title": "They\u2019re The One! (Relationship path)",
        "description": "Honeymoon phase begins with excitement and joy."
      },
      "61": {
        "title": "Meet The Family (Relationship path)",
        "description": "Bring your partner home to meet family. Draw a Life card."
      },
      "62": {
        "title": "Let\u2019s Get Married! (Relationship path)",
        "description": "Wedding plans are joyful but taxing."
      },
      "63": {
        "title": "With child or child-free? (Relationship path)",
        "description": "Choose whether to remain child-free or have children.",
        "generationDescriptions": {
          "boomer": "This path reflects stronger social expectations and earlier-life tradeoffs for Baby Boomers.",
          "genx": "This path balances independence and stability pressures common to Gen X life trajectories.",
          "millennial": "This path reflects high credential pressure and affordability strain common for Millennials.",
          "genz": "This path reflects high cost-of-living pressure and fast-changing opportunities common for Gen Z."
        }
      },
      "64": {
        "title": "We\u2019re Happy Just Like This (Childfree path)",
        "description": "You and your partner are happy in each other\u2019s company."
      },
      "65": {
        "title": "What To Do With All This Time? (Childfree path)",
        "description": "Plan your life as a duo. Draw a Life card."
      },
      "66": {
        "title": "Just The Two Of Us (Childfree path)",
        "description": "Strong relationship stability with time flexibility."
      },
      "67": {
        "title": "Who\u2019s Gonna Take Care Of You? (Childfree path)",
        "description": "Sometimes future-care anxiety sets in."
      },
      "68": {
        "title": "Let\u2019s Have Kids! (Children path)",
        "description": "Starting a family is meaningful and demanding."
      },
      "69": {
        "title": "Let\u2019s Have Kids! (Children path)",
        "description": "Parenting intensity continues with sustained pressure."
      },
      "70": {
        "title": "It Takes A Village! (Children path)",
        "description": "Can your network support your parenting journey?"
      },
      "71": {
        "title": "They Grow Up So Fast (Children path)",
        "description": "Watching them thrive is rewarding, though expensive."
      },
      "72": {
        "title": "Off To College! (Children path)",
        "description": "They leave the nest; bittersweet but proud moment with financial support."
      },
      "73": {
        "title": "Time To Retire!",
        "description": "You\u2019ve worked hard your whole life. It\u2019s time to retire and rest."
      },
      "74": {
        "title": "Go On A Cruise?",
        "description": "Spend now for joy or save for longevity."
      },
      "75": {
        "title": "What\u2019s Your Plans For Retirement?",
        "description": "Even after retirement, life doesn\u2019t rest."
      },
      "76": {
        "title": "Retirement Fund!",
        "description": "A major windfall boosts your retirement possibilities."
      },
      "77": {
        "title": "END",
        "description": "Journey complete."
      }
    },
    "nodes": {
      "1": {
        "id": "1",
        "label": "START",
        "type": "start",
        "next": "2"
      },
      "2": {
        "id": "2",
        "label": "WORLD_ERA",
        "type": "draw",
        "next": "3",
        "deck": "era"
      },
      "3": {
        "id": "3",
        "label": "GEN_INFO",
        "type": "effect",
        "next": "4"
      },
      "4": {
        "id": "4",
        "label": "FIRST_LIFE_EVENT",
        "type": "draw",
        "next": "5",
        "deck": "life"
      },
      "5": {
        "id": "5",
        "label": "EDU_GATE",
        "type": "gate",
        "gateLabel": "Choose Your Education Route",
        "gatePrompts": {
          "boomer": "In your era, practical earning was often prioritized early. Choose the path that balances family expectation and long-term stability.",
          "genx": "You are balancing independence with practical outcomes. Choose the route that fits your risk tolerance and career momentum.",
          "millennial": "Credentials often open doors but come with heavy cost. Choose whether to absorb schooling pressure or enter work sooner.",
          "genz": "Costs are high and the market changes quickly. Choose between investing in qualifications now or moving fast into income."
        },
        "options": [
          {
            "id": "DEGREE",
            "label": "Get A Degree",
            "preview": "Higher credential upside with steep cost in money and time.",
            "next": "6",
            "effects": [
              {
                "type": "adjustStat",
                "stat": "money",
                "amount": -4
              },
              {
                "type": "adjustStat",
                "stat": "time",
                "amount": -2
              },
              {
                "type": "startRecurring",
                "key": "degree_tuition",
                "durationTurns": 4,
                "effects": [
                  {
                    "type": "adjustStat",
                    "stat": "money",
                    "amount": -3
                  },
                  {
                    "type": "adjustStat",
                    "stat": "time",
                    "amount": -1
                  }
                ]
              }
            ],
            "generationEffects": {
              "boomer": [
                {
                  "type": "adjustStat",
                  "stat": "money",
                  "amount": -1
                },
                {
                  "type": "adjustStat",
                  "stat": "health",
                  "amount": -2
                },
                {
                  "type": "adjustStat",
                  "stat": "time",
                  "amount": -2
                }
              ],
              "genx": [
                {
                  "type": "adjustStat",
                  "stat": "money",
                  "amount": -1
                },
                {
                  "type": "adjustStat",
                  "stat": "health",
                  "amount": -1
                },
                {
                  "type": "adjustStat",
                  "stat": "time",
                  "amount": -1
                }
              ],
              "millennial": [
                {
                  "type": "adjustStat",
                  "stat": "money",
                  "amount": -2
                }
              ],
              "genz": [
                {
                  "type": "adjustStat",
                  "stat": "money",
                  "amount": -3
                }
              ]
            }
          },
          {
            "id": "TRADE",
            "label": "Go to Trade School",
            "preview": "Practical route with moderate cost and faster entry to work.",
            "next": "11",
            "effects": [
              {
                "type": "adjustStat",
                "stat": "money",
                "amount": -2
              },
              {
                "type": "adjustStat",
                "stat": "time",
                "amount": -3
              },
              {
                "type": "startRecurring",
                "key": "trade_tuition",
                "durationTurns": 3,
                "effects": [
                  {
                    "type": "adjustStat",
                    "stat": "money",
                    "amount": -2
                  },
                  {
                    "type": "adjustStat",
                    "stat": "time",
                    "amount": -1
                  }
                ]
              }
            ],
            "generationEffects": {
              "boomer": [
                {
                  "type": "adjustStat",
                  "stat": "money",
                  "amount": -1
                },
                {
                  "type": "adjustStat",
                  "stat": "health",
                  "amount": -1
                },
                {
                  "type": "adjustStat",
                  "stat": "time",
                  "amount": -2
                }
              ],
              "genx": [
                {
                  "type": "adjustStat",
                  "stat": "money",
                  "amount": -1
                },
                {
                  "type": "adjustStat",
                  "stat": "time",
                  "amount": -1
                }
              ],
              "millennial": [
                {
                  "type": "adjustStat",
                  "stat": "money",
                  "amount": -2
                },
                {
                  "type": "adjustStat",
                  "stat": "health",
                  "amount": -1
                }
              ],
              "genz": [
                {
                  "type": "adjustStat",
                  "stat": "money",
                  "amount": -3
                },
                {
                  "type": "adjustStat",
                  "stat": "health",
                  "amount": -2
                }
              ]
            }
          },
          {
            "id": "WORK_NOW",
            "label": "Enter the Workforce",
            "preview": "Earn now but lower credentials can create pressure later.",
            "next": "16",
            "effects": [
              {
                "type": "adjustStat",
                "stat": "money",
                "amount": 1
              },
              {
                "type": "adjustStat",
                "stat": "time",
                "amount": -2
              },
              {
                "type": "startRecurring",
                "key": "early_work_bridge",
                "endOnOccupationChange": true,
                "effects": [
                  {
                    "type": "adjustStat",
                    "stat": "money",
                    "amount": 1
                  },
                  {
                    "type": "adjustStat",
                    "stat": "time",
                    "amount": -2
                  }
                ]
              }
            ],
            "generationEffects": {
              "boomer": [
                {
                  "type": "adjustStat",
                  "stat": "money",
                  "amount": 2
                }
              ],
              "genx": [
                {
                  "type": "adjustStat",
                  "stat": "money",
                  "amount": 1
                }
              ],
              "millennial": [
                {
                  "type": "adjustStat",
                  "stat": "health",
                  "amount": -1
                }
              ],
              "genz": [
                {
                  "type": "adjustStat",
                  "stat": "health",
                  "amount": -3
                }
              ]
            }
          }
        ]
      },
      "6": {
        "id": "6",
        "label": "DEGREE_INVEST",
        "type": "effect",
        "next": "7",
        "effects": [
          {
            "type": "adjustStat",
            "stat": "money",
            "amount": -1
          },
          {
            "type": "adjustStat",
            "stat": "time",
            "amount": -1
          }
        ]
      },
      "7": {
        "id": "7",
        "label": "DEGREE_GRIND",
        "type": "effect",
        "next": "8",
        "effects": [
          {
            "type": "adjustStat",
            "stat": "time",
            "amount": -2
          }
        ]
      },
      "8": {
        "id": "8",
        "label": "DEGREE_INTERNSHIP",
        "type": "draw",
        "next": "9",
        "deck": "era"
      },
      "9": {
        "id": "9",
        "label": "DEGREE_GRAD",
        "type": "effect",
        "next": "10",
        "effects": [
          {
            "type": "adjustStat",
            "stat": "education",
            "amount": 2
          }
        ]
      },
      "10": {
        "id": "10",
        "label": "DEGREE_APPLY",
        "type": "effect",
        "next": "23",
        "effects": [
          {
            "type": "adjustStat",
            "stat": "time",
            "amount": -2
          }
        ]
      },
      "11": {
        "id": "11",
        "label": "TRADE_START",
        "type": "effect",
        "next": "12",
        "effects": [
          {
            "type": "adjustStat",
            "stat": "money",
            "amount": -1
          },
          {
            "type": "adjustStat",
            "stat": "time",
            "amount": -1
          }
        ]
      },
      "12": {
        "id": "12",
        "label": "TRADE_LEARN",
        "type": "effect",
        "next": "13",
        "effects": [
          {
            "type": "adjustStat",
            "stat": "time",
            "amount": -2
          },
          {
            "type": "adjustStat",
            "stat": "experience",
            "amount": 1
          }
        ]
      },
      "13": {
        "id": "13",
        "label": "TRADE_FAMILY_CONCERN",
        "type": "effect",
        "next": "14",
        "effects": [
          {
            "type": "adjustStat",
            "stat": "happiness",
            "amount": -2
          }
        ]
      },
      "14": {
        "id": "14",
        "label": "TRADE_FIRST_PAID",
        "type": "effect",
        "next": "15",
        "effects": [
          {
            "type": "adjustStat",
            "stat": "money",
            "amount": 2
          },
          {
            "type": "adjustStat",
            "stat": "experience",
            "amount": 2
          }
        ]
      },
      "15": {
        "id": "15",
        "label": "TRADE_APPLY",
        "type": "effect",
        "next": "23",
        "effects": [
          {
            "type": "adjustStat",
            "stat": "time",
            "amount": -2
          }
        ]
      },
      "16": {
        "id": "16",
        "label": "WORK_SKIP_SCHOOL",
        "type": "effect",
        "next": "17"
      },
      "17": {
        "id": "17",
        "label": "WORK_GAIN_INCOME",
        "type": "effect",
        "next": "18",
        "effects": [
          {
            "type": "adjustStat",
            "stat": "money",
            "amount": 3
          }
        ]
      },
      "18": {
        "id": "18",
        "label": "WORK_LIMITED_OPPORTUNITY",
        "type": "draw",
        "next": "19",
        "deck": "era"
      },
      "19": {
        "id": "19",
        "label": "WORK_PROVE",
        "type": "effect",
        "next": "20",
        "effects": [
          {
            "type": "adjustStat",
            "stat": "money",
            "amount": 2
          },
          {
            "type": "adjustStat",
            "stat": "experience",
            "amount": 2
          },
          {
            "type": "adjustStat",
            "stat": "health",
            "amount": -4
          }
        ]
      },
      "20": {
        "id": "20",
        "label": "WORK_FAMILY_CONCERN",
        "type": "effect",
        "next": "21",
        "effects": [
          {
            "type": "adjustStat",
            "stat": "happiness",
            "amount": -2
          }
        ]
      },
      "21": {
        "id": "21",
        "label": "WORK_EXHAUSTION",
        "type": "checkpoint",
        "gateLabel": "Work Exhaustion",
        "options": [
          {
            "id": "FINISH_PROJECT",
            "label": "Finish the project",
            "preview": "Push through and complete it now.",
            "next": "22",
            "effects": [
              {
                "type": "adjustStat",
                "stat": "health",
                "amount": -2
              },
              {
                "type": "adjustStat",
                "stat": "money",
                "amount": 2
              }
            ]
          },
          {
            "id": "REST",
            "label": "Take time to rest",
            "preview": "Recover now and delay output.",
            "next": "22",
            "effects": [
              {
                "type": "adjustStat",
                "stat": "time",
                "amount": -2
              }
            ]
          }
        ]
      },
      "22": {
        "id": "22",
        "label": "WORK_EXTRA_EXP",
        "type": "effect",
        "next": "23",
        "effects": [
          {
            "type": "adjustStat",
            "stat": "experience",
            "amount": 2
          }
        ]
      },
      "23": {
        "id": "23",
        "label": "JOB_GATE",
        "type": "gate",
        "gateLabel": "Choose Your Occupation",
        "onEnterEffects": [
          {
            "type": "pathBonus",
            "rules": [
              {
                "fromNode": "10",
                "effects": [
                  {
                    "type": "adjustStat",
                    "stat": "education",
                    "amount": 4
                  },
                  {
                    "type": "log",
                    "message": "Congrats! You gained +4 Education from your degree path."
                  }
                ]
              },
              {
                "fromNode": "15",
                "effects": [
                  {
                    "type": "adjustStat",
                    "stat": "experience",
                    "amount": 4
                  },
                  {
                    "type": "log",
                    "message": "Congrats! You gained +4 Experience from your trade path."
                  }
                ]
              }
            ]
          }
        ],
        "options": [
          {
            "id": "OFFICE",
            "label": "Office worker",
            "preview": "Standard office track.",
            "upkeepNote": "Money +3, Time -2 per turn",
            "requirements": {
              "education": 4
            },
            "next": "24",
            "effects": [
              {
                "type": "setOccupation",
                "occupation": "office_worker"
              },
              {
                "type": "stopRecurring",
                "key": "early_work_bridge"
              }
            ]
          },
          {
            "id": "REPAIRMAN",
            "label": "Repairman",
            "preview": "Skilled manual track.",
            "upkeepNote": "Money +2, Time -3 per turn",
            "requirements": {
              "experience": 2
            },
            "next": "24",
            "effects": [
              {
                "type": "setOccupation",
                "occupation": "repairman"
              },
              {
                "type": "stopRecurring",
                "key": "early_work_bridge"
              }
            ]
          },
          {
            "id": "FREELANCER",
            "label": "Freelancer",
            "preview": "Flexible independent work.",
            "upkeepNote": "Money +1, Time -3, Happiness +1 per turn",
            "next": "24",
            "effects": [
              {
                "type": "setOccupation",
                "occupation": "freelancer"
              },
              {
                "type": "stopRecurring",
                "key": "early_work_bridge"
              }
            ]
          },
          {
            "id": "EDUCATOR",
            "label": "Educator",
            "preview": "Teaching profession track.",
            "upkeepNote": "Money +3, Time -1 per turn",
            "requirements": {
              "education": 5
            },
            "next": "24",
            "effects": [
              {
                "type": "setOccupation",
                "occupation": "educator"
              },
              {
                "type": "stopRecurring",
                "key": "early_work_bridge"
              }
            ]
          },
          {
            "id": "HEALTHCARE",
            "label": "Healthcare worker",
            "preview": "High-pay high-load care track.",
            "upkeepNote": "Money +5, Time -3, Health -1 per turn",
            "requirements": {
              "education": 5,
              "experience": 4
            },
            "next": "24",
            "effects": [
              {
                "type": "setOccupation",
                "occupation": "healthcare_worker"
              },
              {
                "type": "stopRecurring",
                "key": "early_work_bridge"
              }
            ]
          },
          {
            "id": "SOFTWARE",
            "label": "Software Developer",
            "preview": "Technical development track.",
            "upkeepNote": "Money +3, Time -2 per turn",
            "requirements": {
              "education": 5
            },
            "next": "24",
            "effects": [
              {
                "type": "setOccupation",
                "occupation": "software_developer"
              },
              {
                "type": "stopRecurring",
                "key": "early_work_bridge"
              }
            ]
          },
          {
            "id": "SERVICE",
            "label": "Service Worker",
            "preview": "Accessible service track.",
            "upkeepNote": "Money +1, Time -1 per turn",
            "next": "24",
            "effects": [
              {
                "type": "setOccupation",
                "occupation": "service_worker"
              },
              {
                "type": "stopRecurring",
                "key": "early_work_bridge"
              }
            ]
          },
          {
            "id": "MANAGER",
            "label": "Corporate Manager",
            "preview": "Leadership and executive track.",
            "upkeepNote": "Money +8, Time -3 per turn",
            "requirements": {
              "education": 6,
              "experience": 12
            },
            "next": "24",
            "effects": [
              {
                "type": "setOccupation",
                "occupation": "corporate_manager"
              },
              {
                "type": "stopRecurring",
                "key": "early_work_bridge"
              }
            ]
          }
        ]
      },
      "24": {
        "id": "24",
        "label": "HIGHER_STUDIES",
        "type": "effect",
        "next": "25",
        "effects": [
          {
            "type": "adjustStat",
            "stat": "money",
            "amount": -4
          },
          {
            "type": "adjustStat",
            "stat": "education",
            "amount": 4
          }
        ]
      },
      "25": {
        "id": "25",
        "label": "EARLY_LIFE_CRISIS",
        "type": "effect",
        "next": "26",
        "effects": [
          {
            "type": "adjustStat",
            "stat": "health",
            "amount": -2
          },
          {
            "type": "adjustStat",
            "stat": "experience",
            "amount": 1
          }
        ]
      },
      "26": {
        "id": "26",
        "label": "WORK_OR_LIFE",
        "type": "choice",
        "next": "27",
        "choice": {
          "prompt": "Do you chase promotion or rest?",
          "options": [
            {
              "id": "PROMOTION",
              "label": "I want that promotion!",
              "preview": "Permanent income upside with health cost.",
              "requirements": {
                "health": 3
              },
              "effects": [
                {
                  "type": "adjustStat",
                  "stat": "health",
                  "amount": -2
                },
                {
                  "type": "startRecurring",
                  "key": "promotion_raise",
                  "effects": [
                    {
                      "type": "adjustStat",
                      "stat": "money",
                      "amount": 1
                    }
                  ]
                }
              ]
            },
            {
              "id": "REST",
              "label": "I need some rest",
              "preview": "Recover physically and emotionally.",
              "effects": [
                {
                  "type": "adjustStat",
                  "stat": "health",
                  "amount": 2
                },
                {
                  "type": "adjustStat",
                  "stat": "happiness",
                  "amount": 2
                }
              ]
            }
          ]
        }
      },
      "27": {
        "id": "27",
        "label": "FIRST_BONUS",
        "type": "choice",
        "next": "28",
        "choice": {
          "prompt": "Save or spend?",
          "options": [
            {
              "id": "SAVE",
              "label": "Save it!",
              "preview": "Build more financial buffer.",
              "effects": [
                {
                  "type": "adjustStat",
                  "stat": "money",
                  "amount": 2
                }
              ]
            },
            {
              "id": "SPEND",
              "label": "Spend it!",
              "preview": "Enjoy now.",
              "effects": [
                {
                  "type": "adjustStat",
                  "stat": "happiness",
                  "amount": 2
                }
              ]
            }
          ]
        }
      },
      "28": {
        "id": "28",
        "label": "HOUSING_GATE",
        "type": "gate",
        "gateLabel": "Choose Your Housing Route",
        "gatePrompts": {
          "boomer": "Housing security is a major social milestone in your cohort. Pick the route that fits your finances and family expectations.",
          "genx": "You are balancing stability with flexibility. Pick the housing route that matches your current career and stress capacity.",
          "millennial": "Housing affordability is tight and long-term commitments can be risky. Pick the path you can sustainably carry.",
          "genz": "Early-career income pressure makes housing choices sharp tradeoffs. Pick the option that keeps you resilient turn-to-turn."
        },
        "options": [
          {
            "id": "RENT",
            "label": "Rent",
            "preview": "Flexible but recurring monthly burden.",
            "requirements": {
              "money": 4
            },
            "next": "29",
            "effects": [
              {
                "type": "adjustStat",
                "stat": "money",
                "amount": -4
              },
              {
                "type": "adjustStat",
                "stat": "time",
                "amount": -1
              },
              {
                "type": "setHousing",
                "housingStatus": "rent",
                "payment": 2,
                "mortgageActive": false
              }
            ],
            "generationEffects": {
              "boomer": [
                {
                  "type": "adjustStat",
                  "stat": "happiness",
                  "amount": -2
                }
              ],
              "genx": [
                {
                  "type": "adjustStat",
                  "stat": "money",
                  "amount": -1
                },
                {
                  "type": "adjustStat",
                  "stat": "happiness",
                  "amount": -1
                }
              ],
              "millennial": [
                {
                  "type": "adjustStat",
                  "stat": "money",
                  "amount": -2
                },
                {
                  "type": "adjustStat",
                  "stat": "time",
                  "amount": -1
                }
              ],
              "genz": [
                {
                  "type": "adjustStat",
                  "stat": "money",
                  "amount": -3
                },
                {
                  "type": "adjustStat",
                  "stat": "time",
                  "amount": -2
                }
              ]
            }
          },
          {
            "id": "BUY",
            "label": "Buy",
            "preview": "Big upfront hit, heavy debt period.",
            "requirements": {
              "money": 10
            },
            "next": "34",
            "effects": [
              {
                "type": "adjustStat",
                "stat": "money",
                "amount": -10
              },
              {
                "type": "adjustStat",
                "stat": "time",
                "amount": -3
              },
              {
                "type": "setHousing",
                "housingStatus": "buy",
                "payment": 0,
                "mortgageActive": true
              },
              {
                "type": "startRecurring",
                "key": "mortgage_debt",
                "durationTurns": 5,
                "effects": [
                  {
                    "type": "adjustStat",
                    "stat": "money",
                    "amount": -4
                  }
                ]
              }
            ],
            "generationEffects": {
              "boomer": [
                {
                  "type": "adjustStat",
                  "stat": "money",
                  "amount": -1
                },
                {
                  "type": "adjustStat",
                  "stat": "health",
                  "amount": -1
                },
                {
                  "type": "adjustStat",
                  "stat": "time",
                  "amount": -2
                }
              ],
              "genx": [
                {
                  "type": "adjustStat",
                  "stat": "money",
                  "amount": -1
                },
                {
                  "type": "adjustStat",
                  "stat": "time",
                  "amount": -1
                }
              ],
              "millennial": [
                {
                  "type": "adjustStat",
                  "stat": "money",
                  "amount": -2
                },
                {
                  "type": "adjustStat",
                  "stat": "health",
                  "amount": -1
                }
              ],
              "genz": [
                {
                  "type": "adjustStat",
                  "stat": "money",
                  "amount": -3
                },
                {
                  "type": "adjustStat",
                  "stat": "health",
                  "amount": -2
                }
              ]
            }
          },
          {
            "id": "FAMILY_HOME",
            "label": "Live with family",
            "preview": "Low direct housing cost with social tradeoffs.",
            "next": "40",
            "effects": [
              {
                "type": "setHousing",
                "housingStatus": "family",
                "payment": 0,
                "mortgageActive": false
              },
              {
                "type": "startRecurring",
                "key": "family_time_bonus",
                "endOnHousingChange": true,
                "effects": [
                  {
                    "type": "adjustStat",
                    "stat": "time",
                    "amount": 1
                  }
                ]
              }
            ],
            "generationEffects": {
              "boomer": [
                {
                  "type": "adjustStat",
                  "stat": "happiness",
                  "amount": -5
                }
              ],
              "genx": [
                {
                  "type": "adjustStat",
                  "stat": "happiness",
                  "amount": -3
                }
              ],
              "millennial": [
                {
                  "type": "adjustStat",
                  "stat": "happiness",
                  "amount": -1
                }
              ],
              "genz": []
            }
          }
        ]
      },
      "29": {
        "id": "29",
        "label": "RENT_FIND_PLACE",
        "type": "effect",
        "next": "30",
        "effects": [
          {
            "type": "adjustStat",
            "stat": "time",
            "amount": -2
          }
        ]
      },
      "30": {
        "id": "30",
        "label": "RENT_PAPERWORK",
        "type": "effect",
        "next": "31",
        "effects": [
          {
            "type": "adjustStat",
            "stat": "time",
            "amount": -2
          },
          {
            "type": "adjustStat",
            "stat": "money",
            "amount": -2
          }
        ]
      },
      "31": {
        "id": "31",
        "label": "RENT_MARKET_SHAKEDOWN",
        "type": "draw",
        "next": "32",
        "deck": "era"
      },
      "32": {
        "id": "32",
        "label": "RENT_STRESS",
        "type": "effect",
        "next": "33",
        "effects": [
          {
            "type": "adjustStat",
            "stat": "happiness",
            "amount": -4
          }
        ]
      },
      "33": {
        "id": "33",
        "label": "RENT_RAISED",
        "type": "choice",
        "next": "47",
        "choice": {
          "prompt": "Stay with higher rent or leave?",
          "options": [
            {
              "id": "STAY",
              "label": "Stay",
              "preview": "Accept rent increase permanently.",
              "effects": [
                {
                  "type": "adjustHousingPayment",
                  "amount": 2
                }
              ]
            },
            {
              "id": "LEAVE",
              "label": "Leave",
              "preview": "Spend time moving to keep rent level.",
              "requirements": {
                "time": 4
              },
              "effects": [
                {
                  "type": "adjustStat",
                  "stat": "time",
                  "amount": -4
                }
              ]
            }
          ]
        }
      },
      "34": {
        "id": "34",
        "label": "BUY_PAY_BIG",
        "type": "effect",
        "next": "35",
        "effects": [
          {
            "type": "adjustStat",
            "stat": "money",
            "amount": -2
          }
        ]
      },
      "35": {
        "id": "35",
        "label": "BUY_RENOVATION",
        "type": "effect",
        "next": "36",
        "effects": [
          {
            "type": "adjustStat",
            "stat": "money",
            "amount": -4
          }
        ]
      },
      "36": {
        "id": "36",
        "label": "BUY_UNEXPECTED",
        "type": "draw",
        "next": "37",
        "deck": "life"
      },
      "37": {
        "id": "37",
        "label": "BUY_MORTGAGE_STRESS",
        "type": "effect",
        "next": "38",
        "effects": [
          {
            "type": "adjustStat",
            "stat": "happiness",
            "amount": -4
          }
        ]
      },
      "38": {
        "id": "38",
        "label": "BUY_JOB_THREAT",
        "type": "draw",
        "next": "39",
        "deck": "era"
      },
      "39": {
        "id": "39",
        "label": "BUY_PAYOFF",
        "type": "effect",
        "next": "47",
        "effects": [
          {
            "type": "payOffMortgage",
            "key": "mortgage_debt"
          },
          {
            "type": "adjustStat",
            "stat": "happiness",
            "amount": 4
          }
        ]
      },
      "40": {
        "id": "40",
        "label": "FAMILY_MOVE_IN",
        "type": "effect",
        "next": "41"
      },
      "41": {
        "id": "41",
        "label": "FAMILY_TENSION",
        "type": "effect",
        "next": "42",
        "effects": [
          {
            "type": "adjustStat",
            "stat": "happiness",
            "amount": -4
          },
          {
            "type": "drawCard",
            "deck": "life"
          }
        ]
      },
      "42": {
        "id": "42",
        "label": "FAMILY_SAVING_PAYOFF",
        "type": "effect",
        "next": "43",
        "effects": [
          {
            "type": "adjustStat",
            "stat": "money",
            "amount": 4
          }
        ]
      },
      "43": {
        "id": "43",
        "label": "FAMILY_LACK_FREEDOM",
        "type": "effect",
        "next": "44",
        "effects": [
          {
            "type": "adjustStat",
            "stat": "happiness",
            "amount": -4
          }
        ]
      },
      "44": {
        "id": "44",
        "label": "FAMILY_RECONSIDER",
        "type": "choice",
        "next": "45",
        "choice": {
          "prompt": "Reconsider housing route?",
          "options": [
            {
              "id": "RECONSIDER",
              "label": "Reconsider now",
              "preview": "Go back and choose housing again.",
              "effects": [
                {
                  "type": "moveToNode",
                  "nodeId": "28"
                }
              ]
            },
            {
              "id": "STAY",
              "label": "Keep moving forward",
              "preview": "Accept long-run emotional drag.",
              "effects": [
                {
                  "type": "startRecurring",
                  "key": "family_freedom_penalty",
                  "effects": [
                    {
                      "type": "adjustStat",
                      "stat": "happiness",
                      "amount": -1
                    }
                  ]
                }
              ]
            }
          ]
        }
      },
      "45": {
        "id": "45",
        "label": "FAMILY_NO_PRESSURE",
        "type": "effect",
        "next": "46",
        "effects": [
          {
            "type": "adjustStat",
            "stat": "happiness",
            "amount": 2
          },
          {
            "type": "adjustStat",
            "stat": "health",
            "amount": 2
          }
        ]
      },
      "46": {
        "id": "46",
        "label": "FAMILY_EXTRA_TIME",
        "type": "effect",
        "next": "47",
        "effects": [
          {
            "type": "adjustStat",
            "stat": "experience",
            "amount": 3
          },
          {
            "type": "adjustStat",
            "stat": "education",
            "amount": 2
          }
        ]
      },
      "47": {
        "id": "47",
        "label": "HOME_MENTAL_CHECK",
        "type": "effect",
        "next": "48",
        "effects": [
          {
            "type": "housingMentalCheck"
          }
        ]
      },
      "48": {
        "id": "48",
        "label": "SUDDEN_WORLD_EVENT",
        "type": "draw",
        "next": "49",
        "deck": "era"
      },
      "49": {
        "id": "49",
        "label": "CAREER_CHANGE",
        "type": "choice",
        "next": "50",
        "choice": {
          "prompt": "Do you switch occupation?",
          "options": [
            {
              "id": "SWITCH",
              "label": "Choose another occupation",
              "preview": "Pick a new occupation now.",
              "effects": [
                {
                  "type": "chooseOccupation"
                }
              ]
            },
            {
              "id": "STAY",
              "label": "Stay in current occupation",
              "preview": "Maintain your current path.",
              "effects": []
            }
          ]
        }
      },
      "50": {
        "id": "50",
        "label": "PRIORITIZE_STAT",
        "type": "choice",
        "next": "51",
        "choice": {
          "prompt": "Pick one stat to gain +3.",
          "options": [
            {
              "id": "HAPPY",
              "label": "Happiness",
              "preview": "+3 Happiness",
              "effects": [
                {
                  "type": "adjustStat",
                  "stat": "happiness",
                  "amount": 3
                }
              ]
            },
            {
              "id": "HEALTH",
              "label": "Health",
              "preview": "+3 Health",
              "effects": [
                {
                  "type": "adjustStat",
                  "stat": "health",
                  "amount": 3
                }
              ]
            },
            {
              "id": "TIME",
              "label": "Time",
              "preview": "+3 Time",
              "effects": [
                {
                  "type": "adjustStat",
                  "stat": "time",
                  "amount": 3
                }
              ]
            },
            {
              "id": "MONEY",
              "label": "Money",
              "preview": "+3 Money",
              "effects": [
                {
                  "type": "adjustStat",
                  "stat": "money",
                  "amount": 3
                }
              ]
            },
            {
              "id": "EXP",
              "label": "Experience",
              "preview": "+3 Experience",
              "effects": [
                {
                  "type": "adjustStat",
                  "stat": "experience",
                  "amount": 3
                }
              ]
            },
            {
              "id": "EDU",
              "label": "Education",
              "preview": "+3 Education",
              "effects": [
                {
                  "type": "adjustStat",
                  "stat": "education",
                  "amount": 3
                }
              ]
            }
          ]
        }
      },
      "51": {
        "id": "51",
        "label": "BIG_PURCHASE",
        "type": "choice",
        "next": "52",
        "choice": {
          "prompt": "Treat yourself?",
          "options": [
            {
              "id": "TREAT",
              "label": "Treat myself",
              "preview": "Spend now for joy.",
              "effects": [
                {
                  "type": "adjustStat",
                  "stat": "money",
                  "amount": -5
                },
                {
                  "type": "adjustStat",
                  "stat": "happiness",
                  "amount": 3
                }
              ]
            },
            {
              "id": "PASS",
              "label": "Do nothing",
              "preview": "Keep current resources.",
              "effects": []
            }
          ]
        }
      },
      "52": {
        "id": "52",
        "label": "MIDLIFE",
        "type": "draw",
        "next": "53",
        "deck": "life"
      },
      "53": {
        "id": "53",
        "label": "RELATIONSHIP_GATE",
        "type": "gate",
        "gateLabel": "Choose Relationship Status",
        "gatePrompts": {
          "boomer": "Social expectations around partnership can be strong here. Choose the relationship route that fits your values and pressure level.",
          "genx": "You can prioritize autonomy or partnership stability. Choose the route that best matches your current life balance.",
          "millennial": "Relationship decisions can intersect with financial uncertainty. Choose the route that feels sustainable for your lifestyle.",
          "genz": "Your generation often weighs independence alongside connection. Choose the route that supports your wellbeing and goals."
        },
        "options": [
          {
            "id": "SINGLE",
            "label": "Stay Single",
            "preview": "Single route with autonomy tradeoffs.",
            "next": "54",
            "effects": [
              {
                "type": "setFamilyStatus",
                "familyStatus": "single"
              }
            ],
            "generationEffects": {
              "boomer": [
                {
                  "type": "adjustStat",
                  "stat": "happiness",
                  "amount": -10
                }
              ],
              "genx": [
                {
                  "type": "adjustStat",
                  "stat": "happiness",
                  "amount": -6
                }
              ],
              "millennial": [],
              "genz": [
                {
                  "type": "adjustStat",
                  "stat": "happiness",
                  "amount": 3
                }
              ]
            }
          },
          {
            "id": "DATING",
            "label": "Be in relationship",
            "preview": "Relationship path with emotional support and commitments.",
            "next": "60",
            "effects": [
              {
                "type": "setFamilyStatus",
                "familyStatus": "dating"
              }
            ],
            "generationEffects": {
              "boomer": [
                {
                  "type": "adjustStat",
                  "stat": "happiness",
                  "amount": 5
                }
              ],
              "genx": [
                {
                  "type": "adjustStat",
                  "stat": "happiness",
                  "amount": 3
                }
              ],
              "millennial": [
                {
                  "type": "adjustStat",
                  "stat": "happiness",
                  "amount": 2
                }
              ],
              "genz": [
                {
                  "type": "adjustStat",
                  "stat": "happiness",
                  "amount": 2
                }
              ]
            }
          }
        ]
      },
      "54": {
        "id": "54",
        "label": "SINGLE_SOLO",
        "type": "effect",
        "next": "55",
        "effects": [
          {
            "type": "adjustStat",
            "stat": "time",
            "amount": 3
          }
        ]
      },
      "55": {
        "id": "55",
        "label": "SINGLE_PERSONAL_FOCUS",
        "type": "choice",
        "next": "56",
        "choice": {
          "prompt": "Where do you invest your focus?",
          "options": [
            {
              "id": "EXP",
              "label": "Build practical skill",
              "preview": "+2 Experience",
              "effects": [
                {
                  "type": "adjustStat",
                  "stat": "experience",
                  "amount": 2
                }
              ]
            },
            {
              "id": "EDU",
              "label": "Deepen knowledge",
              "preview": "+2 Education",
              "effects": [
                {
                  "type": "adjustStat",
                  "stat": "education",
                  "amount": 2
                }
              ]
            }
          ]
        }
      },
      "56": {
        "id": "56",
        "label": "SINGLE_ALONE",
        "type": "draw",
        "next": "57",
        "deck": "life"
      },
      "57": {
        "id": "57",
        "label": "SINGLE_FAMILY_CONCERN",
        "type": "effect",
        "next": "58",
        "effects": [
          {
            "type": "adjustStat",
            "stat": "happiness",
            "amount": -4
          }
        ]
      },
      "58": {
        "id": "58",
        "label": "SINGLE_FUTURE_PLAN",
        "type": "draw",
        "next": "59",
        "deck": "era"
      },
      "59": {
        "id": "59",
        "label": "SINGLE_DISPOSABLE",
        "type": "effect",
        "next": "73",
        "effects": [
          {
            "type": "adjustStat",
            "stat": "money",
            "amount": 3
          }
        ]
      },
      "60": {
        "id": "60",
        "label": "REL_THE_ONE",
        "type": "effect",
        "next": "61",
        "effects": [
          {
            "type": "adjustStat",
            "stat": "happiness",
            "amount": 3
          }
        ]
      },
      "61": {
        "id": "61",
        "label": "REL_MEET_FAMILY",
        "type": "draw",
        "next": "62",
        "deck": "life"
      },
      "62": {
        "id": "62",
        "label": "REL_MARRIAGE",
        "type": "effect",
        "next": "63",
        "effects": [
          {
            "type": "adjustStat",
            "stat": "health",
            "amount": -4
          },
          {
            "type": "adjustStat",
            "stat": "money",
            "amount": -10
          },
          {
            "type": "setFamilyStatus",
            "familyStatus": "married"
          }
        ]
      },
      "63": {
        "id": "63",
        "label": "FAMILY_DECISION_GATE",
        "type": "gate",
        "gateLabel": "With child or child-free?",
        "gatePrompts": {
          "boomer": "Family expansion is often treated as expected in your social context. Choose based on your resources and priorities.",
          "genx": "This is a values-and-capacity decision point. Choose the path that matches your long-term emotional and financial bandwidth.",
          "millennial": "Raising children can bring high ongoing cost and time load. Choose the family model you can support sustainably.",
          "genz": "Future uncertainty can amplify parenting tradeoffs. Choose the route that protects your wellbeing and flexibility."
        },
        "options": [
          {
            "id": "CHILDFREE",
            "label": "Be Child-free",
            "preview": "Stay married without children.",
            "next": "64",
            "effects": [
              {
                "type": "setFamilyStatus",
                "familyStatus": "married_childfree"
              }
            ],
            "generationEffects": {
              "boomer": [
                {
                  "type": "adjustStat",
                  "stat": "happiness",
                  "amount": -6
                }
              ],
              "genx": [
                {
                  "type": "adjustStat",
                  "stat": "happiness",
                  "amount": -4
                }
              ],
              "millennial": [
                {
                  "type": "adjustStat",
                  "stat": "happiness",
                  "amount": 1
                }
              ],
              "genz": [
                {
                  "type": "adjustStat",
                  "stat": "happiness",
                  "amount": 2
                }
              ]
            }
          },
          {
            "id": "KIDS",
            "label": "Have Children",
            "preview": "Start a family with recurring childcare costs.",
            "next": "68",
            "effects": [
              {
                "type": "setFamilyStatus",
                "familyStatus": "married_kids"
              },
              {
                "type": "startRecurring",
                "key": "childcare",
                "effects": [
                  {
                    "type": "adjustStat",
                    "stat": "money",
                    "amount": -4
                  }
                ]
              }
            ],
            "generationEffects": {
              "boomer": [
                {
                  "type": "adjustStat",
                  "stat": "happiness",
                  "amount": 5
                }
              ],
              "genx": [
                {
                  "type": "adjustStat",
                  "stat": "happiness",
                  "amount": 3
                }
              ],
              "millennial": [
                {
                  "type": "adjustStat",
                  "stat": "happiness",
                  "amount": -1
                }
              ],
              "genz": [
                {
                  "type": "adjustStat",
                  "stat": "happiness",
                  "amount": -2
                }
              ]
            }
          }
        ]
      },
      "64": {
        "id": "64",
        "label": "CHILDFREE_HAPPY",
        "type": "effect",
        "next": "65",
        "effects": [
          {
            "type": "adjustStat",
            "stat": "money",
            "amount": 3
          }
        ]
      },
      "65": {
        "id": "65",
        "label": "CHILDFREE_TIME",
        "type": "draw",
        "next": "66",
        "deck": "life"
      },
      "66": {
        "id": "66",
        "label": "CHILDFREE_TWO",
        "type": "effect",
        "next": "67",
        "effects": [
          {
            "type": "adjustStat",
            "stat": "happiness",
            "amount": 2
          },
          {
            "type": "adjustStat",
            "stat": "time",
            "amount": 2
          }
        ]
      },
      "67": {
        "id": "67",
        "label": "CHILDFREE_ANXIETY",
        "type": "effect",
        "next": "73",
        "effects": [
          {
            "type": "adjustStat",
            "stat": "health",
            "amount": -3
          }
        ]
      },
      "68": {
        "id": "68",
        "label": "KIDS_START",
        "type": "effect",
        "next": "69",
        "effects": [
          {
            "type": "adjustStat",
            "stat": "health",
            "amount": -4
          },
          {
            "type": "adjustStat",
            "stat": "money",
            "amount": -6
          },
          {
            "type": "adjustStat",
            "stat": "time",
            "amount": -3
          }
        ]
      },
      "69": {
        "id": "69",
        "label": "KIDS_PRESSURE",
        "type": "effect",
        "next": "70",
        "effects": [
          {
            "type": "adjustStat",
            "stat": "health",
            "amount": -4
          },
          {
            "type": "adjustStat",
            "stat": "money",
            "amount": -6
          },
          {
            "type": "adjustStat",
            "stat": "time",
            "amount": -3
          }
        ]
      },
      "70": {
        "id": "70",
        "label": "KIDS_VILLAGE",
        "type": "draw",
        "next": "71",
        "deck": "life"
      },
      "71": {
        "id": "71",
        "label": "KIDS_GROW",
        "type": "effect",
        "next": "72",
        "effects": [
          {
            "type": "adjustStat",
            "stat": "happiness",
            "amount": 3
          },
          {
            "type": "adjustStat",
            "stat": "money",
            "amount": -4
          }
        ]
      },
      "72": {
        "id": "72",
        "label": "KIDS_COLLEGE",
        "type": "effect",
        "next": "73",
        "effects": [
          {
            "type": "adjustStat",
            "stat": "happiness",
            "amount": 3
          },
          {
            "type": "adjustStat",
            "stat": "time",
            "amount": 2
          },
          {
            "type": "adjustStat",
            "stat": "money",
            "amount": -4
          }
        ]
      },
      "73": {
        "id": "73",
        "label": "RETIRE",
        "type": "effect",
        "next": "74",
        "effects": [
          {
            "type": "setOccupation",
            "occupation": "retired"
          },
          {
            "type": "stopRecurring",
            "key": "childcare"
          },
          {
            "type": "log",
            "message": "You're entering retirement, there's no more income from your job."
          }
        ]
      },
      "74": {
        "id": "74",
        "label": "CRUISE_DECISION",
        "type": "choice",
        "next": "75",
        "choice": {
          "prompt": "Book the cruise or save for the future?",
          "options": [
            {
              "id": "CRUISE",
              "label": "Book the Cruise",
              "preview": "+3 Happiness, -4 Money",
              "effects": [
                {
                  "type": "adjustStat",
                  "stat": "happiness",
                  "amount": 3
                },
                {
                  "type": "adjustStat",
                  "stat": "money",
                  "amount": -4
                }
              ]
            },
            {
              "id": "SAVE",
              "label": "Save For The Future",
              "preview": "-4 Happiness, +3 Money",
              "effects": [
                {
                  "type": "adjustStat",
                  "stat": "happiness",
                  "amount": -4
                },
                {
                  "type": "adjustStat",
                  "stat": "money",
                  "amount": 3
                }
              ]
            }
          ]
        }
      },
      "75": {
        "id": "75",
        "label": "RETIRE_PLAN",
        "type": "draw",
        "next": "76",
        "deck": "life"
      },
      "76": {
        "id": "76",
        "label": "RETIRE_JACKPOT",
        "type": "effect",
        "next": "77",
        "effects": [
          {
            "type": "adjustStat",
            "stat": "money",
            "amount": 10
          }
        ]
      },
      "77": {
        "id": "77",
        "label": "END",
        "type": "finish"
      }
    }
  },
  "decks": {
    "era": [
      {
        "id": "era_1",
        "title": "Economic Boom",
        "text": "Opportunities surge across sectors.",
        "effects": [
          {
            "type": "adjustStat",
            "stat": "money",
            "amount": 3
          },
          {
            "type": "adjustStat",
            "stat": "experience",
            "amount": 1
          }
        ]
      },
      {
        "id": "era_2",
        "title": "Inflation Spike",
        "text": "Daily costs climb faster than wages.",
        "effects": [
          {
            "type": "adjustStat",
            "stat": "money",
            "amount": -2
          },
          {
            "type": "adjustStat",
            "stat": "happiness",
            "amount": -1
          }
        ]
      },
      {
        "id": "era_3",
        "title": "Tech Leap",
        "text": "Digital skills become highly rewarded.",
        "effects": [
          {
            "type": "adjustStat",
            "stat": "education",
            "amount": 1
          },
          {
            "type": "adjustStat",
            "stat": "experience",
            "amount": 1
          }
        ]
      },
      {
        "id": "era_4",
        "title": "Hiring Freeze",
        "text": "Teams shrink and promotions slow.",
        "effects": [
          {
            "type": "adjustStat",
            "stat": "money",
            "amount": -1
          },
          {
            "type": "adjustStat",
            "stat": "time",
            "amount": 1
          }
        ]
      },
      {
        "id": "era_5",
        "title": "Healthcare Innovation",
        "text": "Better care access improves wellbeing.",
        "effects": [
          {
            "type": "adjustStat",
            "stat": "health",
            "amount": 2
          }
        ]
      },
      {
        "id": "era_6",
        "title": "Credential Arms Race",
        "text": "Formal credentials dominate screening.",
        "effects": [
          {
            "type": "choice",
            "prompt": "How do you respond?",
            "options": [
              {
                "id": "retrain",
                "label": "Retrain",
                "preview": "Invest now for long-term edge.",
                "effects": [
                  {
                    "type": "adjustStat",
                    "stat": "money",
                    "amount": -2
                  },
                  {
                    "type": "adjustStat",
                    "stat": "education",
                    "amount": 2
                  }
                ]
              },
              {
                "id": "push_through",
                "label": "Push Through",
                "preview": "Save money but feel the pressure.",
                "effects": [
                  {
                    "type": "adjustStat",
                    "stat": "happiness",
                    "amount": -1
                  },
                  {
                    "type": "adjustStat",
                    "stat": "health",
                    "amount": -1
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        "id": "era_7",
        "title": "Remote Shift",
        "text": "Work location changes your daily rhythm.",
        "effects": [
          {
            "type": "adjustStat",
            "stat": "time",
            "amount": 1
          },
          {
            "type": "adjustStat",
            "stat": "happiness",
            "amount": 1
          }
        ]
      },
      {
        "id": "era_8",
        "title": "Policy Surprise",
        "text": "A sudden policy reform reshapes your plans.",
        "effects": [
          {
            "type": "moveBackSteps",
            "steps": 1
          },
          {
            "type": "adjustStat",
            "stat": "experience",
            "amount": 1
          }
        ]
      }
    ],
    "life": [
      {
        "id": "life_1",
        "title": "Family Support",
        "text": "Relatives step in to help this season.",
        "effects": [
          {
            "type": "adjustStat",
            "stat": "money",
            "amount": 2
          },
          {
            "type": "adjustStat",
            "stat": "time",
            "amount": 1
          }
        ]
      },
      {
        "id": "life_2",
        "title": "Unexpected Expense",
        "text": "A repair bill lands at the worst time.",
        "effects": [
          {
            "type": "adjustStat",
            "stat": "money",
            "amount": -3
          }
        ]
      },
      {
        "id": "life_3",
        "title": "Community Network",
        "text": "Connections open a better opportunity.",
        "effects": [
          {
            "type": "adjustStat",
            "stat": "experience",
            "amount": 1
          },
          {
            "type": "adjustStat",
            "stat": "happiness",
            "amount": 1
          }
        ]
      },
      {
        "id": "life_4",
        "title": "Burnout Warning",
        "text": "Your pace is unsustainable.",
        "effects": [
          {
            "type": "adjustStat",
            "stat": "health",
            "amount": -2
          },
          {
            "type": "adjustStat",
            "stat": "time",
            "amount": -1
          }
        ]
      },
      {
        "id": "life_5",
        "title": "Chance Windfall",
        "text": "A bonus, gift, or lucky break arrives.",
        "effects": [
          {
            "type": "adjustStat",
            "stat": "money",
            "amount": 4
          }
        ]
      },
      {
        "id": "life_6",
        "title": "Mentor Moment",
        "text": "Someone experienced gives practical guidance.",
        "effects": [
          {
            "type": "adjustStat",
            "stat": "education",
            "amount": 1
          },
          {
            "type": "adjustStat",
            "stat": "experience",
            "amount": 1
          }
        ]
      },
      {
        "id": "life_7",
        "title": "Geographic Move",
        "text": "Relocation changes your near-term trajectory.",
        "effects": [
          {
            "type": "moveToNode",
            "nodeId": "47"
          },
          {
            "type": "adjustStat",
            "stat": "happiness",
            "amount": -1
          }
        ]
      },
      {
        "id": "life_8",
        "title": "Reunion & Reflection",
        "text": "You reconnect with people and rethink priorities.",
        "effects": [
          {
            "type": "choice",
            "prompt": "What do you prioritize after reflecting?",
            "options": [
              {
                "id": "relationships",
                "label": "Relationships",
                "preview": "Nurture people around you.",
                "effects": [
                  {
                    "type": "adjustStat",
                    "stat": "happiness",
                    "amount": 2
                  },
                  {
                    "type": "adjustStat",
                    "stat": "time",
                    "amount": -1
                  }
                ]
              },
              {
                "id": "career",
                "label": "Career",
                "preview": "Double down on momentum.",
                "effects": [
                  {
                    "type": "adjustStat",
                    "stat": "money",
                    "amount": 2
                  },
                  {
                    "type": "adjustStat",
                    "stat": "health",
                    "amount": -1
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  }
};
