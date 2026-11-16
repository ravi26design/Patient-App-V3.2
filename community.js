/* Community tab, ported from the reference prototype: tiles (Meetings, 1:1 Support, Events, Resources),
   a moderated Community Room feed, and the Resources hub. Everything is namespaced z* so it cannot clash with
   the older Community code in modules.js. Overrides the global renderCommunity(). */
(function () {
  'use strict';

  /* ── icons (local copy of the reference icon set, so global P is untouched) ── */
  const ZP = {"alert": "<path d=\"M12 4l9 16H3z\"/><path d=\"M12 10v4M12 17h.01\"/>", "book": "<path d=\"M4 5h6a2 2 0 0 1 2 2v12a2 2 0 0 0-2-2H4zM20 5h-6a2 2 0 0 0-2 2v12a2 2 0 0 1 2-2h6z\"/>", "calendar": "<rect x=\"3\" y=\"5\" width=\"18\" height=\"16\" rx=\"3\"/><path d=\"M8 3v4M16 3v4M3 10h18\"/>", "chat": "<path d=\"M21 12a8 8 0 0 1-11.6 7.1L4 20l1.1-4.6A8 8 0 1 1 21 12z\"/>", "check": "<path d=\"M5 12.5l4.5 4.5L19 7.5\"/>", "clock": "<circle cx=\"12\" cy=\"12\" r=\"9\"/><path d=\"M12 7v5l3 2\"/>", "ext": "<path d=\"M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5\"/>", "eye": "<path d=\"M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z\"/><circle cx=\"12\" cy=\"12\" r=\"3\"/>", "globe": "<circle cx=\"12\" cy=\"12\" r=\"9\"/><path d=\"M3 12h18M12 3c2.5 2.5 3.8 5.5 3.8 9s-1.3 6.5-3.8 9c-2.5-2.5-3.8-5.5-3.8-9S9.5 5.5 12 3z\"/>", "hand": "<path d=\"M7 11V6.5a1.5 1.5 0 0 1 3 0V11M10 10V4.5a1.5 1.5 0 0 1 3 0V10M13 10V5.5a1.5 1.5 0 0 1 3 0V12M16 9.5a1.5 1.5 0 0 1 3 0V14a7 7 0 0 1-7 7h-1a6 6 0 0 1-5.2-3L4 14.5a1.5 1.5 0 0 1 2.6-1.5L7 14\"/>", "headph": "<path d=\"M4 15v-3a8 8 0 0 1 16 0v3\"/><rect x=\"3\" y=\"14\" width=\"4.5\" height=\"7\" rx=\"1.6\"/><rect x=\"16.5\" y=\"14\" width=\"4.5\" height=\"7\" rx=\"1.6\"/>", "heart": "<path d=\"M12 20s-8-5-8-11a4.5 4.5 0 0 1 8-2.5A4.5 4.5 0 0 1 20 9c0 6-8 11-8 11z\"/>", "home": "<path d=\"M3 11l9-8 9 8\"/><path d=\"M5 10v10h5v-6h4v6h5V10\"/>", "info": "<circle cx=\"12\" cy=\"12\" r=\"9\"/><path d=\"M12 11v5\"/><circle cx=\"12\" cy=\"7.8\" r=\".6\" fill=\"currentColor\"/>", "life": "<circle cx=\"12\" cy=\"12\" r=\"9\"/><circle cx=\"12\" cy=\"12\" r=\"3.5\"/><path d=\"M5.6 5.6l3.9 3.9M14.5 14.5l3.9 3.9M18.4 5.6l-3.9 3.9M9.5 14.5l-3.9 3.9\"/>", "mark": "<path d=\"M6.5 3.5h11v17.5L12 17l-5.5 4z\"/>", "more": "<circle cx=\"12\" cy=\"12\" r=\"9\"/><path d=\"M8 12h.01M12 12h.01M16 12h.01\"/>", "next": "<path d=\"M9 5l7 7-7 7\"/>", "paper": "<rect x=\"4.5\" y=\"3\" width=\"15\" height=\"18\" rx=\"2.5\"/><path d=\"M8 7.5h8M8 11.5h8M8 15.5h5\"/>", "people": "<circle cx=\"9\" cy=\"8\" r=\"3.2\"/><path d=\"M3 20c.6-3.6 3-5.5 6-5.5s5.4 1.9 6 5.5\"/><circle cx=\"17\" cy=\"9\" r=\"2.6\"/><path d=\"M16 14.6c2.6.2 4.4 1.9 5 5.4\"/>", "phone": "<path d=\"M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z\"/>", "pin": "<path d=\"M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21z\"/><circle cx=\"12\" cy=\"9.5\" r=\"2.6\"/>", "play": "<path d=\"M7 4l13 8-13 8z\" fill=\"currentColor\"/>", "plus": "<path d=\"M12 5v14M5 12h14\"/>", "run": "<circle cx=\"14\" cy=\"5\" r=\"2\"/><path d=\"M5 21l4-6 3 2 3-5-3-3-4 2-2 3M12 12l3 3v6\"/>", "search": "<circle cx=\"11\" cy=\"11\" r=\"7\"/><path d=\"M20 20l-4-4\"/>", "send": "<path d=\"M4 12l16-8-6 17-3-7-7-2z\"/>", "shield": "<path d=\"M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z\"/><path d=\"M9 12l2 2 4-4\"/>", "sms": "<path d=\"M4 5h16v11H9l-5 4z\"/>", "sparkle": "<path d=\"M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z\"/>", "target": "<circle cx=\"12\" cy=\"12\" r=\"9\"/><circle cx=\"12\" cy=\"12\" r=\"5\"/><circle cx=\"12\" cy=\"12\" r=\"1.5\"/>", "wind": "<path d=\"M3 8h11a3 3 0 1 0-3-3\"/><path d=\"M3 12h16a3 3 0 1 1-3 3\"/><path d=\"M3 16h8\"/>", "x": "<path d=\"M6 6l12 12M18 6L6 18\"/>", "xc": "<circle cx=\"12\" cy=\"12\" r=\"9\"/><path d=\"M9 9l6 6M15 9l-6 6\"/>"};
  const ic = (n, s = 22, w = 1.9) => `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ZP[n] || (typeof P !== 'undefined' && P[n]) || ''}</svg>`;

  /* ── state (defensive; DEFAULT in app.js is untouched) ── */
  const ensure = () => {
    if (!S.room || !S.room.v2) { S.room = { v2: 1, posts: seedRoom(), hidden: [] }; }
    S.resSaved = S.resSaved || []; S.resRead = S.resRead || []; S.reading = S.reading || [];
    save();
  };

  /* ── data ── */
const TOPICS = [['all', 'All'], ['moud', 'Medication'], ['safety', 'Overdose safety'], ['health', 'Health'], ['recovery', 'Recovery'], ['rel', 'Relationships'], ['faith', 'Faith'], ['work', 'Work'], ['housing', 'Housing'], ['legal', 'Legal'], ['mind', 'Mind & mood']];
const SRC = {
  NIDA: { n: 'National Institute on Drug Abuse', c: '#2D5B8A' }, CDC: { n: 'Centers for Disease Control and Prevention', c: '#1F6F78' },
  SAMHSA: { n: 'SAMHSA', c: '#4A6A3A' }, RRI: { n: 'Recovery Research Institute (Mass General)', c: '#8A4F6B' },
  EEOC: { n: 'U.S. EEOC', c: '#5A5F8E' }, PEA: { n: 'Partnership to End Addiction', c: '#B5635A' }, FVR: { n: 'Faces & Voices of Recovery', c: '#A87C2E' }, LAC: { n: 'Legal Action Center', c: '#5A5F8E' }
};
const L = (t, u, s) => ({ t, u, s });
const LK = {
  nidaMoud: L('Medications to Treat Opioid Use Disorder', 'https://nida.nih.gov/publications/research-reports/medications-to-treat-opioid-addiction/overview', 'NIDA research report'),
  nidaOp: L('Opioids', 'https://nida.nih.gov/research-topics/opioids', 'NIDA'),
  medline: L('Opioid misuse and addiction', 'https://medlineplus.gov/opioidmisuseandaddiction.html', 'MedlinePlus, National Library of Medicine'),
  cdc: L('Stop Overdose', 'https://www.cdc.gov/stop-overdose/', 'CDC'),
  nua: L('Never Use Alone', 'https://neverusealone.com/', 'National overdose prevention line · 800-484-3731'),
  rri: L('Recovery 101', 'https://www.recoveryanswers.org/recovery-101/', 'Recovery Research Institute'),
  rriHome: L('Recovery Research Institute', 'https://www.recoveryanswers.org/', 'Mass General Hospital, Harvard Medical School'),
  addictionary: L('The Addictionary', 'https://www.recoveryanswers.org/addiction-ary/', 'Recovery Research Institute'),
  samhsa: L('SAMHSA', 'https://www.samhsa.gov/', 'Substance Abuse and Mental Health Services Administration'),
  helpline: L('SAMHSA National Helpline', 'https://www.samhsa.gov/find-help/national-helpline', 'Free, confidential, 24/7 · 1-800-662-4357'),
  pea: L('Partnership to End Addiction', 'https://drugfree.org/', 'Support and guidance for families'),
  naranon: L('Nar-Anon Family Groups', 'https://www.nar-anon.org/', 'Peer support for families and friends'),
  smart: L('SMART Recovery', 'https://smartrecovery.org/', 'Includes Family & Friends meetings'),
  rd: L('Recovery Dharma', 'https://recoverydharma.org/', 'Buddhist-inspired peer support'),
  fvr: L('Faces & Voices of Recovery', 'https://facesandvoicesofrecovery.org/', 'National recovery advocacy and community centers'),
  eeoc: L('Use of opioids: information for employees', 'https://www.eeoc.gov/laws/guidance/use-codeine-oxycodone-and-other-opioids-information-employees', 'U.S. Equal Employment Opportunity Commission'),
  jan: L('Job Accommodation Network', 'https://askjan.org/', 'Free, confidential accommodation guidance'),
  fmla: L('Family and Medical Leave Act', 'https://www.dol.gov/agencies/whd/fmla', 'U.S. Department of Labor'),
  hrsa: L('Find a Health Center', 'https://findahealthcenter.hrsa.gov/', 'HRSA · care on a sliding fee scale'),
  gettested: L('Get tested', 'https://gettested.cdc.gov/', 'CDC · free and low-cost HIV, hepatitis and STI testing'),
  hepc: L('Hepatitis C', 'https://www.cdc.gov/hepatitis-c/', 'CDC'),
  nami: L('NAMI', 'https://www.nami.org/', 'National Alliance on Mental Illness · HelpLine 1-800-950-6264'),
  narr: L('National Alliance for Recovery Residences', 'https://narronline.org/', 'Standards and state affiliates for recovery housing'),
  oxford: L('Oxford House', 'https://www.oxfordhouse.org/', 'Self-run, self-supporting recovery homes'),
  findhelp: L('findhelp.org', 'https://www.findhelp.org/', 'Free and reduced-cost help by ZIP code'),
  lawhelp: L('LawHelp.org', 'https://www.lawhelp.org/', 'Find free legal aid in your state'),
  lac: L('Legal Action Center', 'https://www.lac.org/', 'Rights of people with substance use disorders and records'),
  cleanslate: L('Clean Slate Initiative', 'https://www.cleanslateinitiative.org/', 'Clearing eligible records'),
  ada: L('ADA.gov', 'https://www.ada.gov/', 'U.S. Department of Justice')
};
const JOURNAL = [
  { id: 'j1', tp: 'moud', src: 'NIDA', min: 3, t: 'Your medication is part of your recovery', dek: 'Buprenorphine, methadone and naltrexone are proven treatments. Here’s why staying on them matters.',
    take: ['Taking medication as prescribed is recovery. It’s not trading one drug for another.', 'In large studies, staying on buprenorphine or methadone is linked to a much lower risk of dying.', 'There’s no set end date. Any change to your dose is a decision you make with your prescriber.'],
    body: ['Opioid use disorder changes how the brain handles cravings, stress and reward. Medications for opioid use disorder (MOUD) act on the same receptors opioids do, which steadies cravings and withdrawal so you can focus on the rest of your life.',
      'There are three FDA-approved options. Buprenorphine and methadone activate opioid receptors in a steady, controlled way. Naltrexone blocks them. Your prescriber can help you weigh which fits you.',
      'The research is clear that these medicines save lives. Large studies have found that people who stay on buprenorphine or methadone have a far lower risk of dying from overdose than people who don’t receive medication.',
      'Stopping early is one of the riskiest moments in recovery, because tolerance drops quickly. If you’re thinking about tapering, talk with your prescriber first and make a plan together. Many people stay on medication for years, and that’s okay.'],
    srcs: ['nidaMoud', 'medline'] },
  { id: 'j2', tp: 'safety', src: 'CDC', min: 3, t: 'After a break, your body has changed', dek: 'Why the first use after time away is the most dangerous, and what keeps you safer.',
    take: ['Tolerance can drop within days. A dose you used to take can now stop your breathing.', 'Fentanyl is in much of the street supply, often where you don’t expect it.', 'Keep naloxone at home and with you, and tell the people close to you where it is.'],
    body: ['Tolerance is your body’s adjustment to opioids. When you stop, after detox, a hospital stay, jail or a stretch of recovery, it falls quickly. Cravings and the memory of your old dose don’t.',
      'That gap is why overdose risk is highest right after a period of not using. Fentanyl makes it worse: it’s far stronger than heroin and is often mixed into other drugs, including pressed pills.',
      'Mixing opioids with alcohol, benzodiazepines or sleep medicine raises the risk further, because they all slow breathing.',
      'If a lapse happens, you are still worth protecting. Don’t use alone. The Never Use Alone line (800-484-3731) stays on the phone and sends help if you stop responding. Carry naloxone (Narcan) and teach someone you live with how to use it. Then reach out to your care team.'],
    srcs: ['cdc', 'nua'] },
  { id: 'j3', tp: 'recovery', src: 'RRI', min: 2, t: 'Recovery is more than not using', dek: 'Why your faith, family, friends and work are part of treatment, not extras.',
    take: ['Researchers call the strengths you build “recovery capital.”', 'More recovery capital is linked to staying in recovery longer.', 'Small, steady steps in any area of life add up.'],
    body: ['Stopping opioid use is a big part of recovery, but it isn’t the whole picture. SAMHSA describes recovery as a process of change built on four dimensions: health, a stable home, purpose and community.',
      'Researchers use the term recovery capital for the inner and outer resources that support recovery: your health and coping skills, your relationships, a role that gives your days purpose, and a community that welcomes you. People with more recovery capital tend to stay in recovery longer.',
      'That’s why Rudra asks about four parts of life each week: faith and meaning, family, friends and work. You don’t need all four to be strong. You just need to keep tending them, one small step at a time.'],
    srcs: ['rri', 'samhsa'] },
  { id: 'j4', tp: 'faith', src: 'RRI', min: 3, t: 'Faith, meaning and recovery', dek: 'For many people, a spiritual life is a source of strength. Here’s how to make it yours.',
    take: ['Many people in recovery say faith or a sense of meaning helps them stay steady.', 'You don’t have to be religious. Meaning can come from values, service, nature or community.', 'Faith-based and secular support groups both help. Choose the one that feels like home.'],
    body: ['Recovery often raises big questions. Who am I now? What do I owe the people I hurt? What’s worth staying in recovery for? Faith traditions have wrestled with these questions for a long time, which is one reason many people find strength in them.',
      'Research on mutual-help groups suggests that spiritual practice can help some people, and that much of the benefit comes from the people around you: a community that expects you, notices when you’re missing and believes you can change.',
      'If you have a faith, there are recovery communities rooted in Christian, Muslim, Jewish and Buddhist traditions. If you don’t, groups like SMART Recovery are secular. Both are valid paths.',
      'If past experiences with religion were painful, you don’t have to go back to them. Meaning can also come from your values, from service, from nature or from quiet reflection.'],
    srcs: ['rriHome', 'rd', 'smart'] },
  { id: 'j5', tp: 'family', src: 'PEA', min: 3, t: 'Rebuilding trust at home', dek: 'Apologies open the door. Steady actions over time are what bring trust back.',
    take: ['Trust usually returns slowly, through actions more than words.', 'Let your family set the pace. Their caution is normal.', 'Family members heal too, and they deserve support of their own.'],
    body: ['Addiction affects the whole family. Loved ones may feel hurt, angry, scared or worn out from worry, sometimes all at once. Those feelings don’t mean they’ve given up on you.',
      'Most families find that trust comes back through small, repeated actions: showing up when you said you would, being honest about hard days, keeping appointments. Big promises can feel like pressure. Small, kept ones build credibility.',
      'When you’re ready to make amends, keep it simple: name what happened, say you’re sorry and don’t ask for anything in return. Your counselor can help you plan it.',
      'Your family may benefit from support of their own. Programs based on CRAFT (Community Reinforcement and Family Training) teach loved ones skills for their own wellbeing and for communicating with you, and groups like Nar-Anon offer peer support for families.'],
    srcs: ['pea', 'naranon', 'smart'] },
  { id: 'j6', tp: 'friends', src: 'FVR', min: 2, t: 'Building friendships that support recovery', dek: 'Loneliness is a known risk in recovery. A few good connections can change that.',
    take: ['Feeling lonely or isolated is a common trigger for cravings.', 'Support from peers who’ve been there is linked to better outcomes.', 'You can care about friends who still use while keeping your distance.'],
    body: ['Early recovery can be lonely. Old friendships may have revolved around using, and new ones take time. Loneliness is painful, and it can make cravings harder to manage.',
      'Mutual-help meetings, peer recovery specialists and recovery community centers are good places to start. People there understand what you’re going through without needing an explanation.',
      'New friendships grow best in small, regular doses: the same meeting each week, the same gym class, a standing coffee. Repetition turns familiar faces into friends.',
      'Friends who still use are harder. You can care about them and still decide not to see them for now. A simple line helps: “I can’t be around it right now, but call me when you’re sober.”'],
    srcs: ['fvr', 'rriHome'] },
  { id: 'j7', tp: 'work', src: 'EEOC', min: 3, t: 'Work, your rights and recovery', dek: 'What US law generally protects, what it doesn’t, and where to get free advice.',
    take: ['People in recovery, including those on prescribed MOUD, are generally protected under the ADA.', 'Current illegal drug use is not protected.', 'You don’t have to tell your employer you’re in recovery.'],
    body: ['Work can give your days structure, income and purpose. It can also bring stress, long shifts and cash on payday, so it’s worth planning for.',
      'Under the Americans with Disabilities Act (ADA), employers with 15 or more employees generally can’t discriminate against people in recovery from opioid use disorder, including people taking medication as prescribed. The protection doesn’t cover current illegal drug use, and some safety-sensitive jobs have extra testing rules.',
      'You may be able to ask for a reasonable accommodation, such as a schedule change for appointments or dosing. The Family and Medical Leave Act (FMLA) may give eligible workers unpaid, job-protected leave for treatment.',
      'Employee Assistance Programs (EAPs) are usually free and confidential. For questions about your situation, the Job Accommodation Network (JAN) offers free, confidential guidance. This is general information, not legal advice.'],
    srcs: ['eeoc', 'jan', 'fmla'] },
  { id: 'j8', tp: 'recovery', src: 'RRI', min: 2, t: 'Words matter: talking about recovery without stigma', dek: 'The words we use shape how people are treated, including how we treat ourselves.',
    take: ['“Person with opioid use disorder” puts the person first.', 'Say “medication” or “treatment,” not “replacement.”', 'Be gentle with the words you use about yourself, too.'],
    body: ['Labels like “addict” or “junkie” shrink a whole person down to one part of their life. Research has found that this kind of language can even change how clinicians judge a person’s situation.',
      'Person-first language, like “a person with opioid use disorder” or “a person in recovery,” keeps the focus on the human being. Saying “medication” rather than “replacement therapy” reflects what MOUD is: treatment for a medical condition.',
      'Some people in 12-step groups choose to call themselves addicts, and that’s their right. What matters is that you have a choice, and that your words about yourself are honest and kind.'],
    srcs: ['addictionary'] },
  { id: 'j9', tp: 'safety', src: 'SAMHSA', min: 2, t: 'If a lapse happens', dek: 'A lapse doesn’t erase your progress. Here’s what to do in the next 24 hours.',
    take: ['Get safe first: naloxone nearby, never alone.', 'Tell someone: your person, your prescriber or a peer.', 'Look at what led up to it, without blaming yourself.'],
    body: ['Many people have a lapse on the way to long-term recovery. It can bring shame, and shame makes it harder to reach out. Try to treat it the way you’d treat a friend’s: as a hard moment, not proof that you’ve failed.',
      'Safety comes first. Your tolerance may be lower than you think. Keep naloxone nearby and don’t use alone.',
      'Then tell someone. Your prescriber needs to know, especially if you’re on medication. Their job is to help you get steady, not to punish you. A peer specialist or your person can help you through the day.',
      'Later, when things are calmer, look at what led up to it: a place, a feeling, a person, a stretch without sleep. That’s useful information for your plan.'],
    srcs: ['helpline', 'cdc'] },
  { id: 'j10', tp: 'health', src: 'CDC', min: 2, t: 'Health checkups worth asking about', dek: 'A few simple tests and visits that protect your health in recovery.',
    take: ['Ask about hepatitis C and HIV testing. Both are treatable, and hepatitis C is often curable.', 'Ask whether you’re due for hepatitis A and B vaccines.', 'Dental and primary care visits count as recovery care too.'],
    body: ['Opioid use can affect health in ways that are easy to miss, especially if you ever injected drugs or shared supplies. Many conditions have no symptoms for years.',
      'CDC recommends that all adults get tested for hepatitis C at least once, and that people with ongoing risk test regularly. Today’s hepatitis C medicines cure most people in a few months. HIV testing is recommended at least once for everyone 13 to 64, and more often for people at higher risk.',
      'Your care team can also check whether you need hepatitis A or B vaccines, and help you catch up on dental care, which often slips during active use.',
      'Community health centers offer care on a sliding fee scale, whether or not you have insurance.'],
    srcs: ['gettested', 'hepc', 'hrsa'] },
  { id: 'j11', tp: 'health', src: 'NIDA', min: 2, t: 'Sleep in early recovery', dek: 'Bad nights are common at first. Small, steady habits help them get better.',
    take: ['Sleep problems are common in early recovery and usually improve over time.', 'A steady bedtime and wake time help more than anything else.', 'Ask your prescriber before taking any sleep aid.'],
    body: ['Many people sleep badly for weeks or months after stopping opioids. That doesn’t mean recovery isn’t working, but poor sleep can make cravings and moods harder.',
      'The habits that help most are simple: the same bedtime and wake time every day, a dark and cool room, no screens for the last half hour, and less caffeine after lunch.',
      'Some sleep medicines and supplements can be risky alongside opioids or MOUD, because they also slow breathing. Ask your prescriber before trying anything new.',
      'If you’re awake for a long time, get up and do something calm in low light until you feel sleepy again.'],
    srcs: ['nidaOp', 'medline'] },
  { id: 'j12', tp: 'housing', src: 'SAMHSA', min: 2, t: 'Finding a safe place to live', dek: 'A stable home is one of the strongest supports for recovery.',
    take: ['Recovery residences offer a substance-free home with peer support.', 'Ask whether a residence accepts people on medication like buprenorphine or methadone.', '211 and findhelp.org can connect you with emergency and rental help.'],
    body: ['Where you live affects almost everything in recovery: sleep, safety, stress and who you see every day. A stable home is one of the four dimensions of recovery SAMHSA describes.',
      'Recovery residences, sometimes called sober living, offer a substance-free home with house rules and peer support. Quality varies. Residences certified by a state affiliate of the National Alliance for Recovery Residences follow published standards.',
      'Before you move in, ask whether the home accepts residents taking prescribed medication for opioid use disorder. You shouldn’t have to choose between your medication and a place to live.',
      'If you need emergency shelter or help with rent and utilities, call 211 or search findhelp.org by ZIP code.'],
    srcs: ['narr', 'oxford', 'findhelp'] },
  { id: 'j13', tp: 'legal', src: 'LAC', min: 3, t: 'Legal help and your rights', dek: 'Free legal aid exists, and recovery comes with real protections.',
    take: ['Free legal aid programs help with housing, benefits, family and record issues.', 'People in recovery, including those on MOUD, have protections under federal disability law.', 'Most states have Good Samaritan laws for people who call 911 for an overdose.'],
    body: ['Legal problems are common in recovery and can feel overwhelming. You don’t have to handle them alone, and many kinds of help are free.',
      'Legal aid programs help people with low incomes with housing, benefits, family, debt and some record issues. LawHelp.org lists programs by state.',
      'Federal disability law generally protects people in recovery, including people taking medication as prescribed, from discrimination in housing, jobs and public services. Current illegal drug use isn’t protected.',
      'Most states have Good Samaritan laws that protect people who call 911 for an overdose from some drug charges. Many states also let people clear or seal certain old records. Rules vary by state. This is general information, not legal advice.'],
    srcs: ['lawhelp', 'lac', 'cleanslate'] }

];
const PODS = [
  { n: 'Dopey', h: 'Recovery stories', c: '#3D3A4E', w: 'Funny, raw and honest stories about drug addiction and recovery, many about opioids.', tp: ['recovery'], warn: 'Strong language' },
  { n: 'That Sober Guy', h: 'Shane Ramer', c: '#2F6E8F', w: 'Long-form interviews with people in recovery about rebuilding life, work and relationships.', tp: ['recovery', 'friends'] },
  { n: 'The Addicted Mind', h: 'Duane Osterlind, LMFT', c: '#6B4F8A', w: 'A therapist explains the psychology of addiction, trauma and recovery, including for families.', tp: ['recovery', 'family', 'mind'] },
  { n: 'Let’s Talk Addiction & Recovery', h: 'Hazelden Betty Ford', c: '#2E5E4E', w: 'Clinicians and people in recovery on treatment, medication, families and staying well.', tp: ['recovery', 'moud', 'family'] },
  { n: 'Recovery Elevator', h: 'Paul Churchill', c: '#B5635A', w: 'Weekly stories of people rebuilding their lives. Mostly about alcohol, but the lessons travel.', tp: ['recovery'] },
  { n: 'Ten Percent Happier', h: 'Dan Harris', c: '#C98A2B', w: 'Practical meditation and mental health conversations. Good for stress and cravings.', tp: ['health', 'mind'] },
  { n: 'On Being', h: 'Krista Tippett', c: '#4E6E54', w: 'Conversations about faith, meaning and what it means to be human, across traditions.', tp: ['faith'] },
  { n: 'The Happiness Lab', h: 'Dr. Laurie Santos', c: '#3F6E99', w: 'A Yale psychologist on what research says about wellbeing, including friendship and loneliness.', tp: ['friends', 'mind'] },
  { n: 'WorkLife with Adam Grant', h: 'Adam Grant', c: '#5A5F8E', w: 'An organizational psychologist on finding purpose, motivation and better days at work.', tp: ['work'] }
];
const BOOKS = [
  { n: 'Unbroken Brain', a: 'Maia Szalavitz', y: 2016, c: '#2D5B8A', w: 'Addiction understood as a learning disorder, not a moral failing. Hopeful and evidence-based.', tp: ['recovery'] },
  { n: 'Undoing Drugs', a: 'Maia Szalavitz', y: 2021, c: '#4A6A3A', w: 'The history and science of harm reduction, and why keeping people alive comes first.', tp: ['safety', 'recovery'] },
  { n: 'Dopesick', a: 'Beth Macy', y: 2018, c: '#8A4F6B', w: 'How the opioid crisis reached ordinary families and towns. Context that helps with self-blame.', tp: ['recovery'], warn: 'Hard subject matter' },
  { n: 'Raising Lazarus', a: 'Beth Macy', y: 2022, c: '#A87C2E', w: 'The people fighting for treatment, MOUD and recovery in their communities.', tp: ['moud', 'recovery'] },
  { n: 'Dreamland', a: 'Sam Quinones', y: 2015, c: '#5A5F8E', w: 'The story behind the opioid epidemic, told through the people and places it touched.', tp: ['recovery'], warn: 'Hard subject matter' },
  { n: 'In the Realm of Hungry Ghosts', a: 'Gabor Maté', y: 2008, c: '#6B4F8A', w: 'A physician’s compassionate look at addiction, pain and trauma.', tp: ['mind', 'recovery'] },
  { n: 'Dopamine Nation', a: 'Anna Lembke', y: 2021, c: '#B5635A', w: 'A Stanford psychiatrist explains the brain’s pleasure-pain balance in plain language.', tp: ['health', 'mind'] },
  { n: 'The Body Keeps the Score', a: 'Bessel van der Kolk', y: 2014, c: '#3F6E99', w: 'How trauma lives in the body, and paths to healing.', tp: ['health', 'mind'], warn: 'Hard subject matter' },
  { n: 'Narcotics Anonymous (Basic Text)', a: 'Narcotics Anonymous World Services', y: 1983, c: '#2F4A5E', w: 'The core book of the NA fellowship, written by members in recovery.', tp: ['recovery', 'faith'] },
  { n: 'Recovery Dharma', a: 'Recovery Dharma Collective', y: 2019, c: '#7FA488', w: 'A Buddhist-inspired path to recovery through meditation and community. Free online.', tp: ['faith', 'friends'], u: 'https://recoverydharma.org/' },
  { n: 'Breathing Under Water', a: 'Richard Rohr', y: 2011, c: '#C98A5E', w: 'A Franciscan priest reads the Twelve Steps alongside Christian spirituality.', tp: ['faith'] },
  { n: 'Addiction and Grace', a: 'Gerald G. May', y: 1988, c: '#8E6620', w: 'A psychiatrist and spiritual writer on attachment, freedom and grace.', tp: ['faith'] },
  { n: 'Man’s Search for Meaning', a: 'Viktor E. Frankl', y: 1946, c: '#3D3A4E', w: 'A short classic on finding purpose through the hardest circumstances.', tp: ['faith', 'work'] },
  { n: 'Beyond Addiction', a: 'Foote, Wilkens & Kosanke', y: 2014, c: '#3F6E99', w: 'For families: the science-based CRAFT approach to helping a loved one, with kindness.', tp: ['family'] },
  { n: 'Beautiful Boy', a: 'David Sheff', y: 2008, c: '#A9564D', w: 'A father’s memoir of his son’s addiction. Helps family members feel less alone.', tp: ['family'] },
  { n: 'Together', a: 'Vivek H. Murthy', y: 2020, c: '#2E5E4E', w: 'A former U.S. Surgeon General on loneliness and the healing power of connection.', tp: ['friends'] },
  { n: 'Lost Connections', a: 'Johann Hari', y: 2018, c: '#6E7F8E', w: 'How disconnection from people and meaning feeds depression, and how to reconnect.', tp: ['friends', 'mind'] },
  { n: 'Designing Your Life', a: 'Bill Burnett & Dave Evans', y: 2016, c: '#4E6E54', w: 'A practical way to figure out work that fits the person you’re becoming.', tp: ['work'] }
];
const SITES = [
  { g: 'Find treatment', tp: ['safety', 'moud'], items: [
    { n: 'FindTreatment.gov', d: 'Find treatment and MOUD providers near you', u: 'https://findtreatment.gov/', c: '#2D5B8A' }] },
  { g: 'Health', tp: ['health'], items: [
    { n: 'Find a Health Center', d: 'Care on a sliding fee scale', u: 'https://findahealthcenter.hrsa.gov/', c: '#3F6E99' },
    { n: 'HealthCare.gov', d: 'Health insurance and Medicaid', u: 'https://www.healthcare.gov/', c: '#2D5B8A' },
    { n: 'CDC: Get tested', d: 'Free and low-cost HIV and hepatitis testing', u: 'https://gettested.cdc.gov/', c: '#1F6F78' },
    { n: 'NAMI', d: 'Mental health support · HelpLine 1-800-950-6264', u: 'https://www.nami.org/', c: '#6B4F8A' },
    { n: 'SNAP food benefits', d: 'Help buying groceries', u: 'https://www.fns.usda.gov/snap', c: '#4E6E54' }] },
  { g: 'Housing', tp: ['housing'], items: [
    { n: 'National Alliance for Recovery Residences', d: 'Certified recovery housing by state', u: 'https://narronline.org/', c: '#A87C2E' },
    { n: 'Oxford House', d: 'Self-run recovery homes and vacancies', u: 'https://www.oxfordhouse.org/', c: '#587A5E' },
    { n: '211', d: 'Shelter, rent and utility help', u: 'https://www.211.org/', c: '#5A5F8E' },
    { n: 'findhelp.org', d: 'Free and reduced-cost help by ZIP code', u: 'https://www.findhelp.org/', c: '#B5635A' }] },
  { g: 'Legal', tp: ['legal'], items: [
    { n: 'LawHelp.org', d: 'Free legal aid in your state', u: 'https://www.lawhelp.org/', c: '#2D5B8A' },
    { n: 'Legal Action Center', d: 'Rights in recovery, MOUD and records', u: 'https://www.lac.org/', c: '#8A4F6B' },
    { n: 'Clean Slate Initiative', d: 'Clearing eligible records', u: 'https://www.cleanslateinitiative.org/', c: '#4E6E54' },
    { n: 'ADA.gov', d: 'Disability rights, including recovery', u: 'https://www.ada.gov/', c: '#5A5F8E' }] },
  { g: 'Learn about OUD and treatment', tp: ['moud', 'recovery', 'safety'], items: [
    { n: 'NIDA: Opioids', d: 'Federal research on opioids, addiction and treatment', u: 'https://nida.nih.gov/research-topics/opioids', c: '#2D5B8A' },
    { n: 'NIDA: Medications for OUD', d: 'How buprenorphine, methadone and naltrexone work', u: 'https://nida.nih.gov/publications/research-reports/medications-to-treat-opioid-addiction/overview', c: '#2D5B8A' },
    { n: 'CDC: Stop Overdose', d: 'Fentanyl, naloxone and overdose prevention', u: 'https://www.cdc.gov/stop-overdose/', c: '#1F6F78' },
    { n: 'Recovery Research Institute', d: 'Plain-language recovery science from Mass General', u: 'https://www.recoveryanswers.org/', c: '#8A4F6B' },
    { n: 'MedlinePlus', d: 'National Library of Medicine health guide on opioids', u: 'https://medlineplus.gov/opioidmisuseandaddiction.html', c: '#3F6E99' },
    { n: 'ASAM', d: 'American Society of Addiction Medicine', u: 'https://www.asam.org/', c: '#6B4F8A' },
    { n: 'Shatterproof', d: 'Guides to quality addiction treatment and stigma', u: 'https://www.shatterproof.org/', c: '#B5635A' },
    { n: 'Hazelden Betty Ford', d: 'Articles on recovery, families and wellness', u: 'https://www.hazeldenbettyford.org/', c: '#2E5E4E' }] },
  { g: 'Recovery communities', tp: ['friends', 'faith', 'recovery'], items: [
    { n: 'Faces & Voices of Recovery', d: 'Find a recovery community center near you', u: 'https://facesandvoicesofrecovery.org/', c: '#A87C2E' },
    { n: 'Narcotics Anonymous', d: 'Meeting search, in person and online', u: 'https://www.na.org/meetingsearch/', c: '#2F4A5E' },
    { n: 'SMART Recovery', d: 'Secular, science-based meetings', u: 'https://smartrecovery.org/', c: '#3F6E99' },
    { n: 'Recovery Dharma', d: 'Meditation-based peer support', u: 'https://recoverydharma.org/', c: '#7FA488' },
    { n: 'Celebrate Recovery', d: 'Christ-centered recovery groups', u: 'https://www.celebraterecovery.com/', c: '#C98A5E' },
    { n: 'Millati Islami', d: 'Recovery fellowship grounded in Islam', u: 'https://www.millatiislami.org/', c: '#4E6E54' },
    { n: 'Beit T’Shuvah', d: 'Jewish recovery community', u: 'https://beittshuvah.org/', c: '#5A5F8E' }] },
  { g: 'For families', tp: ['family'], items: [
    { n: 'Partnership to End Addiction', d: 'Free support for families, including one-on-one guidance', u: 'https://drugfree.org/', c: '#B5635A' },
    { n: 'Nar-Anon Family Groups', d: 'Peer support for families and friends', u: 'https://www.nar-anon.org/', c: '#A9564D' },
    { n: 'SMART Recovery Family & Friends', d: 'CRAFT-based meetings for loved ones', u: 'https://smartrecovery.org/', c: '#3F6E99' }] },
  { g: 'Work and purpose', tp: ['work'], items: [
    { n: 'Job Accommodation Network', d: 'Free, confidential advice on accommodations', u: 'https://askjan.org/', c: '#4E6E54' },
    { n: 'EEOC: opioids and your job', d: 'Your rights at work if you take opioid medication', u: 'https://www.eeoc.gov/laws/guidance/use-codeine-oxycodone-and-other-opioids-information-employees', c: '#5A5F8E' },
    { n: 'DOL: Recovery-Ready Workplace', d: 'What recovery-friendly employers do', u: 'https://www.dol.gov/agencies/eta/RRW', c: '#2D5B8A' },
    { n: 'Family and Medical Leave Act', d: 'Job-protected leave for treatment, if eligible', u: 'https://www.dol.gov/agencies/whd/fmla', c: '#2D5B8A' },
    { n: 'CareerOneStop', d: 'Job search, training and American Job Centers', u: 'https://www.careeronestop.org/', c: '#1F6F78' },
    { n: 'Honest Jobs', d: 'Fair-chance jobs for people with records', u: 'https://www.honestjobs.com/', c: '#A87C2E' },
    { n: 'VolunteerMatch', d: 'Volunteer roles near you or online', u: 'https://www.volunteermatch.org/', c: '#7FA488' }] }
];

const _relTag = a => [...new Set(a.map(t => t === 'family' || t === 'friends' ? 'rel' : t))];
JOURNAL.forEach(j => { if (j.tp === 'family' || j.tp === 'friends') j.tp = 'rel'; if (j.cta && (j.cta[0] === 'family' || j.cta[0] === 'friends')) j.cta = ['rel', 'Open Relationships']; });
PODS.forEach(p => p.tp = _relTag(p.tp)); BOOKS.forEach(b => b.tp = _relTag(b.tp)); SITES.forEach(g => g.tp = _relTag(g.tp));

  const CM = {};
  const chev = () => '';
  const host = u => { try { return new URL(u).hostname.replace(/^www\./, ''); } catch (e) { return ''; } };
  const initials = s => s.replace(/[^A-Za-z0-9 ]/g, '').split(' ').filter(Boolean).slice(0, 2).map(w => w[0]).join('').toUpperCase();
  const hasLink = id => !!LK[id];
  const tagName = t => (TOPICS.find(x => x[0] === t) || [, t])[1];
  const closeIf = el => { if (el.dataset.close) $$('.layer').forEach(popLayer); };

  /* ── layers ── */
  function cmLayer(inner, tone = '', label = '') {
    const l = pushLayer(`<div class="zcm-lay ${tone}"><div class="zcm-ltop"><button class="zcm-x" data-act="close-layer" aria-label="Close">${ic('x', 20)}</button>${label ? `<span>${label}</span>` : ''}<span style="width:40px"></span></div><div class="zcm-lin" style="display:flex;flex-direction:column;flex:1">${inner}</div></div>`);
    return l;
  }
  const setLay = (l, inner) => { const b = $('.zcm-lin', l); if (b) { b.innerHTML = inner; l.scrollTop = 0; } };
  const helpBtn = () => `<button class="zcm-help" data-act="help" aria-label="Get help">${ic('life', 18, 1.9)}<span>Help</span></button>`;
  function cardsFlow({ tone, label, h, p, cards, foot = '' }) {
    cmLayer(`<h1 class="zcm-lh">${h}</h1>${p ? `<p class="zcm-lp">${p}</p>` : ''}${cards.map(([t, d]) => `<div class="zcm-card"><small>${esc(t)}</small>${esc(d)}</div>`).join('')}${foot}
      <div class="zcm-fill"></div><button class="btn" data-act="close-layer">Done</button>`, tone, label);
  }

  /* ── article reader ── */
  function reader(id) {
    const j = JOURNAL.find(x => x.id === id); if (!j) return;
    if (!S.resRead.includes(id)) { S.resRead.push(id); save(); }
    const on = S.resSaved.includes(id);
    cmLayer(`<article class="zrd"><div class="zrd-meta"><span class="src" style="background:${SRC[j.src].c}">${j.src}</span>${tagName(j.tp)} · ${j.min} min read</div>
      <h1>${esc(j.t)}</h1><p class="dek">${esc(j.dek)}</p>
      <div class="zrd-take"><small>The short version</small><ul>${j.take.map(t => `<li>${esc(t)}</li>`).join('')}</ul></div>
      <div class="zrd-body">${j.body.map(p => `<p>${esc(p)}</p>`).join('')}</div>
      <div class="zrd-srcs"><small>Sources</small>${j.srcs.filter(hasLink).map(s => `<a href="${LK[s].u}" target="_blank" rel="noopener"><div>${esc(LK[s].t)}<span>${esc(LK[s].s)}</span></div>${ic('ext', 16, 1.8)}</a>`).join('')}
      <p class="zcm-src">Written by Rudra for people in recovery. General information, not medical advice. Talk with your care team about your own treatment.</p></div>
      <div class="zrd-bar"><button class="btn ${on ? '' : 'ghost'}" data-act="zrc-save" data-id="${id}" data-in="1">${on ? 'Saved' : 'Save'}</button><button class="btn" data-act="close-layer">Done</button></div></article>`, '', 'Article');
  }

  /* ═════════ v47: COMMUNITY ROOM ═════════
     A moderated feed for people in treatment at the same center. Posts are reviewed by a peer specialist before
     others see them; comments go live and the moderator can remove them. Tabs: Room · Meetings · 1:1 Support · Events. */
  const NA_URL = 'https://na.org/meetingsearch/', ARCO_URL = 'https://facesandvoicesofrecovery.org/arco-members-on-the-map/', PHX_URL = 'https://thephoenix.org/explore-events';
  const MOD = { n: 'Jordan', role: 'Peer Recovery Specialist', c: '#3F6E99', mod: true };
  const center = () => (S.clinic && S.clinic.name) || 'Riverside Recovery Center';
  const TAGS = { win: ['Win', 'zpt-work'], support: ['Needs support', 'zpt-family'], question: ['Question', 'zpt-friends'], grat: ['Gratitude', 'zpt-faith'], note: ['From the moderator', 'zpt-friends'] };
  const PROMPT = { win: 'What went right today? Big or small.', support: 'What’s hard right now? The room is here for you.', question: 'What would you like to ask people who’ve been there?', grat: 'What are you grateful for today?' };
  const MIN = 6e4, HR = 36e5, DAY = 864e5;
  const ago = ts => { const d = Date.now() - ts; return d < MIN ? 'Just now' : d < HR ? Math.round(d / MIN) + 'm' : d < DAY ? Math.round(d / HR) + 'h' : Math.round(d / DAY) + 'd'; };
  const me = () => ({ n: S.name || 'You', c: '#6C9FCC', me: true, day: S.day });
  let _cid = 0; const cid = () => 'c' + Date.now().toString(36) + (++_cid);
  const C = (by, t, mins, cheers = 0, replies = []) => ({ id: cid(), by, t, ts: Date.now() - mins * MIN, cheers, cheered: false, replies });
  const P_ = (id, by, tag, t, mins, cheers, comments, x = {}) => ({ id, by, tag, t, ts: Date.now() - mins * MIN, cheers, cheered: false, status: 'live', comments, ...x });
  function seedRoom() {
    const maria = { n: 'Maria', c: '#C98A5E', day: 212 }, dee = { n: 'Dee', c: '#7FA488', day: 9 }, jay = { n: 'Jay', c: '#5B8FC0', day: 41 }, sam = { n: 'Sam', c: '#8E7CB8', day: 530 }, tasha = { n: 'Tasha', c: '#B5635A', day: 63 };
    return [
      P_('pin', MOD, 'note', `Welcome to the Community Room. This is a space for people in care at ${center()} to cheer each other on. This week’s question: what’s one small thing that helped you this week? Reply below.`, 60 * 30, 34,
        [C(sam, 'Getting to bed before midnight. Sounds small, but my mornings are so much better.', 60 * 20, 9), C(tasha, 'Walking to my dosing appointment instead of taking the bus. Clears my head.', 60 * 6, 5)], { pinned: true }),
      P_('p1', dee, 'support', 'Rough night. Used the craving button twice and called my sponsor at 2 AM. Still here this morning.', 95, 61,
        [C(sam, 'Day 9 is hard. You did exactly the right thing, twice.', 80, 14, [C(dee, 'Thank you. I needed to hear that.', 70, 4)]), C(jay, 'Proud of you. Calling at 2 AM takes guts.', 40, 6), C(MOD, 'Dee, I’ll check in with you today. If nights stay hard, let’s add it to your plan with your counselor.', 30, 8)]),
      P_('p2', maria, 'win', 'Had dinner with my daughter for the first time in two years. She hugged me at the door. Keep going, everyone.', 60 * 5, 48,
        [C(dee, 'This made me tear up. So happy for you.', 60 * 4, 7), C(MOD, 'Maria, this is what rebuilding trust looks like. Thank you for sharing it with the room.', 60 * 3, 11, [C(maria, 'Thank you, Jordan.', 60 * 2, 2)])]),
      P_('p3', jay, 'question', 'For those who work: how did you ask your job for time off for appointments? I start a new job Monday and I’m nervous about it.', 60 * 9, 19,
        [C(sam, 'I went to HR, not my manager, and said I had a medical appointment every Tuesday morning. That was it. Nobody asked more.', 60 * 8, 12), C(MOD, 'Great question, Jay. Check Your life, then Work & purpose, for a short guide on your rights and what to say.', 60 * 7, 6)]),
      P_('p4', tasha, 'grat', 'Went back to church on Sunday for the first time in years. Nobody judged me. I sat in the back and cried a little and that was okay.', 60 * 26, 40, [C(maria, 'That took courage. Glad you went.', 60 * 25, 5)]),
      P_('p5', sam, 'win', 'Started volunteering at the food bank on Saturdays. Being useful to someone else quiets my head more than anything.', 60 * 50, 22, [])
    ];
  }
  const RM = { rt: 'feed', f: 'all', open: {}, reply: {} };
  const posts = () => S.room.posts.filter(p => !S.room.hidden.includes(p.id) && (p.status === 'live' || p.by.me));
  const findC = (list, id) => { for (const c of list) { if (c.id === id) return c; const r = findC(c.replies || [], id); if (r) return r; } return null; };
  const ncom = p => p.comments.reduce((a, c) => a + 1 + (c.replies || []).length, 0);
  const av = (by, s = 40) => `<span class="zrm-av" style="width:${s}px;height:${s}px;background:${by.c};font-size:${Math.round(s * .4)}px">${esc((by.anon ? '?' : by.n).charAt(0))}</span>`;
  const who = by => by.anon ? 'Anonymous member' : esc(by.n);
  const badge = by => by.mod ? `<span class="zrm-modb">${ic('shield', 11, 2.4)}Moderator</span>` : by.me ? '<span class="zrm-you">You</span>' : '';

  function commentHTML(p, c, depth) {
    return `<div class="zrm-c ${depth ? 'rep' : ''}">${av(c.by, depth ? 26 : 32)}<div class="zrm-cw"><div class="zrm-cb ${c.by.mod ? 'mod' : ''}"><b>${who(c.by)}${badge(c.by)}</b><p>${esc(c.t)}</p></div>
      <div class="zrm-ca"><span>${ago(c.ts)}</span><button class="${c.cheered ? 'on' : ''}" data-act="zrm-ccheer" data-p="${p.id}" data-c="${c.id}" aria-pressed="${c.cheered}">${c.cheered ? 'Cheered' : 'Cheer'}${c.cheers + (c.cheered ? 1 : 0) ? ` · ${c.cheers + (c.cheered ? 1 : 0)}` : ''}</button>${depth ? '' : `<button data-act="zrm-reply" data-p="${p.id}" data-c="${c.id}">Reply</button>`}${c.by.me ? `<button data-act="zrm-cdel" data-p="${p.id}" data-c="${c.id}">Delete</button>` : ''}</div>
      ${(c.replies || []).map(r => commentHTML(p, r, 1)).join('')}</div></div>`;
  }
  function postHTML(p) {
    const tg = TAGS[p.tag], n = ncom(p), cheers = p.cheers + (p.cheered ? 1 : 0);
    return `<article class="zrm-post ${p.pinned ? 'pin' : ''} ${p.status === 'pending' ? 'pend' : ''}" id="zrp-${p.id}">
      ${p.status === 'pending' ? `<div class="zrm-pendl">${ic('clock', 14, 2.2)}<span><b>Waiting for ${MOD.n} to review.</b> Only you can see this for now.${p.flag ? ' Jordan has been told you may need support today.' : ''}</span></div>` : ''}
      <header class="zrm-ph">${av(p.by)}<div><b>${who(p.by)}${p.by.mod ? '' : badge(p.by)}</b><small>${p.by.mod ? MOD.role : p.by.day ? 'Day ' + p.by.day : 'Member'} · ${ago(p.ts)}</small></div><button class="zrm-more" data-act="zrm-menu" data-p="${p.id}" aria-label="More options for this post">${ic('more', 20, 1.8)}</button></header>
      ${p.pinned ? '' : `<span class="zrm-tag ${tg[1]}">${tg[0]}</span>`}
      <p class="zrm-txt">${esc(p.t)}</p>
      <div class="zrm-acts"><button class="${p.cheered ? 'on' : ''}" data-act="zrm-cheer" data-p="${p.id}" aria-label="${p.cheered ? 'Cheered' : 'Cheer'}: ${cheers}" aria-pressed="${p.cheered}" ${p.status === 'pending' ? 'disabled' : ''}>${ic('heart', 19, 1.9)}<span class="zrm-n">${cheers}</span></button><button data-act="zrm-focus" data-p="${p.id}" aria-label="Comments: ${n}" ${p.status === 'pending' ? 'disabled' : ''}>${ic('chat', 19, 1.9)}<span class="zrm-n">${n}</span></button></div>
    </article>`;
  }
  let CS = null;   // the open comments sheet: { pid, l }
  function csInner(p) {
    const n = ncom(p), rep = RM.reply[p.id], rc = rep && findC(p.comments, rep);
    return `<span class="zrm-grab"></span><div class="zrm-cs-h"><h2>Comments</h2><span>${n}</span></div>
      <div class="zrm-cl" id="zrcl">${p.comments.length ? p.comments.map(c => commentHTML(p, c, 0)).join('') : `<p class="zrm-cs-empty">No comments yet. Be the first to cheer them on.</p>`}</div>
      <div class="zrm-in zrm-in-s">${av(me(), 32)}<div class="zrm-inw">${rc ? `<div class="zrm-repto">Replying to <b>${who(rc.by)}</b><button data-act="zrm-unreply" data-p="${p.id}" aria-label="Cancel reply">${ic('x', 13, 2.4)}</button></div>` : ''}
        <div class="zrm-inrow"><input id="zrin-${p.id}" type="text" maxlength="400" placeholder="${rc ? 'Write a reply…' : 'Write a kind comment…'}" aria-label="${rc ? 'Write a reply' : 'Write a comment'}" data-p="${p.id}" autocomplete="off"><button class="zrm-send" data-act="zrm-send" data-p="${p.id}" aria-label="Send">${ic('send', 17, 2)}</button></div></div></div>`;
  }
  function drawCS(keep) {
    if (!CS || !CS.l.isConnected) return (CS = null);
    const p = S.room.posts.find(x => x.id === CS.pid), sh = $('.zrm-csheet', CS.l); if (!p || !sh) return;
    const list = $('#zrcl', CS.l), y = list ? list.scrollTop : 0, draft = ($('#zrin-' + CS.pid, CS.l) || {}).value || '';
    sh.innerHTML = csInner(p); const nl = $('#zrcl', CS.l), inp = $('#zrin-' + CS.pid, CS.l);
    if (nl) nl.scrollTop = keep === 'end' ? nl.scrollHeight : y; if (inp && draft) inp.value = draft;
  }
  function openComments(pid, focus) {
    const p = S.room.posts.find(x => x.id === pid); if (!p || p.status === 'pending') return;
    delete RM.reply[pid];
    const l = pushLayer(`<div class="zrm-sheet zrm-csheet">${csInner(p)}</div>`, 'sheet-wrap');
    CS = { pid, l };
    l.addEventListener('click', e => { if (e.target === l) { popLayer(l); CS = null; } });
    if (focus) setTimeout(() => { const i = $('#zrin-' + pid, l); if (i) i.focus(); }, 350);
  }
  const redrawPost = (id, keep) => { const el = $('#zrp-' + id), p = S.room.posts.find(x => x.id === id); if (el && p) el.outerHTML = postHTML(p); if (CS && CS.pid === id) drawCS(keep); };

  function feedHTML() {
    const F = [['all', 'All'], ['win', 'Wins'], ['support', 'Support'], ['question', 'Questions'], ['grat', 'Gratitude'], ['mine', 'Mine']];
    const list = posts().filter(p => RM.f === 'all' || (RM.f === 'mine' ? p.by.me : p.tag === RM.f)).sort((a, b) => (b.pinned ? 1 : 0) - (a.pinned ? 1 : 0) || b.ts - a.ts);
    return `<div class="zrm-3 q4">${[['meet', 'Meetings', 'people', 'blue'], ['one', '1:1 Support', 'hand', 'coral'], ['events', 'Events', 'calendar', 'sage'], ['res', 'Resources', 'book', 'gold']].map(([k, l, i, c]) => `<button class="zrm-t3 zg-${c}" data-act="zrm-sub" data-k="${k}"><span class="zri">${ic(i, 24, 1.8)}</span><b>${l}</b></button>`).join('')}</div>
      <section class="zrm-room2 big"><div class="zrm-r2-h"><span class="zrm-r2-ic">${ic('chat', 26, 1.8)}</span><div class="zrm-r2-t"><h2>Community Room</h2><span class="zrm-r2-k">${ic('shield', 13, 2.2)}Moderated</span></div><button class="zrm-r2-g" data-act="zrm-rules" aria-label="Room guidelines">${ic('shield', 20, 2)}</button></div>
        <button class="zrm-compose2 tall" data-act="zrm-new" aria-label="Write a post">${av(me(), 36)}<span>What’s on your mind today? Share a win, a question or a hard moment…</span><em>${ic('plus', 20, 2.6)}</em></button></section>
      <div class="zrc-topics zrm-filter" role="tablist" aria-label="Filter posts">${F.map(([k, l]) => `<button class="zcm-chip ${RM.f === k ? 'on' : ''}" role="tab" aria-selected="${RM.f === k}" data-act="zrm-filter" data-k="${k}">${l}</button>`).join('')}</div>
      <div id="zrm-feed">${list.length ? list.map(postHTML).join('') : `<div class="zrc-empty">${ic('chat', 30, 1.6)}<b>${RM.f === 'mine' ? 'No posts yet' : 'Nothing here yet'}</b><button class="btn" style="margin-top:12px" data-act="zrm-new">Write a post</button></div>`}</div>`;
  }
  const extBtn = (u, label) => `<a class="btn zrm-extbtn" href="${u}" target="_blank" rel="noopener">${label}${ic('ext', 17, 2)}</a>`;
  /* Meeting finder: every major mutual-help fellowship. Filters: k = keys the chip row matches on.
     Verify links before release; some groups only list a homepage with a meeting finder inside. */
  const MTF = [['all', 'All'], ['12', '12-step'], ['alt', 'Other paths'], ['drug', 'By substance'], ['mat', 'Medication-friendly'], ['faith', 'Faith & culture'], ['fam', 'For families'], ['online', 'Online']];
  const MTG = [
    ['12-step', 'Alcoholics Anonymous', '12-step meetings in person and online', [['Find a meeting', 'https://www.aa.org/find-aa']], ['12', 'online']],
    ['12-step', 'Narcotics Anonymous', 'Worldwide meeting search for any drug', [['Find a meeting', 'https://www.na.org/meetingsearch/'], ['Online meetings', 'https://virtual-na.org/']], ['12', 'online']],
    ['Cocaine & stimulants', 'Cocaine Anonymous', '12-step fellowship for cocaine and all mind-altering substances', [['Find a meeting', 'https://ca.org/meetings/'], ['Online meetings', 'https://www.ca-online.org/']], ['12', 'drug', 'online']],
    ['Meth', 'Crystal Meth Anonymous', '12-step fellowship for people recovering from crystal meth', [['Find a meeting', 'https://www.crystalmeth.org/meetings/?mode=me&distance=50']], ['12', 'drug', 'online']],
    ['Opioids', 'Heroin Anonymous', '12-step fellowship for heroin and opioid recovery', [['Find a meeting', 'https://heroinanonymous.org/meetings/']], ['12', 'drug']],
    ['Cannabis', 'Marijuana Anonymous', '12-step fellowship for marijuana addiction', [['Find a meeting', 'https://marijuana-anonymous.org/find-a-meeting/']], ['12', 'drug', 'online']],
    ['Medication', 'MARA', 'Medication-Assisted Recovery Anonymous. Peer support for people on methadone, buprenorphine and other medications', [['Find a meeting', 'https://www.mara-international.org/find-a-meeting']], ['mat', '12']],
    ['Mental health', 'Dual Recovery Anonymous', 'For people living with both addiction and a mental health condition', [['Find a meeting', 'https://draonline.org/meetings/']], ['12', 'mat']],
    ['Relationships', 'Co-Dependents Anonymous', '12-step fellowship for building healthy relationships', [['Find a meeting', 'https://coda.org/find-a-meeting/']], ['12', 'fam', 'online']],
    ['Science-based', 'SMART Recovery', 'Non-12-step meetings, online and in person. Medication welcome', [['Find a meeting', 'https://meetings.smartrecovery.org/meetings/'], ['For families', 'https://smartrecovery.org/family-and-friends/']], ['alt', 'mat', 'fam', 'online']],
    ['Secular', 'LifeRing Secular Recovery', 'Abstinence-based peer support, no higher power', [['Find a meeting', 'https://lifering.org/meetings/']], ['alt', 'online']],
    ['Meditation', 'Recovery Dharma', 'Buddhist-inspired peer recovery with meditation', [['Find a meeting', 'https://recoverydharma.org/meetings/']], ['alt', 'faith', 'online']],
    ['Meditation', 'Refuge Recovery', 'Buddhist-inspired path using mindfulness and compassion', [['Find a meeting', 'https://www.refugerecovery.org/meetings']], ['alt', 'faith', 'online']],
    ['For women', 'Women for Sobriety', 'Peer support groups for women', [['Find a meeting', 'https://meetings.womenforsobriety.org/meetings/']], ['alt', 'online']],
    ['Faith-based', 'Celebrate Recovery', 'Christian groups, usually hosted by churches', [['Find a meeting', 'https://locator.crgroups.info/']], ['faith']],
    ['Native-led', 'Wellbriety', 'Recovery circles rooted in Native American culture', [['Find a circle', 'https://whitebison.org/circle-meetings/']], ['faith']],
    ['For families', 'Al-Anon', 'For family and friends of people who drink', [['Find a meeting', 'https://al-anon.org/al-anon-meetings/']], ['fam', '12', 'online']],
    ['For families', 'Nar-Anon', 'For family and friends of people who use drugs', [['Find a meeting', 'https://www.nar-anon.org/find-a-meeting']], ['fam', '12', 'online']],
    ['Gambling', 'Gamblers Anonymous', '12-step fellowship for problem gambling', [['Find a meeting', 'https://gamblersanonymous.org/find-a-meeting/']], ['12']],
    ['All pathways', 'Unity Recovery', 'Free online meetings for every pathway, including medication', [['Virtual meetings', 'https://unityrecovery.org/digital-recovery-meetings']], ['online', 'mat', 'alt']],
    ['Online', 'In The Rooms', 'Daily online meetings across many fellowships', [['Find a meeting', 'https://www.intherooms.com/livemeetings/list']], ['online']]];
  function meetingsHTML() {
    const f = RM.mf || 'all', C = ['blue', 'coral', 'sage', 'gold'], M = MTG.filter(m => f === 'all' || m[4].includes(f));
    return `<p class="zmt-intro">Free groups led by people in recovery. Try a few until one feels right.</p>
      <div class="zrc-topics" role="tablist" aria-label="Filter meetings">${MTF.map(([k, l]) => `<button class="zcm-chip ${f === k ? 'on' : ''}" role="tab" aria-selected="${f === k}" data-act="zmt-filter" data-k="${k}">${l}</button>`).join('')}</div>
      <div class="zmt-3">${M.map(([t, n, d, L], i) => `<article class="zmf zg-${C[i % 4]}"><span class="zmf-tag">${t}</span><h2>${n}</h2><p>${d}</p>
        <div class="zmf-acts">${L.map(([l, u], k) => `<a class="${k ? 'alt' : 'main'}" href="${u}" target="_blank" rel="noopener" aria-label="${l}: ${n}">${l}${ic('ext', 15, 2.2)}</a>`).join('')}</div></article>`).join('')}</div>
      <p class="zmt-tip">${ic('sparkle', 15, 2)}First time? You can just listen.</p>`;
  }
  function oneHTML() {
    /* 1:1 support. Public directories only: the US has no national searchable list of individual peer specialists,
       so we point to searchable directories of the places that employ them. Verify links before release. */
    const HELP = [['target', 'Make a plan', 'sage'], ['people', 'First meeting', 'blue'], ['home', 'Housing & work', 'gold'], ['calendar', 'Appointments', 'coral'], ['wind', 'Cravings', 'sage'], ['heart', 'Family', 'coral']];
    const FIND = [['https://facesandvoicesofrecovery.org/arco-members-on-the-map/', 'pin', 'coral', 'Recovery centers', 'Map by location'],
      ['https://findtreatment.gov/', 'search', 'blue', 'Treatment programs', 'FindTreatment.gov'],
      ['https://warmline.org/', 'phone', 'sage', 'Peer warmlines', 'Call a peer by state']];
    const TALK = [['tel:18006624357', 'phone', 'SAMHSA Helpline', '24/7 · free', 'Call'], ['tel:18009506264', 'chat', 'NAMI HelpLine', 'Weekdays', 'Call'], ['sms:62640?&body=helpline', 'sms', 'Text NAMI', '“helpline” to 62640', 'Text']];
    return `<section class="zp1-hero"><svg class="zp1-art" viewBox="0 0 160 120" aria-hidden="true"><path d="M8 104c34-16 60-16 86-6s44 8 58-4" fill="none" stroke="#fff" stroke-width="5" stroke-linecap="round" stroke-dasharray="2 11" opacity=".75"/>
        <circle cx="62" cy="30" r="13" fill="#fff" opacity=".95"/><rect x="47" y="47" width="30" height="44" rx="15" fill="#fff" opacity=".95"/>
        <circle cx="104" cy="36" r="11" fill="#fff" opacity=".7"/><rect x="91" y="51" width="26" height="38" rx="13" fill="#fff" opacity=".7"/>
        <path d="M77 62c5 2 9 2 14 0" stroke="#B5635A" stroke-width="4" stroke-linecap="round" fill="none"/></svg>
        <h2>Someone who’s been there</h2><p>A peer specialist walks with you, one-on-one.</p>
        <div class="zp1-tags"><span>${ic('check', 12, 3)}Lived experience</span><span>${ic('check', 12, 3)}Often free</span><span>${ic('check', 12, 3)}Trained</span></div>
        <a class="zp1-cta" href="${ARCO_URL}" target="_blank" rel="noopener">${ic('pin', 18, 2)}Find support near me${ic('ext', 15, 2.2)}</a></section>

      <h3 class="zp1-h">How it works</h3>
      <ol class="zp1-steps"><li><b>1</b><span>Find one near you</span></li><li><b>2</b><span>Ask for a first chat</span></li><li><b>3</b><span>Meet regularly</span></li></ol>

      <h3 class="zp1-h">They can help with</h3>
      <div class="zp1-help">${HELP.map(([i, l, c]) => `<div class="zg-${c}"><span>${ic(i, 20, 1.9)}</span>${l}</div>`).join('')}</div>

      <h3 class="zp1-h">Where to find one</h3>
      <div class="zp1-find">${FIND.map(([u, i, c, n, d]) => `<a class="zg-${c}" href="${u}" target="_blank" rel="noopener"><span class="zri">${ic(i, 22, 1.9)}</span><b>${n}</b><small>${d}</small><i>${ic('ext', 13, 2.4)}</i></a>`).join('')}</div>

      <div class="zp1-ask"><span class="zri">${ic('chat', 18, 2)}</span><div><small>Ask your clinic or insurance</small><q>Do you have a peer recovery specialist I can meet with?</q></div>
        <button data-act="zps-copy" aria-label="Copy this question">Copy</button></div>
      <a class="zp1-verify" href="https://internationalcredentialing.org/" target="_blank" rel="noopener">${ic('shield', 16, 2)}Check someone’s peer certification${ic('ext', 13, 2.4)}</a>

      <h3 class="zp1-h">Talk to someone today</h3>
      <div class="zp1-talk">${TALK.map(([u, i, n, d, cta]) => `<a href="${u}"><span class="zri">${ic(i, 18, 2)}</span><b>${n}</b><small>${d}</small><em>${cta}</em></a>`).join('')}</div>

      <div class="zp1-sos"><b>${ic('life', 16, 2)}In crisis?</b><a href="tel:988">Call 988</a><a href="sms:988">Text 988</a><a href="tel:911">911</a></div>
      <p class="zev-note">${ic('info', 13, 2)}Peer specialists aren’t therapists or doctors. Ask your care team about medication.</p>`;
  }
  function eventsHTML() {
    const set = !!S.zEvStep;
    const go = (u, l) => `<a class="zev-go" href="${u}" target="_blank" rel="noopener">${l}${ic('ext', 14, 2.2)}</a>`;
    /* Public sources only. Links open in the browser. Verify URLs before release. */
    const NEAR = [
      ['people', 'blue', 'Recovery community centers', 'Free groups, socials and classes run by people in recovery', 'https://facesandvoicesofrecovery.org/programs/arco/', 'Find a center'],
      ['heart', 'coral', 'Recovery Café', 'Drop-in cafés with meals, classes and belonging', 'https://recoverycafenetwork.org/', 'Find a café'],
      ['calendar', 'sage', 'Sober groups on Meetup', 'Hikes, game nights and coffee with sober locals', 'https://www.meetup.com/find/?keywords=sober', 'Browse groups'],
      ['sparkle', 'gold', 'Young People in Recovery', 'Chapters and events for ages 18 to 35', 'https://youngpeopleinrecovery.org/', 'Find a chapter']];
    const DAYS = [['May', 'Mental Health Month', 'Walks, talks and free screenings', 'https://mhanational.org/'], ['Aug 31', 'Overdose Awareness Day', 'Vigils to remember and to end stigma', 'https://www.overdoseday.com/'], ['Sep', 'Recovery Month', 'Rallies and recovery celebrations', 'https://www.samhsa.gov/recovery-month']];
    return `<p class="zmt-intro">Fun without alcohol or drugs. Being around people is part of recovery.</p>
      <a class="zrm-hero2 zg-sage zev-hero" href="${PHX_URL}" target="_blank" rel="noopener"><span class="zev-pill">Free · 48 hours sober</span><span class="zri">${ic('run', 28, 1.7)}</span><b>Sober workouts and hangouts</b><small>Climbing, yoga, running and more with The Phoenix</small><span class="go">${ic('ext', 18, 2)}</span></a>
      <button class="zev-step ${set ? 'on' : ''}" data-act="zrm-evstep" aria-pressed="${set}">${ic(set ? 'check' : 'plus', 16, 2.4)}${set ? 'This week’s step' : 'Make it this week’s step'}</button>
      <p class="zrc-lbl">Near you</p>
      <div class="zev-grid">${NEAR.map(([i, c, n, d, u, l]) => `<article class="zev-card zg-${c}"><span class="zri">${ic(i, 22, 1.8)}</span><b>${n}</b><small>${d}</small>${go(u, l)}</article>`).join('')}</div>
      <p class="zrc-lbl">Give back</p>
      <a class="zev-row" href="https://www.volunteermatch.org/" target="_blank" rel="noopener"><span class="zri zg-coral">${ic('hand', 22, 1.8)}</span><span class="tx"><b>Volunteer near you</b><small>Helping others is one of the strongest supports in recovery</small></span>${ic('ext', 16, 2.2)}</a>
      <p class="zrc-lbl">Days to mark this year</p>
      <div class="zev-days">${DAYS.map(([d, n, x, u]) => `<a class="zev-day" href="${u}" target="_blank" rel="noopener"><span class="dt">${d}</span><b>${n}</b><small>${x}</small></a>`).join('')}</div>
      <div class="zev-tip"><span class="zri">${ic('sms', 20, 1.9)}</span><div><b>Going alone is hard</b><small>Ask someone to come with you, or tell them where you’ll be.</small></div><a class="zev-txt" href="sms:">Text someone</a></div>
      <p class="zev-note">${ic('shield', 13, 2)}Check that an event is alcohol-free before you go. Leaving early is always okay.</p>`;
  }
  function roomHTML() { return feedHTML(); }
  /* Meetings, 1:1 Support and Events open as their own screens over the Room */
  let SUB = null;
  const SUBS = { meet: ['Find a meeting', () => meetingsHTML()], one: ['1:1 Support', () => oneHTML()], events: ['Events', () => eventsHTML()], res: ['Resources', () => resourcesHTML()] };
  function openSub(k) { SUB = { k, l: cmLayer('', '', '') }; drawSub(); }
  function drawSub() { if (!SUB || !SUB.l.isConnected) return (SUB = null); const y = SUB.l.scrollTop; setLay(SUB.l, `<h1 class="zcm-lh" style="margin-bottom:14px">${SUBS[SUB.k][0]}</h1>${SUBS[SUB.k][1]()}`); SUB.l.scrollTop = y; }

  /* composer */
  const CRISIS = /suicid|kill (my ?self|me)|end it all|want to die|don.?t want to (live|be here)|hurt (my ?self)|overdos/i;
  function composer(tag) {
    const st = { tag: tag || null, anon: false, t: '' }; const l = cmLayer('', '', 'New post');
    const draw = () => { const ok = st.tag && st.t.trim().length >= 3, risk = CRISIS.test(st.t);
      const TP = { win: ['sparkle', 'Something that went right', 'sage'], support: ['heart', 'Today feels hard', 'blush'], question: ['chat', 'Ask people who’ve been there', 'blue'], grat: ['leaf', 'What you’re thankful for', 'sand'] };
      setLay(l, `<h1 class="zcm-lh zc-title">Share with the room</h1><p class="zc-sub">Cheer someone on, ask a question, or say how today is going.</p>
        <div class="zc-who">${st.anon ? av({ n: '?', c: '#8A9098', anon: true }, 44) : av(me(), 44)}<div class="zc-wt"><b>${st.anon ? 'Anonymous member' : esc(S.name || 'You')}</b><small>${st.anon ? 'Others won’t see your name. ' + MOD.n + ' still can.' : 'First name only'}</small></div>
          <button class="zc-sw ${st.anon ? 'on' : ''}" id="zrm-anon" role="switch" aria-checked="${st.anon}" aria-label="Post anonymously"><span>Anonymous</span><i></i></button></div>
        <p class="zc-lbl">What kind of post?</p>
        <div class="zc-types">${['win', 'support', 'question', 'grat'].map(k => `<button class="zc-tp t-${TP[k][2]} ${st.tag === k ? 'on' : ''}" data-tg="${k}" aria-pressed="${st.tag === k}"><span class="zc-tpi">${ic(TP[k][0], 20, 1.9)}</span><b>${TAGS[k][0]}</b><small>${TP[k][1]}</small><em>${ic('check', 12, 3)}</em></button>`).join('')}</div>
        <div class="zc-box"><textarea id="zrm-ta" class="zrm-ta" maxlength="500" rows="6" placeholder="${st.tag ? PROMPT[st.tag] : 'Pick a kind of post, then write here.'}" aria-label="Your post">${esc(st.t)}</textarea>
          <div class="zrm-cnt"><span id="zrm-n">${st.t.length}</span>/500</div></div>
        <div id="zrm-risk">${risk ? riskCard() : ''}</div>
        <p class="zc-note">${ic('shield', 16, 2)}<span>${MOD.n} reviews posts before others see them. Please don’t share phone numbers, addresses or anything about buying or selling.</span></p>
        <div class="zcm-fill"></div><button class="btn" id="zrm-post" ${ok ? '' : 'disabled'}>${risk ? 'Post and let ' + MOD.n + ' know' : 'Post'}</button>`);
      const ta = $('#zrm-ta', l); ta.addEventListener('input', () => { st.t = ta.value; $('#zrm-n', l).textContent = st.t.length; const r = CRISIS.test(st.t); $('#zrm-risk', l).innerHTML = r ? riskCard() : ''; const b = $('#zrm-post', l); b.disabled = !(st.tag && st.t.trim().length >= 3); b.textContent = r ? 'Post and let ' + MOD.n + ' know' : 'Post'; });
    };
    draw();
    l.addEventListener('click', e => { const tg = e.target.closest('[data-tg]');
      if (tg) { st.tag = tg.dataset.tg; draw(); const ta = $('#zrm-ta', l); ta.focus(); ta.setSelectionRange(ta.value.length, ta.value.length); return; }
      if (e.target.closest('#zrm-anon')) { st.anon = !st.anon; draw(); return; }
      if (e.target.closest('#zrm-post')) {
        const p = { id: 'u' + Date.now().toString(36), by: { ...me(), anon: st.anon }, tag: st.tag, t: st.t.trim(), ts: Date.now(), cheers: 0, cheered: false, status: 'pending', comments: [], flag: CRISIS.test(st.t) };
        S.room.posts.unshift(p); save(); popLayer(l); RM.rt = 'feed'; RM.f = 'all'; if (tab === 'community') renderCommunity();
        toast(`Posted. ${MOD.n} will review it soon.`);
        setTimeout(() => { p.status = 'live'; save(); if ($('#zrp-' + p.id)) redrawPost(p.id); toast(`${MOD.n} approved your post. It’s live in the room.`); }, 6000);
      } });
  }
  const riskCard = () => `<div class="zrm-risk"><b>It sounds like you’re carrying a lot.</b> You can post, and you can also talk to someone right now.<div class="zrm-riskb"><a href="tel:988">Call 988</a><a href="sms:988">Text 988</a><button data-act="help">More help</button></div></div>`;

  function sendComment(pid) {
    const p = S.room.posts.find(x => x.id === pid), inp = $('#zrin-' + pid); if (!p || !inp) return;
    const t = inp.value.trim(); if (t.length < 1) return inp.focus();
    const c = { id: cid(), by: me(), t, ts: Date.now(), cheers: 0, cheered: false, replies: [] };
    const rp = RM.reply[pid] && findC(p.comments, RM.reply[pid]);
    if (rp) (rp.replies = rp.replies || []).push(c); else p.comments.push(c);
    delete RM.reply[pid]; save(); redrawPost(pid, 'end');
    if (CRISIS.test(t)) setTimeout(() => helpSheet(), 300); else toast('Comment posted');
  }
  function postMenu(pid) {
    const p = S.room.posts.find(x => x.id === pid); if (!p) return;
    const l = pushLayer(`<div class="zrm-sheet"><span class="zrm-grab"></span>
      ${p.by.me ? `<button class="zrm-mi" data-k="del">${ic('xc', 20, 1.8)}<span><b>Delete post</b><small>Removes it for everyone</small></span></button>`
        : `<button class="zrm-mi" data-k="rep">${ic('alert', 20, 1.8)}<span><b>Report to ${MOD.n}</b><small>Only the moderator sees who reported</small></span></button><button class="zrm-mi" data-k="hide">${ic('eye', 20, 1.8)}<span><b>Hide this post</b><small>You won’t see it again</small></span></button>`}
      <button class="btn ghost" data-act="close-layer">Cancel</button></div>`, 'sheet-wrap');
    l.addEventListener('click', e => { if (e.target === l) return popLayer(l); const b = e.target.closest('.zrm-mi'); if (!b) return;
      if (b.dataset.k === 'del') { S.room.posts = S.room.posts.filter(x => x.id !== pid); save(); popLayer(l); renderCommunity(); toast('Post deleted'); }
      if (b.dataset.k === 'hide') { S.room.hidden.push(pid); save(); popLayer(l); renderCommunity(); toast('Post hidden'); }
      if (b.dataset.k === 'rep') { $('.zrm-sheet', l).innerHTML = `<span class="zrm-grab"></span><h2 class="zcm-lh" style="font-size:22px">What’s wrong with this post?</h2><div class="zcm-chips col" style="margin:12px 0">${['Unkind or shaming', 'Buying, selling or sharing drugs', 'Someone may be in danger', 'Private information', 'Something else'].map(r => `<button class="zcm-chip zrm-rr">${r}</button>`).join('')}</div><button class="btn ghost" data-act="close-layer">Cancel</button>`; }
      if (e.target.closest('.zrm-rr')) { popLayer(l); toast(`Thanks. ${MOD.n} will look at it soon.`); } });
  }
  function rules() {
    cardsFlow({ tone: 'zpt-friends', label: 'Community Room', h: 'Room guidelines', p: `${MOD.n}, a peer recovery specialist at ${center()}, moderates the room.`,
      cards: [['Be kind', 'Cheer people on. No shaming, lecturing or arguing about anyone’s path, including medication.'], ['First names only', 'Don’t share phone numbers, addresses, workplaces or other people’s stories.'], ['Keep it safe', 'No buying, selling or talking about where to get drugs. Those posts are removed.'],
        ['Posts are reviewed first', 'Posts appear after review, usually within 2 hours. Comments go live and can be removed.'], ['If you’re in crisis', 'The room isn’t watched around the clock. Call or text 988, or tap Help, any time.'], ['Your privacy', 'Your check-in answers and score are never shown here. You can post anonymously; the moderator can still see who posted.']] });
  }

  Object.assign(ACT, {
    'zrm-tab': el => { RM.rt = el.dataset.k; renderCommunity(); },
    'zrm-sub': el => openSub(el.dataset.k),
    'zmt-filter': el => { RM.mf = el.dataset.k; drawSub(); },
    'zps-copy': () => { const t = 'Do you have a peer recovery specialist or recovery coach I can meet with?'; (navigator.clipboard ? navigator.clipboard.writeText(t) : Promise.reject()).then(() => toast('Copied'), () => toast('Couldn’t copy. You can read it aloud instead.')); },
    'zrm-filter': el => { RM.f = el.dataset.k; renderCommunity(); },
    'zrm-new': el => composer(el.dataset.tag),
    'zrm-rules': () => rules(),
    'zrm-cheer': el => { const p = S.room.posts.find(x => x.id === el.dataset.p); p.cheered = !p.cheered; save(); redrawPost(p.id); },
    'zrm-ccheer': el => { const p = S.room.posts.find(x => x.id === el.dataset.p), c = findC(p.comments, el.dataset.c); c.cheered = !c.cheered; save(); redrawPost(p.id); },
    'zrm-open': el => openComments(el.dataset.p),
    'zrm-focus': el => openComments(el.dataset.p, true),
    'zrm-reply': el => { RM.reply[el.dataset.p] = el.dataset.c; if (!CS) openComments(el.dataset.p, true); else { drawCS(); const i = $('#zrin-' + el.dataset.p, CS.l); if (i) i.focus(); } },
    'zrm-unreply': el => { delete RM.reply[el.dataset.p]; redrawPost(el.dataset.p); },
    'zrm-send': el => sendComment(el.dataset.p),
    'zrm-cdel': el => { const p = S.room.posts.find(x => x.id === el.dataset.p), id = el.dataset.c; const strip = l => l.filter(c => c.id !== id).map(c => ({ ...c, replies: strip(c.replies || []) })); p.comments = strip(p.comments); save(); redrawPost(p.id); toast('Comment deleted'); },
    'zrm-menu': el => postMenu(el.dataset.p),
    'zrm-evstep': () => { S.zEvStep = !S.zEvStep; save(); toast(S.zEvStep ? 'Saved as this week’s step' : 'Removed from this week’s step'); drawSub(); }
  });
  document.addEventListener('keydown', e => { if (e.key === 'Enter' && e.target.id && e.target.id.startsWith('zrin-')) { e.preventDefault(); sendComment(e.target.dataset.p); } });
  const RCATS = [['journal', 'Articles', 'paper', 'zg-gold', () => JOURNAL.length], ['listen', 'Podcasts', 'headph', 'zg-blue', () => PODS.length], ['read', 'Books', 'book', 'zg-coral', () => BOOKS.length], ['web', 'Websites', 'globe', 'zg-sage', () => SITES.reduce((a, g) => a + g.items.length, 0)]];
  function resourcesHTML() {
    const st = JOURNAL.find(j => j.id === 'j3'), sv = S.resSaved.length;
    return `<div class="zrx-grid">${RCATS.map(([k, l, i, g, n]) => `<button class="zrx-tile ${g}" data-act="zrx-open" data-k="${k}"><span class="zri">${ic(i, 26, 1.8)}</span><b>${l}</b><small>${n()}</small></button>`).join('')}</div>
      <button class="zrx-row" data-act="zcm-read" data-id="${st.id}"><span class="zri zg-gold">${ic('sparkle', 18, 2)}</span><span><small>Start here</small><b>${esc(st.t)}</b></span>${ic('next', 16, 2.4)}</button>
      <button class="zrx-row" data-act="zrx-open" data-k="saved"><span class="zri" style="background:#EEEDE8">${ic('mark', 18, 2)}</span><span><b>Saved</b><small>${sv ? `${sv} item${sv > 1 ? 's' : ''}` : 'Nothing yet'}</small></span>${ic('next', 16, 2.4)}</button>`;
  }
  let RX = null;
  const RX_TOP = [['all', 'All'], ['moud', 'Medication'], ['safety', 'Safety'], ['health', 'Health'], ['rel', 'Relationships'], ['faith', 'Faith'], ['work', 'Work'], ['housing', 'Housing'], ['legal', 'Legal'], ['mind', 'Mind']];
  function rxOpen(k, topic) { RX = { k, topic: topic || 'all', l: cmLayer('', '', '') }; rxDraw(); }
  function rxDraw() {
    if (!RX || !RX.l.isConnected) return;
    const { k } = RX, T = RX.topic, has = tp => T === 'all' || (Array.isArray(tp) ? tp.includes(T) : tp === T);
    const name = k === 'saved' ? 'Saved' : RCATS.find(c => c[0] === k)[1];
    const row = (act, attrs, lead, title, sub) => `<button class="zrx-item" data-act="${act}" ${attrs}>${lead}<span class="tx"><b>${esc(title)}</b>${sub ? `<small>${esc(sub)}</small>` : ''}</span>${ic('next', 16, 2.4)}</button>`;
    const art = j => row('zcm-read', `data-id="${j.id}"`, `<span class="lead" style="background:${SRC[j.src].c}">${ic('paper', 16, 2)}</span>`, j.t, `${j.min} min read`);
    const pod = ([p, i]) => row('zrx-pod', `data-i="${i}"`, `<span class="lead" style="background:${p.c}">${ic('headph', 16, 2)}</span>`, p.n, p.h);
    const book = ([b, i]) => row('zrx-book', `data-i="${i}"`, `<span class="lead bk" style="background:${b.c}"></span>`, b.n, b.a);
    let list = '';
    if (k === 'journal') list = JOURNAL.filter(j => has(j.tp)).map(art).join('');
    if (k === 'listen') list = PODS.map((p, i) => [p, i]).filter(([p]) => has(p.tp)).map(pod).join('');
    if (k === 'read') list = BOOKS.map((b, i) => [b, i]).filter(([b]) => has(b.tp)).map(book).join('');
    if (k === 'web') list = SITES.filter(g => has(g.tp)).map(g => `<p class="zrx-g">${g.g}</p>${g.items.map(s => `<a class="zrx-item" href="${s.u}" target="_blank" rel="noopener"><span class="lead" style="background:${s.c}">${ic('globe', 16, 2)}</span><span class="tx"><b>${esc(s.n)}</b><small>${host(s.u)}</small></span>${ic('ext', 15, 2.2)}</a>`).join('')}`).join('');
    if (k === 'saved') { const sv = S.resSaved; list = [...JOURNAL.filter(j => sv.includes(j.id)).map(art), ...PODS.map((p, i) => [p, i]).filter(([, i]) => sv.includes('p' + i)).map(pod), ...BOOKS.map((b, i) => [b, i]).filter(([, i]) => sv.includes('b' + i)).map(book)].join(''); }
    setLay(RX.l, `<h1 class="zcm-lh">${name}</h1>
      ${k === 'saved' ? '' : `<div class="zrx-chips">${RX_TOP.map(([t, l]) => `<button class="${T === t ? 'on' : ''}" data-act="zrx-topic" data-t="${t}">${l}</button>`).join('')}</div>`}
      <div class="zrx-list">${list || `<div class="zv-empty">${ic(k === 'saved' ? 'mark' : 'search', 32, 1.6)}<b>${k === 'saved' ? 'Nothing saved yet' : 'Nothing here yet'}</b>${k === 'saved' ? '<span>Tap Save on anything you like.</span>' : '<span>Try All.</span>'}</div>`}</div>`);
    const on = $('.zrx-chips .on', RX.l); if (on) on.parentElement.scrollLeft = Math.max(0, on.offsetLeft - 40);
  }
  function rxDetailHTML(kind, i) {
    const x = kind === 'pod' ? PODS[i] : BOOKS[i], id = (kind === 'pod' ? 'p' : 'b') + i, sv = S.resSaved.includes(id), q = encodeURIComponent(x.n);
    const main = kind === 'pod' ? `<a class="btn" href="https://podcasts.apple.com/us/search?term=${q}" target="_blank" rel="noopener">${ic('play', 16, 2.4)} Listen</a><a class="zrx-alt" href="https://open.spotify.com/search/${q}/podcasts" target="_blank" rel="noopener">Or open in Spotify</a>`
      : x.u ? `<a class="btn" href="${x.u}" target="_blank" rel="noopener">Read free</a>` : `<button class="btn" data-act="zrc-reading" data-id="${id}">${S.reading.includes(id) ? ic('check', 16, 2.6) + ' Reading now' : 'I’m reading this'}</button>`;
    return `<div class="zrx-d"><span class="cov ${kind === 'book' ? 'bk' : ''}" style="background:${x.c}">${kind === 'pod' ? ic('headph', 34, 1.6) : esc(x.n)}</span>
      <h1>${esc(x.n)}</h1><small>${esc(kind === 'pod' ? x.h : `${x.a} · ${x.y}`)}</small><p>${esc(x.w)}</p>${x.warn ? `<span class="warn">${x.warn}</span>` : ''}</div>
      <div class="zcm-fill"></div>${main}<button class="zrx-save ${sv ? 'on' : ''}" data-act="zrc-save" data-id="${id}">${ic('mark', 16, 2.2)}${sv ? 'Saved' : 'Save'}</button>`;
  }
  function rxDetail(kind, i) { const l = cmLayer(rxDetailHTML(kind, i), '', ''); l._rx = { kind, i }; }
  Object.assign(ACT, {
    'zrx-open': el => rxOpen(el.dataset.k),
    'zrx-topic': el => { RX.topic = el.dataset.t; rxDraw(); },
    'zrx-pod': el => rxDetail('pod', +el.dataset.i),
    'zrx-book': el => rxDetail('book', +el.dataset.i),
  });

  /* save / reading toggles, keeping the hub, open list and detail screen in sync */
  const resync = () => {
    rxDraw();
    const d = $$('.layer').reverse().find(l => l._rx); if (d) { const { kind, i } = d._rx; setLay(d, rxDetailHTML(kind, i)); }
    drawSub();
  };
  Object.assign(ACT, {
    'zcm-read': el => reader(el.dataset.id),
    'zrc-save': el => {
      const id = el.dataset.id, on = S.resSaved.includes(id); S.resSaved = on ? S.resSaved.filter(x => x !== id) : [...S.resSaved, id]; save();
      toast(on ? 'Removed from Saved' : 'Saved to Resources');
      if (el.dataset.in) { el.textContent = on ? 'Save' : 'Saved'; el.classList.toggle('ghost', on); rxDraw(); drawSub(); } else resync();
    },
    'zrc-reading': el => { const id = el.dataset.id, on = S.reading.includes(id); S.reading = on ? S.reading.filter(x => x !== id) : [...S.reading, id]; save(); resync(); }
  });

  /* ── the Community tab ── */
  window.renderCommunity = function () {
    const v = $('#v-community'); if (!v) return;
    ensure();
    v.innerHTML = `<div class="tools-head"><h1>Community</h1>${helpBtn()}</div><div id="zcm-body">${roomHTML()}</div>`;
    const on = $('.zrc-topics .zcm-chip.on', v), row = on && on.parentElement; if (on && row) row.scrollLeft = Math.max(0, on.offsetLeft - row.clientWidth / 2 + on.offsetWidth / 2);
  };
  ensure();
})();
