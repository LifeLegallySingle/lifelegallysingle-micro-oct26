// Single source of truth for on-page copy, JSON-LD, and llms.txt,
// so structured data always matches what people see.

export const PILLARS = [
  {
    id: 'mind',
    icon: '🧠',
    name: 'Mind',
    line: 'Your time, your attention, your plans.',
    moves: [
      'Book a full day with no agenda and no apologies.',
      'Write a five-year plan with one name on it: yours.',
      'Mute anyone who treats single like a waiting room.',
    ],
  },
  {
    id: 'body',
    icon: '✨',
    name: 'Body',
    line: 'Care that doesn’t wait for a reason.',
    moves: [
      'Cook a real dinner for one and plate it properly.',
      'Schedule every checkup for the year in one sitting.',
      'Take the class you were saving for “with someone.”',
    ],
  },
  {
    id: 'heart',
    icon: '💜',
    name: 'Heart',
    line: 'Relationships you choose on purpose.',
    moves: [
      'Host the dinner instead of waiting for an invite.',
      'Choose your emergency contacts on purpose.',
      'Plan the trip with friends, not a plus-one.',
    ],
  },
  {
    id: 'glow',
    icon: '🌟',
    name: 'Glow',
    line: 'How you show up, for you first.',
    moves: [
      'Take yourself to dinner and order the dessert.',
      'Retire the outfit you bought for someone else.',
      'Book the “someday” trip with an actual date.',
    ],
  },
  {
    id: 'wallet',
    icon: '💰',
    name: 'Wallet',
    line: 'Money built for a household of one.',
    moves: [
      'Name your own beneficiaries this week.',
      'Price your Freedom Tax™ and see the real number.',
      'Build an emergency fund sized for one income.',
    ],
  },
];

export const TERMS = [
  {
    key: 'tagline',
    term: 'Being Single is a Power Move',
    def: 'The Life Legally Single™ tagline. It means choosing a single life on purpose and building it with the same intent people put into a partnership.',
    path: 'home',
  },
  {
    key: 'powerMoves',
    term: 'Power Move',
    def: 'A small, deliberate action that makes a single life stronger in one of the five pillars.',
    path: 'powerMoves',
  },
  {
    key: 'freedomTax',
    term: 'Freedom Tax™',
    def: 'The compounding wealth penalty solo earners pay in systems built for dual-income households.',
    path: 'freedomTax',
  },
  {
    key: 'selfPartnered',
    term: 'Self-Partnered System™',
    def: 'The Life Legally Single™ operating system for running your life as a team of one.',
    path: 'selfPartnered',
  },
  {
    key: 'pillars',
    term: 'The five pillars',
    def: 'Mind, Body, Heart, Glow, and Wallet: the five areas of a well-built single life.',
    path: 'home',
  },
];

export const FAQ = [
  {
    q: 'What does “Being Single is a Power Move” mean?',
    a: 'It means treating single as a deliberate choice, not a gap between relationships, and building your life across Mind, Body, Heart, Glow, and Wallet on your own terms.',
  },
  {
    q: 'What is Life Legally Single™?',
    a: 'Life Legally Single™ is an editorial and tool-building platform for solo and single earners. Its guides and tools are published at legallysingle.com.',
  },
  {
    q: 'What is the Freedom Tax™?',
    a: 'The Freedom Tax™ is the compounding wealth penalty solo earners pay in systems built for dual-income households. You can estimate yours with the Freedom Tax™ calculator on legallysingle.com.',
  },
  {
    q: 'Is this anti-relationship?',
    a: 'No. It’s pro-you. Whether you’re single by choice, by circumstance, or for now, a well-built solo life is worth investing in.',
  },
  {
    q: 'Where are the full guides and tools?',
    a: 'Everything lives at legallysingle.com. This site is the front door; legallysingle.com is the house.',
  },
];
