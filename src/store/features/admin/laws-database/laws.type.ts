// get laws database type
export type LawItem = {
  id: number;
  title: string;
  official_gazette: string;
  category: number;
  category_name: string;
  sub_category: number;
  sub_category_name: string;
  bookmark: boolean;
  last_updated: string;
  source?: string;
  sections?: Section[];
};

export type LawsResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: LawItem[];
};

export type LawsQueryParams = {
  count?: number;
  next?: string | null;
  previous?: string | null;
  title?: string;
};

// Post law type data
export type Article = {
  title: string;
  description: string;
  order: number;
};

export type Section = {
  title: string;
  order: number;
  articles: Article[];
};

export type LawDetails = {
  title: string;
  source: string;
  official_gazette: string;
  category: number;
  sub_category: number;
  sections: Section[];
};
