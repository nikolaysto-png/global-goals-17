/* Official UN Sustainable Development Goals — full dataset with targets */
const SDG_GOALS = [
  {
    num: 1, title: "No Poverty", color: "#E5243B", icon: "🏠",
    tagline: "End poverty in all its forms everywhere.",
    desc: "More than 700 million people live in extreme poverty, surviving on less than $2.15 a day. Goal 1 commits to eradicating destitution by ensuring social protection, equal access to resources and resilience against shocks.",
    stats: [{ v: "700M+", l: "people in extreme poverty" }, { v: "⅔", l: "of them live in protracted crisis zones" }],
    targets: ["Eradicate extreme poverty for all people everywhere (3.1)", "Implement social protection systems for all (3.2)", "Equal rights to economic resources, basic services, ownership and control over land (3.a)", "Build resilience of the poor and those in vulnerable situations (3.c)"]
  },
  {
    num: 2, title: "Zero Hunger", color: "#DDA63A", icon: "🌾",
    tagline: "End hunger, achieve food security and improved nutrition.",
    desc: "Nearly 800 million people go to bed hungry each night while obesity is rising. Goal 2 seeks to double agricultural productivity for small-scale food producers and sustainably manage food production systems.",
    stats: [{ v: "735M", l: "undernourished people" }, { v: "22%", l: "of children under 5 stunted" }],
    targets: ["End hunger and ensure access to safe, nutritious food (2.1)", "End all forms of malnutrition (2.2)", "Double agricultural productivity & incomes of small-scale food producers (2.3)", "Ensure sustainable food production systems (2.4)"]
  },
  {
    num: 3, title: "Good Health & Well-Being", color: "#26B88B", icon: "❤️",
    tagline: "Ensure healthy lives and promote well-being for all at all ages.",
    desc: "Healthier lives are central to sustainable development. Goal 3 focuses on reducing maternal mortality, ending epidemics like AIDS and malaria, achieving universal health coverage and cutting deaths from pollution.",
    stats: [{ v: "2B", l: "lack essential health services" }, { v: "7M", l: "premature deaths from air pollution / yr" }],
    targets: ["Reduce global maternal mortality ratio (3.1)", "End preventable deaths of newborns and children under 5 (3.2)", "End the epidemics of AIDS, tuberculosis, malaria (3.3)", "Achieve universal health coverage (3.8)", "Substantially reduce deaths from hazardous chemicals & air pollution (3.9)"]
  },
  {
    num: 4, title: "Quality Education", color: "#C5192D", icon: "📚",
    tagline: "Ensure inclusive and equitable quality education and promote lifelong learning.",
    desc: "Education is an engine for development. Goal 4 aims to eliminate gender disparities, ensure equal access for the vulnerable, and substantially increase the supply of qualified teachers.",
    stats: [{ v: "250M", l: "children out of school" }, { v: "763M", l: "adults lack basic literacy" }],
    targets: ["Ensure all learners achieve literacy and numeracy (4.6)", "Eliminate gender disparities in education (4.5)", "Increase the number of youth with relevant skills for employment (4.4)", "Substantially increase supply of qualified teachers (4.c)"]
  },
  {
    num: 5, title: "Gender Equality", color: "#FF3A2C", icon: "⚖️",
    tagline: "Achieve gender equality and empower all women and girls.",
    desc: "One half of humanity still lacks equal rights and opportunities. Goal 5 tackles discrimination, violence and harmful practices, ensures full participation and equal opportunity for leadership.",
    stats: [{ v: "1 in 3", l: "women experience physical/sexual violence" }, { v: "26%", l: "of parliamentarians are women" }],
    targets: ["End all forms of discrimination against women & girls (5.1)", "Eliminate all violence against women & girls (5.2)", "Eliminate child marriage and FGM (5.3)", "Ensure women's full participation in leadership (5.5)", "Universal access to reproductive health (5.6)"]
  },
  {
    num: 6, title: "Clean Water & Sanitation", color: "#26BDE2", icon: "💧",
    tagline: "Ensure availability and sustainable management of water and sanitation for all.",
    desc: "Billions lack safely managed drinking water and sanitation. Goal 6 increases water-use efficiency, protects ecosystems and expands international cooperation on water-related challenges.",
    stats: [{ v: "2B", l: "people without safely managed water" }, { v: "80%", l: "of wastewater returns untreated" }],
    targets: ["Achieve universal access to safe drinking water (6.1)", "Achieve access to adequate sanitation & hygiene (6.2)", "Improve water quality, reduce pollution (6.3)", "Ensure sustainable freshwater withdrawals (6.4)", "Protect and restore water-related ecosystems (6.6)"]
  },
  {
    num: 7, title: "Affordable & Clean Energy", color: "#FCC30B", icon: "⚡",
    tagline: "Ensure access to affordable, reliable, sustainable and modern energy for all.",
    desc: "Energy access drives progress. Goal 7 expands renewable energy share, doubles the rate of energy-efficiency improvement and mobilises investment in clean-energy technology.",
    stats: [{ v: "685M", l: "without electricity access" }, { v: "2.6B", l: "cook with polluting fuels" }],
    targets: ["Ensure universal access to affordable energy services (7.1)", "Increase substantially the share of renewables (7.2)", "Double the global rate of improvement in energy efficiency (7.3)", "Enhance international cooperation on clean energy research (7.a)"]
  },
  {
    num: 8, title: "Decent Work & Economic Growth", color: "#A21942", icon: "📈",
    tagline: "Promote sustained, inclusive and sustainable economic growth, full and productive employment.",
    desc: "Goal 8 calls for higher productivity through innovation, decent jobs for all, eradication of forced labour and modern slavery, and protection of labour rights.",
    stats: [{ v: "3.6B", l: "people lack decent work opportunities" }, { v: "50M+", l: "still living in modern slavery" }],
    targets: ["Sustain per-capita economic growth (8.1)", "Achieve full and productive employment & decent work (8.5)", "Eradicate forced labour, modern slavery & trafficking (8.7)", "Protect labour rights and promote safe working environments (8.8)"]
  },
  {
    num: 9, title: "Industry, Innovation & Infrastructure", color: "#FD6925", icon: "🏗️",
    tagline: "Build resilient infrastructure, promote inclusive and sustainable industrialization and foster innovation.",
    desc: "Investing in infrastructure and innovation creates new jobs and drives economic growth. Goal 9 supports industries in developing countries and bridges the digital divide.",
    stats: [{ v: "2.7B", l: "people still offline" }, { v: "$1T+", l: "annual infrastructure gap in developing nations" }],
    targets: ["Develop sustainable, resilient infrastructure (9.1)", "Promote inclusive industrialization (9.2)", "Increase access of small enterprises to financial services (9.3)", "Significantly increase access to ICT (9.c)"]
  },
  {
    num: 10, title: "Reduced Inequalities", color: "#E97CA1", icon: "🤝",
    tagline: "Reduce inequality within and among countries.",
    desc: "The pandemic widened gaps. Goal 10 empowers and promotes inclusion, eliminates discriminatory laws and policies, and improves regulation of global financial institutions.",
    stats: [{ v: "Top 1%", l: "captured 38% of new wealth" }, { v: "60%", l: "of countries reduced income inequality pre-2020" }],
    targets: ["Progressively sustain income growth of the bottom 40% (10.1)", "Empower and promote inclusion (10.2)", "Ensure equal opportunity (10.3)", "Adopt fiscal & social policies to reduce inequality (10.4)"]
  },
  {
    num: 11, title: "Sustainable Cities & Communities", color: "#FC9D24", icon: "🏙️",
    tagline: "Make cities and human settlements inclusive, safe, resilient and sustainable.",
    desc: "By 2050, 68% of humanity will live in cities. Goal 11 provides access to safe housing and transport, reduces urban environmental impact and protects cultural heritage.",
    stats: [{ v: "1B+", l: "live in slums" }, { v: "90%", l: "urban dwellers breathe unsafe air" }],
    targets: ["Ensure access to adequate, safe housing (11.1)", "Access to safe, affordable transport systems (11.2)", "Strengthen inclusive urbanization (11.3)", "Reduce urban environmental impact, focus on air quality (11.6)", "Universal access to green public spaces (11.7)"]
  },
  {
    num: 12, title: "Responsible Consumption & Production", color: "#94C800", icon: "♻️",
    tagline: "Ensure sustainable consumption and production patterns.",
    desc: "We use natural resources as if we had 1.7 Earths. Goal 12 halves global food waste, manages chemicals and waste responsibly and curbs unsustainable subsidies.",
    stats: [{ v: "⅓", l: "of food produced is lost or wasted" }, { v: "50Mt", l: "of e-waste generated yearly" }],
    targets: ["Achieve sustainable management of natural resources (12.2)", "Halve per-capita global food waste (12.3)", "Environmentally sound management of chemicals & wastes (12.4)", "Rationalize inefficient fossil-fuel subsidies (12.c)"]
  },
  {
    num: 13, title: "Climate Action", color: "#107E41", icon: "🌍",
    tagline: "Take urgent action to combat climate change and its impacts.",
    desc: "Climate change is the defining challenge of our time. Goal 13 strengthens resilience, integrates climate measures into policy and honours finance commitments for developing nations.",
    stats: [{ v: "+1.2°C", l: "warming above pre-industrial levels" }, { v: "90%", l: "of disasters are weather-related" }],
    targets: ["Strengthen resilience to climate-related hazards (13.1)", "Integrate climate measures into national policies (13.2)", "Improve education and awareness on mitigation (13.3)", "Implement the UNFCCC commitment on climate finance (13.a)"]
  },
  {
    num: 14, title: "Life Below Water", color: "#0693E3", icon: "🐟",
    tagline: "Conserve and sustainably use the oceans, seas and marine resources.",
    desc: "The ocean regulates our climate and feeds billions. Goal 14 prevents marine pollution, ends overfishing, protects coastal ecosystems and counters ocean acidification.",
    stats: [{ v: "8M+ t", l: "of plastic enter the ocean each year" }, { v: "34%", l: "of fish stocks are overfished" }],
    targets: ["Prevent marine pollution, esp. plastics (14.1)", "Protect marine & coastal ecosystems (14.2)", "Minimize ocean acidification (14.3)", "End overfishing and illegal fishing (14.4)", "Conserve at least 10% of coastal & marine areas (14.5)"]
  },
  {
    num: 15, title: "Life On Land", color: "#3F7E44", icon: "🌳",
    tagline: "Protect, restore and promote sustainable use of terrestrial ecosystems.",
    desc: "Forests cover 30% of the planet and millions depend on them. Goal 15 combats desertification, halts biodiversity loss and stops poaching and trafficking of protected species.",
    stats: [{ v: "10M ha", l: "of forest lost every year" }, { v: "1M", l: "species threatened with extinction" }],
    targets: ["Ensure sustainable management of forests (15.2)", "Combat desertification & halt land degradation (15.3)", "Ensure conservation of mountain ecosystems (15.4)", "Halt loss of biodiversity (15.5)", "End poaching & trafficking of protected species (15.7)"]
  },
  {
    num: 16, title: "Peace, Justice & Strong Institutions", color: "#00689D", icon: "🕊️",
    tagline: "Promote peaceful and inclusive societies, provide access to justice for all.",
    desc: "Every year 189 million children experience violent discipline. Goal 16 reduces all forms of violence, ensures equal access to justice, and builds effective, accountable institutions.",
    stats: [{ v: "189M", l: "children affected by violence yearly" }, { v: "¼", l: "of births not registered for children of the poorest" }],
    targets: ["Significantly reduce all forms of violence (16.1)", "End abuse, exploitation & trafficking of children (16.2)", "Promote rule of law & equal access to justice (16.3)", "Ensure transparent, accountable institutions (16.6)", "Ensure public, accessible information & fundamental freedoms (16.10)"]
  },
  {
    num: 17, title: "Partnerships For The Goals", color: "#19486A", icon: "🔗",
    tagline: "Strengthen the means of implementation and revitalize the Global Partnership.",
    desc: "None of these goals can be met alone. Goal 17 strengthens North-South cooperation, fair trade, debt sustainability and access to science, technology and the internet.",
    stats: [{ v: "0.33%", l: "average ODA-to-GNI of donors" }, { v: "46%", l: "of LDCs need debt relief" }],
    targets: ["Strengthen domestic resource mobilization (17.1)", "Develop favourable international economic system (17.10)", "Enhance global macroeconomic stability (17.11)", "Boost exports of developing countries (17.17)", "Fully operationalize the multilateral trading system (17.15)"]
  }
];
