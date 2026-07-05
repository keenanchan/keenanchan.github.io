/**
 * Experience, education, and skills shown on the About page.
 * Add or edit entries here — the page renders whatever is in these arrays.
 * `logo` must match a filename in src/assets/logos/.
 */
export interface Role {
  company: string;
  title: string;
  period: string;
  logo?: string;
  bullets: string[];
}

export interface School {
  school: string;
  degree: string;
  period: string;
  logo?: string;
  notes: string[];
}

export const experience: Role[] = [
  {
    company: 'Data for Good Vancouver',
    title: 'Volunteer Data Analyst',
    period: '2025 – Present',
    bullets: [
      'Pro-bono analytics for non-profit organizations in the Vancouver area.',
      'Research methodology, data analysis, and reporting for social-impact projects.',
    ],
  },
  {
    company: 'Kin + Carta',
    title: 'Data Analyst / Engineer II',
    period: 'Apr 2022 – Nov 2023',
    logo: 'kin-carta.png',
    bullets: [
      'Developed Databricks ETL pipelines serving 13 million Starbucks customers.',
      'Engineered Python libraries promoting data governance best practices; analyzed 25M+ rows of customer data.',
      'Built a report pipeline enabling on-demand creation of 8 supply chain reports.',
      'Implemented Splunk dashboards that cut incident response time by 88%.',
    ],
  },
  {
    company: 'Kin + Carta',
    title: 'Analyst / Engineer (Contract)',
    period: 'Jan 2021 – Mar 2022',
    logo: 'kin-carta.png',
    bullets: [
      'Migrated client APIs to AWS Lambda as part of a cloud migration program.',
      'Migrated two client-critical SQL tables totalling 350,000 records.',
    ],
  },
  {
    company: 'Legal.io',
    title: 'Data Science Intern',
    period: 'Jul – Aug 2019',
    logo: 'legalio.png',
    bullets: [
      'Built a web scraper collecting hourly-rate data for 20,000+ American lawyers.',
      'Performed regression analysis on collected market-rate data.',
    ],
  },
];

export const education: School[] = [
  {
    school: 'University of Washington',
    degree: 'M.S. Business Analytics',
    period: '2024 – 2025',
    logo: 'uw.png',
    notes: [
      'Graduated top 10% of cohort.',
      'Machine learning, A/B testing, customer segmentation.',
    ],
  },
  {
    school: 'UC San Diego',
    degree: 'B.S. Mathematics – Computer Science, Economics minor',
    period: '2016 – 2020',
    logo: 'ucsd.png',
    notes: ['Algorithms, software engineering, statistics.'],
  },
];

export const skills = {
  core: [
    'Data experimentation',
    'Machine learning',
    'Data analytics',
    'Software engineering',
  ],
  tools: [
    'Python',
    'SQL',
    'Databricks',
    'AWS',
    'dbt',
    'R',
    'Tableau',
  ],
};
