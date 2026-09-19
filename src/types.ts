export interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  image: string;
  tech: string[];
  github?: string;
  demo?: string;
  features: string[];
  challenges: string;
  results: string;
}

export interface Skill {
  name: string;
  level: number;
  category: 'frontend' | 'backend' | 'database' | 'tools' | 'ai';
  rating: 'Expert' | 'Advanced' | 'Intermediate' | 'Beginner';
}

export interface TimelineItem {
  year: string;
  title: string;
  subtitle: string;
  description: string;
  type: 'education' | 'experience' | 'achievement';
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  priceEstimate: string;
}

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  company: string;
  feedback: string;
  rating: number;
}

export interface BlogItem {
  id: string;
  title: string;
  category: string;
  date: string;
  readTime: string;
  summary: string;
  image: string;
  content: string;
}
