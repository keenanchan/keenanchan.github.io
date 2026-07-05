/**
 * Single source of truth for site-wide info.
 * Edit this file to update your name, tagline, contact details, and links everywhere at once.
 */
export const site = {
  name: 'Keenan Chan',
  role: 'Data Analyst',
  location: 'Vancouver, BC',
  title: 'Keenan Chan — Data Analyst',
  description:
    'Data analyst based in Vancouver, BC. Experimentation, analytics, and machine learning for better decisions.',
  tagline: "Let's talk data!",
  intro:
    'Data analyst with 3+ years of experience across analytics and software engineering. I use experimentation, analytics, and machine learning to turn messy data into decisions.',
  email: 'keenanjchan@gmail.com',
  phone: '(858) 888-2252',
  resumeUrl: 'https://resume.keenanchan.com',
  services: [
    'Data experimentation',
    'Machine learning',
    'Data analytics',
    'Software engineering',
  ],
  socials: [
    { label: 'GitHub', url: 'https://github.com/keenanchan' },
    { label: 'LinkedIn', url: 'https://www.linkedin.com/in/keenan-chan/' },
    { label: 'Medium', url: 'https://keenanjchan.medium.com' },
  ],
} as const;
