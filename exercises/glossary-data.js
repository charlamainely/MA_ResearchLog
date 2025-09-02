// glossary-data.js 

const glossaryData = [
    // --- Media & Design ---
    { word: "Media Archaeology", groups: ["Media & Design"], messages: [
        { type: "incoming", content: "Media archaeology studies forgotten, obsolete, or alternative media histories." },
        { type: "outgoing", content: "It emphasizes nonlinear histories and overlooked technologies." }
    ]},
    { word: "Platform Studies", groups: ["Media & Design"], messages: [
        { type: "incoming", content: "Platform studies examines how hardware and software platforms shape media forms." },
        { type: "outgoing", content: "It is useful for analyzing Flash as both a tool and cultural phenomenon." }
    ]},
    { word: "Digital Obsolescence", groups: ["Media & Design"], messages: [
        { type: "incoming", content: "Digital obsolescence occurs when technologies, file formats, or platforms become inaccessible." },
        { type: "outgoing", content: "This is a central challenge to digital media preservation." }
    ]},
    { word: "Archival Practices", groups: ["Media & Design", "Digital Heritage & Preservation"], messages: [
        { type: "incoming", content: "Archival practices are methods of preserving digital works through migration, emulation, or reinterpretation." },
        { type: "outgoing", content: "They ensure access to fragile or obsolete digital artifacts." },
        { type: "outgoing", content: "You can read more about it here: <a href='https://blog.castac.org/2015/06/art-of-archive/' target='_blank'>The Art of the Archive</a>." },
    ]},
    { word: "Emulation", groups: ["Media & Design", "Digital Heritage & Preservation"], messages: [
        { type: "incoming", content: "Emulation replicates older software or hardware environments on modern systems." },
        { type: "outgoing", content: "Projects like Ruffle emulate Flash to keep games playable." }
    ]},
    { word: "Flash Media", groups: ["Media & Design", "Digital Heritage & Preservation"], messages: [
        { type: "incoming", content: "Flash media refers to animations, web cartoons, and games created with Macromedia Flash/Adobe Animate." },
        { type: "outgoing", content: "It defined early internet interactivity until its discontinuation in 2020." }
    ]},
    { word: "Flash Games", groups: ["Media & Design", "Memory & Affect", "Digital Heritage & Preservation"], messages: [
        { type: "incoming", content: "Flash games were browser-based games central to early internet culture." },
        { type: "outgoing", content: "They hold both nostalgic and cultural heritage value." },
        { type: "incoming", content: "Here's an example!<img src=\"https://www.cnet.com/a/img/resize/6d84c4105b98e5c68f9e2c33cc266c0aca589129/hub/2008/05/22/1b92b71c-cbf2-11e2-9a4a-0291187b029a/growcube.jpg?auto=webp&width=1200\">"},
        { type: "outgoing", content: "Oh I loved this game!!!" },
    ]},
    { word: "Flash Aesthetics", groups: ["Media & Design"], messages: [
        { type: "incoming", content: "Flash aesthetics include bold vector graphics, tween animations, and quirky interactions." },
        { type: "outgoing", content: "They are instantly recognizable design tropes of the early internet." },
        { type: "outgoing", content: "<img src='https://preview.redd.it/games-reminiscent-of-early-2000s-girly-flash-games-v0-sqamuo7soiib1.jpg?width=828&format=pjpg&auto=webp&s=33f85c351ffdf533d70a4cd86c37101e0de525c0'>" }
    ]},
    { word: "Macromedia Flash / Adobe Animate", groups: ["Media & Design"], messages: [
        { type: "incoming", content: "Macromedia Flash, later Adobe Animate, was the primary tool for creating Flash media." },
        { type: "outgoing", content: "It enabled creators to combine animation with interactivity." }
    ]},
    { word: "Unity", groups: ["Media & Design"], messages: [
        { type: "incoming", content: "Unity is a game engine often used to re-create or emulate Flash-style experiences." },
        { type: "outgoing", content: "It connects obsolete Flash mechanics to modern platforms." }
    ]},
    { word: "Game Design", groups: ["Media & Design"], messages: [
        { type: "incoming", content: "Game design is the process of crafting rules, systems, and player experiences." },
        { type: "outgoing", content: "It includes both technical and creative decision-making." }
    ]},
    { word: "Game Mechanics", groups: ["Media & Design"], messages: [
        { type: "incoming", content: "Game mechanics are the individual rules or actions available to players." },
        { type: "outgoing", content: "Examples include jumping, scoring, or collecting items." }
    ]},
    { word: "Game Dynamics", groups: ["Media & Design"], messages: [
        { type: "incoming", content: "Game dynamics are the emergent behaviors that arise when players interact with mechanics." },
        { type: "outgoing", content: "They describe how games actually 'feel' in play." }
    ]},
    { word: "Game Loop", groups: ["Media & Design"], messages: [
        { type: "incoming", content: "A game loop is the core cycle of play: act → feedback → repeat." },
        { type: "outgoing", content: "It keeps players engaged through repetition and iteration." },
        {type:"incoming", content: "<img src='https://mobilefreetoplay.com/wp-content/uploads/2017/12/crafting-a-strong-core-loop-1.png'> Something like this."}
    ]},
    { word: "Flow State", groups: ["Media & Design", "Memory & Affect"], messages: [
        { type: "incoming", content: "Flow state is a psychological state of deep focus when challenge matches skill." },
        { type: "outgoing", content: "Games often aim to guide players into flow for immersion." },
        {type: "outgoing", content:"<img src='https://miro.medium.com/v2/resize:fit:1280/1*iSwE-Uu466fqkltHDiz6kw.jpeg'"}
    ]},
    { word: "UI/UX Design", groups: ["Media & Design"], messages: [
        { type: "incoming", content: "UI/UX design is the creation of user interfaces and experiences that prioritize usability." },
        { type: "outgoing", content: "For games, this includes menus, feedback systems, and navigation." }
    ]},
    { word: "UI Aesthetics", groups: ["Media & Design"], messages: [
        { type: "incoming", content: "UI aesthetics are the stylistic qualities of user interfaces." },
        { type: "outgoing", content: "Flash-era games often featured bright colors and playful UI design." },
        {type:"outgoing", content:"<img src='https://girlsgogamescdn.com/assets/girlsgogames/og_image-44dfad3079fdbc435203c47c96573be0de683beba84fa7ab80679dcada0e79b1.jpg'>"}
    ]},
    { word: "Accessibility (Games)", groups: ["Media & Design"], messages: [
        { type: "incoming", content: "Game accessibility refers to how easily players of different abilities can engage with a game." },
        { type: "outgoing", content: "It includes inclusive design and technical ease of access." }
    ]},
    { word: "Net Art", groups: ["Media & Design"], messages: [
        { type: "incoming", content: "Net art is digital art made for and experienced on the internet." },
        { type: "outgoing", content: "Many Flash works are considered early net art." },
        {type:"incoming", content:"Here's an example! <br> <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTU1xgKQvhCeVfNkCwVT0tlAYdwyrHlgR0nsA&s'>"}
    ]},
    { word: "Indie Game Development", groups: ["Media & Design"], messages: [
        { type: "incoming", content: "Indie game development refers to small-scale, often experimental game creation." },
        { type: "outgoing", content: "Flash was a platform that empowered early indie developers." },
        {type:"incoming", content:"Here's my favourite! <img src='https://gmedia.playstation.com/is/image/SIEPDC/cuphead-keyart-01-en-15dec21?$native$'>"}
    ]},
    { word: "Gamification", groups: ["Media & Design", "Memory & Affect"], messages: [
        { type: "incoming", content: "Gamification uses game mechanics in non-game contexts to increase engagement." },
        { type: "outgoing", content: "It blends design strategies with emotional motivation." }
    ]},
    { word: "Playfulness", groups: ["Media & Design", "Memory & Affect"], messages: [
        { type: "incoming", content: "Playfulness is an attitude of experimentation and lightheartedness in interaction." },
        { type: "outgoing", content: "It connects nostalgic engagement with design practice." }
    ]},

    // --- Memory & Affect ---
    { word: "Nostalgia", groups: ["Memory & Affect"], messages: [
        { type: "incoming", content: "Nostalgia is a sentimental longing for the past, often triggered by cultural artifacts." },
        { type: "outgoing", content: "It is a central affective driver of cultural preservation." }
    ]},
    { word: "Second-hand Nostalgia", groups: ["Memory & Affect"], messages: [
        { type: "incoming", content: "Second-hand nostalgia is nostalgia for a time not personally experienced, mediated through media." },
        { type: "outgoing", content: "Gen Z often experiences this with Flash-era content." }
    ]},
    { word: "Digital Mourning", groups: ["Memory & Affect", "Digital Heritage & Preservation"], messages: [
        { type: "incoming", content: "Digital mourning is the grief felt when online platforms or media vanish." },
        { type: "outgoing", content: "It is expressed in forums, memes, and online communities." },
        {type:"incoming", content:"RIP MySpace :( <img src='https://cdn.mos.cms.futurecdn.net/U9ad4qfo8wwvMEETt58MR.jpg'>"}
    ]},
    { word: "Memory", groups: ["Memory & Affect", "Digital Heritage & Preservation"], messages: [
        { type: "incoming", content: "Memory is both individual recollection and shared cultural remembrance tied to media." },
        { type: "outgoing", content: "Digital artifacts help encode generational memory." }
    ]},
    { word: "Cultural Memory", groups: ["Memory & Affect", "Digital Heritage & Preservation"], messages: [
        { type: "incoming", content: "Cultural memory is shared remembrance across groups, often tied to media." },
        { type: "outgoing", content: "Flash culture is a prime example of digital cultural memory." },
        { type: "incoming", content: "So how is cultural memory different from collective memory?"},
        { type: "outgoing", content:"Collective memory focuses on the content and process of shared remembrance, often within a limited time span,"},
        { type: "outgoing", content:"whereas cultural memory emphasizes the methods (like rituals, artifacts, and narratives)"},
        { type: "outgoing", content:"and longer-term, stabilized stability needed to maintain a collective identity and understanding of the past."},
        { type: "incoming", content: "Ah got it!"},
    ]},
    { word: "Autobiographical Memory", groups: ["Memory & Affect"], messages: [
        { type: "incoming", content: "Autobiographical memory refers to recollection of personal life events." },
        { type: "outgoing", content: "Flash games often connect to early autobiographical memories of internet use." }
    ]},
    { word: "Procedural Memory", groups: ["Memory & Affect"], messages: [
        { type: "incoming", content: "Procedural memory is the 'muscle memory' of learned skills." },
        { type: "outgoing", content: "Game play patterns often encode as procedural memory." }
    ]},
    { word: "Sensory Memory", groups: ["Memory & Affect"], messages: [
        { type: "incoming", content: "Sensory memory briefly retains impressions of stimuli like visuals or sounds." },
        { type: "outgoing", content: "Sounds or visuals from Flash games can trigger nostalgia." }
    ]},
    { word: "Impressionable Years Hypothesis", groups: ["Memory & Affect"], messages: [
        { type: "incoming", content: "The impressionable years hypothesis suggests adolescence is particularly formative for memory." },
        { type: "outgoing", content: "This explains why early media strongly shapes nostalgia." },
        {type: "incoming", content:" <a href='https://en.wikipedia.org/wiki/Impressionable_years_hypothesis' target='_blank'>Did you read about it here?</a>"}
    ]},
    { word: "Critical Periods (Memory)", groups: ["Memory & Affect"], messages: [
        { type: "incoming", content: "Critical periods are developmental stages when experiences are more likely to be encoded as long-term memory." },
        { type: "outgoing", content: "Early internet experiences often coincide with such periods." },
        {type:"incoming", content:"During these periods, the brain is highly plastic, forming crucial connections that can have lifelong impacts on learning and behavior."}
    ]},
    { word: "Encoding Specificity", groups: ["Memory & Affect"], messages: [
        { type: "incoming", content: "Encoding specificity means recall is stronger when context at retrieval matches context at encoding." },
        { type: "outgoing", content: "Old interfaces and music can act as cues for nostalgia." },
        { type: "incoming", content: "I always miss my mom when I smell apple pie .-. She made the best pies..." },
        { type: "outgoing", content: "Yeah kinda like that." },
    ]},
    { word: "Reminiscence Bump", groups: ["Memory & Affect"], messages: [
        { type: "incoming", content: "The reminiscence bump is the tendency to recall more memories from adolescence and early adulthood." },
        { type: "outgoing", content: "This is why teenage media consumption creates strong nostalgia." }
    ]},
    { word: "Affective Resonance", groups: ["Memory & Affect"], messages: [
        { type: "incoming", content: "Affective resonance is the emotional impact media has on its audience." },
        { type: "outgoing", content: "It is key to nostalgic attachment." }
    ]},
    { word: "Emotional Design", groups: ["Memory & Affect"], messages: [
        { type: "incoming", content: "Emotional design focuses on eliciting feelings and moods in interaction." },
        { type: "outgoing", content: "It fosters affective attachment to digital works." }
    ]},
    { word: "Parasocial Relationships", groups: ["Memory & Affect"], messages: [
        { type: "incoming", content: "Parasocial relationships are one-sided emotional bonds with media figures." },
        { type: "outgoing", content: "These often form around Flash animations and characters." }
    ]},
    { word: "Time Capsule Media", groups: ["Memory & Affect"], messages: [
        { type: "incoming", content: "Time capsule media preserve a cultural moment in digital form." },
        { type: "outgoing", content: "Flash game portals are an example of digital time capsules." },
        { type: "incoming", content: "So... should we bury them?" },
        { type: "outgoing", content: "They're DIGITAL!" },
        { type: "incoming", content: "Oh right." },
    ]},
    { word: "Collective Imagination", groups: ["Memory & Affect"], messages: [
        { type: "incoming", content: "Collective imagination refers to shared dreamscapes or visions within a generation." },
        { type: "outgoing", content: "Flash culture contributed to the collective imagination of early internet users." }
    ]},
    { word: "Generation Z", groups: ["Memory & Affect"], messages: [
        { type: "incoming", content: "Generation Z refers to the cohort born roughly between 1997–2012." },
        { type: "incoming", content: "Hey! That's me!!" },
        { type: "outgoing", content: "They often engage with Flash-era content through second-hand nostalgia." },
        { type: "incoming", content: "What's that?" },
    ]},

    // --- Digital Heritage & Preservation ---
    { word: "Heritage", groups: ["Digital Heritage & Preservation"], messages: [
        { type: "incoming", content: "Heritage refers to cultural inheritance, both tangible and intangible." },
        { type: "outgoing", content: "Digital works are increasingly recognized as heritage." }
    ]},
    { word: "Intangible Culture", groups: ["Digital Heritage & Preservation"], messages: [
        { type: "incoming", content: "Intangible culture includes practices, rituals, or traditions that are not physical objects." },
        { type: "outgoing", content: "Digital rituals and online practices are part of intangible culture." }
    ]},
    { word: "Digital Heritage", groups: ["Digital Heritage & Preservation"], messages: [
        { type: "incoming", content: "Digital heritage is cultural material preserved in digital form." },
        { type: "outgoing", content: "It includes both born-digital and digitized works." }
    ]},
    { word: "Born-Digital Heritage", groups: ["Digital Heritage & Preservation"], messages: [
        { type: "incoming", content: "Born-digital heritage refers to cultural works originally created in digital form." },
        { type: "outgoing", content: "Flash games are examples of born-digital heritage." },
        { type: "incoming", content:" <a href='https://ieeexplore.ieee.org/document/5236324' target='_blank'>HERE'S</a> an example of born-digital cultural heritage being preserved. "},
        
    ]},
    { word: "Migration vs. Emulation", groups: ["Digital Heritage & Preservation"], messages: [
        { type: "incoming", content: "Migration updates files to newer formats, while emulation replicates old environments." },
        { type: "outgoing", content: "Both are strategies in digital preservation." }
    ]},
    { word: "Authenticity in Preservation", groups: ["Digital Heritage & Preservation"], messages: [
        { type: "incoming", content: "Authenticity in preservation asks whether digital works should be faithfully preserved or reinterpreted." },
        { type: "outgoing", content: "This debate affects Flash preservation projects." }
    ]},
    { word: "Living Archives", groups: ["Digital Heritage & Preservation", "Memory & Affect"], messages: [
        { type: "incoming", content: "Living archives are evolving repositories shaped by user participation." },
        { type: "outgoing", content: "They blur the line between archive, memory, and play." },
        { type: "incoming", content: "One example is the Serendepity Living Archive <img src='https://www.serendipity-uk.com/wp-content/uploads/2022/12/Serendipity_logo_BW_2024-2.png'>" },
    ]},
    { word: "Digital Curation", groups: ["Digital Heritage & Preservation"], messages: [
        { type: "incoming", content: "Digital curation is the professional management and presentation of digital collections." },
        { type: "outgoing", content: "It ensures accessibility and contextualization of preserved media." }
    ]},
    { word: "Transmedia Preservation", groups: ["Digital Heritage & Preservation"], messages: [
        { type: "incoming", content: "Transmedia preservation uses multiple media formats to sustain cultural narratives." },
        { type: "outgoing", content: "It keeps heritage accessible across diverse platforms." }
    ]},
    { word: "Open-Access Archives", groups: ["Digital Heritage & Preservation"], messages: [
        { type: "incoming", content: "Open-access archives are freely available repositories of digital artifacts." },
        { type: "outgoing", content: "They democratize preservation by inviting community contributions." }
    ]},
    { word: "Cultural Preservation", groups: ["Digital Heritage & Preservation"], messages: [
        { type: "incoming", content: "Cultural preservation safeguards practices, traditions, and artifacts for future generations." },
        { type: "outgoing", content: "In the digital age, it extends to websites, games, and online rituals." }
    ]},
    { word: "Crowdsourced Preservation", groups: ["Digital Heritage & Preservation"], messages: [
        { type: "incoming", content: "Crowdsourced preservation involves communities collectively archiving and saving digital works." },
        { type: "outgoing", content: "Flashpoint is an example of such collective preservation." }
    ]},
    { word: "Community Archives", groups: ["Digital Heritage & Preservation"], messages: [
        { type: "incoming", content: "Community archives are grassroots efforts to preserve cultural heritage outside official institutions." },
        { type: "outgoing", content: "They often emerge around niche digital media." }
    ]},

    // --- Internet & Platform Culture ---
    { word: "Web 1.0 / Web 2.0", groups: ["Internet & Platform Culture"], messages: [
        { type: "incoming", content: "Web 1.0 was the static early internet, while Web 2.0 introduced interactivity and user-generated content." },
        { type: "outgoing", content: "Flash thrived during the Web 1.0 → 2.0 transition." }
    ]},
    { word: "Internet Browser Compatibility", groups: ["Internet & Platform Culture"], messages: [
        { type: "incoming", content: "Browser compatibility issues often determined the survival of web media." },
        { type: "outgoing", content: "Flash eventually fell due to security and compatibility concerns." }
    ]},
    { word: "Security Vulnerability", groups: ["Internet & Platform Culture"], messages: [
        { type: "incoming", content: "Flash was notorious for security flaws, including malware and exploits." },
        { type: "outgoing", content: "This was one reason for its discontinuation." }
    ]},
    { word: "Ephemeral Platforms", groups: ["Internet & Platform Culture"], messages: [
        { type: "incoming", content: "Ephemeral platforms are online services that disappear quickly, like Geocities or MySpace." },
        { type: "outgoing", content: "Their loss contributes to digital heritage gaps." },
        { type: "outgoing", content: "What's MySpace?" }
    ]},
    { word: "Platform Closure", groups: ["Internet & Platform Culture"], messages: [
        { type: "incoming", content: "Platform closure happens when companies discontinue services or stores." },
        { type: "outgoing", content: "Examples include the Nintendo eShop and Flash Player shutdown." }
    ]},
    { word: "Digital Culture", groups: ["Internet & Platform Culture", "Digital Heritage & Preservation"], messages: [
        { type: "incoming", content: "Digital culture encompasses online practices, identities, and communities." },
        { type: "outgoing", content: "It forms the context for both nostalgia and preservation." }
    ]},
    { word: "Participatory Culture", groups: ["Internet & Platform Culture"], messages: [
        { type: "incoming", content: "Participatory culture involves fans and users as co-creators and preservers of media." },
        { type: "outgoing", content: "Flash communities exemplified participatory culture." }
    ]},
    { word: "Promotion via Digital Platforms", groups: ["Internet & Platform Culture", "Digital Heritage & Preservation"], messages: [
        { type: "incoming", content: "Promotion via digital platforms involves sharing and circulating heritage works online." },
        { type: "outgoing", content: "It expands preservation through visibility and access." }
    ]},

    // --- Activism & Industry Debates ---
    { word: "Game Preservation", groups: ["Activism & Industry Debates"], messages: [
        { type: "incoming", content: "Game preservation is the effort to archive, document, and keep video games playable." },
        { type: "outgoing", content: "It intersects with cultural preservation and digital heritage." }
    ]},
    { word: "'Stop Killing Games' Movement", groups: ["Activism & Industry Debates"], messages: [
        { type: "incoming", content: "The 'Stop Killing Games' movement protests against shutting down online-only titles." },
        { type: "outgoing", content: "It highlights the fragility of digital ownership and preservation." },
        { type: "outgoing", content: "<img src='https://indiecator.org/wp-content/uploads/2025/07/stop-killing-games.jpg?w=1280'>"},
    ]},
    { word: "Digital Dark Age", groups: ["Activism & Industry Debates","Internet & Platform Culture"], messages: [
        { type: "incoming", content: "The digital dark age refers to the potential loss of vast amounts of digital history due to obsolescence." },
        { type: "outgoing", content: "Scholars warn this could erase decades of cultural production." }
    ]},
    { word: "Digital Ownership", groups: ["Activism & Industry Debates","Internet & Platform Culture"], messages: [
        { type: "incoming", content: "Digital ownership refers to having verifiable rights, control, and ownership over digital assets like virtual goods, music, and art." },
        { type: "outgoing", content: "Moving beyond simply having access or a license." },
        { type: "outgoing", content: "Do you really own the games that you buy?" }
    ]},
    { word: "Access vs. Ownership", groups: ["Activism & Industry Debates","Digital Heritage & Preservation"], messages: [
        { type: "incoming", content: "Access vs. ownership debates concern whether digital media users truly 'own' what they buy." },
        { type: "outgoing", content: "Platform closures expose the fragility of digital ownership." },
        { type: "outgoing", content: "Companies can decide to stop hosting games user already purchased, and there's nothing stopping them to do so." },
        { type: "incoming", content: "They can do WHAT?! But I paid $40 for that!!!"}
    ]},
    { word: "Archival Activism", groups: ["Activism & Industry Debates"], messages: [
        { type: "incoming", content: "Archival activism is grassroots preservation work by communities when institutions fail." },
        { type: "outgoing", content: "It is central to saving Flash and niche internet media." }
    ]},
    { word: "Open-Source Preservation", groups: ["Activism & Industry Debates","Internet & Platform Culture"], messages: [
        { type: "incoming", content: "Open-source preservation uses community-built software like emulators to save digital media." },
        { type: "outgoing", content: "It democratizes preservation outside corporate control." }
    ]},

    // --- Bridging Concepts ---
    { word: "Preservation through Play", groups: ["Activism & Industry Debates","Media & Design", "Memory & Affect", "Digital Heritage & Preservation"], messages: [
        { type: "incoming", content: "Preservation through play is sustaining digital heritage by keeping it interactive." },
        { type: "outgoing", content: "It treats gameplay as an archival practice." }
    ]},
    { word: "Interactive Design", groups: ["Media & Design", "Memory & Affect", "Digital Heritage & Preservation"], messages: [
        { type: "incoming", content: "Interactive design creates systems that respond to user input." },
        { type: "outgoing", content: "It connects technical craft, emotional impact, and cultural storytelling." }
    ]},
    { word: "Playable Nostalgia", groups: ["Media & Design", "Memory & Affect", "Digital Heritage & Preservation"], messages: [
        { type: "incoming", content: "Playable nostalgia is evoking memory and emotion through interactive, game-like experiences." },
        { type: "outgoing", content: "It bridges technology, affect, and heritage preservation." },
        {type:"incoming", content:"This can involve re-releasing old games, creating modern games with classic aesthetics, or even building dedicated experiential pop-up events focused on toys and childhood memories"}
    ]}
];
