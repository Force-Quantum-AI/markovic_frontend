/* eslint-disable @typescript-eslint/no-explicit-any */

import { baseApi } from "@/store/api/baseApi";
import { CaseCategoryResponse, SubCategoryResponse } from "./category.type";

const categoryApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createCategory: build.mutation<any, { name: string }>({
      query: (data) => ({
        url: "/cases/categories/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Category", "Subcategory"],
    }),

    getAllCategories: build.query<CaseCategoryResponse, void>({
      query: () => ({
        url: "/cases/categories/",
        method: "GET",
      }),
      providesTags: ["Category", "Subcategory"],
    }),

    createSubCategory: build.mutation<
      any,
      { category: string | number; name: string }
    >({
      query: (data) => ({
        url: "/cases/sub-categories/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Category", "Subcategory"],
    }),
    getAllSubCategories: build.query<SubCategoryResponse, number | void>({
      query: (categoryId) => ({
        url: "/cases/sub-categories/",
        method: "GET",
        params: categoryId ? { category: categoryId } : undefined,
      }),
      providesTags: ["Category", "Subcategory"],
    }),
    updateCategory: build.mutation<any, { id: string | number; name: string }>({
      query: ({ id, ...data }) => ({
        url: `/cases/categories/${id}/`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Category", "Subcategory"],
    }),
    deleteCategory: build.mutation<any, string | number>({
      query: (id) => ({
        url: `/cases/categories/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: ["Category", "Subcategory"],
    }),
    updateSubCategory: build.mutation<
      any,
      { id: string | number; name: string; category: string | number }
    >({
      query: ({ id, ...data }) => ({
        url: `cases/sub-categories/${id}/`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Category", "Subcategory"],
    }),
    deleteSubCategory: build.mutation<any, string | number>({
      query: (id) => ({
        url: `/cases/sub-categories/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: ["Category", "Subcategory"],
    }),
  }),
});

export const {
  useCreateCategoryMutation,
  useGetAllCategoriesQuery,
  useGetAllSubCategoriesQuery,
  useCreateSubCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
  useUpdateSubCategoryMutation,
  useDeleteSubCategoryMutation,
} = categoryApi;
