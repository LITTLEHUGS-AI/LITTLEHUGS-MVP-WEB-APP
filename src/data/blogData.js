// src/data/blogData.js
// LittleHugs blog — everyday wellness for women.
// Voice: warm, adult, non-clinical, British English. Lead with her, not the technology.
// Each post is structured into blocks so it renders cleanly and stays human and scannable.

export const SITE_URL = "https://www.littlehugs.online";

export const blogAuthor = {
  name: "The LittleHugs Team",
  bio: "LittleHugs is a quiet daily check-in for women who hold everything together for everyone else. We write about noticing how you're really doing — gently, and without the lecture.",
};

// Block helpers (kept inline as plain objects):
//  { type: 'p', text }            paragraph
//  { type: 'h2', text }           section heading (phrased like a real question/search)
//  { type: 'h3', text }           sub-heading
//  { type: 'ul', items: [] }      bullet list
//  { type: 'ol', items: [] }      numbered list
//  { type: 'quote', text }        pull quote
//  { type: 'callout', text }      the gentle reflection nudge / lead-magnet CTA

export const blogPosts = [
  {
    slug: "the-mental-load-why-youre-so-tired",
    image: "/images/journal/the-mental-load-why-youre-so-tired.png",
    imageAlt: "Abstract LittleHugs Journal cover for an article on the mental load women carry",
    title: "The mental load: why the woman who holds it all together is so tired",
    metaTitle: "The Mental Load: Why You're So Tired (and How to Carry Less)",
    metaDescription:
      "The mental load is the invisible work of remembering everything for everyone. Here's what it is, why it's exhausting, and small ways to put some of it down.",
    keywords: ["mental load", "invisible labour", "mental load meaning", "how to reduce mental load", "women burnout"],
    category: "The mental load",
    date: "2026-05-12",
    updated: "2026-06-07",
    readTime: "6 min read",
    excerpt:
      "You're not tired because you're doing too little. You're tired because you're remembering everything for everyone — all the time. That has a name.",
    content: [
      { type: "p", text: "You can finish every task on the list and still feel like you never clocked off. That's not in your head, and it isn't a character flaw. It's the mental load — the invisible, never-finished work of remembering, planning and anticipating for everyone around you. It rarely shows up on a to-do list, which is exactly why it's so tiring." },
      { type: "h2", text: "What is the mental load?" },
      { type: "p", text: "The mental load is the cognitive and emotional labour of keeping a household, a family and often a job running in your head. It's knowing the milk is low before anyone else notices, remembering whose form is due, holding the calendar, and bracing for the next thing before it happens. The physical tasks are visible. The thinking behind them usually isn't." },
      { type: "p", text: "Researchers sometimes call it invisible labour. In India, women spend an average of 289 minutes a day on unpaid domestic work — compared with 88 minutes for men, according to time-use data reported by Down To Earth. The hours are real. The planning on top of those hours is the part no one sees." },
      { type: "h2", text: "Why does it leave you so exhausted?" },
      { type: "p", text: "Because it never switches off. A task ends; the mental load doesn't. You can be sitting down and still running tomorrow morning in your head. Carrying that low hum of anticipation for long stretches keeps your body in a quiet state of alert, and that's draining in a way that rest alone doesn't fix." },
      { type: "p", text: "There's an emotional layer too: smoothing over moods, keeping everyone comfortable, holding the family's feelings as well as its logistics. You can do all of it well and still end the day wondering why you have nothing left for yourself." },
      { type: "h2", text: "How do you carry less of the mental load?" },
      { type: "p", text: "You don't fix the mental load in an afternoon, and you shouldn't have to carry it alone. But you can start to set some of it down. A few honest, low-effort places to begin:" },
      { type: "ol", items: [
        "Get it out of your head. The load feels heaviest when it lives only in your mind. Write tomorrow down — on paper, in a note, anywhere it stops circling.",
        "Hand over the whole task, not the instruction. Delegating works when someone owns a job end to end, not when you still hold the reminders. Pass the thinking, not just the doing.",
        "Name one thing you'll stop tracking. Pick a single responsibility that genuinely isn't yours to hold, and let it go — even imperfectly.",
        "Notice the load before you act on it. A two-minute check-in at the end of the day — what did I carry, what drained me — turns an invisible weight into something you can actually see and share.",
      ]},
      { type: "callout", text: "Noticing what you carry is the first step to carrying less. LittleHugs is a private five-minute check-in built for exactly this. Start your reflection." },
      { type: "h2", text: "The quiet truth" },
      { type: "p", text: "You're allowed to put some of it down. Being the one who holds everything together doesn't mean holding it silently until you're empty. The first, smallest move is simply to notice the weight — and to let yourself believe it counts as work, because it is." },
    ],
    faqs: [
      { q: "What is the mental load in simple terms?", a: "It's the invisible mental work of remembering, planning and anticipating for a household and family — the thinking behind the tasks, not just the tasks themselves." },
      { q: "Is the mental load the same as being busy?", a: "No. You can have a quiet day on paper and still carry a heavy mental load, because it's about everything you're holding in your head, not how many tasks you tick off." },
      { q: "How can I reduce my mental load without everything falling apart?", a: "Start small: write tomorrow down so it stops circling, hand over whole tasks rather than instructions, and choose one responsibility to stop tracking. You don't have to do it all at once." },
    ],
    related: ["how-to-set-boundaries-without-guilt", "5-minute-self-care-for-a-busy-day", "why-women-put-themselves-last"],
  },

  {
    slug: "5-minute-self-care-for-a-busy-day",
    image: "/images/journal/5-minute-self-care-for-a-busy-day.png",
    imageAlt: "LittleHugs Journal cover for five-minute self-care ideas for busy women",
    title: "5-minute self-care that actually fits a packed day",
    metaTitle: "5-Minute Self-Care That Actually Fits a Busy Day",
    metaDescription:
      "Self-care doesn't need an hour you don't have. Here are 9 genuine five-minute rituals for women who carry a lot — small, doable, and quietly restoring.",
    keywords: ["5 minute self care", "quick self care ideas", "self care for busy women", "micro self care", "self care no time"],
    category: "Everyday care",
    date: "2026-05-19",
    updated: "2026-06-07",
    readTime: "5 min read",
    excerpt:
      "The advice to 'take time for yourself' lands like a joke when you don't have it. So here's self-care measured in minutes, not afternoons.",
    content: [
      { type: "p", text: "Most self-care advice assumes you have an hour, a spare room and a lit candle. On a real day — work, home, the people who lean on you — you have about five minutes between one thing and the next. The good news: five honest minutes, taken often, do more than a spa day you keep postponing." },
      { type: "h2", text: "Does five minutes of self-care actually work?" },
      { type: "p", text: "Yes. Small, frequent moments of rest add up — they're easier to keep than grand gestures, and consistency is what makes the difference. A five-minute pause you take every day beats a long routine you start and abandon. The point isn't to fix everything. It's to give yourself one moment that's genuinely yours before the day takes the rest." },
      { type: "h2", text: "9 five-minute rituals for a packed day" },
      { type: "ul", items: [
        "Step outside and feel the light on your face. No phone. Just a minute of sky before you go back in.",
        "Drink one cup of tea while it's still hot — sitting down, not standing at the counter answering someone.",
        "Three slow breaths before you open the front door, so you arrive instead of just turning up.",
        "Write down one thing you handled today that no one noticed. Watch it stop feeling invisible.",
        "Put on one song and do nothing else until it ends.",
        "Stretch your shoulders and unclench your jaw — the two places the day quietly collects.",
        "Send a message to the friend you keep meaning to text. Connection counts as care.",
        "Tidy one small surface. A clear corner can quiet a loud mind.",
        "Take a private two-minute check-in: how am I actually doing, under all of this?",
      ]},
      { type: "callout", text: "The simplest five minutes? A quiet check-in with yourself. LittleHugs gives you one gentle question a day and something kind back — private, no pressure. Start your reflection." },
      { type: "h2", text: "How to make it stick" },
      { type: "p", text: "Attach the new minute to something you already do — your first coffee, the school run, the moment you sit in the car before driving off. You're not adding another task to the list. You're borrowing five minutes from a moment that already exists and quietly making it yours." },
      { type: "p", text: "And drop the guilt about the size of it. Five minutes isn't a lesser version of looking after yourself. On the days you carry the most, it might be the whole thing — and that's enough." },
    ],
    faqs: [
      { q: "What can I do for self-care in just five minutes?", a: "Plenty: step outside for daylight, drink a hot drink sitting down, do one stretch, message a friend, or take a short private check-in on how you're really doing. Small and frequent beats long and rare." },
      { q: "Why do small self-care habits work better than big ones?", a: "Because they're easy to keep. A five-minute ritual you do daily builds consistency, while an hour-long routine often gets postponed until it never happens." },
      { q: "I feel guilty taking time for myself. Is that normal?", a: "Very. Many women who carry a lot feel it. Reframing self-care as five borrowed minutes — not a luxury or a whole afternoon — makes the guilt easier to set down." },
    ],
    related: ["the-mental-load-why-youre-so-tired", "build-a-self-care-habit-that-sticks", "daily-reflection-journal-prompts-for-women"],
  },

  {
    slug: "daily-reflection-journal-prompts-for-women",
    image: "/images/journal/daily-reflection-journal-prompts-for-women.png",
    imageAlt: "LittleHugs Journal cover for daily reflection journal prompts for women",
    title: "Daily reflection journal prompts for women (when there's no time for you)",
    metaTitle: "30 Daily Reflection Journal Prompts for Women",
    metaDescription:
      "Gentle journal prompts for women who give all day to everyone else. 30 reflection prompts to notice how you're really doing — grouped by how you feel.",
    keywords: ["journal prompts for women", "self care journal prompts", "daily reflection prompts", "journaling prompts overwhelmed", "reflection questions"],
    category: "Reflection",
    date: "2026-05-26",
    updated: "2026-06-07",
    readTime: "6 min read",
    excerpt:
      "You spend the day asking how everyone else is doing. These prompts turn the question, gently, back toward you.",
    content: [
      { type: "p", text: "Journaling sounds like one more thing to do — until you realise it can take two minutes and ask nothing of you except honesty. You don't need a leather notebook or a morning routine. You need one good question and a quiet moment to answer it. Here are prompts to start with, grouped by how you might actually be feeling today." },
      { type: "h2", text: "How do you start journaling when you have no time?" },
      { type: "p", text: "Pick one prompt and answer it in a sentence or two. That's the whole practice. Reflection isn't about writing a lot — it's about pausing long enough to notice what's true for you. A line a day, taken on the days you can, will tell you more about yourself over a month than a perfect entry you never get round to." },
      { type: "h2", text: "Prompts for when you feel stretched thin" },
      { type: "ul", items: [
        "What did I carry today that no one else noticed?",
        "Where did my energy go — and where did I wish it had gone?",
        "What's one thing I can take off my own plate tomorrow?",
        "When did I last feel rested, and what made it possible?",
        "What am I holding that isn't actually mine to hold?",
      ]},
      { type: "h2", text: "Prompts for when you feel low or flat" },
      { type: "ul", items: [
        "How am I really doing, under the version I show everyone else?",
        "What would I say to a friend who'd had the day I just had?",
        "What's one small thing that was gentle on me today?",
        "What do I need more of this week — and who could help?",
        "If I gave myself permission to feel this, what would I admit?",
      ]},
      { type: "h2", text: "Prompts for when you want to feel steadier" },
      { type: "ul", items: [
        "What does feeling a little more steady look like tomorrow morning?",
        "What's one boundary that would protect my energy this week?",
        "When did I feel most like myself recently?",
        "What's something I'm proud of that I've never said out loud?",
        "What would 'enough' look like today — not perfect, just enough?",
      ]},
      { type: "h2", text: "Prompts for the end of the day" },
      { type: "ul", items: [
        "What went better than I expected today?",
        "What did I do well that I'll probably forget by tomorrow?",
        "Who did I show up for — and did anyone show up for me?",
        "What can I let go of before I sleep?",
        "What's one kind thing I'll do for myself tomorrow?",
      ]},
      { type: "callout", text: "Want this as a daily habit without the blank page? LittleHugs asks you one gentle reflection a day and gives something kind back — private, and entirely yours. Start your reflection." },
      { type: "h2", text: "A note on doing it imperfectly" },
      { type: "p", text: "You will miss days. That's not failure — it's a normal life with a lot in it. The prompts will still be here. Come back to one whenever you have a quiet moment, and let that be enough. Your reflections are yours alone; you never have to share a word of them." },
    ],
    faqs: [
      { q: "What should I write in a daily reflection?", a: "Start with one honest line answering a single prompt — how you're really doing, what drained you, or one thing that was gentle on you today. Short and true beats long and polished." },
      { q: "How long should journaling take?", a: "As little as two minutes. Reflection is about pausing to notice, not writing a lot, so a sentence or two a day is a genuine practice." },
      { q: "What if I keep forgetting to journal?", a: "That's normal when you carry a lot. Attach it to something you already do — your first drink of the day, or the moment before sleep — and let missed days be fine. The prompts wait for you." },
    ],
    related: ["the-sunday-reset-weekly-check-in", "5-minute-self-care-for-a-busy-day", "why-women-put-themselves-last"],
  },

  {
    slug: "running-on-empty-signs-youre-carrying-too-much",
    image: "/images/journal/running-on-empty-signs-youre-carrying-too-much.png",
    imageAlt: "LittleHugs Journal cover for the quiet signs of running on empty",
    title: "Running on empty: quiet signs you're carrying too much",
    metaTitle: "Running on Empty: Quiet Signs You're Carrying Too Much",
    metaDescription:
      "Feeling permanently tired, flat or short-tempered? These are the quiet signs you're carrying too much — and small, kind ways to start feeling steadier.",
    keywords: ["running on empty", "feeling overwhelmed all the time", "always tired and stressed", "carrying too much", "emotionally drained woman"],
    category: "Feeling steadier",
    date: "2026-05-30",
    updated: "2026-06-07",
    readTime: "6 min read",
    excerpt:
      "It rarely arrives as a crisis. It's the slow flattening — the snapping, the numbness, the sense that you're managing everything and feeling none of it.",
    content: [
      { type: "p", text: "Running on empty doesn't usually announce itself. There's no single bad day — just a slow flattening, where you keep doing everything and feel less and less while you do it. If you've been waiting for a dramatic sign before you let yourself slow down, it might already be here, quietly." },
      { type: "h2", text: "What does running on empty feel like?" },
      { type: "p", text: "It feels like being permanently switched on with nothing left in reserve. You manage the day, then have nothing for yourself at the end of it. Small things feel heavier than they should. You're present for everyone and somehow absent from your own life. These are common, human signs that you've been carrying too much for too long — and they're worth listening to early." },
      { type: "h2", text: "The quiet signs to notice" },
      { type: "ul", items: [
        "You snap at small things, then feel guilty about the size of your reaction.",
        "You're tired in a way that sleep doesn't seem to touch.",
        "You feel flat or numb — not sad exactly, just switched off.",
        "Rest feels like one more task, or makes you anxious rather than calm.",
        "You can't remember the last time you did something just because you wanted to.",
        "You're holding it together so well that no one has thought to ask how you are.",
      ]},
      { type: "h2", text: "Small, kind ways to start refilling" },
      { type: "p", text: "You don't refill an empty tank by trying harder. You do it by taking pressure off, in small and unglamorous ways. None of these will fix everything — they're not meant to. They're meant to give you back a little room." },
      { type: "ol", items: [
        "Lower one bar. Pick a single thing you're doing to a high standard that genuinely doesn't need it, and do it 'good enough' this week.",
        "Ask for one specific thing. Not 'I need help' in general — one concrete task someone else can own.",
        "Protect one pocket of the day that's yours, even ten minutes, and guard it like you'd guard anyone else's.",
        "Notice it daily. A short check-in helps you catch the slide early, before empty becomes the normal you stop questioning.",
      ]},
      { type: "callout", text: "A daily moment to notice how you're really doing can catch 'running on empty' before it settles in. LittleHugs is a private, gentle check-in — no pressure, no advice you didn't ask for. Start your reflection." },
      { type: "h2", text: "When it's more than tiredness" },
      { type: "p", text: "This isn't medical advice, and a daily check-in isn't a substitute for proper support. If the heaviness has been there for weeks, if it's hard to function, or if you simply feel you can't carry on as you are, please talk to someone you trust or a professional. Reaching out isn't a sign you've failed at holding it together. It's one of the kindest, strongest things you can do for yourself." },
    ],
    faqs: [
      { q: "What are the signs of running on empty?", a: "Common signs include tiredness that sleep doesn't fix, snapping at small things, feeling flat or numb, struggling to rest, and holding everything together while no one asks how you are." },
      { q: "How do I start feeling less overwhelmed?", a: "Take pressure off in small ways: lower your standard on one task, ask for one specific thing, protect a small pocket of the day, and check in with yourself daily to catch the slide early." },
      { q: "When should I speak to someone about feeling this way?", a: "If the heaviness has lasted weeks, makes it hard to function, or feels like more than tiredness, talk to someone you trust or a professional. A daily check-in supports you but doesn't replace real support." },
    ],
    related: ["the-mental-load-why-youre-so-tired", "evening-wind-down-routine-to-switch-off", "how-to-set-boundaries-without-guilt"],
  },

  {
    slug: "how-to-set-boundaries-without-guilt",
    image: "/images/journal/how-to-set-boundaries-without-guilt.png",
    imageAlt: "LittleHugs Journal cover for setting boundaries without guilt",
    title: "How to set boundaries without guilt — for women who say yes to everyone",
    metaTitle: "How to Set Boundaries Without Guilt (For Women Who Say Yes)",
    metaDescription:
      "If you say yes to everyone and feel guilty saying no, this is for you. Simple ways to set boundaries without guilt — with words you can actually use.",
    keywords: ["how to set boundaries without guilt", "setting boundaries", "saying no without guilt", "boundaries at work and home", "people pleasing"],
    category: "Boundaries",
    date: "2026-06-02",
    updated: "2026-06-07",
    readTime: "6 min read",
    excerpt:
      "The guilt that follows 'no' can feel like proof you've done something wrong. It isn't. It's just a habit — and habits can change.",
    content: [
      { type: "p", text: "If you're the person everyone relies on, 'no' can feel almost physically difficult to say. You agree to the favour, the extra task, the thing you didn't have room for — and then carry it, quietly resentful and quietly exhausted. The problem usually isn't that you lack boundaries. It's the guilt that arrives the moment you try to hold one." },
      { type: "h2", text: "Why does saying no make you feel guilty?" },
      { type: "p", text: "Because for a long time, saying yes was how you kept everyone comfortable — and being the reliable one became part of who you are. So 'no' can feel like letting people down or being selfish. But guilt isn't proof you've done something wrong. It's just a well-worn habit firing, and like any habit, it loses its grip the more you practise the alternative." },
      { type: "h2", text: "How to set a boundary without a fight" },
      { type: "p", text: "A boundary isn't an argument or a grand declaration. Most of the time it's one calm sentence, said kindly and left to stand. You don't owe a paragraph of justification. Here are words you can borrow:" },
      { type: "ul", items: [
        "\"I can't take that on right now.\" — complete on its own. No reason required.",
        "\"That doesn't work for me, but here's what I can do…\" — when you want to offer something smaller.",
        "\"Let me check and come back to you.\" — buys you space instead of an automatic yes.",
        "\"I'd love to, but I'm at capacity this week.\" — honest, warm, and final.",
        "\"No, but thank you for thinking of me.\" — short, gracious, closed.",
      ]},
      { type: "h2", text: "Boundaries at home, not just at work" },
      { type: "p", text: "The hardest boundaries are often with the people closest to you, where the load is largest and the guilt is loudest. You can hold them gently: naming what you'll take on and what you won't, asking for a task to be owned by someone else, or protecting a part of your day that isn't available to anyone. A boundary with family isn't rejection. It's how you keep enough of yourself to actually be there." },
      { type: "callout", text: "Boundaries get easier when you can see where your energy actually goes. A daily LittleHugs check-in helps you notice the yeses that cost you most — privately, and just for you. Start your reflection." },
      { type: "h2", text: "Sitting with the guilt until it fades" },
      { type: "p", text: "The first few times, the guilt will still come. Let it. You don't have to act on it, explain it away, or undo your 'no' to make it stop. Sit with it, and notice that nothing terrible happens — the relationship survives, the world keeps turning, and you have a little more of yourself left. That's how the habit loosens: not by feeling no guilt, but by no longer obeying it." },
    ],
    faqs: [
      { q: "How do I say no without feeling guilty?", a: "Use one calm, complete sentence — 'I can't take that on right now' — without over-explaining. Then let the guilt come and pass without acting on it. It fades as you practise." },
      { q: "Why is it so hard to set boundaries with family?", a: "Because the load and the closeness are both greatest there, so the guilt is loudest. Gentle, specific boundaries — naming what you will and won't take on — protect enough of you to actually be present." },
      { q: "Isn't setting boundaries selfish?", a: "No. Boundaries let you keep enough energy to be there for the people who matter, instead of running on empty and resentful. Protecting yourself is part of looking after them." },
    ],
    related: ["the-mental-load-why-youre-so-tired", "running-on-empty-signs-youre-carrying-too-much", "why-women-put-themselves-last"],
  },

  {
    slug: "self-care-in-dubai-when-family-is-far-away",
    image: "/images/journal/self-care-in-dubai-when-family-is-far-away.png",
    imageAlt: "LittleHugs Journal cover for self-care as an expat woman in Dubai",
    title: "Looking after yourself in Dubai when your family is an ocean away",
    metaTitle: "Self-Care in Dubai When Your Family Is Far Away",
    metaDescription:
      "Building a life in the UAE without family nearby is its own kind of heavy. Gentle, practical ways to look after yourself when there's no one to catch you.",
    keywords: ["expat woman Dubai", "self care expat women UAE", "no family support Dubai", "expat loneliness UAE", "moving to Dubai woman"],
    category: "Life in the UAE",
    date: "2026-06-03",
    updated: "2026-06-07",
    readTime: "6 min read",
    excerpt:
      "You can love your life in the UAE and still feel the gap where your people used to be. Both things are true. Here's how to hold yourself in the meantime.",
    content: [
      { type: "p", text: "Building a life in the UAE can be exciting, full and genuinely good — and still leave you carrying a specific kind of weight: doing it all without the family who'd normally step in. No mother dropping by, no sister on call, no old friend who knows you without explanation. You become the support system for everyone at home while quietly having none of your own nearby." },
      { type: "h2", text: "Why does it feel heavier without family close by?" },
      { type: "p", text: "Because you're holding both the work of daily life and the absence of a safety net. When something goes wrong, there's no one round the corner to call. When something goes right, there's no one who's known you for twenty years to share it with. Many expat women in Dubai carry the role of the emotional anchor for a family far away, with little built-in support of their own — and that gap is real, not ingratitude." },
      { type: "h2", text: "How to build a small support system from scratch" },
      { type: "p", text: "You can't replace home overnight, and you don't have to. You build a softer landing slowly, one connection and one habit at a time. Where to start:" },
      { type: "ol", items: [
        "Find your two-or-three people, not twenty. One neighbour, one colleague, one mum from the building you can be honest with beats a crowd of acquaintances.",
        "Use the city's communities. Walking and running groups, women's circles and interest meet-ups across the UAE exist precisely because so many people arrived without their networks. You're not the only one looking.",
        "Keep one steady thread to home. A regular call you protect — not squeezed into the gaps — so connection doesn't depend on whoever happens to be free.",
        "Create one ritual that's just yours. A morning walk, a weekend coffee, a daily check-in. A small fixed point that feels like home base when nothing else does.",
      ]},
      { type: "callout", text: "When there's no one nearby to ask how you're doing, LittleHugs can be that quiet daily moment — private, gentle, and built for exactly this. Start your reflection." },
      { type: "h2", text: "Let yourself feel both things" },
      { type: "p", text: "You're allowed to be grateful for the life you've built here and to miss the people who aren't in it. Homesickness isn't a sign you made the wrong choice — it's a sign you have people worth missing. Looking after yourself in a new country starts with letting that be true, and not adding guilt on top of an already full load." },
      { type: "p", text: "If the loneliness has tipped into something heavier and harder to shift, please reach out — to a friend back home, someone here, or a professional. Asking for support far from home isn't weakness. It's how you keep going." },
    ],
    faqs: [
      { q: "How do I cope as an expat woman in Dubai without family nearby?", a: "Build a small support system slowly: find two or three people you can be honest with, use the UAE's many community groups, protect a regular call home, and keep one daily ritual that's just yours." },
      { q: "Is it normal to feel lonely in Dubai even when life is good?", a: "Yes. You can love your life here and still miss your people — that gap is real and very common among expat women, not a sign you made the wrong choice." },
      { q: "Where can I find community as a woman new to the UAE?", a: "Walking and running groups, women's circles, and interest-based meet-ups across the UAE are full of people who also arrived without their networks. Starting with one is enough." },
    ],
    related: ["running-on-empty-signs-youre-carrying-too-much", "5-minute-self-care-for-a-busy-day", "the-sunday-reset-weekly-check-in"],
  },

  {
    slug: "evening-wind-down-routine-to-switch-off",
    image: "/images/journal/evening-wind-down-routine-to-switch-off.png",
    imageAlt: "LittleHugs Journal cover for an evening wind-down routine to switch off",
    title: "A realistic evening wind-down for women who never switch off",
    metaTitle: "A Realistic Evening Wind-Down Routine to Finally Switch Off",
    metaDescription:
      "If your mind won't stop at night, this gentle 20-minute evening wind-down helps you switch off after work — no strict rules, just a calmer end to the day.",
    keywords: ["evening routine to relax", "how to switch off after work", "wind down routine", "can't switch off at night", "relax after work woman"],
    category: "Everyday care",
    date: "2026-06-04",
    updated: "2026-06-07",
    readTime: "5 min read",
    excerpt:
      "You finish the day but your mind doesn't. A wind-down isn't another routine to perfect — it's permission to stop, slowly.",
    content: [
      { type: "p", text: "For a lot of women, the evening isn't rest — it's the second shift. The work ends and the home begins, and somewhere in there your own mind keeps running tomorrow on a loop. Switching off feels impossible because nothing has signalled to your body that the day is actually done. A wind-down is simply that signal, given gently." },
      { type: "h2", text: "Why can't you switch off at night?" },
      { type: "p", text: "Because you go straight from doing to lying down, with no gap in between. Your body is still braced for the next task, so your mind keeps scanning for it. A short, predictable wind-down gives your nervous system a clear line between 'on' and 'off' — and that line is what lets you settle, rather than lying there with tomorrow's list." },
      { type: "h2", text: "A gentle 20-minute wind-down" },
      { type: "p", text: "This isn't a rigid routine to get right. It's a loose flow you can shorten on hard nights. The order matters less than the signal it sends: the day is closing." },
      { type: "ol", items: [
        "Minutes 1–5: Close the loops. Write tomorrow's three real priorities down so your mind can stop holding them.",
        "Minutes 6–12: Lower the inputs. Dim the lights, put the phone out of reach, and let the noise of the day drop.",
        "Minutes 13–18: Do one quiet thing — a warm drink, a few stretches, a few pages of a book that asks nothing of you.",
        "Minutes 19–20: A two-minute check-in. What drained me, what was good, what can I let go of before sleep.",
      ]},
      { type: "callout", text: "Ending the day with a short reflection helps your mind put it down. LittleHugs gives you one gentle question and something calming back — private, and yours alone. Start your reflection." },
      { type: "h2", text: "Make it small enough to keep" },
      { type: "p", text: "On the nights you have nothing left, do the two-minute version: phone away, three slow breaths, one line about how the day went. A wind-down you actually keep beats a perfect routine you abandon by Wednesday. The aim isn't a flawless evening. It's a clear, kind full stop at the end of a long day — so the next one doesn't start already tired." },
    ],
    faqs: [
      { q: "How can I switch off after work?", a: "Give your body a clear signal the day is done: write tomorrow's priorities down, dim the lights, put your phone away, do one quiet thing, and close with a short check-in. The gap between doing and resting is what lets you settle." },
      { q: "Why does my mind race at bedtime?", a: "Usually because you move straight from tasks to lying down with no transition, so your mind keeps scanning for the next thing. A short, predictable wind-down creates the line between 'on' and 'off'." },
      { q: "What's the shortest wind-down that still works?", a: "Two minutes: phone away, three slow breaths, and one line about how your day went. A tiny routine you keep beats a long one you drop." },
    ],
    related: ["running-on-empty-signs-youre-carrying-too-much", "the-sunday-reset-weekly-check-in", "build-a-self-care-habit-that-sticks"],
  },

  {
    slug: "the-sunday-reset-weekly-check-in",
    image: "/images/journal/the-sunday-reset-weekly-check-in.png",
    imageAlt: "LittleHugs Journal cover for the Sunday reset weekly check-in",
    title: "The Sunday reset: a gentle weekly check-in for a calmer week",
    metaTitle: "The Sunday Reset: A Gentle Weekly Check-In for a Calmer Week",
    metaDescription:
      "A Sunday reset doesn't have to mean cleaning and meal prep. Try this gentle weekly check-in to reset your mind — five quiet questions for a calmer week.",
    keywords: ["sunday reset", "weekly reset", "sunday reset routine", "how to reset for the week", "weekly check in"],
    category: "Reflection",
    date: "2026-06-05",
    updated: "2026-06-07",
    readTime: "5 min read",
    excerpt:
      "The internet's version of a Sunday reset is a to-do list in disguise. Here's one that resets you, not just your fridge.",
    content: [
      { type: "p", text: "Search 'Sunday reset' and you'll find spotless kitchens, batch-cooked meals and colour-coded planners. There's nothing wrong with any of it — but for a woman who already does the cooking, the planning and the tidying, that version is just the week's work moved to the weekend. A real reset gives something back to you before it asks anything of you." },
      { type: "h2", text: "What is a Sunday reset, really?" },
      { type: "p", text: "A Sunday reset is a short, deliberate pause to close the week behind you and meet the next one with a clearer head. At its best it's not about chores — it's about checking in with yourself: noticing what drained you, what steadied you, and what you want the coming week to feel like. Ten quiet minutes of that does more for a calmer week than an hour of meal prep." },
      { type: "h2", text: "Five questions for a gentle weekly reset" },
      { type: "ul", items: [
        "What drained me this week — and how much of it was actually mine to carry?",
        "What steadied me, even briefly, that I'd like more of?",
        "Where did I run on empty, and what's one thing that would help next week?",
        "What's one kindness I'll plan for myself in the next seven days?",
        "If the coming week could feel one way, what would I want it to be?",
      ]},
      { type: "callout", text: "LittleHugs turns this into a habit you don't have to remember — a gentle weekly and daily check-in, private and entirely yours. Start your reflection." },
      { type: "h2", text: "Keep the bits that serve you" },
      { type: "p", text: "If laying out clothes or clearing one surface genuinely makes your Monday lighter, keep it — not because the internet said so, but because it helps. Drop the rest without guilt. The point of a reset isn't to start the week with a longer list. It's to start it feeling a little more like yourself, with a little more room to breathe." },
    ],
    faqs: [
      { q: "What should a Sunday reset include?", a: "A gentle reset centres on checking in with yourself — noticing what drained and steadied you, planning one kindness, and setting how you want the week to feel. Keep only the practical tasks that genuinely make your Monday lighter." },
      { q: "How long should a weekly reset take?", a: "About ten minutes for the reflective part. Five honest questions answered briefly do more for a calmer week than hours of chores." },
      { q: "Isn't a Sunday reset just more housework?", a: "It can become that. A reset that serves you starts with you — your energy and your week ahead — and treats any tidying or prep as optional, not the point." },
    ],
    related: ["daily-reflection-journal-prompts-for-women", "evening-wind-down-routine-to-switch-off", "build-a-self-care-habit-that-sticks"],
  },

  {
    slug: "why-women-put-themselves-last",
    image: "/images/journal/why-women-put-themselves-last.png",
    imageAlt: "LittleHugs Journal cover for why women put themselves last",
    title: "Why women put themselves last — and how to take five minutes that are truly yours",
    metaTitle: "Why Women Put Themselves Last (and How to Reclaim Five Minutes)",
    metaDescription:
      "Always putting everyone else first? Here's why women put themselves last, why the guilt is so strong, and how to reclaim five minutes that are truly yours.",
    keywords: ["why do I always put myself last", "putting everyone else first", "self care guilt", "women put themselves last", "prioritise yourself"],
    category: "Feeling steadier",
    date: "2026-06-06",
    updated: "2026-06-07",
    readTime: "6 min read",
    excerpt:
      "You'd never let the people you love run themselves into the ground for everyone else. Somehow the rule doesn't apply to you. Let's look at why.",
    content: [
      { type: "p", text: "Ask the woman who holds everything together how she's doing and she'll tell you about everyone else. The kids are fine, work is busy, her partner's stressed, her mother's appointment is Tuesday. Her own name rarely comes up. Putting yourself last can become so automatic you stop noticing you're doing it — until you're running on empty and can't work out why." },
      { type: "h2", text: "Why do women put themselves last?" },
      { type: "p", text: "Often because they were quietly taught to. Being needed gets praised; having needs can feel indulgent. Over years, looking after everyone else becomes part of your identity, and your own needs slip to the bottom of a list that never ends. It isn't weakness or poor planning — it's a deeply practised habit, reinforced every time you put someone else first and call it love." },
      { type: "h2", text: "The cost of always coming last" },
      { type: "p", text: "The trouble is that 'later' never arrives. There's always one more person to see to first, so your rest, your interests and your care get postponed indefinitely. And an empty person can't pour from an empty cup — the very people you're prioritising end up with a more tired, more stretched version of you. Looking after yourself isn't taking something from them. It's how you keep being able to show up." },
      { type: "h2", text: "How to reclaim five minutes that are truly yours" },
      { type: "p", text: "You don't have to overhaul your life or learn to put yourself first overnight. You start by stopping putting yourself dead last — by reclaiming one small, non-negotiable pocket of the day." },
      { type: "ol", items: [
        "Choose a time that already exists — your first coffee, the commute, the quiet before everyone wakes — and claim it.",
        "Make it small enough that you can't talk yourself out of it. Five minutes. That's it.",
        "Treat it like an appointment you'd never cancel on someone else, because it's an appointment with you.",
        "Use it to check in with yourself, not to be productive. The question is simply: how am I, really?",
      ]},
      { type: "callout", text: "Five minutes that are truly yours — that's the whole idea behind LittleHugs. One gentle check-in a day, private and just for you. Start your reflection." },
      { type: "h2", text: "You're allowed to be on your own list" },
      { type: "p", text: "Putting yourself somewhere on the list isn't selfish, and it doesn't mean you love anyone less. It means you've understood something the most generous people often miss: you can't keep giving from a place that's never refilled. Start with five minutes. Let yourself count. The rest follows from there." },
    ],
    faqs: [
      { q: "Why do I always put everyone else first?", a: "Usually because it became a deeply practised habit — being needed gets praised while having needs can feel indulgent, so your own care slips to the bottom of the list. It's learned, not a flaw." },
      { q: "How do I start prioritising myself without guilt?", a: "Don't aim to put yourself first overnight — just stop putting yourself dead last. Reclaim one small, fixed five minutes a day and treat it like an appointment you'd never cancel on someone else." },
      { q: "Is it selfish to take time for myself?", a: "No. You can't keep giving from a place that's never refilled. Looking after yourself is how you stay able to show up for the people who rely on you." },
    ],
    related: ["the-mental-load-why-youre-so-tired", "how-to-set-boundaries-without-guilt", "5-minute-self-care-for-a-busy-day"],
  },

  {
    slug: "build-a-self-care-habit-that-sticks",
    image: "/images/journal/build-a-self-care-habit-that-sticks.png",
    imageAlt: "LittleHugs Journal cover for building a self-care habit that sticks",
    title: "How to build a self-care habit that actually sticks — without streaks or guilt",
    metaTitle: "How to Build a Self-Care Habit That Actually Sticks",
    metaDescription:
      "Self-care routines fail when they're too big or run on guilt. Here's how to build a self-care habit that sticks — tiny, forgiving, and free of streaks.",
    keywords: ["how to build a self care habit", "self care routine that sticks", "consistent self care", "self care habit", "build healthy habits women"],
    category: "Everyday care",
    date: "2026-06-06",
    updated: "2026-06-07",
    readTime: "6 min read",
    excerpt:
      "Every self-care routine starts strong and quietly dies by week two. It's not your willpower. It's the design.",
    content: [
      { type: "p", text: "You've started before. The journal, the morning routine, the app with the cheerful reminders. It lasts a week, maybe two, then real life arrives — a hard day, a missed morning — and the whole thing quietly collapses, leaving a little extra guilt behind. The problem was never your discipline. It was a habit built too big to survive an ordinary bad week." },
      { type: "h2", text: "Why do self-care routines fail?" },
      { type: "p", text: "Because they ask for time you don't reliably have and punish you the moment you slip. A 30-minute routine needs a calm life to fit into; yours isn't always calm. And streak-based habits turn one missed day into a reason to quit — 'I've broken it now, so what's the point.' Habits that depend on perfect conditions and perfect consistency are designed to fail the women who need them most." },
      { type: "h2", text: "How to build a self-care habit that sticks" },
      { type: "p", text: "Build it small, forgiving and attached to something you already do. The science of habits is dull but kind: tiny actions, repeated, beat ambitious ones abandoned." },
      { type: "ol", items: [
        "Make it absurdly small. Not 'meditate for 20 minutes' — 'take three slow breaths.' Not 'journal' — 'write one line.' Small enough that a terrible day can't stop it.",
        "Anchor it to an existing habit. After I pour my first coffee, I check in with myself. The thing you already do becomes the reminder.",
        "Drop the streak. Aim for 'most days', not 'every day'. A missed day is data, not failure — you just start again tomorrow.",
        "Let it grow on its own. Once the tiny version is automatic, it naturally expands on the days you have more. You don't force it.",
      ]},
      { type: "callout", text: "LittleHugs is built on exactly this: one tiny daily check-in, no streaks to shame you, no guilt for the days you miss. Just a gentle habit that holds space for you. Start your reflection." },
      { type: "h2", text: "Why 'no guilt' is the whole point" },
      { type: "p", text: "Most habit tools run on pressure — streaks, reminders, the quiet implication you've failed. For a woman already carrying a heavy mental load, that's the last thing that helps. A self-care habit should be the one part of your day that asks nothing and forgives everything. Five honest minutes, taken on the days you can, with no penalty for the days you can't. That's not a lesser habit. That's the kind that lasts." },
    ],
    faqs: [
      { q: "How do I build a self-care habit that actually sticks?", a: "Make it tiny, anchor it to something you already do, and drop the streak. Three breaths after your first coffee will outlast a 20-minute routine that needs a perfect day to happen." },
      { q: "Why do my self-care routines keep failing?", a: "Usually because they're too big for a busy life and run on guilt — one missed day feels like failure, so you quit. Smaller, forgiving habits survive ordinary bad weeks." },
      { q: "Are streaks a good way to build habits?", a: "Not for everyone. Streaks can turn a single missed day into a reason to give up. Aiming for 'most days' instead keeps you going when life gets in the way." },
    ],
    related: ["5-minute-self-care-for-a-busy-day", "the-sunday-reset-weekly-check-in", "why-women-put-themselves-last"],
  },
];

export default blogPosts;
