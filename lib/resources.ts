import resourceData from '@/data/resources.json';

export type ResourceType = 'blog' | 'course';

export type LearningResource = {
  id: string;
  type: ResourceType;
  title: string;
  creators: string[];
  source: string;
  year: number;
  url: string;
  codeUrl?: string;
  level: string;
  descriptionZh: string;
  whyUsefulZh: string;
  tags: string[];
  featured: boolean;
  lastVerified: string;
};

export const resources = resourceData as LearningResource[];

export const resourceTypeLabels: Record<ResourceType, string> = {
  blog: 'Blog · 长文',
  course: 'Course · 课程',
};
