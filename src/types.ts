export interface Owner {
  login: string;
  avatarUrl: string;
}

export interface Repository {
  name: string;
  fullName: string;
  description: string | null;
  url: string;
  language: string;
  stars: number;
  forks: number;
  updatedAt: string;
  owner: Owner;
}

export interface Label {
  name: string;
  color: string;
}

export interface Issue {
  number: number;
  title: string;
  body: string | null;
  url: string;
  labels: Label[];
  createdAt: string;
  updatedAt: string;
  comments: number;
}

export interface Opportunity {
  id: string;
  repository: Repository;
  issue: Issue;
  matchScore: number;
  difficulty: "easy" | "medium" | "hard";
  activityStatus: "active" | "inactive";
  matchReasons: string[];
}

export interface SearchResponse {
  opportunities: Opportunity[];
  totalCount: number;
  searchTime: number;
}

export interface SearchQuery {
  skills: string[];
  experience: "beginner" | "intermediate" | "advanced";
  interests: string[];
}

export interface SavedSearch {
  id: string;
  query: SearchQuery;
  timestamp: number;
}
