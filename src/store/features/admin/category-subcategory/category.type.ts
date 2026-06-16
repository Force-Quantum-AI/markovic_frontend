export type CaseCategory = {
  id: number;
  name: string;
  created_at: string;
};

export type CaseCategoryResponse = CaseCategory[];

// all sub-category type 
export type SubCategory = {
  id: number;
  category: number;
  category_name: string;
  name: string;
  created_at: string;
};

export type SubCategoryResponse = SubCategory[];
  