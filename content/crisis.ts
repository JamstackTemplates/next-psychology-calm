export interface CrisisLine {
  /** Stable URL-safe identifier; emergency and lifeline are required. */
  id: string;
  /** Public name of the support service. */
  name: string;
  /** Formatted phone number for display. */
  number: string;
  /** Digits-only telephone string for tel: links. */
  tel: string;
  /** Operating hours. */
  hours: string;
  /** Who the service supports. */
  forWho: string;
  /** Optional SMS/text support display number. */
  textNumber?: string;
  /** Optional digits-only SMS number for sms: links. */
  textTel?: string;
  /** Official public website of the service. */
  url: string;
}

export const crisisLines: readonly CrisisLine[] = [
  {
    id: 'emergency',
    name: 'Emergency services',
    number: '000',
    tel: '000',
    hours: '24/7',
    forWho: 'Immediate danger to life or safety',
    url: 'https://www.triplezero.gov.au/',
  },
  {
    id: 'lifeline',
    name: 'Lifeline',
    number: '13 11 14',
    tel: '131114',
    textNumber: '0477 13 11 14',
    textTel: '0477131114',
    hours: '24/7',
    forWho: 'Anyone in crisis or needing immediate support',
    url: 'https://www.lifeline.org.au/',
  },
  {
    id: 'access-mental-health',
    name: 'ACT Access Mental Health',
    number: '1800 629 354',
    tel: '1800629354',
    hours: '24/7',
    forWho: 'Mental health crisis support and triage in the ACT',
    url: 'https://www.canberrahealthservices.act.gov.au/services-and-clinics/services/access-mental-health',
  },
  {
    id: 'suicide-call-back',
    name: 'Suicide Call Back Service',
    number: '1300 659 467',
    tel: '1300659467',
    hours: '24/7',
    forWho: 'Anyone affected by suicide or feeling overwhelmed',
    url: 'https://www.suicidecallbackservice.org.au/',
  },
  {
    id: 'beyond-blue',
    name: 'Beyond Blue',
    number: '1300 22 4636',
    tel: '1300224636',
    hours: '24/7',
    forWho: 'Anxiety, depression and emotional wellbeing support',
    url: 'https://www.beyondblue.org.au/',
  },
  {
    id: '13yarn',
    name: '13YARN',
    number: '13 92 76',
    tel: '139276',
    hours: '24/7',
    forWho: 'Aboriginal and Torres Strait Islander people',
    url: 'https://www.13yarn.org.au/',
  },
  {
    id: 'qlife',
    name: 'QLife',
    number: '1800 184 527',
    tel: '1800184527',
    hours: '3pm–midnight',
    forWho: 'LGBTQIA+ anonymous peer support',
    url: 'https://qlife.org.au/',
  },
];
