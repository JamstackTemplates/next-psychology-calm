export type ApproachGlyphId =
  | 'path-fork'
  | 'open-hand'
  | 'nested-shell'
  | 'side-to-side'
  | 'two-stones'
  | 'winding-line'
  | 'single-ripple';

export interface Approach {
  /** Stable URL-safe identifier; used as anchor on /approaches/#<id> and referenced by clinicians. */
  id: string;
  /** Plain-language title of the therapeutic approach. */
  name: string;
  /** Short one-line summary (maximum 90 characters) used on previews. */
  short: string;
  /** Accessible explanation without clinical jargon or outcome claims. */
  description: string;
  /** What sitting in a session actually feels like. */
  sessionFeelsLike: string;
  /** Situations or people this way of working often suits. */
  oftenSuits: string[];
  /** Engraved stone glyph identifier rendered by ApproachGlyph. */
  glyph: ApproachGlyphId;
}

export const approaches: readonly Approach[] = [
  {
    id: 'cbt',
    name: 'Cognitive Behavioural Therapy (CBT)',
    short: 'Noticing how habits of thought, feeling and action reinforce each other.',
    description:
      'CBT looks at the everyday link between what runs through your mind, how your body responds and what you end up doing or avoiding. Working together, you examine unhelpful loops at a manageable pace and test steadier, more practical ways to respond between sessions.',
    sessionFeelsLike:
      'Structured and collaborative. You and your psychologist set an agenda together, map out a recent tricky moment on paper if that helps, and agree on one small thing to notice or try before next time.',
    oftenSuits: [
      'Worry, panic or racing thoughts that interrupt sleep or focus',
      'Low mood, withdrawal or losing momentum with daily routines',
      'People who appreciate clear structure and practical tools between sessions',
    ],
    glyph: 'path-fork',
  },
  {
    id: 'act',
    name: 'Acceptance and Commitment Therapy (ACT)',
    short: 'Making room for difficult feelings while moving towards what matters to you.',
    description:
      'Rather than trying to argue every hard thought away, ACT explores how to loosen the struggle with thoughts and feelings that keep pulling you off course. It helps clarify what genuinely matters to you and take small, realistic steps in that direction.',
    sessionFeelsLike:
      'Reflective and grounded. Conversations often use simple metaphors, brief noticing exercises and honest talk about what gives your days meaning, even when stress is still present.',
    oftenSuits: [
      'Burnout, work pressure or feeling stuck in overthinking',
      'Navigating uncertainty, health changes or major life decisions',
      'People who have tried fighting anxious thoughts and found it exhausting',
    ],
    glyph: 'open-hand',
  },
  {
    id: 'schema-therapy',
    name: 'Schema Therapy',
    short: 'Understanding long-standing emotional patterns shaped earlier in life.',
    description:
      'Schema Therapy looks gently at deep-rooted beliefs and coping patterns that often began as sensible ways to get through earlier experiences, but now feel rigid or painful in adulthood. The work builds steadier inner responses and kinder boundaries over time.',
    sessionFeelsLike:
      'Unhurried and warm. You explore recurring emotional themes together at your own pace, naming the protective habits that show up under stress and practising gentler ways of meeting your own needs.',
    oftenSuits: [
      'Long-standing anxiety, harsh self-criticism or feeling chronically not enough',
      'Repeating patterns in close relationships that feel hard to shift',
      'People wanting deeper, longer-term work rather than brief symptom strategies',
    ],
    glyph: 'nested-shell',
  },
  {
    id: 'emdr',
    name: 'EMDR',
    short: 'Processing distressing memories with gentle bilateral focus at your pace.',
    description:
      'Eye Movement Desensitisation and Reprocessing (EMDR) is a structured approach that may help the nervous system process memories that still feel raw or stuck in the present. It uses steady side-to-side attention—such as following a light or gentle tapping—while keeping you anchored in the room.',
    sessionFeelsLike:
      'Carefully paced, with preparation coming first. Before revisiting any hard memory, you build grounding and steadiness skills, and you stay in control of when to pause or slow down at every step.',
    oftenSuits: [
      'Single-event or longer-term trauma and distressing memories',
      'Grief or experiences that still trigger a strong physical jolt',
      'People who prefer not to retell every detail of an experience aloud',
    ],
    glyph: 'side-to-side',
  },
  {
    id: 'emotionally-focused',
    name: 'Emotionally Focused Therapy (couples)',
    short: 'Slowing down reactive cycles so partners can hear what sits underneath.',
    description:
      'Emotionally Focused Therapy helps couples step back from familiar arguments or quiet distance and see the cycle itself as the shared difficulty, rather than either partner. It creates space to talk about attachment needs, hurt and safety more plainly.',
    sessionFeelsLike:
      'Calm, balanced and structured so neither partner feels put on trial. Your psychologist slows conversations down when tension rises and helps each of you say what is usually hardest to put into words.',
    oftenSuits: [
      'Couples caught in recurring arguments or growing quiet distance',
      'Partners rebuilding trust or adjusting after a major change, such as a new baby',
      'Couples who want to strengthen how they talk before patterns harden',
    ],
    glyph: 'two-stones',
  },
  {
    id: 'narrative',
    name: 'Narrative Therapy',
    short: 'Separating who you are from the problems and expectations around you.',
    description:
      'Narrative Therapy treats the problem as the problem, not the person. Together you look closely at the stories others—or hard seasons—have written about you, notice the skills and values that have carried you this far, and shape a steadier account of where you are heading.',
    sessionFeelsLike:
      'Conversational, curious and respectful. Your counsellor asks thoughtful questions rather than handing down labels, leaving plenty of room for your own language, identity and context.',
    oftenSuits: [
      'Life transitions, identity questions and young adulthood',
      'People seeking LGBTQIA+ affirming care in a non-pathologising space',
      'Anyone wanting to explore meaning and belonging without rigid worksheets',
    ],
    glyph: 'winding-line',
  },
  {
    id: 'mindfulness',
    name: 'Mindfulness-based therapy',
    short: 'Steadying attention in the body and breath when the mind runs ahead.',
    description:
      'Mindfulness-based therapy weaves gentle present-moment awareness into counselling and psychology. Rather than forcing your mind to go blank, you practise noticing tension, breath and thought patterns earlier, which may help you respond with more steadiness.',
    sessionFeelsLike:
      'Quiet and practical. Sessions blend ordinary conversation with brief, optional grounding or breathing practices tailored to what feels safe and comfortable for you.',
    oftenSuits: [
      'Chronic stress, restless sleep and nervous-system fatigue',
      'Feeling disconnected from your body or constantly braced for what is next',
      'People looking for grounded awareness practices that fit ordinary days',
    ],
    glyph: 'single-ripple',
  },
];
